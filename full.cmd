@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM ============================================
REM FORCE CMD COMPATIBILITY EVEN IF RUN FROM POWERSHELL
REM ============================================
if "%~0"=="%~f0" (
  REM already running in CMD → OK
) else (
  REM Relaunch in CMD
  cmd /c "%~f0" %*
  exit /b
)

:realStart

REM ============================================
REM GET URL
REM ============================================
SET URL=%1

if "%URL%"=="" (
    echo ❌ Erreur : aucune URL fournie.
    echo Exemple : .\full.cmd https://mon-site.com
    exit /b 1
)

SET WCAG_URL=%URL%

echo ===========================================
echo === FULL WCAG AUDIT LANCÉ
echo ===========================================
echo URL utilisée : %URL%
echo.

REM ===========================================
REM 1) FORMAT
REM ===========================================
echo 🔧 Format du projet...
npm run format
echo.

REM ===========================================
REM 2) AUDIT
REM ===========================================
echo 🔍 Lancement de l'audit WCAG...
node index.js "%URL%"

echo ===========================================
echo === ✔ AUDIT COMPLET TERMINÉ
echo ===========================================

ENDLOCAL
