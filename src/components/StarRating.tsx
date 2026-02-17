interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, size = 'sm' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <span className={`inline-flex gap-0.5 ${sizeClasses[size]}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className={filled || half ? 'star-filled' : 'star-empty'}>
            {filled ? '★' : half ? '★' : '☆'}
          </span>
        );
      })}
    </span>
  );
}
