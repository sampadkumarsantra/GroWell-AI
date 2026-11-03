# Daily mandi cache refresh for GroWell AI.
# Fetches data.gov.in, and if prices actually changed, commits and
# pushes services/mandi_cache.json (Render then redeploys from main).
# Safe to run unattended: on any failure it exits non-zero and the
# existing cache and git history are left untouched.

$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$logDir = Join-Path $repo "logs"
New-Item -ItemType Directory -Force $logDir | Out-Null
$logFile = Join-Path $logDir "market-cache-refresh.log"

function Log($message) {
    $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $message"
    Add-Content -Path $logFile -Value $line
    Write-Output $line
}

Log "=== refresh start ==="

# Capture node output line-by-line into the log.
& node scripts/refresh-market-cache.js 2>&1 | ForEach-Object { Log $_ }
$refreshExit = $LASTEXITCODE

if ($refreshExit -ne 0) {
    Log "refresh FAILED (exit $refreshExit) - nothing committed"
    exit 1
}

$changed = git status --porcelain -- services/mandi_cache.json

if (-not $changed) {
    Log "cache unchanged - nothing to commit"
    exit 0
}

git add services/mandi_cache.json
if ($LASTEXITCODE -ne 0) { Log "git add failed"; exit 1 }

$stamp = Get-Date -Format "yyyy-MM-dd"
git commit -m "Update mandi price cache (auto $stamp)"
if ($LASTEXITCODE -ne 0) { Log "git commit failed"; exit 1 }

git push origin main
if ($LASTEXITCODE -ne 0) { Log "git push failed"; exit 1 }

Log "cache committed and pushed"
