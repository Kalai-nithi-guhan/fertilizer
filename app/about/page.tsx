import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - AgriSmart',
  description: 'Learn about AgriSmart\'s mission to revolutionize agriculture through intelligent AI-powered fertilizer recommendations.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About AgriSmart
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Revolutionizing agriculture through intelligent technology
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At AgriSmart, we're dedicated to empowering farmers with cutting-edge AI technology 
              to make informed decisions about fertilizer usage. Our mission is to increase crop 
              yields while promoting sustainable farming practices through data-driven insights.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Technology</h2>
            <p className="text-gray-600 leading-relaxed">
              Our advanced machine learning algorithms analyze multiple soil parameters including 
              NPK levels, moisture content, temperature, and humidity to provide personalized 
              fertilizer recommendations tailored to your specific soil conditions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Why It Matters</h2>
            <p className="text-gray-600 leading-relaxed">
              Proper fertilizer management is crucial for sustainable agriculture. Over-fertilization 
              can harm the environment, while under-fertilization reduces crop yields. Our AI system 
              helps find the perfect balance for optimal results.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Impact</h2>
            <p className="text-gray-600 leading-relaxed">
              Since our launch, we've helped thousands of farmers optimize their fertilizer usage, 
              resulting in increased crop yields, reduced environmental impact, and improved 
              profitability for farming operations worldwide.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the experts behind AgriSmart's innovative solutions
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Agricultural Scientist",
                description: "PhD in Soil Science with 15+ years in precision agriculture"
              },
              {
                name: "Michael Chen",
                role: "AI/ML Engineer",
                description: "Specialized in agricultural data analysis and machine learning"
              },
              {
                name: "Emily Rodriguez",
                role: "Sustainability Expert",
                description: "Environmental science background focused on sustainable farming"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">👨‍🔬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}