"use client";

import React, { useState } from "react";
import Image from "next/image";
import dollarImg from "../public/images/dollar.png"; // Adjust the path if needed
import ReportProblemPopup from "./ReportProblemPopup"; // Adjust the path if needed

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReportProblemClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <Image
              src={dollarImg} 
              alt="Logo"
              width={35} 
              height={24} 
              className="mr-3 sm:h-9"
            />
            <span className="self-center roboto-bold text-2xl whitespace-nowrap dark:text-white">
              Verify and Sub
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="#"
              onClick={handleReportProblemClick}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Report a problem
            </a>
          </div>
        </div>
      </nav>

      {isPopupOpen && <ReportProblemPopup onClose={handleClosePopup} />}
    </header>
  );
};

export default Header;
