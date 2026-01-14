import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import "../../../index.css";
import HamburgerMenu from "./HamburgerMenu";

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onLoginClick = () => {},
  onSignupClick = () => {},
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-blue w-full box-border relative shadow-sm">
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4 box-border flex justify-center">
        <div className="flex justify-between items-center w-full">
          {/* Hamburger menu for mobile */}
          <HamburgerMenu
            isOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />

          {/* Navigation */}
          <nav
            className={`gap-4 sm:gap-6 md:gap-8 flex-col lg:flex-row lg:flex ${
              isMenuOpen ? "flex fixed top-[80px] left-0 right-0 bg-white p-4 z-[1000]" : "hidden lg:flex"
            }`}
          >
            <a href="#Faqja Kryesore" className="red-underline text-sm sm:text-base">Faqja Kryesore</a>
            <a href="#Produktet" className="red-underline text-sm sm:text-base">Produktet</a>
            <a href="#Rreth Nesh" className="red-underline text-sm sm:text-base">Rreth Nesh</a>
            <a href="#Mënyrë Kontakti" className="red-underline text-sm sm:text-base">Mënyrë Kontakti</a>
          </nav>

          {/* Cart & Auth Buttons */}
          <div className="flex gap-2 sm:gap-4 items-center">
            <button 
              type="button" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button onClick={onLoginClick} type="button" className="text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2">Login</button>
            <button onClick={onSignupClick} type="button" className="text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2">Sign Up</button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-white/50 z-[999] lg:hidden"
        />
      )}
    </header>
  );
};

export default Header;
