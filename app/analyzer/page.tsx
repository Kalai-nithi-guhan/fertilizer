// app/analyser/page.tsx
import FertilizerCalculator from '../components/FertilizerCalculator'; // Adjusted path
import CropGrowthMonitor from '../components/CropGrowthMonitor';     // Adjusted path

export default function AnalyserPage() {
  return (
    // min-h-screen to ensure it takes full viewport height
    // py-8 for some vertical padding, but kept moderate
    // flex and items-center to vertically center content if space allows
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl"> {/* Max width for layout */}

        {/* Page Header - kept compact */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Smart Agriculture Analyzer
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Advanced tools for precision farming and crop management.
          </p>
        </div>
        
        {/* Main Content Area: Side-by-Side Layout */}
        {/* Adjusted gap and added h-full to children to ensure equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-180px)]"> {/* Adjusted height to account for header/footer and ensure non-scroll */}
          {/* Fertilizer Calculator (Left Half) */}
          <section className="flex flex-col h-full"> {/* Ensure section takes full height */}
            <FertilizerCalculator />
          </section>
          
          {/* Crop Growth Monitor (Right Half) */}
          <section className="flex flex-col h-full"> {/* Ensure section takes full height */}
            <CropGrowthMonitor />
          </section>
        </div>
      </div>
    </div>
  );
}