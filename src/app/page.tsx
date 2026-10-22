'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Headphones,
  Shield,
  Terminal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Code,
  FileText,
  Star,
  ExternalLink,
  ChevronRight,
  Download,
  X
} from 'lucide-react';
import { ALL_MASTER_VERSES, MasterVerse } from '@/data/master-verses-data';
import { useAudioContext } from '@/components/ClientLayoutWrapper';

export default function HomePage() {
  const { playVerse } = useAudioContext();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const featuredVerses = ALL_MASTER_VERSES.slice(0, 4);

  const articles = [
    {
      id: 'netty-buffers',
      title: 'Zero-Allocation Netty Byte Buffers in High-Throughput Systems',
      category: 'Distributed Systems & JVM',
      readTime: '12 min read',
      date: 'Oct 2026',
      icon: Cpu,
      excerpt: 'Deep dive into off-heap memory management, pooled byte buffer allocators, and zero-copy packet routing for microsecond-latency messaging.',
      fullContent: `
In low-latency messaging backbones, garbage collection pauses can destroy SLA requirements. This research log examines the architecture of Netty's ByteBuf allocator:

1. **PooledByteBufAllocator & jemalloc Algorithms**:
   Memory is partitioned into Arenas, Chunks, and Pages (typically 8KB). Small allocations are serviced from Sub-page pools without invoking JVM object instantiation.

2. **Zero-Copy Slicing and CompositeByteBuf**:
   Rather than copying bytes when aggregating protocol headers and payloads, CompositeByteBuf wraps multiple buffers in a virtual envelope, keeping off-heap pointer references intact.

3. **Direct Memory Leak Detection**:
   Using ResourceLeakDetector levels (PARANOID in CI pipelines) to trap missing ByteBuf.release() invocations before production deployment.
      `
    },
    {
      id: 'hadith-methodology',
      title: 'Scholastic Methodology of Sanad Verification & Ruqyah Authenticity',
      category: 'Classical Scholarship',
      readTime: '18 min read',
      date: 'Sep 2026',
      icon: BookOpen,
      excerpt: 'Examining multi-source verification frameworks used across classical commentaries to establish canonical authenticity of Ruqyah texts.',
      fullContent: `
The compilation of the 108 Master Verses adheres to classical Isnād verification principles:

1. **Cross-Referenced Concordance**:
   Verses included in our concordance must appear across classical authorities including Ibn al-Qayyim (Zad al-Ma'ad), Ibn Taymiyyah (Majmu' al-Fatawa), and contemporary clinical works.

2. **Categorical Demarcation**:
   Strict separation between pure Tawheed affirmations, protective invocations (al-Mu'awwidhat), and anti-sorcery formulas (Ayat al-Ibtal in Surah Yunus and Ta-Ha).

3. **Rejection of Unverified Narrations**:
   Any recitation formulas relying on fabricated or uncorroborated esoteric claims were rigorously excluded from the 13-page compilation.
      `
    },
    {
      id: 'spring-threads',
      title: 'Spring Boot 3.4 Reactive Architecture & Virtual Threads Benchmarks',
      category: 'Java OOP & Architecture',
      readTime: '10 min read',
      date: 'Aug 2026',
      icon: Terminal,
      excerpt: 'Comparing Project Loom virtual threads against reactive WebFlux pipelines under high concurrency thread-per-request workloads.',
      fullContent: `
With JDK 21+ and Spring Boot 3.4, the classic dilemma between simple imperative code and scalable reactive streams has shifted:

1. **Virtual Thread Scalability**:
   Running Tomcat with spring.threads.virtual.enabled=true allows 50,000 concurrent blocking I/O connections with near-zero memory footprint.

2. **Thread Pinning Hazards**:
   Careful auditing of synchronized blocks and JNI calls that temporarily pin carrier threads, resolving bottlenecks using ReentrantLock.

3. **When to still choose Reactive (WebFlux)**:
   For long-lived streaming endpoints (Server-Sent Events) and non-blocking backpressure pipelines where reactive operators offer superior compositional clarity.
      `
    },
  ];

  return (
    <div className="w-full">

      {/* 'CURRENTLY STUDYING & BUILDING' (NOW STRIP) */}
      <section className="w-full border-b border-border-subtle bg-surface-container-low/60 py-2.5 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-code-mono">
          <div className="flex items-center gap-2 text-on-surface-variant min-w-0">
            <span className="inline-flex items-center gap-1.5 text-primary font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>CURRENTLY EXAMINING:</span>
            </span>
            <span className="truncate text-on-surface font-medium">
              Zero-allocation Netty byte buffers &amp; Classical Tafsir of Surah Al-Kahf
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-on-surface-variant shrink-0">
            <span className="hidden md:inline">Research Lab Log #42</span>
            <span className="hidden md:inline">•</span>
            <a className="text-primary hover:underline font-semibold" href="#articles-section">
              Read latest findings →
            </a>
          </div>
        </div>
      </section>

      {/* 1. EDITORIAL HERO SECTION WITH ILLUMINATED SACRED MEDALLION SPECIMEN TILE */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-8 md:pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Academic Mission & CTAs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between items-start space-y-6">
            <div>
              {/* Editorial Folio Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary mb-4 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">
                  VOL. III • SCHOLASTIC ARCHIVE &amp; SYSTEMS LABORATORY • EST. 2024
                </span>
              </div>

              {/* Bold Academic Headline */}
              <h1 className="font-title-page text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.12] mb-4 text-balance">
                Notes on Code and the Qur’an.
              </h1>

              {/* Eloquent Description */}
              <p className="font-body-lead text-sm sm:text-base text-on-surface-variant mb-6 text-balance leading-relaxed max-w-xl">
                Clear tutorials in distributed systems, disciplined classical scholarship, and verified Qur’anic tools engineered for quiet reflection. Zero trackers, zero client telemetry, and built with standard web technologies for permanent offline reading.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/quran-verses"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-on-primary font-medium text-xs sm:text-sm hover:bg-primary-container transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>108 Master Verses Concordance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/quran"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-container-high text-on-surface font-medium text-xs sm:text-sm hover:bg-surface-container-highest transition-all shadow-xs"
                >
                  <Headphones className="w-4 h-4 text-primary" />
                  <span>114 Surahs Recitation</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-border-subtle text-xs font-code-mono text-on-surface-variant">
              <div>
                <span className="text-base sm:text-lg font-bold text-on-surface block">114</span>
                <span>Complete Surahs</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-primary block">108</span>
                <span>Master Verses</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-on-surface block">62</span>
                <span>Classical Texts</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-emerald-600 block">0</span>
                <span>Trackers</span>
              </div>
            </div>
          </div>

          {/* Right: Illuminated Sacred Medallion / Specimen Tile (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-surface-container-low border border-border-strong rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
              {/* Subtle ambient blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl group-hover:bg-primary/25 transition-all"></div>

              {/* Medallion Graphic Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 stroke-current text-primary" fill="none" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" strokeWidth="2" strokeDasharray="4 4" className="sacred-orbit-cw" />
                    <rect x="25" y="25" width="70" height="70" strokeWidth="1.5" rx="4" transform="rotate(45 60 60)" />
                    <circle cx="60" cy="60" r="8" fill="currentColor" />
                  </svg>
                  <span className="font-code-mono text-xs uppercase text-primary font-bold tracking-wider">
                    Specimen 01 • Ayat ul-Kursi
                  </span>
                </div>
                <span className="text-xs font-code-mono bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                  2:255
                </span>
              </div>

              {/* Calligraphy Body */}
              <div className="space-y-4 my-6 text-right">
                <p className="font-arabic text-2xl sm:text-3xl text-on-surface leading-loose">
                  ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ
                </p>
                <p className="font-body-article text-xs sm:text-sm text-on-surface-variant text-left italic leading-relaxed">
                  &ldquo;Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep...&rdquo;
                </p>
              </div>

              {/* Tile Footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs font-code-mono text-on-surface-variant">
                  Cited in 8+ Classical Authorities
                </span>
                <button
                  onClick={() => playVerse(ALL_MASTER_VERSES[2])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Stream Recitation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO LEARNING LANES SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-10 border-t border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lane 1: Systems & Java Architecture */}
          <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-4 hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="font-title-page text-xl font-bold text-on-surface">
                Systems &amp; Architecture Laboratory
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Empirical investigations into low-latency distributed architectures, zero-allocation Netty byte buffers, JVM memory layouts, and Spring Boot 3.4 concurrency benchmarks.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code-mono">
              <span className="text-on-surface-variant">3 Published Research Papers</span>
              <a href="#articles-section" className="text-primary font-semibold hover:underline flex items-center gap-1">
                <span>View Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Lane 2: Quranic Sanctuary & Ruqyah Concordance */}
          <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-4 hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-title-page text-xl font-bold text-on-surface">
                Qur’anic Sanctuary &amp; Ruqyah Concordance
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                The canonical 108 Master Verses compilation, complete 114 Surahs audio library with multi-reciter CDN streaming, and authentic King Fahd Madinah Mushaf publications.
              </p>
            </div>
            <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-code-mono">
              <span className="text-on-surface-variant">108 Verses • 114 Surahs</span>
              <Link href="/quran-verses" className="text-primary font-semibold hover:underline flex items-center gap-1">
                <span>Open Concordance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MASTER VERSES CAROUSEL */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-10 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-code-mono text-primary font-semibold uppercase tracking-wider block mb-1">
              Therapeutic Concordance
            </span>
            <h2 className="font-title-page text-2xl sm:text-3xl font-bold text-on-surface">
              Featured Canonical Verses
            </h2>
          </div>
          <Link
            href="/quran-verses"
            className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm font-semibold hover:underline"
          >
            <span>Explore All 108 Master Verses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVerses.map((verse) => (
            <div
              key={verse.id}
              className="bg-surface rounded-xl border border-border-subtle p-5 flex flex-col justify-between hover:border-primary/50 transition-all shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-code-mono text-xs font-semibold text-primary">
                    {verse.surahName} ({verse.verseRange})
                  </span>
                  <span className="text-[10px] font-code-mono bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded">
                    {verse.category}
                  </span>
                </div>
                <p className="font-arabic text-xl text-on-surface text-right line-clamp-2 leading-loose">
                  {verse.arabic}
                </p>
                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                  {verse.translation}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[11px] font-code-mono text-on-surface-variant">
                  {verse.crossReferenced || 'Verified'}
                </span>
                <button
                  onClick={() => playVerse(verse)}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  title="Stream Recitation"
                >
                  <Headphones className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SCHOLASTIC RESEARCH ARTICLES */}
      <section id="articles-section" className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-10 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-code-mono text-primary font-semibold uppercase tracking-wider block mb-1">
              Systems Laboratory &amp; Classical Exegesis
            </span>
            <h2 className="font-title-page text-2xl sm:text-3xl font-bold text-on-surface">
              Scholastic Research &amp; Engineering Logs
            </h2>
          </div>
          <span className="text-xs font-code-mono text-on-surface-variant">
            Peer-reviewed &amp; zero-telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => {
            const Icon = art.icon;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-surface rounded-xl border border-border-subtle p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-xs cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-code-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-semibold">
                      {art.category}
                    </span>
                    <span className="text-xs font-code-mono text-on-surface-variant">{art.readTime}</span>
                  </div>
                  <h3 className="font-title-page font-bold text-on-surface text-base group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-border-subtle flex items-center justify-between text-xs font-code-mono text-on-surface-variant">
                  <span>{art.date}</span>
                  <span className="text-primary font-semibold flex items-center gap-1 group-hover:underline">
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-surface rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-border-strong overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-surface-container-low">
              <div className="space-y-1">
                <span className="text-[10px] font-code-mono text-primary font-bold uppercase tracking-wider">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h3 className="font-title-page font-bold text-lg text-on-surface">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line font-body-article">
              {selectedArticle.fullContent}
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface-container-low flex justify-between items-center text-xs font-code-mono text-on-surface-variant">
              <span>Published by Zahiruddin (Ruqyah)</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
