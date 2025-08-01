@echo off
setlocal

REM Verifica se uma pasta foi arrastada
if "%~1"=="" (
    echo Arraste uma pasta com imagens para este arquivo .bat.
    pause
    exit /b
)

REM Define o diretório com base no argumento (drag and drop)
set "DIR=%~1"

REM Confirma o diretório
echo Processando imagens em: "%DIR%"
echo.

REM Processa imagens nos formatos suportados
for %%I in ("%DIR%\*.jpg" "%DIR%\*.jpeg" "%DIR%\*.png" "%DIR%\*.bmp" "%DIR%\*.gif") do (
    echo Redimensionando: %%~nxI
    magick "%%I" -resize 118x107^! "%%I"
)

echo.
echo Todas as imagens foram redimensionadas para 100x50 e salvas no mesmo local.
pause
