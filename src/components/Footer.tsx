export default function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="shrink-0" aria-label="Fresh Local Niagara home">
            <img
              src="/FRESH-LOCAL-Niagara-Logo1.png"
              alt="Fresh Local Niagara"
              className="h-8 w-auto brightness-[10] opacity-90"
            />
          </a>

          <p className="text-sm text-white/80 text-center">
            Supporting local food across the Niagara Region &middot; &copy; 2025 Fresh Local Niagara
          </p>
        </div>
      </div>
    </footer>
  );
}
