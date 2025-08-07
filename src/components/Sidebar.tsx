import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart, Music, ChevronDown, ChevronRight } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { playlists, createPlaylist, playPlaylist } = useMusic();
  const { user, logout } = useAuth();

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim(), 'Created by user');
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  };

  return (
    <div className={`bg-black h-full transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} border-r border-gray-800 flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-green-500" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-white">SpotifyClone</span>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-800 rounded-md transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-white bg-gray-800/50 rounded-md hover:bg-gray-800 transition-colors">
            <Home className="w-5 h-5" />
            {!isCollapsed && <span>Home</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
            <Search className="w-5 h-5" />
            {!isCollapsed && <span>Search</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
            <Library className="w-5 h-5" />
            {!isCollapsed && <span>Your Library</span>}
          </a>
        </div>

        {!isCollapsed && (
          <div className="pt-4 space-y-1">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-400 text-sm font-medium">PLAYLISTS</span>
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="p-1 hover:bg-gray-800 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>

            {showCreatePlaylist && (
              <form onSubmit={handleCreatePlaylist} className="px-3 py-2">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist name"
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                  autoFocus
                  onBlur={() => {
                    if (!newPlaylistName.trim()) {
                      setShowCreatePlaylist(false);
                    }
                  }}
                />
              </form>
            )}

            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              <Heart className="w-5 h-5" />
              <span>Liked Songs</span>
            </a>

            <div className="space-y-1 max-h-60 overflow-y-auto">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => playPlaylist(playlist)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-left"
                >
                  <div className="w-5 h-5 bg-gray-700 rounded flex-shrink-0"></div>
                  <span className="truncate">{playlist.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=100'}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.username}</p>
              <button
                onClick={logout}
                className="text-gray-400 text-xs hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}