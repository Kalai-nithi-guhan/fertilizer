import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - AgriSmart",
  description: "Learn about AgriSmart's mission to revolutionize agriculture through intelligent AI-powered fertilizer recommendations.",
};

export default function AboutPage() {
  return (
    // Reduced overall vertical padding (py-8) and ensured it fills the screen
    <div className="bg-gray-50 py-8 flex items-center justify-center min-h-screen">
      {/* Max-width to keep content compact and centered */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading - reduced margin-bottom */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            About AgriSmart
          </h1>
          <p className="mt-1 text-base text-gray-600">
            Revolutionizing agriculture through intelligent technology
          </p>
        </div>

        {/* Content Grids - reduced overall top margin (mt-8) and gap */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Individual cards - reduced padding and text sizes */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold text-green-800 mb-2">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              At AgriSmart, we&apos;re dedicated to empowering farmers with cutting-edge AI technology
              to make informed decisions about fertilizer usage. Our mission is to increase crop
              yields while promoting sustainable farming practices.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold text-green-800 mb-2">Our Technology</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our advanced machine learning algorithms analyze multiple soil parameters to provide personalized
              fertilizer recommendations tailored to your specific soil conditions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold text-green-800 mb-2">Why It Matters</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Proper fertilizer management is crucial for sustainable agriculture. Our AI system
              helps find the perfect balance for optimal results.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold text-green-800 mb-2">Our Impact</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We&apos;ve helped thousands of farmers optimize their fertilizer usage,
              resulting in increased crop yields, reduced environmental impact, and improved
              profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}