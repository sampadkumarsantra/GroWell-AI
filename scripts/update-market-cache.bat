@echo off
rem Double-click to refresh the mandi price cache from data.gov.in,
rem commit it, and push to main (Render then redeploys the site).
rem Safe: does nothing when prices haven't changed, and never
rem overwrites the cache with a broken download.
title GroWell - Update mandi prices
cd /d "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-refresh-market-cache.ps1"
set EXITCODE=%ERRORLEVEL%
echo.
if "%EXITCODE%"=="0" (
    echo Done. Log: logs\market-cache-refresh.log
) else (
    echo Update failed - nothing was committed. See logs\market-cache-refresh.log
)
echo Press any key to close...
pause > nul
exit /b %EXITCODE%
