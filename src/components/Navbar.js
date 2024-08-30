import React, { useState } from "react";
import logo from "../assets/logo.svg";
import settingsIcon from "../assets/settingIcon.svg";
import editIcon from "../assets/editIcon.svg";
import fileIcon from "../assets/fileIcon.svg";
import tutorialsIcon from "../assets/tutorialsIcon.svg";
import SignInForm from "./SigninForm";

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignIn = (email, password) => {
    alert(`Signing in with Email: ${email}, Password: ${password}`);
    setShowSignIn(false);
  };

  return (
    <div>
      <nav className="bg-purple-600 shadow-lg mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <img src={logo} alt="Scratch Logo" className="h-10 w-auto" />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a
                href="settings"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <img
                  src={settingsIcon}
                  alt="Settings Icon"
                  className="h-6 w-6 mr-2"
                />
                Settings
              </a>
              <a
                href="files"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <img src={fileIcon} alt="Files Icon" className="h-6 w-6 mr-2" />
                Files
              </a>
              <a
                href="edit"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <img src={editIcon} alt="Edit Icon" className="h-6 w-6 mr-2" />
                Edit
              </a>
              <a
                href="tutorial"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <img
                  src={tutorialsIcon}
                  alt="Tutorials Icon"
                  className="h-6 w-6 mr-2"
                />
                Tutorials
              </a>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showSignIn && <SignInForm onSignIn={handleSignIn} />}
    </div>
  );
};

export default Navbar;
