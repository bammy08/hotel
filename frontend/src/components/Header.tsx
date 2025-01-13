import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { FiMenu } from 'react-icons/fi'; // Importing the FiMenu icon
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#003366] py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>

        {/* Desktop/Tablet links */}
        <div className="hidden md:flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-800 rounded px-3 py-2 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (FiMenu Icon) */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <FiMenu size={30} /> {/* Using the FiMenu icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditional Render based on isMenuOpen) */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#003366] text-white py-4 space-y-4">
          {isLoggedIn ? (
            <>
              <Link
                className="block text-center px-3 py-2 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="block text-center px-3 py-2 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <div className="text-center">
                <SignOutButton />
              </div>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="block text-center px-3 py-2 bg-white text-blue-800 rounded font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
