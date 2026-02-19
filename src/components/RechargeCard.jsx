import {
  Smartphone,
  Tv,
  Wifi,
  Car,
  FileText,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./RechargeCard.css";

const tabs = [
  { label: "Mobile", icon: <Smartphone />, path: "/recharge", state: { tab: "Mobile", type: "Prepaid" } },
  { label: "DTH", icon: <Tv />, path: "/recharge", state: { tab: "DTH" } },
  { label: "Broadband", icon: <Wifi />, path: "/recharge", state: { tab: "Broadband" } },
  { label: "FASTag", icon: <Car />, path: "/recharge", state: { tab: "FASTag" } },
  { label: "Postpaid", icon: <FileText />, path: "/recharge", state: { tab: "Mobile", type: "Postpaid" } },
  { label: "OTT", icon: <PlayCircle />, path: "/subscription" },
];

const RechargeCard = () => {
  const navigate = useNavigate();

  return (
    <div className="recharge-section">
      <div className="recharge-card-container">
        <div className="recharge-tabs-grid">
          {tabs.map((tab) => (
            <div
              className="recharge-tab"
              key={tab.label}
              onClick={() => navigate(tab.path, { state: tab.state })}
            >
              <div className="tab-icon">{tab.icon}</div>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RechargeCard;
