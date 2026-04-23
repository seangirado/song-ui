import React from 'react';
import { 
  FaHome, 
  FaFire, 
  FaMusic, 
  FaHistory, 
  FaTimes,
  FaHeart,
} from 'react-icons/fa';

const Sidebar = ({ open, onToggle }) => {
  const menuItems = [
    { icon: FaHome, label: 'Home' },
    { icon: FaFire, label: 'Trending' },
    { icon: FaMusic, label: 'Library' },
    { icon: FaHistory, label: 'History' },
    { icon: FaHeart, label: 'Liked' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gray-900 text-white h-screen overflow-y-auto border-r border-gray-800 transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-6 md:hidden border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onToggle} className="text-gray-400 hover:text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition group"
            >
              <item.icon className="text-gray-400 group-hover:text-blue-400 transition" size={20} />
              <span className="font-medium group-hover:text-blue-400 transition">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Playlists Section */}
        <div className="px-6 pb-6">
          <h3 className="text-gray-400 text-sm font-semibold uppercase mb-4 tracking-wider">Playlists</h3>
          <div className="space-y-2">
            {['Favorites', 'Recently Played', 'Workout Mix'].map(
              (playlist, index) => (
                <div
                  key={index}
                  className="px-4 py-2.5 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-400 hover:text-white transition text-sm"
                >
                  {playlist}
                </div>
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;