import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Languages, HelpCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopLinkClass = ({ isActive }) =>
    `relative py-2 font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary-blue after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-primary-blue after:rounded-full'
        : 'text-gray-500 hover:text-primary-blue'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `px-4 py-3 rounded-xl font-semibold transition-colors ${
      isActive
        ? 'bg-blue-50 text-primary-blue'
        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-blue'
    }`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/find-doctor', label: 'Find a Doctor' },
    { to: '/emergency', label: 'Emergency' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl font-extrabold text-primary-blue tracking-tight select-none cursor-default">
          TourAid
        </span>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={desktopLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary-blue transition-all"
            aria-label="Language"
          >
            <Languages size={20} />
          </button>
          <NavLink
            to="/help"
            className="bg-primary-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:bg-primary-hover hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center gap-2"
          >
            <HelpCircle size={18} />
            Help &amp; Support
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/help"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Help &amp; Support
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
