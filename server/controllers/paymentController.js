const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const axios = require('axios');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    try {
        const { amount, type, details } = req.body;
        const userId = req.user.id;

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const rpOrder = await razorpay.orders.create(options);

        const order = await Order.create({
            razorpay_order_id: rpOrder.id,
            amount,
            type,
            details,
            UserId: userId,
            status: 'pending',
        });

        res.status(200).json({
            orderId: rpOrder.id,
            amount: rpOrder.amount,
            currency: rpOrder.currency,
        });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Payment verified
            const order = await Order.findOne({ where: { razorpay_order_id } });
            if (!order) return res.status(404).json({ message: 'Order not found' });

            order.status = 'paid';
            await order.save();

            // Trigger Recharge API
            const rechargeResult = await triggerRecharge(order);

            res.status(200).json({
                message: 'Payment verified and recharge initiated',
                recharge: rechargeResult,
            });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({ message: 'Error verifying payment' });
    }
};

const triggerRecharge = async (order) => {
    try {
        const { details } = order;

        // Recharge1 API expects specific params
        const rechargePayload = {
            api_key: process.env.RECHARGE1_API_KEY,
            mobile: details.mobileNumber || details.otherNumber,
            operator: details.operator,
            amount: order.amount,
            order_id: order.razorpay_order_id,
        };

        console.log('Initiating recharge with Recharge1:', rechargePayload);

        // Mock API call for now if key is missing or for testing
        let response;
        if (process.env.RECHARGE1_API_KEY === 'your_recharge1_api_key') {
            response = { data: { status: 'success', recharge_id: 'MOCK_REF_' + Date.now(), message: 'Mock Success' } };
        } else {
            response = await axios.post(process.env.RECHARGE1_API_URL, rechargePayload);
        }

        // Log Transaction
        await Transaction.create({
            recharge_id: response.data.recharge_id,
            status: response.data.status,
            api_response: response.data,
            OrderId: order.id,
        });

        return response.data;
    } catch (error) {
        console.error('Recharge API Error:', error);
        // Log failed transaction
        await Transaction.create({
            status: 'failed',
            api_response: error.message,
            OrderId: order.id,
        });
        throw error;
    }
};

module.exports = { createOrder, verifyPayment };
