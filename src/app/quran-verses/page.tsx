'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Grid,
  Table,
  Bookmark,
  Headphones,
  Share2,
  Copy,
  Shuffle,
  Sparkles,
  Download,
  Check,
  FileText,
  Star,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ALL_MASTER_VERSES, TOP_10_METADATA, MasterVerse, RECITERS } from '@/data/master-verses-data';
import { useAudioContext } from '@/components/ClientLayoutWrapper';

export default function QuranVersesPage() {
  const { playVerse, bookmarks, toggleBookmark } = useAudioContext();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSurah, setSelectedSurah] = useState<string>('All');
  const [fontSize, setFontSize] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [randomModalVerse, setRandomModalVerse] = useState<MasterVerse | null>(null);
  const [shareVerse, setShareVerse] = useState<MasterVerse | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const categories = [
    'All',
    'Protection & Ruqyah (Healing)',
    'Anti-Sorcery & Breaking Magic',
    'Evil Eye & Envy',
    'Jinn & the Unseen World',
    'Tawheed (Oneness of Allah)',
    'Signs & Creation',
  ];

  // Unique surahs present in the master dataset
  const availableSurahs = useMemo(() => {
    const map = new Map<number, string>();
    ALL_MASTER_VERSES.forEach((v) => {
      map.set(v.surah, v.surahName);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, []);

  const filteredVerses = useMemo(() => {
    return ALL_MASTER_VERSES.filter((verse) => {
      const matchesCategory = selectedCategory === 'All' || verse.category === selectedCategory;
      const matchesSurah = selectedSurah === 'All' || String(verse.surah) === selectedSurah;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        verse.surahName.toLowerCase().includes(q) ||
        verse.surahNameAr.includes(q) ||
        verse.topic.toLowerCase().includes(q) ||
        verse.translation.toLowerCase().includes(q) ||
        verse.sourceBook.toLowerCase().includes(q) ||
        verse.verseRange.toLowerCase().includes(q);

      return matchesCategory && matchesSurah && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedSurah]);

  const handleCopy = (verse: MasterVerse) => {
    const text = `${verse.surahName} (${verse.verseRange})\n${verse.arabic}\n\n${verse.translation}\nSource: ${verse.sourceBook} (Ruqyah Scholastic Archive)`;
    navigator.clipboard.writeText(text);
    showToast(`Copied ${verse.surahName} (${verse.verseRange}) to clipboard`);
  };

  const handleRandomAyah = () => {
    const randomIndex = Math.floor(Math.random() * ALL_MASTER_VERSES.length);
    setRandomModalVerse(ALL_MASTER_VERSES[randomIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">
              108 UNIQUE VERSES • CROSS-REFERENCED FROM 62 CLASSICAL TEXTS
            </span>
          </div>
          <h1 className="font-title-page text-3xl sm:text-4xl font-extrabold text-on-surface">
            Master Qur’anic Verses Compilation
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 max-w-3xl">
            A scholarly concordance and therapeutic Ruqyah corpus cross-referenced from classical exegesis, with dual card/table views, live search, and multi-reciter audio streaming.
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRandomAyah}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors shadow-xs cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-primary" />
            <span>Random Ayah</span>
          </button>

          <a
            href="/assets/pdf/quran_verses_master_compilation.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>13-Page PDF</span>
          </a>

          {/* Font Resizer */}
          <div className="flex items-center gap-1 bg-surface-container-low border border-border-subtle rounded-lg px-2 py-1 text-xs text-on-surface-variant font-code-mono">
            <span className="text-[11px]">Font:</span>
            <button
              onClick={() => setFontSize(Math.max(80, fontSize - 10))}
              className="px-1.5 py-0.5 rounded hover:bg-surface-container font-bold text-on-surface cursor-pointer"
            >
              -
            </button>
            <span className="text-on-surface font-semibold">{fontSize}%</span>
            <button
              onClick={() => setFontSize(Math.min(160, fontSize + 10))}
              className="px-1.5 py-0.5 rounded hover:bg-surface-container font-bold text-on-surface cursor-pointer"
            >
              +
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-container-low border border-border-subtle rounded-lg p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Illuminated Cards Grid"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === 'table' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Canonical Master Table"
            >
              <Table className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 10 Most Cross-Referenced Interactive Showcase (PDF Page 12) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="font-title-page font-bold text-lg text-on-surface">
              Top 10 Most Cross-Referenced Verses (PDF Page 12)
            </h2>
          </div>
          <span className="text-xs font-code-mono text-on-surface-variant">Ranked by citation density</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TOP_10_METADATA.map((item) => (
            <div
              key={item.rank}
              onClick={() => {
                const target = ALL_MASTER_VERSES.find((v) => v.id === item.targetId || (v.surah === item.surah && v.startAyah === item.ayah));
                if (target) playVerse(target);
              }}
              className="p-3.5 rounded-xl border border-border-subtle bg-surface hover:border-primary/50 hover:bg-surface-container-low transition-all cursor-pointer shadow-xs group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-code-mono font-bold">
                    #{item.rank}
                  </span>
                  <span className="text-[10px] font-code-mono font-semibold text-primary bg-primary/10 px-1.5 py-0.2 rounded">
                    {item.count}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors truncate">
                  {item.ref}
                </h4>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.note}
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-code-mono text-primary">
                <span>Listen Audio</span>
                <Headphones className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Thematic Matrix Filters */}
      <div className="space-y-4 bg-surface rounded-xl border border-border-subtle p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search by Surah name, translation keyword, Arabic, topic, or source book..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-subtle bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary font-body-article"
            />
          </div>

          {/* Surah Filter Dropdown */}
          <div className="w-full md:w-auto">
            <select
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(e.target.value)}
              className="w-full md:w-48 px-3 py-2.5 rounded-lg border border-border-subtle bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary font-code-mono cursor-pointer"
            >
              <option value="All">All Surahs ({availableSurahs.length})</option>
              {availableSurahs.map(([num, name]) => (
                <option key={num} value={String(num)}>
                  {num}. {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thematic Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-border-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-code-mono text-on-surface-variant px-1">
        <span>Showing {filteredVerses.length} canonical verses</span>
        <div className="flex items-center gap-3">
          <span>Category: {selectedCategory}</span>
          {selectedSurah !== 'All' && <span>Surah: #{selectedSurah}</span>}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVerses.map((verse) => {
            const isBookmarked = bookmarks.includes(Number(verse.id));

            return (
              <div
                key={verse.id}
                className="bg-surface rounded-xl border border-border-subtle p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-xs group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-code-mono">
                        {verse.surah}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-on-surface block group-hover:text-primary transition-colors">
                          {verse.surahName} ({verse.verseRange})
                        </span>
                        <span className="text-[10px] font-code-mono text-on-surface-variant block">
                          {verse.surahTranslation}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        toggleBookmark(Number(verse.id));
                        showToast(isBookmarked ? 'Bookmark removed' : 'Saved to memorization list');
                      }}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-primary bg-primary/15'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save for Memorization'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Arabic Calligraphy Panel */}
                  <div className="bg-surface-container-low/60 p-4 rounded-xl border border-border-subtle/50 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-code-mono">
                      <span className="text-primary font-semibold">{verse.category}</span>
                      <span className="text-on-surface-variant">{verse.crossReferenced || 'Verified'}</span>
                    </div>
                    <p
                      className="font-arabic text-on-surface text-right leading-loose pt-1"
                      style={{ fontSize: `${fontSize}%` }}
                    >
                      {verse.arabic}
                    </p>
                  </div>

                  {/* Transliteration & English Translation */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-on-surface">{verse.topic}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                      {verse.translation}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-6 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-[10px] font-code-mono text-on-surface-variant truncate max-w-[160px]" title={verse.sourceBook}>
                    {verse.sourceBook}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(verse)}
                      className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      title="Copy Arabic & Translation"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShareVerse(verse)}
                      className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      title="Share Verse"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => playVerse(verse)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Canonical Master Table View */
        <div className="bg-surface rounded-xl border border-border-subtle overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-subtle text-xs font-code-mono text-on-surface-variant">
                  <th className="p-3.5">Ref</th>
                  <th className="p-3.5">Surah</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Topic &amp; Translation</th>
                  <th className="p-3.5">Citation</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-xs">
                {filteredVerses.map((verse) => {
                  const isBookmarked = bookmarks.includes(Number(verse.id));
                  return (
                    <tr key={verse.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3.5 font-code-mono font-bold text-primary">{verse.verseRange}</td>
                      <td className="p-3.5 font-medium text-on-surface">
                        <div>{verse.surahName}</div>
                        <span className="font-arabic text-xs text-on-surface-variant">{verse.surahNameAr}</span>
                      </td>
                      <td className="p-3.5 font-code-mono text-on-surface-variant">{verse.category}</td>
                      <td className="p-3.5 max-w-md">
                        <p className="font-semibold text-on-surface mb-0.5">{verse.topic}</p>
                        <p className="text-on-surface-variant line-clamp-1">{verse.translation}</p>
                      </td>
                      <td className="p-3.5 font-code-mono text-[11px] text-on-surface-variant truncate max-w-[120px]">
                        {verse.sourceBook}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleCopy(verse)}
                            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
                            title="Copy Verse"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              toggleBookmark(Number(verse.id));
                              showToast(isBookmarked ? 'Bookmark removed' : 'Saved to memorization');
                            }}
                            className={`p-1.5 rounded cursor-pointer ${
                              isBookmarked ? 'text-primary bg-primary/15' : 'text-on-surface-variant hover:bg-surface-container'
                            }`}
                            title="Bookmark"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => playVerse(verse)}
                            className="px-2.5 py-1 rounded bg-primary text-on-primary font-semibold hover:bg-primary-container text-xs cursor-pointer shadow-xs"
                          >
                            Play
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Random Ayah Modal */}
      {randomModalVerse && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setRandomModalVerse(null)}
        >
          <div
            className="bg-surface rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-border-strong relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/15 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between">
              <span className="font-code-mono text-xs uppercase text-primary font-semibold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Random Ayah Discovery</span>
              </span>
              <span className="text-xs font-code-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">
                {randomModalVerse.surahName} ({randomModalVerse.verseRange})
              </span>
            </div>

            <div className="space-y-4 text-center">
              <p className="font-arabic text-2xl sm:text-3xl text-on-surface leading-loose">
                {randomModalVerse.arabic}
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-left">
                {randomModalVerse.translation}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-code-mono text-on-surface-variant">{randomModalVerse.category}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playVerse(randomModalVerse);
                    setRandomModalVerse(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container cursor-pointer shadow-xs"
                >
                  Recite Audio
                </button>
                <button
                  onClick={() => setRandomModalVerse(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Share Modal */}
      {shareVerse && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShareVerse(null)}
        >
          <div
            className="bg-surface rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-border-strong"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-title-page font-bold text-base text-on-surface">
              Share Verse Concordance
            </h3>
            <p className="text-xs text-on-surface-variant">
              Share {shareVerse.surahName} ({shareVerse.verseRange}) with classical exegesis reference.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${shareVerse.surahName} (${shareVerse.verseRange})\n${shareVerse.arabic}\n\n${shareVerse.translation}\nhttps://heynuo.github.io/quran-verses.html`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                Share on WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Reflecting on ${shareVerse.surahName} (${shareVerse.verseRange}): "${shareVerse.translation.slice(0, 160)}..." via Ruqyah Archive`
                )}&url=https://heynuo.github.io/quran-verses.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                Share on Twitter / X
              </a>
              <a
                href={`https://t.me/share/url?url=https://heynuo.github.io/quran-verses.html&text=${encodeURIComponent(
                  `${shareVerse.surahName} (${shareVerse.verseRange})\n${shareVerse.arabic}\n\n${shareVerse.translation}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                Share on Telegram
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShareVerse(null)}
                className="w-full py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
