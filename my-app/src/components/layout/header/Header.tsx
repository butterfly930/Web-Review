import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import "../../../../src/index.css";
import HamburgerMenu from "./HamburgerMenu";

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const NAV_LINKS = [
  { href: "#Faqja Kryesore", label: "Faqja Kryesore" },
  { href: "#Produktet", label: "Produktet" },
  { href: "#Rreth Nesh", label: "Rreth Nesh" },
  { href: "#Mënyrë Kontakti", label: "Mënyrë Kontakti" },
];

const AUTH_BUTTONS = [
  { label: "Login", key: "login" },
  { label: "Sign Up", key: "signup" },
];

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const authHandlers = { login: onLoginClick, signup: onSignupClick };
  const buttonClassName = "text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2";
  const linkClassName = "red-underline text-sm sm:text-base";

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
              isMenuOpen
                ? "flex fixed top-[80px] left-0 right-0 bg-white p-4 z-[1000]"
                : "hidden lg:flex"
            }`}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className={linkClassName}>
                {label}
              </a>
            ))}
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
            {AUTH_BUTTONS.map(({ label, key }) => (
              <button
                key={key}
                onClick={authHandlers[key as keyof typeof authHandlers]}
                type="button"
                className={buttonClassName}
              >
                {label}
              </button>
            ))}
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
