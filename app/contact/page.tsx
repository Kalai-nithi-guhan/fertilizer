"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our team of agricultural experts
          </p>
        </div>

        {/* Form & Info Section */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <ContactItem icon="📧" title="Email" text="support@agrismart.com" />
              <ContactItem icon="📞" title="Phone" text="+1 (555) 123-4567" />
              <ContactItem
                icon="📍"
                title="Address"
                text="123 Agricultural Innovation Center\nFarm Technology District\nGreen Valley, CA 90210"
              />
              <ContactItem
                icon="🕒"
                title="Business Hours"
                text="Mon-Fri: 9 AM - 6 PM\nSat: 10 AM - 4 PM\nSun: Closed"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
              <TextInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              <SelectInput label="Subject" name="subject" value={formData.subject} onChange={handleInputChange} />
              <TextAreaInput label="Message" name="message" value={formData.message} onChange={handleInputChange} />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Support & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SupportCard icon="🛠️" title="Technical Support" text="Need help with our AI analyzer? Our technical support team is available to assist you." />
            <SupportCard icon="🌱" title="Agricultural Consultation" text="Connect with our team of agricultural experts for personalized advice and farming strategies." />
            <SupportCard icon="🤝" title="Partnership Opportunities" text="We welcome collaboration with innovative agricultural organizations." />
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔽 Reusable Components

function ContactItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-gray-600 whitespace-pre-line">{text}</p>
      </div>
    </div>
  );
}

function TextInput({ label, name, type = 'text', value, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
}

function SelectInput({ label, name, value, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option value="">Select a subject</option>
        <option value="technical-support">Technical Support</option>
        <option value="consultation">Agricultural Consultation</option>
        <option value="partnership">Partnership Inquiry</option>
        <option value="feedback">Feedback</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}

function TextAreaInput({ label, name, value, onChange }: any) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        required
        placeholder="Tell us how we can help you..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
}

function SupportCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
//hi