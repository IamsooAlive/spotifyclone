import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  Maximize2,
  List
} from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    next,
    previous,
    addToFavorites,
    removeFromFavorites,
    favoritesTracks,
    shuffleQueue,
    queue
  } = useMusic();

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [showQueue, setShowQueue] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Simulate progress for demo (in real app, this would be based on audio currentTime)
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / currentTrack.duration);
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    return currentTrack ? Math.floor((progress / 100) * currentTrack.duration) : 0;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, percent)));
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setVolume(Math.max(0, Math.min(100, percent)));
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    const newShuffled = !isShuffled;
    setIsShuffled(newShuffled);
    if (newShuffled) {
      shuffleQueue();
    }
  };

  const cycleRepeat = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const isTrackFavorite = (trackId: string) => {
    return favoritesTracks.some(track => track.id === trackId);
  };

  const toggleFavorite = () => {
    if (currentTrack) {
      if (isTrackFavorite(currentTrack.id)) {
        removeFromFavorites(currentTrack.id);
      } else {
        addToFavorites(currentTrack);
      }
    }
  };

  if (!currentTrack) {
    return (
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <p className="text-gray-400">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4 min-w-0">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
          <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isTrackFavorite(currentTrack.id)
                ? 'text-green-500 fill-current'
                : 'text-gray-400 hover:text-white'
            }`}
          />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center space-y-2 px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleShuffle}
            className={`p-1 transition-colors ${
              isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          
          <button
            onClick={previous}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" fill="currentColor" />
          </button>
          
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white hover:scale-110 text-black rounded-full flex items-center justify-center transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            )}
          </button>
          
          <button
            onClick={next}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" fill="currentColor" />
          </button>
          
          <button
            onClick={cycleRepeat}
            className={`p-1 transition-colors ${
              repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'one' && (
              <span className="absolute -mt-1 -ml-1 text-xs">1</span>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(getCurrentTime())}
          </span>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Volume and Options */}
      <div className="flex items-center space-x-4 w-1/4 justify-end">
        {queue.length > 0 && (
          <div className="text-xs text-gray-400">
            {queue.length} in queue
          </div>
        )}
        
        <button
          onClick={() => setShowQueue(!showQueue)}
          className={`p-1 transition-colors ${
            showQueue ? 'text-green-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
        
        <button className="p-1 text-gray-400 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <div
            ref={volumeRef}
            onClick={handleVolumeClick}
            className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}