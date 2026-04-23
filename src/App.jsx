import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SongCard from './components/SongCard';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import { getSongs } from './services/songService';
import './App.css';

const extractYouTubeId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[7].length === 11) ? match[7] : '';
};

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const data = await getSongs();
        const songList = Array.isArray(data) ? data : (data.songs || []);
        
        const transformed = songList.map(s => {
          const ytId = extractYouTubeId(s.url);
          return {
            ...s,
            youtubeId: ytId,
            thumbnail: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`
          };
        });

        setSongs(transformed);
        setFilteredSongs(transformed);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  useEffect(() => {
    setFilteredSongs(songs.filter(s => 
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [searchQuery, songs]);

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setCurrentSong(filteredSongs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentIndex = filteredSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentSong(filteredSongs[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="flex h-screen bg-[#030303] text-white overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="p-6 lg:p-10 pb-32">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-black mb-8 tracking-tighter">Recommended</h2>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin h-8 w-8 border-2 border-white/20 border-t-white rounded-full"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredSongs.map(song => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isActive={currentSong?.id === song.id}
                    onPlay={() => { setCurrentSong(song); setIsPlaying(true); }} 
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {currentSong && (
          <VideoPlayer 
            song={currentSong} 
            isPlaying={isPlaying} 
            onClose={() => setCurrentSong(null)} 
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}

export default App;