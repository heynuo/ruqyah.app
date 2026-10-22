'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AudioPlayerBar, { ActiveTrack } from './AudioPlayerBar';
import CommandPalette from './CommandPalette';
import ShortcutsModal from './ShortcutsModal';
import { MasterVerse, ALL_MASTER_VERSES } from '@/data/master-verses-data';
import { Surah, SURAHS, SURAH_RECITERS } from '@/data/surahs-data';
import { Bookmark, X, Trash2, ExternalLink, Headphones } from 'lucide-react';
import Link from 'next/link';

// Global Audio Context
interface AudioContextType {
  activeTrack: ActiveTrack | null;
  isPlaying: boolean;
  playSurah: (surah: Surah) => void;
  playVerse: (verse: MasterVerse) => void;
  togglePlay: () => void;
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  surahReciterId: string;
  setSurahReciterId: (id: string) => void;
  openSearch: () => void;
  openShortcuts: () => void;
}

export const AudioContext = createContext<AudioContextType>({
  activeTrack: null,
  isPlaying: false,
  playSurah: () => {},
  playVerse: () => {},
  togglePlay: () => {},
  bookmarks: [],
  toggleBookmark: () => {},
  surahReciterId: 'afs',
  setSurahReciterId: () => {},
  openSearch: () => {},
  openShortcuts: () => {},
});

export const useAudioContext = () => useContext(AudioContext);

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [surahReciterId, setSurahReciterId] = useState<string>('afs');

  // Load theme and bookmarks from local storage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('heynuo-theme') as 'light' | 'dark' | 'sepia' | null;
      if (savedTheme) {
        applyTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
      }

      const savedBookmarks = localStorage.getItem('ruqyah-bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (e) {}
  }, []);

  const applyTheme = (nextTheme: 'light' | 'dark' | 'sepia') => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('heynuo-theme', nextTheme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.classList.remove('dark', 'sepia');
    if (nextTheme === 'dark') document.documentElement.classList.add('dark');
    if (nextTheme === 'sepia') document.documentElement.classList.add('sepia');
  };

  const cycleTheme = () => {
    if (theme === 'light') applyTheme('dark');
    else if (theme === 'dark') applyTheme('sepia');
    else applyTheme('light');
  };

  const toggleBookmark = (id: number) => {
    let updated: number[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('ruqyah-bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const playSurah = (surah: Surah) => {
    setActiveTrack({ type: 'surah', surah });
    setIsPlaying(true);
  };

  const playVerse = (verse: MasterVerse) => {
    setActiveTrack({ type: 'verse', verse });
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!activeTrack) return;
    if (activeTrack.type === 'surah' && activeTrack.surah) {
      const curId = activeTrack.surah.id;
      const nextSurah = SURAHS.find((s) => s.id === curId + 1) || SURAHS[0];
      setActiveTrack({ type: 'surah', surah: nextSurah });
      setIsPlaying(true);
    } else if (activeTrack.type === 'verse' && activeTrack.verse) {
      const index = ALL_MASTER_VERSES.findIndex((v) => v.id === activeTrack.verse?.id);
      if (index !== -1 && index < ALL_MASTER_VERSES.length - 1) {
        setActiveTrack({ type: 'verse', verse: ALL_MASTER_VERSES[index + 1] });
        setIsPlaying(true);
      }
    }
  };

  const handlePrev = () => {
    if (!activeTrack) return;
    if (activeTrack.type === 'surah' && activeTrack.surah) {
      const curId = activeTrack.surah.id;
      const prevSurah = SURAHS.find((s) => s.id === curId - 1) || SURAHS[SURAHS.length - 1];
      setActiveTrack({ type: 'surah', surah: prevSurah });
      setIsPlaying(true);
    } else if (activeTrack.type === 'verse' && activeTrack.verse) {
      const index = ALL_MASTER_VERSES.findIndex((v) => v.id === activeTrack.verse?.id);
      if (index > 0) {
        setActiveTrack({ type: 'verse', verse: ALL_MASTER_VERSES[index - 1] });
        setIsPlaying(true);
      }
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Ctrl + K or Cmd + K or / to open search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        setSearchModalOpen(true);
        return;
      }

      // Check single-key shortcuts preference
      const singleAllowed = localStorage.getItem('heynuo_shortcuts_enabled') !== 'false';
      if (!singleAllowed) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        cycleTheme();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (activeTrack) {
          setIsPlaying((prev) => !prev);
        }
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setShortcutsModalOpen(false);
        setBookmarksModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, activeTrack]);

  const bookmarkedVerses = ALL_MASTER_VERSES.filter((v) => bookmarks.includes(Number(v.id)));

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        playSurah,
        playVerse,
        togglePlay: () => setIsPlaying(!isPlaying),
        bookmarks,
        toggleBookmark,
        surahReciterId,
        setSurahReciterId,
        openSearch: () => setSearchModalOpen(true),
        openShortcuts: () => setShortcutsModalOpen(true),
      }}
    >
      <Navbar
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenShortcuts={() => setShortcutsModalOpen(true)}
        theme={theme}
        setTheme={applyTheme}
      />

      <main className="flex-1 w-full pb-28">{children}</main>

      <Footer />

      {/* Persistent Audio Player Dock */}
      <AudioPlayerBar
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={() => {
          setIsPlaying(false);
          setActiveTrack(null);
        }}
        surahReciterId={surahReciterId}
        setSurahReciterId={setSurahReciterId}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSurah={(surahId) => {
          const s = SURAHS.find((x) => x.id === surahId);
          if (s) playSurah(s);
        }}
      />

      {/* Global Shortcuts Help Modal */}
      <ShortcutsModal isOpen={shortcutsModalOpen} onClose={() => setShortcutsModalOpen(false)} />

      {/* Bookmarks / Memorization List Modal */}
      {bookmarksModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-border-strong overflow-hidden">
            <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                <h3 className="font-title-page font-bold text-on-surface text-lg">
                  Saved Memorization List ({bookmarkedVerses.length})
                </h3>
              </div>
              <button
                onClick={() => setBookmarksModalOpen(false)}
                className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {bookmarkedVerses.length === 0 ? (
                <div className="text-center py-12 text-on-surface-variant">
                  <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-40 text-primary" />
                  <p className="font-medium text-sm">No saved verses yet.</p>
                  <p className="text-xs text-on-surface-variant/80 mt-1">
                    Click the bookmark icon on any verse card to save it for review.
                  </p>
                </div>
              ) : (
                bookmarkedVerses.map((verse) => (
                  <div
                    key={verse.id}
                    className="p-3.5 rounded-lg border border-border-subtle bg-surface-container-low flex items-start justify-between gap-3 shadow-xs"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">
                          {verse.surahName} ({verse.verseRange})
                        </span>
                        <span className="text-[10px] font-code-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {verse.category}
                        </span>
                      </div>
                      <p className="font-arabic text-lg text-on-surface text-right">{verse.arabic}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-2">{verse.translation}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          playVerse(verse);
                          setBookmarksModalOpen(false);
                        }}
                        className="px-3 py-1.5 rounded bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Play</span>
                      </button>
                      <button
                        onClick={() => toggleBookmark(Number(verse.id))}
                        className="p-1.5 rounded text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface-container-low flex justify-between items-center text-xs font-code-mono text-on-surface-variant">
              <span>Saved locally in browser</span>
              <Link
                href="/quran-verses"
                onClick={() => setBookmarksModalOpen(false)}
                className="text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>Explore all 108 verses</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
}
