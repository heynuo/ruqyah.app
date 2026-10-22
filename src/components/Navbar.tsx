'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, BookOpen, Bookmark, Menu, X, Sparkles, HelpCircle } from 'lucide-react';

interface NavbarProps {
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onOpenShortcuts: () => void;
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
}

export default function Navbar({
  bookmarksCount,
  onOpenBookmarks,
  onOpenSearch,
  onOpenShortcuts,
  theme,
  setTheme,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quran', label: "Qur'an" },
    { href: '/quran-verses', label: '108 Verses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-surface/90 backdrop-blur-md border-b border-border-subtle transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Brand & Academic Monogram */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="Ruqyah Scholarly Archive Home"
          >
            <div className="w-8 h-8 rounded border border-primary/20 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-200 shadow-xs">
              {/* Scholastic Geometric Octagram SVG */}
              <svg
                className="w-4 h-4 stroke-current transition-transform duration-300 group-hover:rotate-45"
                fill="none"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect height="14" rx="1" width="14" x="5" y="5"></rect>
                <rect height="14" rx="1" transform="rotate(45 12 12)" width="14" x="5" y="5"></rect>
                <circle cx="12" cy="12" fill="currentColor" r="2.2"></circle>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-ui-interactive font-bold text-[15px] tracking-tight text-on-surface leading-none group-hover:text-primary transition-colors">
                Ruqyah
              </span>
              <span className="font-code-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mt-0.5">
                Scholarly Archive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Editorial Navigation" className="hidden lg:flex items-center gap-1 pl-4 border-l border-border-subtle">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Utility Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Command Palette Trigger Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search documentation and scripture (Ctrl+K)"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-border-subtle bg-surface text-on-surface-variant hover:text-on-surface hover:border-border-strong text-xs font-code-mono transition-all focus:outline-none focus:ring-1 focus:ring-primary shadow-xs cursor-pointer"
            type="button"
          >
            <Search className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline font-ui-interactive text-[12px] font-normal">Search or Jump</span>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-code-mono bg-surface-container rounded text-on-surface-variant border border-border-subtle">
              ⌘K
            </kbd>
          </button>

          {/* Theme Mode Switcher Group: Light, Sepia, Dark */}
          <div
            aria-label="Theme Switcher"
            className="flex items-center border border-border-subtle rounded p-0.5 bg-surface text-on-surface-variant shadow-xs"
            role="group"
          >
            <button
              onClick={() => setTheme('light')}
              aria-label="Light mode"
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer ${
                theme === 'light' ? 'bg-primary text-on-primary font-bold' : 'hover:text-on-surface hover:bg-surface-container'
              }`}
              title="Light Theme"
              type="button"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              aria-label="Sepia mode"
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer ${
                theme === 'sepia' ? 'bg-primary text-on-primary font-bold' : 'hover:text-on-surface hover:bg-surface-container'
              }`}
              title="Sepia Scholastic Theme"
              type="button"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              aria-label="Dark mode"
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer ${
                theme === 'dark' ? 'bg-primary text-on-primary font-bold' : 'hover:text-on-surface hover:bg-surface-container'
              }`}
              title="Midnight Dark Theme"
              type="button"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Saved Verses Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            aria-label={`Saved Bookmarks (${bookmarksCount})`}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border-subtle bg-surface hover:bg-surface-container text-xs font-code-mono text-on-surface-variant transition-colors cursor-pointer shadow-xs"
            type="button"
          >
            <Bookmark className="w-3.5 h-3.5 text-primary" />
            <span className="font-ui-interactive text-[11px] font-medium">
              Saved (<span id="savedCount">{bookmarksCount}</span>)
            </span>
          </button>

          {/* Shortcuts Help Button */}
          <button
            onClick={onOpenShortcuts}
            aria-label="Keyboard shortcuts (?)"
            className="hidden md:flex p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title="Keyboard Shortcuts (?)"
            type="button"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Academic Monogram Avatar */}
          <Link
            href="/about"
            className="w-7 h-7 rounded border border-primary bg-primary text-on-primary flex items-center justify-center font-code-mono text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
            title="About Zahiruddin"
          >
            Z
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-1.5 rounded border border-border-subtle bg-surface text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-border-subtle px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 text-sm font-ui-interactive">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded transition-colors ${
                    isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="text-left px-3 py-2 rounded text-on-surface-variant hover:bg-surface-container flex items-center justify-between"
            >
              <span>Saved Memorization Verses</span>
              <span className="font-code-mono text-xs text-primary font-bold">({bookmarksCount})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
