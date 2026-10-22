[CmdletBinding()]
param(
    [string]$Root = ''
)

if (-not $Root) {
    $Root = if ($PSScriptRoot) { Join-Path $PSScriptRoot '..' } else { '.' }
}

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$rootPath = [System.IO.Path]::GetFullPath((Resolve-Path -LiteralPath $Root -ErrorAction Stop).ProviderPath)
$htmlFiles = @(Get-ChildItem -LiteralPath $rootPath -Filter '*.html' -File)

$tailwindAndThemeBlock = @'
  <!-- Typography Preconnect & Font Inclusions -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    rel="stylesheet">

  <!-- Tailwind CSS CDN with Robust RGB-Triplet Opacity Token System -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "surface-dim": "rgb(var(--color-surface-dim) / <alpha-value>)",
            "theme-sepia-text": "#3B2F22",
            "bg-canvas": "rgb(var(--color-bg-canvas) / <alpha-value>)",
            "success": "rgb(var(--color-success) / <alpha-value>)",
            "tertiary": "rgb(var(--color-tertiary) / <alpha-value>)",
            "surface-variant": "rgb(var(--color-surface-variant) / <alpha-value>)",
            "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
            "border-strong": "rgb(var(--color-border-strong) / <alpha-value>)",
            "theme-dark-text": "#E6EDF3",
            "primary-fixed": "rgb(var(--color-primary-fixed) / <alpha-value>)",
            "on-secondary-container": "rgb(var(--color-on-secondary-container) / <alpha-value>)",
            "theme-sepia-border-strong": "#8B7B63",
            "secondary-fixed-dim": "rgb(var(--color-secondary-fixed-dim) / <alpha-value>)",
            "on-tertiary-container": "rgb(var(--color-on-tertiary-container) / <alpha-value>)",
            "on-tertiary-fixed": "rgb(var(--color-on-tertiary-fixed) / <alpha-value>)",
            "theme-sepia-danger": "#B42318",
            "surface-container-high": "rgb(var(--color-surface-container-high) / <alpha-value>)",
            "danger": "rgb(var(--color-danger) / <alpha-value>)",
            "on-secondary": "#ffffff",
            "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
            "theme-dark-accent": "#F5C26B",
            "on-secondary-fixed-variant": "rgb(var(--color-on-secondary-fixed-variant) / <alpha-value>)",
            "secondary-fixed": "rgb(var(--color-secondary-fixed) / <alpha-value>)",
            "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
            "surface-container": "rgb(var(--color-surface-container) / <alpha-value>)",
            "on-primary-fixed-variant": "rgb(var(--color-on-primary-fixed-variant) / <alpha-value>)",
            "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
            "on-error": "#ffffff",
            "theme-sepia-text-muted": "#6B5A45",
            "surface-container-highest": "rgb(var(--color-surface-container-highest) / <alpha-value>)",
            "primary-fixed-dim": "rgb(var(--color-primary-fixed-dim) / <alpha-value>)",
            "on-primary-fixed": "rgb(var(--color-on-primary-fixed) / <alpha-value>)",
            "on-tertiary": "#ffffff",
            "surface-tint": "rgb(var(--color-surface-tint) / <alpha-value>)",
            "background": "rgb(var(--color-bg-canvas) / <alpha-value>)",
            "outline": "rgb(var(--color-outline) / <alpha-value>)",
            "on-background": "rgb(var(--color-on-surface) / <alpha-value>)",
            "primary": "rgb(var(--color-primary) / <alpha-value>)",
            "on-secondary-fixed": "rgb(var(--color-on-secondary-fixed) / <alpha-value>)",
            "theme-dark-bg": "#0B1220",
            "theme-dark-on-primary": "#04201C",
            "tertiary-container": "rgb(var(--color-tertiary-container) / <alpha-value>)",
            "tertiary-fixed": "rgb(var(--color-tertiary-fixed) / <alpha-value>)",
            "surface": "rgb(var(--color-surface) / <alpha-value>)",
            "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
            "inverse-primary": "rgb(var(--color-inverse-primary) / <alpha-value>)",
            "surface-bright": "rgb(var(--color-surface-bright) / <alpha-value>)",
            "theme-sepia-accent": "#92400E",
            "inverse-on-surface": "rgb(var(--color-inverse-on-surface) / <alpha-value>)",
            "error-container": "rgb(var(--color-error-container) / <alpha-value>)",
            "error": "rgb(var(--color-error) / <alpha-value>)",
            "theme-sepia-primary": "#0F5F58",
            "theme-dark-border-strong": "#5B6B80",
            "inverse-surface": "rgb(var(--color-inverse-surface) / <alpha-value>)",
            "theme-dark-primary": "#2DD4BF",
            "theme-sepia-surface": "#FBF5E6",
            "theme-dark-text-muted": "#9FB0C3",
            "theme-dark-surface": "#111A2E",
            "theme-sepia-on-primary": "#FFFFFF",
            "on-tertiary-fixed-variant": "rgb(var(--color-on-tertiary-fixed-variant) / <alpha-value>)",
            "theme-sepia-bg": "#F4ECD8",
            "secondary-container": "rgb(var(--color-secondary-container) / <alpha-value>)",
            "on-error-container": "rgb(var(--color-on-error-container) / <alpha-value>)",
            "surface-container-low": "rgb(var(--color-surface-container-low) / <alpha-value>)",
            "on-primary-container": "rgb(var(--color-on-primary-container) / <alpha-value>)",
            "secondary": "rgb(var(--color-secondary) / <alpha-value>)",
            "border-subtle": "rgb(var(--color-border-subtle) / <alpha-value>)",
            "theme-dark-danger": "#FDA29B",
            "surface-container-lowest": "rgb(var(--color-surface-container-lowest) / <alpha-value>)",
            "tertiary-fixed-dim": "rgb(var(--color-tertiary-fixed-dim) / <alpha-value>)"
          },
          fontFamily: {
            "body-article": ["Inter", "sans-serif"],
            "body-lead": ["Inter", "sans-serif"],
            "ui-interactive": ["Inter", "sans-serif"],
            "subheading-card": ["Inter", "sans-serif"],
            "heading-subsection": ["Inter", "sans-serif"],
            "caption-meta": ["Inter", "sans-serif"],
            "title-page": ["Inter", "sans-serif"],
            "code-mono": ["JetBrains Mono", "monospace"],
            "heading-section": ["Inter", "sans-serif"],
            "arabic-sacred": ["Amiri", "serif"]
          }
        }
      }
    };
  </script>

  <style id="heynuo-theme-tokens">
    /* ==========================================================================
       WCAG 2.2 AA Verified Theme Tokens (RGB Triplet Format for Clean Opacity)
       ========================================================================== */
    :root {
      --color-bg-canvas: 250 250 247;          /* #FAFAF7 */
      --color-surface: 255 255 255;            /* #FFFFFF */
      --color-surface-container: 245 245 240;  /* #F5F5F0 */
      --color-surface-container-low: 232 247 243; /* #E8F7F3 */
      --color-surface-container-high: 220 235 232;/* #DCEBE8 */
      --color-surface-container-highest: 215 230 226; /* #D7E6E2 */
      --color-surface-container-lowest: 255 255 255;  /* #FFFFFF */
      --color-surface-variant: 215 230 226;    /* #D7E6E2 */
      --color-surface-dim: 206 221 218;        /* #CEDDDA */
      --color-surface-bright: 238 253 249;     /* #EEFDF9 */
      --color-surface-tint: 0 106 99;          /* #006A63 */
      --color-on-surface: 17 30 28;            /* #111E1C */
      --color-on-surface-variant: 62 73 71;    /* #3E4947 */
      --color-primary: 0 92 85;                /* #005C55 */
      --color-primary-container: 15 118 110;   /* #0F766E */
      --color-on-primary: 255 255 255;        /* #FFFFFF */
      --color-on-primary-container: 163 250 239; /* #A3FAEF */
      --color-primary-fixed: 156 242 232;      /* #9CF2E8 */
      --color-primary-fixed-dim: 128 213 203;  /* #80D5CB */
      --color-on-primary-fixed: 0 32 29;       /* #00201D */
      --color-on-primary-fixed-variant: 0 80 74;/* #00504A */
      --color-inverse-primary: 128 213 203;    /* #80D5CB */
      --color-secondary: 82 97 94;             /* #52615E */
      --color-secondary-container: 211 227 223;/* #D3E3DF */
      --color-on-secondary-container: 87 102 99;/* #576663 */
      --color-secondary-fixed: 214 230 226;    /* #D6E6E2 */
      --color-secondary-fixed-dim: 186 202 198;/* #BACAC6 */
      --color-on-secondary-fixed: 16 30 28;    /* #101E1C */
      --color-on-secondary-fixed-variant: 59 74 71; /* #3B4A47 */
      --color-tertiary: 137 57 6;              /* #893906 */
      --color-tertiary-container: 168 80 31;   /* #A8501F */
      --color-on-tertiary-container: 255 229 218; /* #FFE5DA */
      --color-tertiary-fixed: 255 219 203;     /* #FFDBCB */
      --color-tertiary-fixed-dim: 255 182 147; /* #FFB693 */
      --color-on-tertiary-fixed: 52 16 0;      /* #341000 */
      --color-on-tertiary-fixed-variant: 122 48 0; /* #7A3000 */
      --color-border-subtle: 226 232 240;      /* #E2E8F0 */
      --color-border-strong: 119 136 132;      /* #778884 */
      --color-outline: 110 121 119;            /* #6E7977 */
      --color-outline-variant: 189 201 198;    /* #BDC9C6 */
      --color-inverse-surface: 38 51 49;       /* #263331 */
      --color-inverse-on-surface: 229 244 240; /* #E5F4F0 */
      --color-success: 4 120 87;               /* #047857 */
      --color-danger: 180 35 24;               /* #B42318 */
      --color-error: 186 26 26;                /* #BA1A1A */
      --color-error-container: 255 218 214;    /* #FFDAD6 */
      --color-on-error-container: 147 0 10;    /* #93000A */
      scroll-padding-top: 4.5rem;
      scroll-padding-bottom: 7rem;
    }

    html.dark, [data-theme="dark"] {
      --color-bg-canvas: 11 18 32;             /* #0B1220 */
      --color-surface: 17 26 46;               /* #111A2E */
      --color-surface-container: 22 34 59;     /* #16223B */
      --color-surface-container-low: 19 30 51; /* #131E33 */
      --color-surface-container-high: 30 45 74;/* #1E2D4A */
      --color-surface-container-highest: 38 56 92; /* #26385C */
      --color-surface-container-lowest: 14 22 39;  /* #0E1627 */
      --color-surface-variant: 30 45 74;       /* #1E2D4A */
      --color-surface-dim: 15 23 42;           /* #0F172A */
      --color-surface-bright: 26 40 68;
      --color-surface-tint: 45 212 191;
      --color-on-surface: 230 237 243;         /* #E6EDF3 */
      --color-on-surface-variant: 159 176 195; /* #9FB0C3 */
      --color-primary: 45 212 191;             /* #2DD4BF */
      --color-primary-container: 15 95 88;     /* #0F5F58 */
      --color-on-primary: 4 32 28;             /* #04201C */
      --color-on-primary-container: 230 255 249; /* #E6FFF9 */
      --color-primary-fixed: 45 212 191;
      --color-primary-fixed-dim: 31 179 160;
      --color-on-primary-fixed: 4 32 28;
      --color-on-primary-fixed-variant: 15 95 88;
      --color-inverse-primary: 0 92 85;
      --color-secondary: 139 155 180;          /* #8B9BB4 */
      --color-secondary-container: 30 45 74;
      --color-on-secondary-container: 200 215 235;
      --color-secondary-fixed: 45 65 95;
      --color-secondary-fixed-dim: 35 52 78;
      --color-on-secondary-fixed: 230 237 243;
      --color-on-secondary-fixed-variant: 180 195 215;
      --color-tertiary: 245 194 107;           /* #F5C26B */
      --color-tertiary-container: 140 94 20;   /* #8C5E14 */
      --color-on-tertiary-container: 254 243 199;
      --color-tertiary-fixed: 253 230 184;
      --color-tertiary-fixed-dim: 245 194 107;
      --color-on-tertiary-fixed: 61 36 0;
      --color-on-tertiary-fixed-variant: 140 94 20;
      --color-border-subtle: 30 45 74;         /* #1E2D4A */
      --color-border-strong: 91 107 128;       /* #5B6B80 */
      --color-outline: 91 107 128;
      --color-outline-variant: 45 65 95;
      --color-inverse-surface: 230 237 243;
      --color-inverse-on-surface: 11 18 32;
      --color-success: 52 211 153;             /* #34D399 */
      --color-danger: 253 162 155;             /* #FDA29B */
      --color-error: 253 162 155;
      --color-error-container: 120 20 20;
      --color-on-error-container: 255 220 220;
    }

    html.sepia, [data-theme="sepia"] {
      --color-bg-canvas: 244 236 216;          /* #F4ECD8 */
      --color-surface: 251 245 230;            /* #FBF5E6 */
      --color-surface-container: 239 228 202;  /* #EFE4CA */
      --color-surface-container-low: 234 220 184; /* #EADCB8 */
      --color-surface-container-high: 226 211 171;/* #E2D3AB */
      --color-surface-container-highest: 217 200 155; /* #D9C89B */
      --color-surface-container-lowest: 255 251 240;  /* #FFFBF0 */
      --color-surface-variant: 221 208 181;    /* #DDD0B5 */
      --color-surface-dim: 213 197 160;        /* #D5C5A0 */
      --color-surface-bright: 254 250 242;
      --color-surface-tint: 15 95 88;
      --color-on-surface: 59 47 34;            /* #3B2F22 */
      --color-on-surface-variant: 107 90 69;   /* #6B5A45 */
      --color-primary: 15 95 88;               /* #0F5F58 */
      --color-primary-container: 23 120 111;   /* #17786F */
      --color-on-primary: 255 255 255;        /* #FFFFFF */
      --color-on-primary-container: 209 250 244; /* #D1FAF4 */
      --color-primary-fixed: 167 243 208;
      --color-primary-fixed-dim: 110 231 183;
      --color-on-primary-fixed: 6 78 59;
      --color-on-primary-fixed-variant: 4 47 46;
      --color-inverse-primary: 110 231 183;
      --color-secondary: 120 102 80;           /* #786650 */
      --color-secondary-container: 229 214 186;/* #E5D6BA */
      --color-on-secondary-container: 85 70 52;
      --color-secondary-fixed: 235 222 198;
      --color-secondary-fixed-dim: 215 200 172;
      --color-on-secondary-fixed: 45 35 24;
      --color-on-secondary-fixed-variant: 75 62 48;
      --color-tertiary: 146 64 14;             /* #92400E */
      --color-tertiary-container: 180 83 9;    /* #B45309 */
      --color-on-tertiary-container: 254 243 199;
      --color-tertiary-fixed: 253 230 138;
      --color-tertiary-fixed-dim: 252 211 77;
      --color-on-tertiary-fixed: 69 26 3;
      --color-on-tertiary-fixed-variant: 120 53 15;
      --color-border-subtle: 221 208 181;      /* #DDD0B5 */
      --color-border-strong: 139 123 99;       /* #8B7B63 */
      --color-outline: 139 123 99;
      --color-outline-variant: 200 185 158;
      --color-inverse-surface: 59 47 34;
      --color-inverse-on-surface: 251 245 230;
      --color-success: 5 150 105;              /* #059669 */
      --color-danger: 180 35 24;               /* #B42318 */
      --color-error: 180 35 24;
      --color-error-container: 254 226 226;
      --color-on-error-container: 127 29 29;
    }

    body {
      padding-top: 3.5rem;
    }

    header a[aria-current="page"] {
      color: rgb(var(--color-primary)) !important;
      background-color: rgb(var(--color-surface-container-low)) !important;
      font-weight: 600 !important;
    }
  </style>
  <script src="js/shell.js" defer></script>
