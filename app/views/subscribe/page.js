"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

const plans = [
  {
    name: "Basic",
    useCase: "For individual and small teams",
    priceMonthly: 29,
    priceAnnually: 290, // Adjusted price for annual plan
    features: [
      "Trending Dashboard",
      "10 Keywords",
      "100 Accounts Tracking",
      "3 Users",
      "Basic Support",
    ],
    bgColor: "bg-slate-100",
    borderColor: "border-violet-400",
  },
  {
    name: "Pro",
    useCase: "For small businesses and medium teams",
    priceMonthly: 79,
    priceAnnually: 790, // Adjusted price for annual plan
    features: [
      "Trending Dashboard",
      "25 Keywords",
      "250 Accounts Tracking",
      "10 Users",
      "Early Beta Features",
      "Premium Support",
    ],
    bgColor: "bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100",
    borderColor: "border-orange-300",
    popular: true,
  },
  {
    name: "Premium",
    useCase: "For corporation and large teams",
    priceMonthly: 149,
    priceAnnually: 1490, // Adjusted price for annual plan
    features: [
      "Trending Dashboard",
      "50 Keywords",
      "500 Accounts Tracking",
      "20 Users",
      "Exclusive Features",
      "Premium Support",
    ],
    bgColor: "bg-slate-100",
    borderColor: "border-green-400",
  },
];

const Subscribe = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const router = useRouter();

  const handleSubscribe = (planName) => {
    // Redirect to the payment page with the selected plan and billing period
    router.push(
      `/views/payment?plan=${planName}&billing=${
        isMonthly ? "monthly" : "annually"
      }`
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
          {/* Toggle Buttons */}
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-4 py-2 border rounded-lg text-base sm:text-lg ${
                isMonthly ? "bg-orange-500 text-white" : "bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-4 py-2 border rounded-lg text-base sm:text-lg ${
                !isMonthly ? "bg-orange-500 text-white" : "bg-gray-100"
              }`}
            >
              Annually
            </button>
          </div>

          {/* Plan Cards */}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-6 lg:gap-6 justify-center">
  {plans.map((plan, index) => (
    <div
      key={index}
      className={`relative flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${plan.bgColor} border-4 ${plan.borderColor}`}
    >
      {plan.popular && (
        <p className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white py-1 px-2 font-bold tracking-wider rounded text-xs">
          POPULAR
        </p>
      )}
      <div className="flex flex-col flex-grow">
        <div className="text-center">
          <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl mb-1">{plan.name}</h2>
          <p className="opacity-60 text-sm sm:text-base md:text-lg">{plan.useCase}</p>
          <div className="flex flex-col items-center my-4 sm:my-6 md:my-8 lg:my-8">
            <p className="font-extrabold text-xl sm:text-2xl md:text-3xl">
              ${isMonthly ? plan.priceMonthly : plan.priceAnnually}
            </p>
            <p className="text-xs sm:text-sm opacity-60">
              /{isMonthly ? "month" : "year"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-xs sm:text-sm">
          {plan.features.map((feature, idx) => (
            <p key={idx} className="flex items-center roboto-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {feature}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-auto pt-4 sm:pt-6 md:pt-8 lg:pt-6">
        <button
          onClick={() => handleSubscribe(plan.name)}
          className="px-3 py-1 border-2 border-violet-400 hover:bg-violet-100 rounded-xl text-sm sm:text-base"
        >
          Subscribe
        </button>
      </div>
    </div>
  ))}
</div>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Subscribe;
