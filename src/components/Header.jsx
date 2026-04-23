import React from 'react';
import { FaSearch, FaMicrophone, FaVideo, FaBell, FaBars } from 'react-icons/fa';

const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-[#0f0f0f] px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 cursor-pointer">
        </div>
      </div>

      <div className="flex-1 max-w-[720px] flex items-center gap-4 ml-10">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-zinc-800 rounded-l-full px-4 py-2 focus-within:border-blue-500 ml-4">

            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent w-full outline-none text-white placeholder-zinc-500"
            />
          </div>
          <button className="bg-zinc-800 border border-l-0 border-zinc-800 px-5 py-2.5 rounded-r-full hover:bg-zinc-700">
            <FaSearch className="text-white" size={18} />
          </button>
        </div>

      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-4">
      </div>
    </header>
  );
};

export default Header;