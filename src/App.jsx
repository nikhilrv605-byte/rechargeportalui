import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Recharge from "./pages/Recharge";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext"; // Corrected import path

function App() {
  return (
    // Providers are typically wrapped in main.jsx for simplification,
    // but keeping them here as per the provided App.jsx content.
    // The instruction "simplify provider wrapping in main.jsx" implies
    // moving these out of App.jsx, but this file is App.jsx.
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recharge" element={<Recharge />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
