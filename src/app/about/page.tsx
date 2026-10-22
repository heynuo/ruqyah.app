'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Terminal, Sparkles, ArrowRight, CheckCircle2, Cpu, Lock, Mail, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary mb-1 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">
            AUTHOR &amp; ARCHIVAL MANIFESTO
          </span>
        </div>
        <h1 className="font-title-page text-3xl sm:text-4xl font-extrabold text-on-surface">
          About Zahiruddin &amp; Ruqyah Lab
        </h1>
        <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Bridging high-throughput distributed systems engineering with classical Islamic scholarship and authentic Qur&apos;anic preservation.
        </p>
      </div>

      {/* Bio & Academic Mission Card */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-5 shadow-xs">
        <h2 className="font-title-page text-xl font-bold text-on-surface flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-code-mono">
            Z
          </span>
          <span>The Scholastic Mission</span>
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body-article">
          <p>
            Welcome to <strong className="text-on-surface">Ruqyah</strong>. Founded in 2024 by Zahiruddin, this laboratory exists as an independent digital sanctuary at the intersection of rigorous computing disciplines and classical Islamic sciences.
          </p>
          <p>
            In an era where modern web applications are burdened by telemetry frameworks, user surveillance, tracking pixels, and heavy JavaScript bundles, Ruqyah was built from the ground up with an uncompromising set of engineering values:
          </p>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>100% Tracker-Free</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Zero Google Analytics, Facebook Pixels, or third-party monitoring. All data persists strictly on your device via browser local storage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <BookOpen className="w-4 h-4" />
              <span>Canonical Verification</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every verse in the 108 Master Verses compilation has been cross-referenced across 62 classical texts, ensuring authentic isnād and scholarly adherence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Terminal className="w-4 h-4" />
              <span>Systems Engineering Rigor</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Applying low-latency paradigms (Netty byte buffers, virtual threads, off-heap memory) to building lean, resilient software architectures.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Shield className="w-4 h-4" />
              <span>Permanent Offline Reading</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Pre-rendered semantic markup and cache-first offline support ensure complete access to research and scriptures without active internet connectivity.
            </p>
          </div>
        </div>
      </div>

      {/* Classical Sources Citations */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-title-page text-lg font-bold text-on-surface">
          Canonical Bibliography &amp; Key Classical Sources
        </h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          The 108 Master Verses compilation is established upon the foundational works of classical exegesis (Tafsīr) and verified Sunnah:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-on-surface font-code-mono pt-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Zad al-Ma&apos;ad (Ibn al-Qayyim)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Majmu&apos; al-Fatawa (Ibn Taymiyyah)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Tafsir al-Qur&apos;an al-Azim (Ibn Kathir)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Al-Tibb al-Nabawi (Prophetic Medicine)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Sword Against Black Magic (Wahid Baly)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Understanding Ruqyah &amp; Jinn in Islam</span>
          </li>
        </ul>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-code-mono text-on-surface-variant">
        <span>Curated &amp; Maintained by Zahiruddin</span>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-primary hover:underline font-semibold flex items-center gap-1">
            <span>Direct Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://github.com/heynuo/Ruqyah.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
