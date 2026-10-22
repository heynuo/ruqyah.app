[CmdletBinding()]
param(
    [string]$Root = '',

    # Explicit stamp (e.g. '2026-10-14' or a git short hash). Defaults to the
    # current UTC date, which changes once per day and is what GitHub Pages
    # deploys will pick up.
    [string]$Stamp = '',

    [switch]$WhatIf
)

if (-not $Root) {
    $Root = if ($PSScriptRoot) { Join-Path $PSScriptRoot '..' } else { '.' }
}

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
    $rootPath = [System.IO.Path]::GetFullPath((Resolve-Path -LiteralPath $Root -ErrorAction Stop).ProviderPath)
} catch {
    Write-Error "Site root '$Root' could not be found: $($_.Exception.Message)"
    exit 2
}

$scriptPath = Join-Path $rootPath 'js/script.js'
if (-not [System.IO.File]::Exists($scriptPath)) {
    Write-Error "Unable to find '$scriptPath'."
    exit 2
}

if ([string]::IsNullOrWhiteSpace($Stamp)) {
    $Stamp = [DateTime]::UtcNow.ToString('yyyy-MM-dd-HHmm')
}

if ($Stamp -notmatch '^[A-Za-z0-9._-]+$') {
    Write-Error "Stamp '$Stamp' contains characters that are unsafe in a URL query string."
    exit 2
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

# ---------------------------------------------------------------------------
# 1. js/script.js — the original build stamp, still read by the offline toast
#    and by any page that registers the worker from this file.
# ---------------------------------------------------------------------------
$jsMarker = [System.Text.RegularExpressions.Regex]::new(
    'var __HEYNUO_BUILD__ = .*?;',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

$scriptText = [System.IO.File]::ReadAllText($scriptPath, [System.Text.Encoding]::UTF8)

if (-not $jsMarker.IsMatch($scriptText)) {
    Write-Error "No '__HEYNUO_BUILD__' declaration found in js/script.js. Expected a line like: var __HEYNUO_BUILD__ = 'dev';"
    exit 1
}

$updatedScript = $jsMarker.Replace($scriptText, "var __HEYNUO_BUILD__ = '$Stamp';", 1)
$scriptChanged = $updatedScript -cne $scriptText

# ---------------------------------------------------------------------------
# 2. Every *.html page — the <meta name="heynuo-build"> tag. js/shell.js reads
#    it to register the service worker, which is what gives index.html and
#    about.html their offline cache (they never load js/script.js).
# ---------------------------------------------------------------------------
$metaMarker = [System.Text.RegularExpressions.Regex]::new(
    '(<meta name="heynuo-build" content=")[^"]*(">)'
)
$metaReplacement = '${1}' + $Stamp + '${2}'

$htmlChanged = @()
$htmlMissing = @()

foreach ($file in (Get-ChildItem -LiteralPath $rootPath -Filter '*.html' -File)) {
    $html = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    if (-not $metaMarker.IsMatch($html)) {
        $htmlMissing += $file.Name
        continue
    }

    $newHtml = $metaMarker.Replace($html, $metaReplacement, 1)
    if ($newHtml -cne $html) {
        if (-not $WhatIf) {
            [System.IO.File]::WriteAllText($file.FullName, $newHtml, $utf8NoBom)
        }
        $htmlChanged += $file.Name
    }
}

# ---------------------------------------------------------------------------
# 3. Report
# ---------------------------------------------------------------------------
if ($WhatIf) {
    Write-Host "[WhatIf] Would set build stamp '$Stamp' in:" -ForegroundColor Cyan
    if ($scriptChanged) { Write-Host "  js/script.js" -ForegroundColor Cyan }
    foreach ($name in $htmlChanged) { Write-Host "  $name" -ForegroundColor Cyan }
    if (-not $scriptChanged -and $htmlChanged.Count -eq 0) {
        Write-Host "  (nothing to change)" -ForegroundColor Cyan
    }
    exit 0
}

if ($scriptChanged) {
    [System.IO.File]::WriteAllText($scriptPath, $updatedScript, $utf8NoBom)
    Write-Host "Stamped build '$Stamp' into js/script.js." -ForegroundColor Green
} else {
    Write-Host "js/script.js already stamped '$Stamp'." -ForegroundColor Yellow
}

if ($htmlChanged.Count -gt 0) {
    Write-Host "Stamped build '$Stamp' into $($htmlChanged.Count) HTML page(s):" -ForegroundColor Green
    foreach ($name in $htmlChanged) { Write-Host "  $name" -ForegroundColor DarkGray }
} else {
    Write-Host "All HTML pages already stamped '$Stamp'." -ForegroundColor Yellow
}

if ($htmlMissing.Count -gt 0) {
    Write-Warning ("These pages have no <meta name=`"heynuo-build`"> tag and were skipped: " + ($htmlMissing -join ', '))
    Write-Warning 'Add the tag directly after the viewport meta so offline cache busting covers them.'
}

Write-Host "The service worker will register as sw.js?v=$Stamp and retire the previous cache." -ForegroundColor DarkGray
