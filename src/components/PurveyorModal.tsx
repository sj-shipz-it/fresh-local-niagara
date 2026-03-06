import { useState, useEffect, useCallback } from 'react';
import { Purveyor, LocalComment, ListingImprovement } from '../types';
import { categories } from '../data/categories';
import { getCommentsForPurveyor, saveComment, saveImprovement } from '../utils/storage';
import StarRating from './StarRating';

interface PurveyorModalProps {
  purveyor: Purveyor;
  onClose: () => void;
}

/** Build a Google Maps search URL */
function googleReviewsUrl(purveyor: Purveyor): string {
  if (purveyor.googleMapsUrl) return purveyor.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(purveyor.name + ' ' + purveyor.address)}`;
}

export default function PurveyorModal({ purveyor, onClose }: PurveyorModalProps) {
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Improve listing state
  const [showImproveForm, setShowImproveForm] = useState(false);
  const [improveName, setImproveName] = useState('');
  const [improveField, setImproveField] = useState('address');
  const [improveValue, setImproveValue] = useState('');
  const [improveSent, setImproveSent] = useState(false);


  const category = categories.find((c) => c.id === purveyor.category);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(purveyor.address)}`;

  useEffect(() => {
    setComments(getCommentsForPurveyor(purveyor.id));
  }, [purveyor.id]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const fieldLabels: Record<string, string> = {
    address: purveyor.address,
    phone: purveyor.phone,
    website: purveyor.website,
    hours: purveyor.hours,
    name: purveyor.name,
    other: '',
  };

  const handleSubmitImprovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!improveName.trim() || !improveValue.trim()) return;
    const improvement: ListingImprovement = {
      purveyorId: purveyor.id,
      purveyorName: purveyor.name,
      field: improveField,
      currentValue: fieldLabels[improveField] ?? '',
      suggestedValue: improveValue.trim(),
      submitterName: improveName.trim(),
      date: new Date().toISOString(),
    };
    saveImprovement(improvement);
    setImproveSent(true);
    setShowImproveForm(false);
    setImproveName('');
    setImproveValue('');
    setImproveField('address');
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: LocalComment = {
      purveyorId: purveyor.id,
      comment: commentText.trim(),
      date: new Date().toISOString(),
      name: commentName.trim(),
    };

    saveComment(newComment);
    setComments((prev) => [...prev, newComment]);
    setCommentName('');
    setCommentText('');
    setShowCommentForm(false);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={purveyor.name}
    >
      <div className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Category header */}
        <div
          className="px-6 py-4 flex items-center gap-3 rounded-t-2xl"
          style={{ backgroundColor: category?.bgColor }}
        >
          <span className="text-3xl" aria-hidden="true">{category?.icon}</span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: category?.color }}>
              {category?.label}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-brown">{purveyor.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-brand-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Google Reviews — clickable */}
          <a
            href={googleReviewsUrl(purveyor)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="" className="w-5 h-5" />
            <StarRating rating={purveyor.rating} size="md" />
            <span className="text-lg font-bold text-brand-orange">{purveyor.rating}</span>
            <span className="text-sm text-brand-brown-light group-hover:text-brand-green transition-colors">
              ({purveyor.reviewCount} Google {purveyor.reviewCount === 1 ? 'review' : 'reviews'})
            </span>
            <svg className="w-3.5 h-3.5 text-brand-brown-light group-hover:text-brand-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Description */}
          <p className="text-brand-brown-secondary leading-relaxed">{purveyor.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {purveyor.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full font-medium bg-brand-green/10 text-brand-green"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contact info */}
          <div className="bg-brand-cream rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wide">Contact & Details</h3>

            <InfoRow icon="location" label={purveyor.address} />
            <InfoRow icon="phone" label={purveyor.phone} />
            <InfoRow icon="clock" label={purveyor.hours} />

            {purveyor.website && (
              <div className="flex items-start gap-2.5 text-sm">
                <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <a
                  href={purveyor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:underline break-all"
                >
                  {purveyor.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </div>
            )}
          </div>

          {/* Get Directions */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green text-white rounded-lg text-sm font-semibold hover:bg-brand-green-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>

          {/* View on Google Maps link */}
          <a
            href={googleReviewsUrl(purveyor)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 ml-3 px-5 py-2.5 bg-white text-brand-brown-secondary border border-brand-border rounded-lg text-sm font-semibold hover:bg-brand-cream transition-colors"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="" className="w-4 h-4" />
            View Google Reviews
          </a>

          {/* ─── Improve This Listing (unverified only) ─── */}
          {purveyor.verified === false && (
            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-800">Listing details unverified</p>
                  <p className="text-xs text-amber-700 mt-0.5">Some contact details for this listing haven't been fully verified. Know something that's out of date?</p>
                  {improveSent && (
                    <p className="mt-2 text-xs font-medium text-brand-green">Thanks! Your suggestion has been saved for review.</p>
                  )}
                  {!improveSent && !showImproveForm && (
                    <button
                      onClick={() => setShowImproveForm(true)}
                      className="mt-2 text-xs font-semibold text-amber-800 underline underline-offset-2 hover:text-amber-900 transition-colors"
                    >
                      Suggest a correction →
                    </button>
                  )}
                  {showImproveForm && (
                    <form onSubmit={handleSubmitImprovement} className="mt-3 space-y-2.5">
                      <div>
                        <label className="block text-xs font-medium text-amber-800 mb-1">Your name</label>
                        <input
                          type="text"
                          value={improveName}
                          onChange={(e) => setImproveName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-amber-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-amber-800 mb-1">What needs correcting?</label>
                        <select
                          value={improveField}
                          onChange={(e) => setImproveField(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-amber-300"
                        >
                          <option value="address">Address</option>
                          <option value="phone">Phone number</option>
                          <option value="website">Website</option>
                          <option value="hours">Hours</option>
                          <option value="name">Business name</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-amber-800 mb-1">Correct information</label>
                        <input
                          type="text"
                          value={improveValue}
                          onChange={(e) => setImproveValue(e.target.value)}
                          placeholder="Enter the correct value..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-sm text-brand-brown placeholder:text-brand-brown-light/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowImproveForm(false)}
                          className="px-3 py-1.5 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── Local Commentary ─── */}
          <div className="border-t border-brand-border pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wide">Local Commentary</h3>
                <p className="text-xs text-brand-brown-light mt-0.5">Tips, recommendations & insider knowledge</p>
              </div>
              {!showCommentForm && (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="text-sm font-medium text-brand-green hover:text-brand-green-secondary transition-colors"
                >
                  + Share a Tip
                </button>
              )}
            </div>

            {/* Existing local comments */}
            {comments.length > 0 && (
              <div className="mt-3 space-y-3">
                {comments.map((c, i) => (
                  <div key={i} className="bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-brand-brown">{c.name}</span>
                      <span className="text-xs text-brand-brown-light">
                        {new Date(c.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-brand-brown-secondary italic">"{c.comment}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment form */}
            {showCommentForm && (
              <form onSubmit={handleSubmitComment} className="mt-3 bg-brand-green/5 border border-brand-green/15 rounded-xl p-4 space-y-3">
                <p className="text-xs text-brand-brown-light">Share a tip or recommendation — e.g. "You have to try the Apple Cider. You'll thank me later."</p>
                <div>
                  <label htmlFor="comment-name" className="block text-xs font-medium text-brand-brown-secondary mb-1">
                    Your name
                  </label>
                  <input
                    id="comment-name"
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="comment-text" className="block text-xs font-medium text-brand-brown-secondary mb-1">
                    Your tip or comment
                  </label>
                  <textarea
                    id="comment-text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    placeholder="What should people know about this place?"
                    className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-sm text-brand-brown placeholder:text-brand-brown-light/50 focus:outline-none focus:ring-2 focus:ring-brand-green/30 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-green text-white text-sm font-semibold rounded-lg hover:bg-brand-green-secondary transition-colors"
                  >
                    Post Tip
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="px-4 py-2 text-sm font-medium text-brand-brown-light hover:text-brand-brown transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {comments.length === 0 && !showCommentForm && (
              <p className="mt-2 text-sm text-brand-brown-light">No tips yet. Be the first to share!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label }: { icon: string; label: string }) {
  const icons: Record<string, React.ReactNode> = {
    location: (
      <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    clock: (
      <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-start gap-2.5 text-sm text-brand-brown-secondary">
      {icons[icon]}
      <span>{label}</span>
    </div>
  );
}
