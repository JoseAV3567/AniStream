import React, { useState, useEffect } from "react";

// --- CSS DE ANIMACIÓN (Sin cambios) ---
const LogoAnimationStyle = `
  .logo-container.animate .logo-svg {
    animation: spin-and-sparkle 1.5s ease-in-out;
  }
  @keyframes spin-and-sparkle {
    0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7)); }
    50% { transform: rotate(180deg) scale(1.15); filter: drop-shadow(0 0 10px rgba(192, 132, 252, 1)) drop-shadow(0 0 20px rgba(192, 132, 252, 0.7)); }
    100% { transform: rotate(360deg) scale(1); filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7)); }
  }
`;

const pages = ["Inicio", "Animes"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />{" "}
  </svg>
);
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />{" "}
  </svg>
);

function ResponsiveAppBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimateLogo(true);
      setTimeout(() => {
        setAnimateLogo(false);
      }, 1500);
    }, 7000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const slug = encodeURIComponent(searchQuery.trim());
      window.location.href = `/anime/buscar/${slug}`;
    }
  };

  return (
    <>
      <style>{LogoAnimationStyle}</style>
      <nav className="bg-[#0c0c16]/80 backdrop-blur-sm shadow-lg sticky top-0 z-[101]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className={`text-white hidden md:flex items-center mr-6 no-underline logo-container ${
                  animateLogo ? "animate" : ""
                }`}
              >
                {/* ✨ CAMBIO: Clases para hacerlo un círculo perfecto */}
                <img
                  src="/Anistream.png"
                  alt="Anistream Logo"
                  className="h-10 w-10 rounded-full object-cover logo-svg"
                />
              </a>
              <div className="hidden md:flex space-x-4">
                {pages.map((page) => (
                  <a
                    key={page}
                    href={page === "Animes" ? "/anime/directorio" : "/"}
                    className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-semibold normal-case no-underline transition-colors duration-300"
                  >
                    {" "}
                    {page}{" "}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center md:hidden">
              <a
                href="/"
                className={`text-white flex items-center no-underline logo-container ${
                  animateLogo ? "animate" : ""
                }`}
              >
                {/* ✨ CAMBIO: Clases para hacerlo un círculo perfecto */}
                <img
                  src="/Anistream.png"
                  alt="Anistream Logo"
                  className="h-10 w-10 rounded-full object-cover logo-svg"
                />
              </a>
            </div>

            <div className="flex items-center">
              <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center mr-4"
              >
                <div className="relative text-gray-400 focus-within:text-purple-500">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {" "}
                    <SearchIcon />{" "}
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm sm:leading-6 transition-all duration-300"
                    placeholder="Buscar anime..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform duration-200 hover:scale-110"
                    title="Abrir menú de usuario"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://placehold.co/32x32/7c3aed/ffffff?text=U"
                      alt="User avatar"
                    />
                  </button>
                </div>
                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out ${
                    isUserMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {settings.map((setting) => (
                    <a
                      key={setting}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {" "}
                      {setting}{" "}
                    </a>
                  ))}
                </div>
              </div>
              <div className="ml-4 -mr-2 flex md:hidden">
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform duration-200 hover:scale-110"
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isNavOpen ? "max-h-96" : "max-h-0"
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {pages.map((page) => (
              <a
                key={page}
                href={page === "Animes" ? "/anime/buscar" : "#"}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white no-underline transition-colors duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                {" "}
                {page}{" "}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default ResponsiveAppBar;
