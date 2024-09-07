"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

const ConfirmationPage = () => {
  const router = useRouter();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // Get plan from query string
    const query = new URLSearchParams(window.location.search);
    const planFromQuery = query.get("plan");
    setPlan(planFromQuery);

    // Check if plan is present; if not, redirect to home
    if (!planFromQuery) {
      router.push("/"); // Redirect to the entry page of the app
    }
  }, [router]);

  const handleCancelPlan = () => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 lg:py-10 lg:px-10">
          {plan ? (
            <div className="mt-4 w-full max-w-prose px-4 text-center sm:px-6 md:px-8 lg:px-10">
              <p className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold text-pretty">
                You have successfully subscribed to the {plan} plan!
              </p>
              <button
                onClick={handleCancelPlan}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-outer-space text-white rounded-md hover:bg-slate-gray focus:outline-none focus:ring-2 focus:ring-antiflash-white"
              >
                Cancel Plan
              </button>
            </div>
          ) : (
            <p className="text-center text-outer-space">Loading...</p>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ConfirmationPage;
