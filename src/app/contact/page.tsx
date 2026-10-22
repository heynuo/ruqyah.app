'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Shield, Copy, Check, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Systems Engineering Inquiry');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const topics = [
    'Systems Engineering Inquiry',
    'Hadith/Ruqyah Verification',
    'Classical Scholarship Exegesis',
    'General Reflection & Feedback'
  ];

  const emailAddress = 'zahiruddin44044@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    `[Ruqyah Lab] ${selectedTopic}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name || 'Anonymous'}\n\n${formData.message}`
  )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/25 bg-surface-container-low text-primary mb-1 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-code-mono text-[11px] font-semibold tracking-wider uppercase">
            PRIVACY-FIRST CORRESPONDENCE • ZERO TELEMETRY
          </span>
        </div>
        <h1 className="font-title-page text-3xl sm:text-4xl font-extrabold text-on-surface">
          Contact &amp; Scholastic Inquiries
        </h1>
        <p className="text-sm text-on-surface-variant max-w-xl">
          Direct communication with Zahiruddin regarding distributed systems benchmarks, isnād verifications, or corrections to the 108 Master Verses compilation.
        </p>
      </div>

      {/* Direct Email Card with One-Click Copy */}
      <div className="bg-surface rounded-xl border border-border-subtle p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-code-mono text-on-surface-variant block uppercase tracking-wider">
              Direct Inquiries Inbox
            </span>
            <span className="text-sm font-bold text-on-surface font-code-mono">{emailAddress}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer shadow-xs"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Address'}</span>
          </button>
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
          >
            <span>Open Client</span>
          </a>
        </div>
      </div>

      {/* Inquiry Form */}
      {submitted ? (
        <div className="bg-surface rounded-2xl border border-border-subtle p-8 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
          <h2 className="font-title-page text-xl font-bold text-on-surface">
            Message Prepared Securely
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
            In keeping with our zero third-party telemetry doctrine, messages are never routed through commercial form scrapers or analytics trackers.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href={mailtoLink}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
            >
              Launch Email Dispatch
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Compose Another
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-6 shadow-xs"
        >
          {/* Topic Pills */}
          <div className="space-y-2">
            <label className="block text-xs font-code-mono font-semibold text-on-surface uppercase tracking-wider">
              Select Inquiry Category
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedTopic === t
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-code-mono font-semibold text-on-surface uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Zahiruddin"
                className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary font-body-article"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-code-mono font-semibold text-on-surface uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@domain.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary font-body-article"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-code-mono font-semibold text-on-surface uppercase tracking-wider">
              Research Note, Question or Correction
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detail your question regarding low-latency architectures, JVM internals, or classical exegesis references..."
              className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary font-body-article resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-code-mono text-on-surface-variant flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Zero server-side retention • Direct mailto</span>
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-medium text-xs hover:bg-primary-container transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Prepare Secure Message</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
