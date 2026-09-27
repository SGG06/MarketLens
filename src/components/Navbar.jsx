function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            MarketLens
          </h1>

          <p className="text-xs text-gray-500">
            Personal Portfolio Analytics
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Portfolio Dashboard
        </div>
      </div>
    </nav>
  );
}

export default Navbar;