import { useState, useMemo } from 'react';
import { CategoryId, SortOption, Purveyor } from './types';
import { purveyors } from './data/purveyors';
import { categories, cities } from './data/categories';
import { haversineDistance } from './utils/distance';
import { useGeolocation } from './hooks/useGeolocation';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import CityFilter from './components/CityFilter';
import SortBar from './components/SortBar';
import LocationButton from './components/LocationButton';
import PurveyorCard from './components/PurveyorCard';
import PurveyorModal from './components/PurveyorModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedCity, setSelectedCity] = useState('All Areas');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedPurveyor, setSelectedPurveyor] = useState<Purveyor | null>(null);

  const { location, loading: locationLoading, error: locationError, requestLocation, clearLocation } = useGeolocation();
  const locationEnabled = location !== null;

  // Calculate distances when location is available
  const distanceMap = useMemo(() => {
    if (!location) return new Map<number, number>();
    const map = new Map<number, number>();
    purveyors.forEach((p) => {
      map.set(p.id, haversineDistance(location.lat, location.lng, p.lat, p.lng));
    });
    return map;
  }, [location]);

  // Unique area count (excluding "All Areas")
  const totalAreas = cities.length - 1;
  // Category count (excluding "All")
  const totalCategories = categories.length - 1;

  // Filter and sort purveyors
  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    let results = purveyors.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // City filter
      if (selectedCity !== 'All Areas' && p.city !== selectedCity) return false;

      // Search query
      if (query) {
        const searchableText = [
          p.name,
          p.description,
          p.city,
          p.address,
          ...p.tags,
        ]
          .join(' ')
          .toLowerCase();
        return searchableText.includes(query);
      }

      return true;
    });

    // Sort
    results = [...results].sort((a, b) => {
      switch (sortOption) {
        case 'featured':
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.rating - a.rating;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance': {
          const distA = distanceMap.get(a.id) ?? Infinity;
          const distB = distanceMap.get(b.id) ?? Infinity;
          return distA - distB;
        }
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedCategory, selectedCity, sortOption, distanceMap]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        <Hero
          totalPurveyors={purveyors.length}
          totalCategories={totalCategories}
          totalAreas={totalAreas}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" id="directory">
          {/* Filters section */}
          <div className="space-y-4" id="categories">
            {/* Category filter */}
            <div>
              <h2 className="text-xs font-semibold text-brand-brown-light uppercase tracking-wider mb-2">
                Category
              </h2>
              <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
            </div>

            {/* City filter */}
            <div>
              <h2 className="text-xs font-semibold text-brand-brown-light uppercase tracking-wider mb-2">
                Area
              </h2>
              <CityFilter selected={selectedCity} onChange={setSelectedCity} />
            </div>

            {/* Sort bar + location */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <SortBar
                selected={sortOption}
                onChange={setSortOption}
                locationEnabled={locationEnabled}
                resultCount={filtered.length}
              />
              <LocationButton
                locationEnabled={locationEnabled}
                loading={locationLoading}
                error={locationError}
                onRequest={requestLocation}
                onClear={clearLocation}
              />
            </div>
          </div>

          {/* Grid of purveyor cards */}
          {filtered.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((p) => (
                <PurveyorCard
                  key={p.id}
                  purveyor={p}
                  distance={distanceMap.get(p.id) ?? null}
                  onClick={() => setSelectedPurveyor(p)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-brand-brown">No purveyors found</h3>
              <p className="text-sm text-brand-brown-light mt-1">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCity('All Areas');
                }}
                className="mt-4 text-sm font-medium text-brand-green hover:text-brand-green-secondary transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Detail modal */}
      {selectedPurveyor && (
        <PurveyorModal
          purveyor={selectedPurveyor}
          onClose={() => setSelectedPurveyor(null)}
        />
      )}
    </div>
  );
}
