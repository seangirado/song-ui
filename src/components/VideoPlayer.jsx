import React from 'react';
import YouTube from 'react-youtube';
import { FaTimes, FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart } from 'react-icons/fa';

const VideoPlayer = ({ song, isPlaying, onPlayPause, onClose, onNext, onPrev }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modalPop">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-zinc-950 w-full max-w-5xl rounded-[3rem] overflow-hidden border border-white/10 flex flex-col shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-zinc-800 hover:bg-red-600 p-4 rounded-full transition-all"
        >
          <FaTimes size={18} />
        </button>

        {/* Video Area */}
        <div className="w-full aspect-video bg-black">
          <YouTube 
            videoId={song.youtubeId} 
            opts={opts} 
            onEnd={onNext} 
            className="w-full h-full" 
          />
        </div>

        {/* Player Controls Bar */}
        <div className="p-8 bg-zinc-900/80 border-t border-white/5">
          <div className="flex items-center justify-between gap-10">
            
            {/* Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img src={song.thumbnail} className="w-16 h-16 rounded-2xl object-cover" alt="" />
              <div className="truncate">
                <h4 className="text-xl font-bold truncate">{song.title}</h4>
                <p className="text-zinc-400">{song.artist}</p>
              </div>
            </div>

            {}
            <div className="flex items-center gap-8">
              <button 
                onClick={onPrev} 
                className="text-zinc-400 hover:text-white transition transform active:scale-90"
              >
                <FaStepBackward size={24} />
              </button>

              <button 
                onClick={onPlayPause}
                className="bg-white text-black p-6 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-xl"
              >
                {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} className="ml-1" />}
              </button>

              <button 
                onClick={onNext} 
                className="text-zinc-400 hover:text-white transition transform active:scale-90"
              >
                <FaStepForward size={24} />
              </button>
            </div>

            {/* Placeholder for balance */}
            <div className="flex-1 hidden md:flex justify-end">
               <button className="text-zinc-600 hover:text-red-500 transition">
                 <FaHeart size={22} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;