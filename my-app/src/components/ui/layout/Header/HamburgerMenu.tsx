import React from "react";

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
  const barClassName = "w-[25px] h-[3px] bg-black block transition-all duration-300";
  
  return (
    <button
      className="flex flex-col gap-1 lg:hidden bg-transparent border-none cursor-pointer p-1.5"
      onClick={toggleMenu}
    >
      {[...Array(3)].map((_, index) => (
        <span key={index} className={barClassName} />
      ))}
    </button>
  );
};

export default HamburgerMenu;
