import { NavLink } from 'react-router-dom';
import { Languages, HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-[70px] bg-white shadow-sm flex items-center">
      <div className="container mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-extrabold text-primary-blue tracking-tight select-none cursor-default">
            TourAid
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-2 font-medium transition-colors duration-200 ${isActive ? 'text-primary-blue after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-primary-blue after:rounded-full' : 'text-gray-500 hover:text-primary-blue'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/find-doctor"
            className={({ isActive }) =>
              `relative py-2 font-medium transition-colors duration-200 ${isActive ? 'text-primary-blue after:absolute after:bottom-[-2px] after:left-0 after:w-full after:height-[2px] after:bg-primary-blue after:rounded-full' : 'text-gray-500 hover:text-primary-blue'
              }`
            }
          >
            Find a Doctor
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              `relative py-2 font-medium transition-colors duration-200 ${isActive ? 'text-primary-blue after:absolute after:bottom-[-2px] after:left-0 after:w-full after:height-[2px] after:bg-primary-blue after:rounded-full' : 'text-gray-500 hover:text-primary-blue'
              }`
            }
          >
            Emergency
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-2 font-medium transition-colors duration-200 ${isActive ? 'text-primary-blue after:absolute after:bottom-[-2px] after:left-0 after:w-full after:height-[2px] after:bg-primary-blue after:rounded-full' : 'text-gray-500 hover:text-primary-blue'
              }`
            }
          >
            About
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary-blue transition-all" aria-label="Language">
            <Languages size={20} />
          </button>
          <button className="bg-primary-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:bg-primary-hover hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center gap-2">
            <HelpCircle size={18} />
            Help & Support
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
