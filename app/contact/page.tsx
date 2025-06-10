"use client"; // This directive is important for Next.js App Router to make the component interactive

import { useState } from "react"; // For managing form input states

export default function ContactPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handler for all input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Update the corresponding field in formData state
    setFormData({
      ...formData, // Keep existing data
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    // Simple alert for demonstration. In a real app, you'd send this data to a server.
    alert("Thank you for your message! We will get back to you soon.");
    // Clear the form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    // min-h-screen is removed as we want it to fit without scrolling.
    // py-6 and px-4 for reduced overall padding
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
      {/* max-w-xl to keep it compact horizontally */}
      <div className="max-w-xl w-full mx-auto">

        {/* Page Heading - reduced margin-bottom */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Contact Us
          </h1>
          <p className="mt-1 text-base text-gray-600">
            Get in touch with our team
          </p>
        </div>

        {/* Contact Form Section - reduced padding */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
            Send us a Message
          </h2>
          {/* Reduced vertical space between form elements (space-y-4) */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name Input - reduced margin-bottom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Email Address Input - reduced margin-bottom */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-0.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Subject Select Input - reduced margin-bottom */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-0.5">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a subject</option>
                <option value="technical-support">Technical Support</option>
                <option value="consultation">General Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Textarea - reduced rows and margin-bottom */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-0.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3} // Significantly reduced rows to save vertical space
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us how we can help you..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Submit Button - reduced padding */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium text-base"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Simple Contact Information Section (Optional) - reduced padding and margins */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6 text-center text-sm">
            <h2 className="text-lg font-bold text-green-800 mb-2">Our Details</h2>
            <p className="text-gray-600">
                Email: <span className="font-semibold">support@agrismart.com</span>
            </p>
            <p className="text-gray-600 mt-1">
                Phone: <span className="font-semibold">+1 (555) 123-4567</span>
            </p>
            <p className="text-gray-600 mt-1">
                Address: 123 Farm Tech Lane, Green Valley, CA
            </p>
        </div>

      </div>
    </div>
  );
}