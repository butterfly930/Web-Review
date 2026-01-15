import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const onLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  const onSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <main className="flex-1 bg-gray-50">
        <AuthModal
          showLogin={showLogin}
          showSignup={showSignup}
          onClose={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
