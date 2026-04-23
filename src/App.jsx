import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SongCard from './components/SongCard';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import { getSongs } from './services/songService';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch songs from API
  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const data = await getSongs();
        
        // Transform API data to match our format
        const transformedSongs = Array.isArray(data) 
          ? data.map((song, index) => ({
              id: song.id,
              title: song.title,
              artist: song.artist,
              album: song.album,
              genre: song.genre,
              url: extractYouTubeId(song.url),
              thumbnail: getYouTubeThumbnail(extractYouTubeId(song.url)),
              duration: '3:45',
              views: Math.floor(Math.random() * 5000) + 'K views',
              uploadDate: '2 months ago',
            }))
          : [];
        
        setSongs(transformedSongs);
        setFilteredSongs(transformedSongs);
      } catch (error) {
        console.error('Failed to load songs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (videoId) => {
    if (!videoId) return 'https://via.placeholder.com/300x200';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.album.toLowerCase().includes(query) ||
          song.genre.toLowerCase().includes(query)
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, songs]);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setCurrentIndex(songs.indexOf(song));
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleLike = (songId) => {
    const newLiked = new Set(liked);
    if (newLiked.has(songId)) {
      newLiked.delete(songId);
    } else {
      newLiked.add(songId);
    }
    setLiked(newLiked);
  };

  return (
    <div className="flex bg-gray-950 min-h-screen text-white">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto pb-40">
          <div className="w-full px-8 py-12">
            {/* Page Title */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-2">Music Videos</h1>
              <p className="text-gray-400 text-lg">
                {filteredSongs.length} {filteredSongs.length === 1 ? 'video' : 'videos'} available
              </p>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-blue-500"></div>
              </div>
            ) : filteredSongs.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-xl text-gray-400">No videos found</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for something else</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying && currentSong?.id === song.id}
                    isLiked={liked.has(song.id)}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onLike={handleLike}
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