import React from 'react';
import { FaMusic, FaSearch, FaBars } from 'react-icons/fa';

const Header = ({ searchQuery, onSearchChange, onMenuToggle }) => {
  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-40 border-b border-gray-800">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between gap-6">
          {/* Menu Button */}
          <button
            onClick={onMenuToggle}
            className="text-gray-300 hover:text-white transition p-2"
          >
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FaMusic size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SoundWave</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos, artists..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-500"
              />
              <FaSearch className="absolute right-4 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* User Profile */}
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
            SG
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;