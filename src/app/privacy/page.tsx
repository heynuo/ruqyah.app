import React from 'react';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 space-y-8">
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">ZERO TRACKERS &amp; TELEMETRY POLICY</span>
        </div>
        <h1 className="font-title-page text-3xl sm:text-4xl font-extrabold text-on-surface">Privacy Policy &amp; Security Guarantee</h1>
        <p className="text-sm text-on-surface-variant">Built for permanent offline reading with absolute respect for user confidentiality.</p>
      </div>

      <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
        <div className="bg-surface rounded-xl border border-border-subtle p-6 space-y-4 shadow-xs">
          <h2 className="font-title-page text-xl font-bold text-on-surface flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Absolute Zero Telemetry Guarantee</span>
          </h2>
          <p>
            The Ruqyah Scholastic Archive &amp; Systems Laboratory operates on a strict non-tracking doctrine. We do not use third-party analytics cookies, user tracking pixels, behavioral monitoring scripts, or telemetry frameworks of any kind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-xl border border-border-subtle p-6 space-y-3">
            <h3 className="font-title-page font-bold text-on-surface text-base flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>Local Storage Only</span>
            </h3>
            <p className="text-xs">
              All personal preferences such as theme selection (Light, Dark, Sepia) and saved memorization bookmarks are stored exclusively on your local device via browser <code className="font-code-mono text-primary">localStorage</code>. No data is transmitted to external servers.
            </p>
          </div>

          <div className="bg-surface-container-low rounded-xl border border-border-subtle p-6 space-y-3">
            <h3 className="font-title-page font-bold text-on-surface text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Permanent Offline Reading</span>
            </h3>
            <p className="text-xs">
              Built as a progressive standard web application with clean caching, enabling uninterrupted study of classical scholarship and distributed systems tutorials offline.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle text-xs font-code-mono text-on-surface-variant">
          Last updated: October 2026 • Published by Zahiruddin (Ruqyah)
        </div>
      </div>
    </div>
  );
}
