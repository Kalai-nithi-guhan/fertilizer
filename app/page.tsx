import Link from 'next/link';

export default function HomePage() {
  return (
    // Ensure the main container takes full height and uses flex column
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">

      {/* Hero Section: Make it shrink to content, but still centered */}
      {/* Removed 'flex-grow' from here and added 'flex-none' to ensure it takes only the space it needs */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 to-green-600 py-8 flex flex-none items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative z-10">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl">
                  <span className="block">AI-Powered</span>
                  <span className="block text-green-200">Fertilizer Recommendations</span>
                </h1>
                <p className="mt-2 text-sm text-green-100 sm:mt-3 sm:text-base sm:max-w-xl sm:mx-auto lg:mx-0">
                  Transform your farming with intelligent soil analysis and personalized fertilizer recommendations.
                </p>
                <div className="mt-4 sm:mt-5 flex justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/analyzer"
                      className="flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-green-800 bg-white hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Start Analysis 🚀
                    </Link>
                  </div>
                  <div className="ml-2">
                    <Link
                      href="/about"
                      className="flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600 transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section: Allow it to grow and take remaining space, vertically centered */}
      {/* Added 'flex-grow' to ensure it expands and removed unnecessary py-6 to reduce top/bottom padding */}
      <div className="bg-white flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8"> {/* Added back some minimal vertical padding here */}
          <div className="lg:text-center">
            <h2 className="text-sm text-green-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Why Choose AgriSmart?
            </p>
          </div>

          <div className="mt-6">
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-6">
              {[
                {
                  icon: '🧪',
                  title: 'Smart Soil Analysis',
                  description: 'Advanced algorithms analyze your soil composition for optimal recommendations.'
                },
                {
                  icon: '🤖',
                  title: 'AI Technology',
                  description: 'Machine learning models trained on extensive agricultural data.'
                },
                {
                  icon: '📊',
                  title: 'Data-Driven Results',
                  description: 'Evidence-based recommendations backed by scientific research.'
                },
                {
                  icon: '👨‍🌾',
                  title: 'Expert Insights',
                  description: 'Recommendations validated by agricultural experts and researchers.'
                }
              ].map((feature, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">{feature.icon}</div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base leading-6 font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}