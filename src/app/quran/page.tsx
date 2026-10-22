'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Headphones,
  Play,
  Pause,
  Download,
  BookOpen,
  FileText,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { SURAHS, SURAH_RECITERS, SURAH_CATEGORIES, Surah } from '@/data/surahs-data';
import { useAudioContext } from '@/components/ClientLayoutWrapper';

export default function QuranPage() {
  const { activeTrack, isPlaying, playSurah, togglePlay, surahReciterId, setSurahReciterId } = useAudioContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'ruqyah' | 'juz_amma'>('all');

  const filteredSurahs = useMemo(() => {
    return SURAHS.filter((surah) => {
      // Category filter
      let matchesCat = true;
      if (activeTab === 'popular') matchesCat = SURAH_CATEGORIES.POPULAR.includes(surah.id);
      else if (activeTab === 'ruqyah') matchesCat = SURAH_CATEGORIES.RUQYAH.includes(surah.id);
      else if (activeTab === 'juz_amma') matchesCat = SURAH_CATEGORIES.JUZ_AMMA.includes(surah.id);

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        surah.name.toLowerCase().includes(q) ||
        surah.meaning.toLowerCase().includes(q) ||
        surah.arabic.includes(q) ||
        String(surah.id) === q;

      return matchesCat && matchesQuery;
    });
  }, [searchQuery, activeTab]);

  const currentReciter = SURAH_RECITERS.find((r) => r.id === surahReciterId) || SURAH_RECITERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">
              COMPLETE 114 SURAHS • CONTINUOUS AUDIO RECITATION ENGINE
            </span>
          </div>
          <h1 className="font-title-page text-3xl sm:text-4xl font-extrabold text-on-surface">
            The Holy Qur&apos;an Recitation Sanctuary
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
            Stream uninterrupted Quranic recitation across 114 Surahs from world-renowned Qaris, with offline caching and authentic Mushaf publications.
          </p>
        </div>

        {/* Global Reciter Selector */}
        <div className="flex items-center gap-3 bg-surface border border-border-subtle rounded-xl p-3 shadow-xs">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-code-mono text-on-surface-variant uppercase tracking-wider block">Active Reciter</span>
            <span className="text-xs font-semibold text-primary">{currentReciter.short}</span>
          </div>
          <select
            value={surahReciterId}
            onChange={(e) => setSurahReciterId(e.target.value)}
            className="bg-surface-container-low border border-border-subtle rounded-lg px-3 py-2 text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-code-mono cursor-pointer"
          >
            {SURAH_RECITERS.map((reciter) => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PDF Publications & Mushaf Downloads Hero Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Card 1: Master Verses Compilation */}
        <div className="bg-surface-container-low rounded-xl border border-primary/20 p-6 flex flex-col justify-between shadow-xs relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-code-mono font-semibold bg-primary/10 text-primary">
                <FileText className="w-3.5 h-3.5" />
                <span>13-Page Official Publication</span>
              </span>
              <span className="text-xs font-code-mono text-on-surface-variant">PDF Document</span>
            </div>
            <h3 className="font-title-page text-lg font-bold text-on-surface">
              Master Compilation of 108 Quranic Verses
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Canonical cross-referenced compendium across 62 classical Islamic references. Includes full Uthmani calligraphy, phonetic transliteration, verified exegesis, and source citations.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
            <a
              href="/assets/pdf/quran_verses_master_compilation.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Publication (PDF)</span>
            </a>
            <Link href="/quran-verses" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
              <span>Explore Interactive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* PDF Card 2: Quran Transliteration & Mushaf Guide */}
        <div className="bg-surface-container-low rounded-xl border border-border-subtle p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-code-mono font-semibold bg-surface-container text-on-surface-variant">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>King Fahd Madinah Mushaf</span>
              </span>
              <span className="text-xs font-code-mono text-on-surface-variant">Study Guide</span>
            </div>
            <h3 className="font-title-page text-lg font-bold text-on-surface">
              Qur&apos;an Complete Transliteration Guide
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Phonetic romanization guide designed for students and researchers striving for precise Arabic Tajweed articulation, makharij, and accurate pronunciation.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
            <a
              href="/assets/pdf/quran_transliteration.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-on-surface border border-border-strong text-xs font-semibold hover:bg-surface-container transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Transliteration PDF</span>
            </a>
            <span className="text-[11px] font-code-mono text-on-surface-variant">100% Offline Ready</span>
          </div>
        </div>
      </div>

      {/* Surahs Filter Bar & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-border-subtle overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All 114 Surahs
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'popular'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Popular (7)
            </button>
            <button
              onClick={() => setActiveTab('ruqyah')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'ruqyah'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Ruqyah Healing
            </button>
            <button
              onClick={() => setActiveTab('juz_amma')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'juz_amma'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Juz &apos;Amma (78-114)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search Surah by English or Arabic name, number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-subtle bg-surface text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-code-mono text-on-surface-variant px-1">
          <span>Showing {filteredSurahs.length} of 114 Surahs</span>
          <span>Audio mirror: {currentReciter.cdn}</span>
        </div>
      </div>

      {/* Surahs Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => {
          const isCurrentSurah = activeTrack?.type === 'surah' && activeTrack.surah?.id === surah.id;
          const isCurrentlyPlaying = isCurrentSurah && isPlaying;

          return (
            <div
              key={surah.id}
              onClick={() => {
                if (isCurrentSurah) {
                  togglePlay();
                } else {
                  playSurah(surah);
                }
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-xs ${
                isCurrentSurah
                  ? 'bg-primary/10 border-primary ring-1 ring-primary'
                  : 'bg-surface border-border-subtle hover:border-primary/50 hover:bg-surface-container-low/50'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-code-mono font-bold text-xs shrink-0 transition-colors ${
                    isCurrentSurah
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface group-hover:bg-primary/20 group-hover:text-primary'
                  }`}
                >
                  {isCurrentlyPlaying ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                  ) : (
                    surah.id
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                      {surah.name}
                    </span>
                    <span className="text-[10px] font-code-mono px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant shrink-0">
                      {surah.type}
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant truncate block">{surah.meaning}</span>
                  <span className="text-[11px] font-code-mono text-on-surface-variant/80 mt-0.5 block">
                    {surah.ayahs} Ayahs
                  </span>
                </div>
              </div>

              {/* Right: Arabic calligraphy & Play Trigger */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-arabic text-lg text-on-surface group-hover:text-primary transition-colors text-right">
                  {surah.arabic}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrentSurah) togglePlay();
                    else playSurah(surah);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer shadow-xs ${
                    isCurrentSurah
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary'
                  }`}
                  title={isCurrentlyPlaying ? 'Pause Surah' : 'Recite Surah'}
                >
                  {isCurrentlyPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
