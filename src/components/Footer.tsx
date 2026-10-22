import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Terminal, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-surface-container-low/80 py-12 px-4 sm:px-6 md:px-8 text-on-surface-variant text-sm mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              <span className="font-arabic">ر</span>
            </div>
            <span className="font-title-page font-bold text-on-surface text-base">Ruqyah — Scholastic Archive</span>
          </div>
          <p className="text-xs leading-relaxed max-w-md">
            Clear tutorials in distributed systems, classical scholarship, and verified Qur’anic tools engineered for quiet reflection. Zero trackers, zero client telemetry, and built for permanent offline reading.
          </p>
          <div className="flex items-center gap-4 text-xs font-code-mono pt-1">
            <span className="flex items-center gap-1 text-primary">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero Trackers</span>
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side</span>
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-code-mono text-xs font-semibold text-on-surface uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-primary transition-colors">Research Overview</Link></li>
            <li><Link href="/quran-verses" className="hover:text-primary transition-colors">108 Master Verses</Link></li>
            <li><Link href="/quran" className="hover:text-primary transition-colors">Quran Player</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Archive</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-code-mono text-xs font-semibold text-on-surface uppercase tracking-wider mb-3">Legal &amp; Privacy</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact &amp; Inquiries</Link></li>
            <li>
              <a href="https://github.com/heynuo/Ruqyah.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Code className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-code-mono text-on-surface-variant">
        <div>© 2026 Zahiruddin (Ruqyah). All rights reserved.</div>
        <div className="flex items-center gap-3">
          <span>Vol. III Scholastic Archive</span>
          <span>•</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </footer>
  );
}
