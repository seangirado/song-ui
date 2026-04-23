import React from 'react';
import { FaPlay, FaEllipsisV, FaCheckCircle } from 'react-icons/fa';

const SongCard = ({ song, onPlay, isActive }) => {
  return (
    <div 
      className={`group flex items-center gap-5 p-3 rounded-xl transition-all cursor-pointer ${
        isActive ? 'bg-zinc-800' : 'hover:bg-zinc-900/60'
      }`}
      onClick={onPlay}
    >
      <div className="relative flex-shrink-0 w-44 h-28 sm:w-56 sm:h-32 rounded-xl overflow-hidden bg-zinc-900">
        <img 
          src={song.thumbnail} 
          className="w-full h-full object-cover" 
          alt="" 
          onError={(e) => {
            // Fallback image kung hindi mag-load ang YouTube thumb
            e.target.src = `https://i.ytimg.com/vi/${song.youtubeId}/mqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FaPlay className="text-white" size={24} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-lg font-bold line-clamp-2 leading-tight ${isActive ? 'text-blue-400' : 'text-white'}`}>
          {song.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
          <p className="text-sm font-medium truncate">{song.artist}</p>
          <FaCheckCircle size={12} />
        </div>
        <p className="text-xs text-zinc-500 mt-1">YouTube Video</p>
      </div>

      <button className="p-2 text-zinc-500 hover:text-white transition-opacity">
        <FaEllipsisV />
      </button>
    </div>
  );
};

export default SongCard;