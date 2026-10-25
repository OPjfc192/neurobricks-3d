@echo off
echo ========================================
echo  NeuroBricks Trainer - PyInstaller Build
echo ========================================

REM Python interpreter: honour NEUROBRICKS_PYTHON, otherwise fall back to PATH python
if not defined NEUROBRICKS_PYTHON set "NEUROBRICKS_PYTHON=python"
set "PYTHON=%NEUROBRICKS_PYTHON%"

REM ?? PyInstaller??????
%PYTHON% -m pip install pyinstaller --quiet

REM ??? onedir ??????????? onefile ??
%PYTHON% -m PyInstaller ^
    --noconfirm ^
    --clean ^
    --name nb-trainer ^
    --distpath ../dist ^
    --workpath ../build ^
    --add-data "models.py;." ^
    --add-data "train.py;." ^
    --hidden-import torch ^
    --hidden-import torchvision ^
    --hidden-import torchvision.datasets ^
    --collect-submodules torch.nn ^
    --collect-submodules torchvision ^
    main.py

echo.
echo Build complete! Output: src-tauri/sidecars/dist/nb-trainer/
echo.
pause
