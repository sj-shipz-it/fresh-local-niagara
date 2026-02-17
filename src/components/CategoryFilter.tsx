import { categories } from '../data/categories';
import { CategoryId } from '../types';

interface CategoryFilterProps {
  selected: CategoryId;
  onChange: (id: CategoryId) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 px-1" role="tablist" aria-label="Filter by category">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
              isActive
                ? 'bg-brand-green text-white border-brand-green shadow-sm'
                : 'bg-white text-brand-brown-secondary border-brand-border hover:border-brand-green/40 hover:bg-brand-cream'
            }`}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
