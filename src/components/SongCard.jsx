import React, { useState } from 'react';
import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';

const SongCard = ({ song, isPlaying, isLiked, onPlay, onPause, onLike }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group rounded-xl overflow-hidden bg-gray-800 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gray-700">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Video';
          }}
        />

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => (isPlaying ? onPause() : onPlay(song))}
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-5 transform transition duration-200 shadow-lg"
          >
            {isPlaying ? (
              <FaPause size={32} className="text-white" />
            ) : (
              <FaPlay size={32} className="text-white ml-1" />
            )}
          </button>
        </div>

        {/* Like Button */}
        <button
          onClick={() => onLike(song.id)}
          className={`absolute top-4 right-4 p-3 rounded-full transition duration-200 shadow-lg ${
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-gray-900 bg-opacity-60 text-gray-300 hover:bg-red-600 hover:text-white'
          }`}
        >
          {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>

        {/* Genre Badge */}
        <div className="absolute bottom-4 left-4 bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {song.genre}
        </div>
      </div>

      {/* Song Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition">
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 mb-1">{song.artist}</p>
        <p className="text-xs text-gray-500">{song.album}</p>
      </div>
    </div>
  );
};

export default SongCard;