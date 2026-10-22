import type { Metadata } from 'next';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'Ruqyah — Scholastic Archive & Systems Laboratory',
  description: 'Clear tutorials in distributed systems, classical scholarship, and verified Qur\'anic tools engineered for quiet reflection. Zero trackers, zero client telemetry, and built for permanent offline reading.',
  keywords: ['Ruqyah', 'Distributed Systems', 'Java OOP', 'JVM Internals', 'Spring Boot Architecture', 'Qur\'an Recitation', '108 Master Verses', 'Zero Trackers'],
  authors: [{ name: 'Zahiruddin (Ruqyah)' }],
  openGraph: {
    title: 'Ruqyah — Scholastic Archive & Systems Laboratory',
    description: 'Clear tutorials in distributed systems, disciplined scholarship, and verified Qur\'anic tools engineered for quiet reflection.',
    url: 'https://heynuo.github.io/',
    siteName: 'Ruqyah',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruqyah — Scholastic Archive & Systems Laboratory',
    description: 'Clear tutorials in distributed systems, disciplined scholarship, and verified Qur\'anic tools engineered for quiet reflection.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('heynuo-theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'sepia') {
                    document.documentElement.classList.add('sepia');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="bg-bg-canvas font-body-article text-on-surface antialiased min-h-screen flex flex-col transition-colors duration-200"
        suppressHydrationWarning
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
