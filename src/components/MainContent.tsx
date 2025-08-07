import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

// Mock data for featured content
const featuredPlaylists = [
  {
    id: '1',
    title: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
  },
  {
    id: '2',
    title: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits.',
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?w=400',
  },
  {
    id: '3',
    title: 'Pop Rising',
    description: 'The biggest songs in pop right now',
    coverUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?w=400',
  },
  {
    id: '4',
    title: 'RapCaviar',
    description: 'New music from Drake, Travis Scott, and more',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=400',
  },
];

const recentlyPlayedTracks = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
    audioUrl: '',
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?w=400',
    audioUrl: '',
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?w=400',
    audioUrl: '',
    genre: 'Pop'
  },
];

export function MainContent() {
  const { play, currentTrack, isPlaying, addToFavorites, favoritesTracks, playPlaylist, playlists, allTracks } = useMusic();
  const [currentSection, setCurrentSection] = useState<'home' | 'search' | 'library'>('home');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTrackFavorite = (trackId: string) => {
    return favoritesTracks.some(track => track.id === trackId);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentSection('home')}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentSection === 'home' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentSection('search')}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentSection === 'search' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setCurrentSection('library')}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentSection === 'library' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              Your Library
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-8">
        {currentSection === 'home' && (
          <>
            {/* Welcome */}
            <section>
              <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.slice(0, 6).map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist)}
                    className="flex items-center bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group"
                  >
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-16 h-16 rounded-l-lg object-cover"
                    />
                    <div className="flex-1 px-4">
                      <p className="text-white font-medium">{playlist.name}</p>
                    </div>
                    <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          playPlaylist(playlist);
                        }}
                        className="w-10 h-10 bg-green-500 hover:bg-green-400 text-black rounded-full flex items-center justify-center transition-colors"
                      >
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recently Played */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allTracks.slice(0, 10).map((track) => (
                  <div
                    key={track.id}
                    className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 transition-colors cursor-pointer group"
                  >
                    <div className="relative mb-4">
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => play(track)}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 hover:bg-green-400 text-black rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-4 h-4" fill="currentColor" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        )}
                      </button>
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">{track.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Made for You */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Made for You</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist)}
                    className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 transition-colors cursor-pointer group"
                  >
                    <div className="relative mb-4">
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          playPlaylist(playlist);
                        }}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 hover:bg-green-400 text-black rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      >
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentSection === 'search' && (
          <section>
            <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
            <div className="max-w-md mb-8">
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Browse All</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {['Pop', 'Hip Hop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B'].map((genre, index) => (
                    <div
                      key={genre}
                      className={`aspect-square rounded-lg p-4 cursor-pointer transition-transform hover:scale-105`}
                      style={{
                        background: `linear-gradient(135deg, ${
                          ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98fb98', '#f4a261'][index % 8]
                        }, ${
                          ['#ff4757', '#00d2d3', '#3742fa', '#2ed573', '#ffa502', '#c44569', '#7bed9f', '#ff6348'][index % 8]
                        })`
                      }}
                    >
                      <h3 className="text-white font-bold text-lg">{genre}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'library' && (
          <section>
            <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
            
            {/* Playlists */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Your Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist)}
                    className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 transition-colors cursor-pointer group"
                  >
                    <div className="relative mb-4">
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          playPlaylist(playlist);
                        }}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 hover:bg-green-400 text-black rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      >
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                    <h3 className="text-white font-medium mb-1 truncate">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{playlist.tracks.length} songs</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recently Played Tracks Table */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">TITLE</div>
                  <div className="col-span-3">ALBUM</div>
                  <div className="col-span-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="col-span-1"></div>
                </div>
                {allTracks.slice(0, 15).map((track, index) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-12 gap-4 px-4 py-2 hover:bg-gray-800/50 rounded-md group cursor-pointer"
                    onClick={() => play(track)}
                  >
                    <div className="col-span-1 flex items-center">
                      <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                      <button className="hidden group-hover:block text-white">
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-4 h-4" fill="currentColor" />
                        ) : (
                          <Play className="w-4 h-4" fill="currentColor" />
                        )}
                      </button>
                    </div>
                    <div className="col-span-6 flex items-center space-x-3">
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{track.title}</p>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-gray-400 text-sm truncate">{track.album}</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToFavorites(track);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className={`w-4 h-4 ${isTrackFavorite(track.id) ? 'text-green-500 fill-current' : 'text-gray-400 hover:text-white'}`} />
                      </button>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{formatDuration(track.duration)}</span>
                      <button className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity">
                        <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}