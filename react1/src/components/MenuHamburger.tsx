import React, { useState } from "react";
import "./MenuHamburger.css";

interface MenuHamburgerProps {
  onClick: () => void;
}

const MenuHamburger: React.FC<MenuHamburgerProps> = ({
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <button className="menu-hamburger" onClick={handleMenuClick}>
      {isOpen ? (
        <>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </>
      ) : (
        <span className="close-icon">×</span>
      )}
    </button>
  );
};

export default MenuHamburger;