'@

$prehydrationScript = @'
  <!-- Theme Pre-Hydration: Prevents Flash of Unstyled Content (FOUC) -->
  <script>
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
  </script>
'@

foreach ($file in $htmlFiles) {
    if ($file.Name -eq 'index.html') {
        # index.html already has the design system; just ensure shell.js is linked
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
        if ($content -notmatch 'src="js/shell\.js"') {
            $content = $content.Replace('</head>', "  <script src=`"js/shell.js`" defer></script>`r`n</head>")
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "Linked shell.js in index.html" -ForegroundColor Green
        }
        continue
    }

    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # 1. Update theme pre-hydration script in <head>
    if ($content -match '<!-- Theme Initialization: Prevents Flash of Unstyled Content \(FOUC\) -->[\s\S]*?</script>') {
        $content = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            '<!-- Theme Initialization: Prevents Flash of Unstyled Content \(FOUC\) -->[\s\S]*?</script>',
            [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $prehydrationScript.Trim() },
            [System.Text.RegularExpressions.RegexOptions]::Singleline
        )
    }

    # 2. Inject Tailwind CDN, fonts, and theme tokens if not already present
    if ($content -notmatch 'id="tailwind-config"') {
        # Insert before </head>
        $content = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            '</head>',
            [System.Text.RegularExpressions.MatchEvaluator]{ param($m) "$tailwindAndThemeBlock`r`n</head>" },
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        )
    }

    # 3. Clean any orphaned skip link or duplicated comment before <header>
    $content = [System.Text.RegularExpressions.Regex]::Replace(
        $content,
        '(?:<!-- Accessible Skip Link -->\s*<a href="#main-content"[\s\S]*?</a>\s*)+(?=<!-- Accessible Skip Link -->|<header\b)',
        '',
        [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    $content = [System.Text.RegularExpressions.Regex]::Replace(
        $content,
        '(?:<!-- TOP NAVIGATION BAR[^\n]*-->\s*)+',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Synced design system head in $($file.Name)" -ForegroundColor Green
}

Write-Host "Design system synchronization completed." -ForegroundColor Cyan
