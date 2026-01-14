import React, { ReactNode } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

interface LayoutProps {
  children: ReactNode;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLoginClick, onSignupClick }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;