import React from "react";

interface DarkModeButtonProps {
  className?: string; // Optional custom class for styling
}

const DarkModeButton: React.FC<DarkModeButtonProps> = ({ className }) => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <button onClick={toggleDarkMode} className={className}>
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeButton;
