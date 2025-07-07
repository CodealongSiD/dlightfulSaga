import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const mobileMenuClass = `
  ${isMenuOpen ? "flex" : "hidden"} 
  flex-col items-start 
  absolute top-full left-0 w-full md:w-auto
  bg-emerald-900 !p-3 
  z-10 
  md:flex md:static md:flex-row md:items-center md:justify-end 
  gap-6 font-[--font-sans]
`.trim();

  return (
    <nav className="relative bg-emerald-900 !px-3 !my-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl !text-[var(--color-gold)] !font-['Playfair_Display'] grow">
        Dlightful Saga
      </Link>

      <div className="md:hidden">
        <button  onClick={() => setIsMenuOpen(!isMenuOpen)} className="!text-white">
          ☰
        </button>
      </div>

      <ul className={`${mobileMenuClass}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ProductListPage">Books</Link></li>
        <li><Link to="/CheckoutPage">Cart</Link></li>
        <li><Link to="/LoginPage">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
