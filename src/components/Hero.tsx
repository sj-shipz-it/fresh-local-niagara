interface HeroProps {
  totalPurveyors: number;
  totalCategories: number;
  totalAreas: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({
  totalPurveyors,
  totalCategories,
  totalAreas,
  searchQuery,
  onSearchChange,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/80 via-brand-green/70 to-brand-brown/80" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center pb-10 pt-12 sm:pt-16 sm:pb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
          Discover Local Food <br className="hidden sm:block" />
          Across Niagara
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
          Your guide to farm stands, butchers, bakeries, cheese makers, orchards, and specialty
          food producers throughout the Niagara Region.
        </p>

        {/* Stats cards */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto">
          <StatCard value={totalPurveyors} label="Purveyors" />
          <StatCard value={totalCategories} label="Categories" />
          <StatCard value={totalAreas} label="Areas" />
        </div>

        {/* Search bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <label htmlFor="hero-search" className="sr-only">
            Search purveyors
          </label>
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-brown-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="hero-search"
              type="text"
              placeholder="Search by name, category, or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border-0 bg-white/95 backdrop-blur-sm text-brand-brown placeholder:text-brand-brown-light/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown-light hover:text-brand-brown transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
      <div className="text-2xl sm:text-3xl font-bold text-brand-green">{value}</div>
      <div className="text-xs sm:text-sm text-brand-brown-secondary mt-0.5">{label}</div>
    </div>
  );
}
