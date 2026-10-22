'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Headphones, Compass, Shield, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SURAHS } from '@/data/surahs-data';
import { ALL_MASTER_VERSES } from '@/data/master-verses-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah?: (surahId: number) => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectSurah }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Suggested core pages
  const staticLinks = [
    { label: '108 Master Verses Concordance', category: 'Scripture Corpus', href: '/quran-verses', icon: BookOpen },
    { label: 'Qur’an Recitation Engine (114 Surahs)', category: 'Audio Sanctuary', href: '/quran', icon: Headphones },
    { label: 'About Zahiruddin & Ruqyah Scholastic Archive', category: 'Editorial & Mission', href: '/about', icon: Shield },
    { label: 'Privacy Policy & Zero Telemetry Guarantee', category: 'Policy', href: '/privacy', icon: Shield },
    { label: 'Scholastic Correspondence & Contact', category: 'Inquiries', href: '/contact', icon: Compass },
  ];

  // Articles
  const articles = [
    { label: 'Zero-Allocation Netty Byte Buffers in Distributed Systems', category: 'Research Lab', href: '/#articles-section', icon: FileText },
    { label: 'Hadith Verification & Classical Sanad Analysis', category: 'Classical Scholarship', href: '/#articles-section', icon: BookOpen },
    { label: 'Spring Boot 3.4 Reactive & Virtual Threads Benchmarks', category: 'Systems Lab', href: '/#articles-section', icon: FileText },
  ];

  const filteredSurahs = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return SURAHS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.arabic.includes(q) ||
        String(s.id) === q
    ).slice(0, 5);
  }, [query]);

  const filteredVerses = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return ALL_MASTER_VERSES.filter(
      (v) =>
        v.surahName.toLowerCase().includes(q) ||
        v.topic.toLowerCase().includes(q) ||
        v.verseRange.includes(q) ||
        v.translation.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [query]);

  const filteredLinks = useMemo(() => {
    if (!query) return staticLinks;
    const q = query.toLowerCase().trim();
    return [...staticLinks, ...articles].filter(
      (l) => l.label.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface rounded-xl border border-border-strong shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border-subtle bg-surface-container-low/50">
          <Search className="w-4 h-4 text-primary mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation, surahs, master verses, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3.5 bg-transparent border-0 focus:outline-none text-on-surface text-sm placeholder:text-on-surface-variant/70 font-body-article"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-code-mono bg-surface border border-border-subtle text-on-surface-variant">
            Esc
          </kbd>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3 divide-y divide-border-subtle/50">
          {/* Static Links / Suggested */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-code-mono uppercase tracking-wider text-on-surface-variant font-semibold">
              {query ? 'Navigation & Pages' : 'Suggested Entries'}
            </div>
            {filteredLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-container text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-code-mono text-on-surface-variant">{item.category}</span>
                </button>
              );
            })}
          </div>

          {/* Surahs Results */}
          {filteredSurahs.length > 0 && (
            <div className="pt-2 space-y-1">
              <div className="px-2 py-1 text-[10px] font-code-mono uppercase tracking-wider text-primary font-semibold">
                Surahs (Qur’an Audio)
              </div>
              {filteredSurahs.map((surah) => (
                <button
                  key={surah.id}
                  onClick={() => {
                    router.push(`/quran?surah=${surah.id}`);
                    if (onSelectSurah) onSelectSurah(surah.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-container text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px] font-code-mono font-bold shrink-0">
                      {surah.id}
                    </span>
                    <div className="truncate">
                      <span className="text-xs font-medium text-on-surface group-hover:text-primary">
                        {surah.name} ({surah.meaning})
                      </span>
                      <span className="text-[10px] text-on-surface-variant block">
                        {surah.type} • {surah.ayahs} Ayahs
                      </span>
                    </div>
                  </div>
                  <span className="font-arabic text-sm text-on-surface shrink-0">{surah.arabic}</span>
                </button>
              ))}
            </div>
          )}

          {/* Master Verses Results */}
          {filteredVerses.length > 0 && (
            <div className="pt-2 space-y-1">
              <div className="px-2 py-1 text-[10px] font-code-mono uppercase tracking-wider text-primary font-semibold">
                Master Verses
              </div>
              {filteredVerses.map((verse) => (
                <button
                  key={verse.id}
                  onClick={() => {
                    router.push('/quran-verses');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-container text-left transition-colors group cursor-pointer"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary">{verse.surahName} ({verse.verseRange})</span>
                      <span className="text-[10px] font-code-mono bg-surface-container-high px-1.5 py-0.2 rounded text-on-surface-variant truncate">
                        {verse.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">{verse.topic}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-border-subtle bg-surface-container-low/50 flex items-center justify-between text-[11px] font-code-mono text-on-surface-variant">
          <span>Type to filter • Press Esc to dismiss</span>
          <span className="flex items-center gap-1">
            <span>Open</span>
            <CornerDownLeft className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
