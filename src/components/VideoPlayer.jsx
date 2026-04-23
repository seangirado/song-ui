import React, { useState } from 'react';
import YouTube from 'react-youtube';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaExpandAlt,
  FaChevronDown,
  FaTimes,
} from 'react-icons/fa';

const VideoPlayer = ({ song, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [player, setPlayer] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event) => {
    // Handle player state changes if needed
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl hover:border-blue-500 transition group">
        <button
          onClick={() => setIsMinimized(false)}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 p-2 rounded z-50 transition"
        >
          <FaChevronDown size={16} className="text-white" />
        </button>
        <div className="w-72 h-44">
          <YouTube
            videoId={song.url}
            opts={{ height: '176', width: '288', playerVars: { autoplay: isPlaying ? 1 : 0 } }}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        </div>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gray-900 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">{song.title}</h2>
            <p className="text-gray-400 mt-1">{song.artist}</p>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="bg-red-600 hover:bg-red-700 p-3 rounded transition text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Video */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="w-full h-full">
            <YouTube
              videoId={song.url}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: isPlaying ? 1 : 0,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={onPlayerReady}
              onStateChange={onPlayerStateChange}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-900 border-t border-gray-800 p-8">
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-4">
              <span className="text-blue-400 font-semibold">Album:</span> {song.album} • 
              <span className="text-blue-400 font-semibold ml-4">Genre:</span> {song.genre}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 justify-center">
            <button
              onClick={onPrev}
              className="text-gray-400 hover:text-white transition p-2"
            >
              <FaStepBackward size={28} />
            </button>

            <button
              onClick={onPlayPause}
              className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition shadow-lg"
            >
              {isPlaying ? (
                <FaPause size={32} className="text-white" />
              ) : (
                <FaPlay size={32} className="text-white ml-1" />
              )}
            </button>

            <button
              onClick={onNext}
              className="text-gray-400 hover:text-white transition p-2"
            >
              <FaStepForward size={28} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white border-t border-gray-800 shadow-2xl z-40">
      {/* Video Player */}
      <div className="px-8 pt-4 pb-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <YouTube
            videoId={song.url}
            opts={{
              height: '280',
              width: '100%',
              playerVars: {
                autoplay: isPlaying ? 1 : 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
          
          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 p-3 rounded text-white transition z-30 shadow-lg"
          >
            <FaExpandAlt size={18} />
          </button>

          {/* Minimize button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-3 right-14 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 p-3 rounded text-white transition z-30"
          >
            <FaChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-4 flex items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={song.thumbnail}
            alt={song.title}
            className="w-16 h-16 rounded object-cover shadow-md"
          />
          <div className="min-w-0">
            <p className="font-bold text-white truncate">{song.title}</p>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            className="text-gray-400 hover:text-white transition p-2"
          >
            <FaStepBackward size={20} />
          </button>

          <button
            onClick={onPlayPause}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
          >
            {isPlaying ? (
              <FaPause size={22} className="text-white" />
            ) : (
              <FaPlay size={22} className="text-white ml-1" />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-gray-400 hover:text-white transition p-2"
          >
            <FaStepForward size={20} />
          </button>
        </div>

        {/* Genre Info */}
        <div className="text-right min-w-max hidden md:block">
          <p className="text-xs font-semibold text-blue-400">{song.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;