// views/payment/page.js
"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Updated import
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

// Importing images
import googlePayLogo from "../../public/images/google-pay.png";
import samsungPayLogo from "../../public/images/samsung-pay.png";
import applePayLogo from "../../public/images/apple-pay.png";
import bitcoinLogo from "../../public/images/bitcoin.png";
import ethereumLogo from "../../public/images/ethereum.png";

const planColors = {
  Basic: "text-slate-gray", // Corresponding color for Basic plan
  Pro: "text-orange-400", // Corresponding color for Pro plan
  Premium: "text-green-400", // Corresponding color for Premium plan
};

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "") // Remove non-digit characters
    .replace(/(\d{4})(\d{4})?(\d{4})?(\d{4})?/, "$1 $2 $3 $4") // Format in groups of 4
    .trim();
};

const formatExpiryDate = (value) => {
  return value
    .replace(/\D/g, "") // Remove non-digit characters
    .replace(/(\d{2})(\d{2})?/, "$1/$2") // Format as MM/YY
    .trim();
};

const PaymentContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing");

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (plan && billing) {
      setSelectedPlan({ plan, billing });
    }
  }, [plan, billing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = formatCardNumber(value);
      setPaymentInfo((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else if (name === "expiryDate") {
      const formattedValue = formatExpiryDate(value);
      setPaymentInfo((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else if (name === "cvv") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 3); // Limit to 3 digits
      setPaymentInfo((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      router.push(`/views/confirmation?plan=${selectedPlan.plan}`);
    }, 2000);
  };

  const handlePaymentOptionClick = (option) => {
    toast.info(`${option} is coming soon!`);
  };

  if (!selectedPlan) {
    return <p>Loading payment details...</p>;
  }

  return (
    <div className="mt-4 w-full max-w-2xl">
      {paymentSuccess === null ? (
        <>
          <p className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold text-pretty">
            You have selected the {selectedPlan.billing}{" "}
            <span className={`font-bold ${planColors[selectedPlan.plan]}`}>
              {selectedPlan.plan}
            </span>{" "}
            plan.
          </p>
          <form onSubmit={handlePaymentSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-gray">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md border-french-gray focus:outline-none focus:ring-2 focus:ring-antiflash-white"
                placeholder="1234 5678 9012 3456"
                required
                autoComplete="cc-number"
                maxLength="19"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-gray">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md border-french-gray focus:outline-none focus:ring-2 focus:ring-antiflash-white"
                  placeholder="MM/YY"
                  required
                  autoComplete="cc-exp"
                  maxLength="5"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-gray">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md border-french-gray focus:outline-none focus:ring-2 focus:ring-antiflash-white"
                  placeholder="123"
                  required
                  autoComplete="cc-csc"
                  maxLength="3"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`px-6 py-2 bg-outer-space text-white rounded-md hover:bg-slate-gray focus:outline-none focus:ring-2 focus:ring-antiflash-white ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Submit Payment"}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="border-t border-slate-gray flex-grow mr-2"></div>
              <span className="text-slate-gray">or</span>
              <div className="border-t border-slate-gray flex-grow ml-2"></div>
            </div>

            <p className="text-lg font-bold text-outer-space">Pay with:</p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                onClick={() => handlePaymentOptionClick("Google Pay")}
                className="flex items-center px-4 py-2 border rounded-md border-french-gray bg-seasalt hover:bg-antiflash-white"
              >
                <Image
                  src={googlePayLogo}
                  alt="Google Pay"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Google Pay
              </button>
              <button
                onClick={() => handlePaymentOptionClick("Samsung Pay")}
                className="flex items-center px-4 py-2 border rounded-md border-french-gray bg-seasalt hover:bg-antiflash-white"
              >
                <Image
                  src={samsungPayLogo}
                  alt="Samsung Pay"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Samsung Pay
              </button>
              <button
                onClick={() => handlePaymentOptionClick("Apple Pay")}
                className="flex items-center px-4 py-2 border rounded-md border-french-gray bg-seasalt hover:bg-antiflash-white"
              >
                <Image
                  src={applePayLogo}
                  alt="Apple Pay"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Apple Pay
              </button>
              <button
                onClick={() => handlePaymentOptionClick("Bitcoin")}
                className="flex items-center px-4 py-2 border rounded-md border-french-gray bg-seasalt hover:bg-antiflash-white"
              >
                <Image
                  src={bitcoinLogo}
                  alt="Bitcoin"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Bitcoin
              </button>
              <button
                onClick={() => handlePaymentOptionClick("Ethereum")}
                className="flex items-center px-4 py-2 border rounded-md border-french-gray bg-seasalt hover:bg-antiflash-white"
              >
                <Image
                  src={ethereumLogo}
                  alt="Ethereum"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Ethereum
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-6 text-center">
          {paymentSuccess ? (
            <p className="text-2xl font-semibold text-green-600">
              Payment Successful! Redirecting...
            </p>
          ) : (
            <p className="text-2xl font-semibold text-red-600">
              Payment Failed! Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={<p>Loading payment details...</p>}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center py-10 px-4 md:px-8 lg:px-12">
          <PaymentContent />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Suspense>
  );
};

export default PaymentPage;
