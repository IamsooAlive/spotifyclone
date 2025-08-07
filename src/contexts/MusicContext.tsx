import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  createdBy: string;
  isPublic: boolean;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlists: Playlist[];
  recentlyPlayed: Track[];
  favoritesTracks: Track[];
  currentPlaylist: Playlist | null;
  allTracks: Track[];
  currentTrackIndex: number;
  queue: Track[];
  play: (track: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  addToFavorites: (track: Track) => void;
  removeFromFavorites: (trackId: string) => void;
  createPlaylist: (name: string, description: string) => void;
  addToPlaylist: (playlistId: string, track: Track) => void;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  playPlaylist: (playlist: Playlist, startIndex?: number) => void;
  shuffleQueue: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Mock data for demonstration
const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 201,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'Stay',
    duration: 141,
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '6',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: 167,
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '7',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 201,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  },
  {
    id: '8',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Pop'
  }
];

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
    tracks: mockTracks.slice(0, 5),
    createdBy: 'user',
    isPublic: false
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    coverUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?w=400',
    tracks: mockTracks.slice(2, 7),
    createdBy: 'user',
    isPublic: true
  },
  {
    id: '3',
    name: 'Pop Hits 2023',
    description: 'The biggest pop songs of the year',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=400',
    tracks: mockTracks.slice(0, 8),
    createdBy: 'user',
    isPublic: true
  }
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>(mockTracks.slice(0, 5));
  const [favoritesTracks, setFavoritesTracks] = useState<Track[]>(mockTracks.slice(0, 3));
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [allTracks] = useState<Track[]>(mockTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);

  const play = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Update current track index if playing from current playlist
    if (currentPlaylist) {
      const index = currentPlaylist.tracks.findIndex(t => t.id === track.id);
      if (index !== -1) {
        setCurrentTrackIndex(index);
      }
    }
    
    // Add to recently played if not already there
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 10);
    });
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const next = () => {
    if (queue.length > 0) {
      // Play from queue first
      const nextTrack = queue[0];
      setQueue(prev => prev.slice(1));
      play(nextTrack);
    } else if (currentPlaylist && currentPlaylist.tracks.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % currentPlaylist.tracks.length;
      setCurrentTrackIndex(nextIndex);
      play(currentPlaylist.tracks[nextIndex]);
    } else if (allTracks.length > 0 && currentTrack) {
      const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % allTracks.length;
      play(allTracks[nextIndex]);
    }
  };

  const previous = () => {
    if (currentPlaylist && currentPlaylist.tracks.length > 0) {
      const prevIndex = currentTrackIndex === 0 ? currentPlaylist.tracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      play(currentPlaylist.tracks[prevIndex]);
    } else if (allTracks.length > 0 && currentTrack) {
      const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? allTracks.length - 1 : currentIndex - 1;
      play(allTracks[prevIndex]);
    }
  };

  const addToFavorites = (track: Track) => {
    setFavoritesTracks(prev => {
      if (prev.some(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const removeFromFavorites = (trackId: string) => {
    setFavoritesTracks(prev => prev.filter(t => t.id !== trackId));
  };

  const createPlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=400',
      tracks: [],
      createdBy: 'user',
      isPublic: false
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: [...playlist.tracks, track] }
        : playlist
    ));
  };

  const playPlaylist = (playlist: Playlist, startIndex: number = 0) => {
    setCurrentPlaylist(playlist);
    setCurrentTrackIndex(startIndex);
    if (playlist.tracks.length > 0) {
      play(playlist.tracks[startIndex]);
    }
  };

  const shuffleQueue = () => {
    if (currentPlaylist && currentPlaylist.tracks.length > 0) {
      const shuffled = [...currentPlaylist.tracks]
        .filter(track => track.id !== currentTrack?.id)
        .sort(() => Math.random() - 0.5);
      setQueue(shuffled);
    }
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      playlists,
      recentlyPlayed,
      favoritesTracks,
      currentPlaylist,
      allTracks,
      currentTrackIndex,
      queue,
      play,
      pause,
      togglePlay,
      next,
      previous,
      addToFavorites,
      removeFromFavorites,
      createPlaylist,
      addToPlaylist,
      setCurrentPlaylist,
      playPlaylist,
      shuffleQueue
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}