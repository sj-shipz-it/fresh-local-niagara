import { SortOption } from '../types';

interface SortBarProps {
  selected: SortOption;
  onChange: (option: SortOption) => void;
  locationEnabled: boolean;
  resultCount: number;
}

const sortOptions: { value: SortOption; label: string; requiresLocation?: boolean }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Rating' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'distance', label: 'Distance', requiresLocation: true },
];

export default function SortBar({ selected, onChange, locationEnabled, resultCount }: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm text-brand-brown-light">
        Showing <span className="font-semibold text-brand-brown">{resultCount}</span>{' '}
        {resultCount === 1 ? 'purveyor' : 'purveyors'}
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-brand-brown-light whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={selected}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="text-sm border border-brand-border rounded-lg px-3 py-1.5 bg-white text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
        >
          {sortOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.requiresLocation && !locationEnabled}
            >
              {opt.label}
              {opt.requiresLocation && !locationEnabled ? ' (enable location)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
