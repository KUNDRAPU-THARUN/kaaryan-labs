@echo off
setlocal
cd /d "%~dp0"
if exist ".venv\Scripts\python.exe" (
  ".venv\Scripts\python.exe" -m streamlit run streamlit_app.py
) else if exist "%USERPROFILE%\anaconda3\python.exe" (
  "%USERPROFILE%\anaconda3\python.exe" -m streamlit run streamlit_app.py
) else (
  python -m streamlit run streamlit_app.py
)
endlocal
