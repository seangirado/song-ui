import React from 'react';
import { FaHome, FaCompass, FaMusic, FaSignOutAlt, FaTimes } from 'react-icons/fa';

const navItems = [
  { icon: FaHome, label: 'Home', path: '#' },
  { icon: FaCompass, label: 'Explore', path: '#', active: true }, // active state
  { icon: FaMusic, label: 'Library', path: '#' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Background Dimmer for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm" 
          onClick={onClose}
        />
      )}

      {/* The Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform ${open ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-out bg-zinc-950 border-r border-zinc-900 flex flex-col p-6`}>
        
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-lg">
            <FaTimes size={18} />
        </button>

        {/* Header (re-added logo for proper sidebar weight) */}
        <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <FaMusic className="text-white" size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">SOUNDWAVE</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          {navItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold transition ${item.active ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <item.icon className={item.active ? 'text-blue-500' : 'text-zinc-600'} size={18}/>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold text-red-500 hover:bg-red-950 transition">
          <FaSignOutAlt className="text-red-700" size={18}/>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;