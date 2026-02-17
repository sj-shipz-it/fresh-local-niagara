export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-brand-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <a href="/" className="flex items-center shrink-0" aria-label="Fresh Local Niagara home">
            <img
              src="/FRESH-LOCAL-Niagara-Logo1.png"
              alt="Fresh Local Niagara"
              className="h-12 sm:h-14 w-auto"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
