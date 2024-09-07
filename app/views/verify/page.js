"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Verify = () => {
  const [method, setMethod] = useState(""); // "email", "phone", or "both"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter(); // For navigation

  const validatePhoneNumber = (number) => {
    return /^[\d\s\+\-()]+$/.test(number);
  };

  const handleVerify = async () => {
    setLoading(true);
    setEmailError("");
    setPhoneError("");

    try {
      let emailVerified = true;
      let phoneVerified = true;

      if (method === "email" || method === "both") {
        const emailResponse = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const emailData = await emailResponse.json();
        if (!emailData.success) {
          emailVerified = false;
          setEmailError(
            "Email verification failed. Please check your email address."
          );
        }
      }

      if (method === "phone" || method === "both") {
        if (!validatePhoneNumber(phone)) {
          phoneVerified = false;
          setPhoneError("Invalid phone number format.");
          toast.error("Please enter a valid phone number.");
        } else {
          const phoneResponse = await fetch("/api/verify-phone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: phone }),
          });
          const phoneData = await phoneResponse.json();
          if (!phoneData.success) {
            phoneVerified = false;
            setPhoneError(
              "Phone verification failed. Please check your phone number."
            );
            toast.error(
              "Phone verification failed. Please check your phone number."
            );
          }
        }
      }

      if (emailVerified && phoneVerified) {
        toast.success("Verification successful!");
        router.push("/views/subscribe");
      } else {
        if (!emailVerified || !phoneVerified) {
          toast.error(
            "Some verifications failed. Please check the errors and try again."
          );
        }
      }
    } catch (error) {
      toast.error(error.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-seasalt p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <Toaster />
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-eerie-black mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
        Choose a Verification Method
      </h1>

      <div className="bg-antiflash-white shadow-md rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8">
        {/* Method Selection Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={() => setMethod("email")}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${
              method === "email"
                ? "bg-outer-space text-seasalt"
                : "bg-platinum text-onyx"
            }`}
          >
            Email
          </button>

          <button
            onClick={() => setMethod("phone")}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${
              method === "phone"
                ? "bg-outer-space text-seasalt"
                : "bg-platinum text-onyx"
            }`}
          >
            Phone
          </button>

          <button
            onClick={() => setMethod("both")}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${
              method === "both"
                ? "bg-outer-space text-seasalt"
                : "bg-platinum text-onyx"
            }`}
          >
            Both
          </button>
        </div>

        {/* Conditionally Render Input Fields with Animation */}
        {method === "email" || method === "both" ? (
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`fade-slide-in w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500" : "border-french-gray"
              } focus:ring-outer-space`}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
        ) : null}

        {method === "phone" || method === "both" ? (
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`fade-slide-in w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
                phoneError ? "border-red-500" : "border-french-gray"
              } focus:ring-outer-space`}
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>
        ) : null}

        {/* Verify Button */}
        {method && (
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-onyx hover:bg-eerie-black text-seasalt py-3 rounded-lg text-lg transition duration-200"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
