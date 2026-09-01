import subprocess
import sys

print("Installing rembg with CPU support...")
subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg[cpu]"])

print("Successfully installed rembg backend! You can now run main.py.")