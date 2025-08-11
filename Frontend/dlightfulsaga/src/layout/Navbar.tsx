import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getInitial = (name: string) => name?.charAt(0).toUpperCase();

  const mobileMenuClass = `
    ${isMenuOpen ? "flex" : "hidden"} 
    flex-col items-start 
    absolute top-full left-0 w-full md:w-auto
    bg-emerald-900 !p-3 
    z-10 
    md:flex md:static md:flex-row md:items-center md:justify-end 
    gap-6 font-[--font-sans]
  `.trim();

  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "!text-[var(--color-gold)] !font-semibold"
      : "hover:!text-[var(--color-gold)]";

  return (
    <nav className="relative bg-emerald-900 !px-3 !my-3 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-2xl !text-[var(--color-gold)] !font-['Playfair_Display'] grow"
      >
        Dlightful Saga
      </Link>

      {/* Profile + Hamburger (right for desktop, grouped on mobile) */}
      <div className="flex items-center gap-3 md:order-last">
        {user ? (
          <div className="relative">
            <button
              ref={triggerRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 !rounded-full !bg-rose-600/80 !text-white !font-bold"
            >
              {getInitial(user.name)}
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 !mt-2 w-40 bg-emerald-800 !rounded !shadow-md !z-50"
              >
                <NavLink
                  to="/orders"
                  className="block !px-4 !py-2 !text-sm !text-white hover:!text-[var(--color-gold)]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Orders
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left !px-4 !py-2 !text-sm !text-white hover:!text-[var(--color-gold)]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            
          </>
        )}

        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="!text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu links */}
      <ul className={`${mobileMenuClass}`}>
        <li>
          <NavLink to="/" className={activeLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={activeLinkClass}>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={activeLinkClass}>
            Cart
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/login" className={activeLinkClass}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
