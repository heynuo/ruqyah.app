'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  X,
  Headphones,
  Moon,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { MasterVerse, RECITERS as VERSE_RECITERS } from '@/data/master-verses-data';
import { Surah, SURAH_RECITERS } from '@/data/surahs-data';

export interface ActiveTrack {
  type: 'surah' | 'verse';
  surah?: Surah;
  verse?: MasterVerse;
}

interface AudioPlayerBarProps {
  activeTrack: ActiveTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  surahReciterId: string;
  setSurahReciterId: (id: string) => void;
}

export default function AudioPlayerBar({
  activeTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onClose,
  surahReciterId,
  setSurahReciterId,
}: AudioPlayerBarProps) {
  const [verseReciterKey, setVerseReciterKey] = useState<keyof typeof VERSE_RECITERS>('alafasy');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Construct audio source URL based on track type
  const getAudioUrl = () => {
    if (!activeTrack) return '';

    if (activeTrack.type === 'surah' && activeTrack.surah) {
      const reciter = SURAH_RECITERS.find((r) => r.id === surahReciterId) || SURAH_RECITERS[0];
      const paddedId = String(activeTrack.surah.id).padStart(3, '0');
      return `${reciter.cdn}${paddedId}.mp3`;
    }

    if (activeTrack.type === 'verse' && activeTrack.verse) {
      const verse = activeTrack.verse;
      const reciter = VERSE_RECITERS[verseReciterKey] || VERSE_RECITERS.alafasy;
      const surahPadded = String(verse.surah).padStart(3, '0');
      const ayahPadded = String(verse.startAyah).padStart(3, '0');

      if (reciter.provider === 'everyayah') {
        return `https://everyayah.com/data/${reciter.folder}/${surahPadded}${ayahPadded}.mp3`;
      } else {
        return `https://www.alislam.org/quran/tilawat/${reciter.folder}/${verse.surah}_${verse.startAyah}.mp3`;
      }
    }

    return '';
  };

  // Keyboard shortcut V to toggle minimized state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'v' || e.key === 'V') {
        setIsMinimized((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sleep timer handler
  useEffect(() => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    if (sleepTimerMinutes > 0 && isPlaying) {
      sleepTimerRef.current = setTimeout(() => {
        if (audioRef.current) audioRef.current.pause();
        onTogglePlay();
        setSleepTimerMinutes(0);
      }, sleepTimerMinutes * 60 * 1000);
    }
    return () => {
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    };
  }, [sleepTimerMinutes, isPlaying]);

  // Audio loading & event listeners
  useEffect(() => {
    if (!activeTrack) return;
    const url = getAudioUrl();
    if (!url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }

    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback error or user gesture required:', err);
      });
    }

    const el = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(el.currentTime);
    const handleLoadedMetadata = () => setDuration(el.duration);
    const handleEnded = () => {
      if (isLooping) {
        el.currentTime = 0;
        el.play();
      } else {
        onNext();
      }
    };

    el.addEventListener('timeupdate', handleTimeUpdate);
    el.addEventListener('loadedmetadata', handleLoadedMetadata);
    el.addEventListener('ended', handleEnded);

    return () => {
      el.removeEventListener('timeupdate', handleTimeUpdate);
      el.removeEventListener('loadedmetadata', handleLoadedMetadata);
      el.removeEventListener('ended', handleEnded);
    };
  }, [activeTrack, surahReciterId, verseReciterKey]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  if (!activeTrack) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Render title and subtitle based on track type
  const trackTitle =
    activeTrack.type === 'surah'
      ? `${activeTrack.surah?.id}. ${activeTrack.surah?.name} (${activeTrack.surah?.meaning})`
      : `${activeTrack.verse?.surahName} (${activeTrack.verse?.verseRange})`;

  const trackSubtitle =
    activeTrack.type === 'surah'
      ? `${activeTrack.surah?.type} • ${activeTrack.surah?.ayahs} Ayahs`
      : activeTrack.verse?.topic || '';

  const trackArabic =
    activeTrack.type === 'surah' ? activeTrack.surah?.arabic : activeTrack.verse?.arabic;

  // Minimized Pill View
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 bg-surface/95 backdrop-blur-md border border-border-strong rounded-full shadow-2xl px-4 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="text-xs max-w-[150px] truncate">
          <span className="font-semibold text-on-surface block truncate">{trackTitle}</span>
          <span className="text-[10px] text-on-surface-variant font-code-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
          title="Restore player (V)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Full Docked Player View
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 border-t border-border-strong shadow-2xl backdrop-blur-md px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Details & Visual badge */}
        <div className="flex items-center gap-3 w-full md:w-auto min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-xs">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-on-surface text-xs sm:text-sm truncate">{trackTitle}</span>
              <span className="text-[10px] font-code-mono bg-primary/10 text-primary px-1.5 py-0.2 rounded shrink-0">
                {activeTrack.type === 'surah' ? 'Full Surah' : 'Master Ayah'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant truncate">
              <span className="truncate">{trackSubtitle}</span>
              <span className="hidden sm:inline font-arabic text-sm text-primary shrink-0">{trackArabic}</span>
            </div>
          </div>
        </div>

        {/* Center Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center gap-1 w-full md:w-1/2">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Previous Track (←)"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={onNext}
              className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Next Track (→)"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                isLooping ? 'text-primary bg-primary/15' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Loop Single Track"
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrubber */}
          <div className="flex items-center gap-2 w-full text-[11px] font-code-mono text-on-surface-variant">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Reciter, Speed, Sleep Timer & Window Toggles */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* Reciter Selector */}
          {activeTrack.type === 'surah' ? (
            <select
              value={surahReciterId}
              onChange={(e) => setSurahReciterId(e.target.value)}
              className="bg-surface-container-low border border-border-subtle rounded px-2 py-1 text-xs text-on-surface font-code-mono focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SURAH_RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.short}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={verseReciterKey}
              onChange={(e) => setVerseReciterKey(e.target.value as keyof typeof VERSE_RECITERS)}
              className="bg-surface-container-low border border-border-subtle rounded px-2 py-1 text-xs text-on-surface font-code-mono focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.entries(VERSE_RECITERS).map(([k, cfg]) => (
                <option key={k} value={k}>
                  {cfg.name}
                </option>
              ))}
            </select>
          )}

          {/* Speed Selector */}
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="bg-surface-container-low border border-border-subtle rounded px-2 py-1 text-xs text-on-surface font-code-mono focus:outline-none focus:ring-1 focus:ring-primary hidden sm:block"
            title="Playback Speed"
          >
            <option value={0.75}>0.75x</option>
            <option value={1.0}>1.0x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>

          {/* Sleep Timer */}
          <select
            value={sleepTimerMinutes}
            onChange={(e) => setSleepTimerMinutes(parseInt(e.target.value))}
            className={`bg-surface-container-low border border-border-subtle rounded px-2 py-1 text-xs font-code-mono focus:outline-none focus:ring-1 focus:ring-primary hidden sm:block ${
              sleepTimerMinutes > 0 ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
            title="Sleep Timer"
          >
            <option value={0}>Timer Off</option>
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>

          {/* Volume Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer hidden sm:block"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Minimize / Dock Pill */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title="Minimize audio bar (V)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
