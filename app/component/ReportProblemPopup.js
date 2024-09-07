"use client";

import React, { useState } from "react";

const ReportProblemPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeojdvwn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionSuccess(false);
      }
    } catch (error) {
      setSubmissionSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle clicks outside the form
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-outer-space">
          Report a Problem
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-gray"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-french-gray rounded-md bg-seasalt"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-gray"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-french-gray rounded-md bg-seasalt"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-gray"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-french-gray rounded-md bg-seasalt resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-outer-space text-white rounded-md hover:bg-slate-gray ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {submissionSuccess === true && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {submissionSuccess === false && (
            <p className="text-red-600">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportProblemPopup;
