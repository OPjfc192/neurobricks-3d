@echo off
echo ========================================
echo  PyTorch GPU Support Upgrade
echo ========================================

REM Python interpreter: honour NEUROBRICKS_PYTHON, otherwise fall back to PATH python
if not defined NEUROBRICKS_PYTHON set "NEUROBRICKS_PYTHON=python"

echo Upgrading PyTorch to support RTX 50 series (Blackwell, sm_120)...
echo.

%NEUROBRICKS_PYTHON% -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cu128 --upgrade

echo.
echo Verification:
%NEUROBRICKS_PYTHON% -c "import torch; print('PyTorch:', torch.__version__); print('CUDA:', torch.version.cuda); print('Arch list:', torch.cuda.get_arch_list())"

echo.
pause
