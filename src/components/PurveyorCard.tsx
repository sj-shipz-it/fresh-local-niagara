import { Purveyor } from '../types';
import { categories } from '../data/categories';
import StarRating from './StarRating';

interface PurveyorCardProps {
  purveyor: Purveyor;
  distance?: number | null;
  onClick: () => void;
}

/** Build a Google Maps search URL that opens the reviews tab */
function googleReviewsUrl(purveyor: Purveyor): string {
  if (purveyor.googleMapsUrl) return purveyor.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(purveyor.name + ' ' + purveyor.address)}`;
}

export default function PurveyorCard({ purveyor, distance, onClick }: PurveyorCardProps) {
  const category = categories.find((c) => c.id === purveyor.category);
  const categoryBg = category?.bgColor ?? '#EDF2EA';
  const categoryIcon = category?.icon ?? '🌿';

  return (
    <div
      className="text-left bg-white rounded-xl border border-brand-border-light overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-green/40 w-full"
    >
      {/* Category color header — opens detail modal */}
      <button
        onClick={onClick}
        className="w-full px-4 py-2.5 flex items-center gap-2 text-left"
        style={{ backgroundColor: categoryBg }}
        aria-label={`View details for ${purveyor.name}`}
      >
        <span className="text-lg" aria-hidden="true">{categoryIcon}</span>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: category?.color }}>
          {category?.label}
        </span>
        {purveyor.featured && (
          <span className="ml-auto text-xs font-medium text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </button>

      {/* Body — opens detail modal */}
      <button onClick={onClick} className="w-full text-left px-4 pt-3.5 pb-1 focus:outline-none">
        <h3 className="text-base font-bold text-brand-brown leading-snug">{purveyor.name}</h3>
        <p className="mt-1.5 text-sm text-brand-brown-secondary line-clamp-2 leading-relaxed">
          {purveyor.description}
        </p>
      </button>

      <div className="px-4 pb-3.5">
        {/* Google Reviews — clickable, opens Google Maps */}
        <a
          href={googleReviewsUrl(purveyor)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-1.5 group"
          aria-label={`View Google Reviews for ${purveyor.name}`}
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="" className="w-3.5 h-3.5" />
          <StarRating rating={purveyor.rating} />
          <span className="text-sm font-semibold text-brand-orange">{purveyor.rating}</span>
          <span className="text-xs text-brand-brown-light group-hover:text-brand-green transition-colors">
            ({purveyor.reviewCount} Google {purveyor.reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </a>

        {/* City + Distance */}
        <div className="mt-2.5 flex items-center gap-2 text-xs text-brand-brown-light">
          <svg className="w-3.5 h-3.5 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{purveyor.city}</span>
          {distance != null && (
            <>
              <span className="text-brand-border">·</span>
              <span className="font-medium text-brand-green">{distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)} km`}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {purveyor.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-medium bg-brand-green/10 text-brand-green"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
