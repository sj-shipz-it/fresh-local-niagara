import { cities } from '../data/categories';

interface CityFilterProps {
  selected: string;
  onChange: (city: string) => void;
}

export default function CityFilter({ selected, onChange }: CityFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 px-1" role="tablist" aria-label="Filter by area">
      {cities.map((city) => {
        const isActive = selected === city;
        return (
          <button
            key={city}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(city)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
              isActive
                ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                : 'bg-white text-brand-brown-light border-brand-border hover:border-brand-blue/40 hover:bg-blue-50'
            }`}
          >
            {city}
          </button>
        );
      })}
    </div>
  );
}
