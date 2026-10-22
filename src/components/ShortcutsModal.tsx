'use client';

import React, { useState, useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  const [singleKeyEnabled, setSingleKeyEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('heynuo_shortcuts_enabled');
      if (saved !== null) {
        setSingleKeyEnabled(saved === 'true');
      }
    } catch (e) {}
  }, []);

  const handleToggle = () => {
    const nextVal = !singleKeyEnabled;
    setSingleKeyEnabled(nextVal);
    try {
      localStorage.setItem('heynuo_shortcuts_enabled', String(nextVal));
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface rounded-xl border border-border-strong shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-title-page text-base font-bold text-on-surface">Keyboard Shortcuts</h3>
              <span className="text-[10px] font-code-mono text-on-surface-variant">WCAG 2.1.4 Compliant</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Close shortcuts modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Single-Key Shortcut Toggle */}
        <div className="p-3 mb-4 rounded-lg bg-surface-container-low border border-primary/20 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-on-surface block">Single-Key Shortcuts</span>
            <span className="text-on-surface-variant text-[11px]">Enable letters like T, H, A, C without Ctrl</span>
          </div>
          <button
            onClick={handleToggle}
            type="button"
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              singleKeyEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-xs"></span>
          </button>
        </div>

        <div className="space-y-4 max-h-72 overflow-y-auto text-xs">
          {/* General Navigation */}
          <div className="space-y-2">
            <div className="text-[10px] font-code-mono uppercase tracking-wider text-on-surface-variant font-semibold">
              General Navigation
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Search &amp; Command Palette</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                Ctrl + K / ⌘K / /
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Toggle Light / Sepia / Dark Theme</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                T
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Open Shortcuts Help</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                ?
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Close Dialogs &amp; Overlays</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                Esc
              </kbd>
            </div>
          </div>

          {/* Audio & Recitation Player */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-code-mono uppercase tracking-wider text-on-surface-variant font-semibold">
              Audio Recitation Engine
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Play / Pause Audio</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                Space
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Previous / Next Ayah or Surah</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                ← / →
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border-subtle/50">
              <span className="text-on-surface">Minimize / Dock Audio Bar</span>
              <kbd className="px-2 py-0.5 rounded bg-surface-container border border-border-subtle font-code-mono text-[10px]">
                V
              </kbd>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-border-subtle flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
