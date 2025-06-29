# THIS IS THE CORRECT CODE for download_nltk_data.py

import nltk
import ssl

# Fix for macOS SSL certificate issues, good practice for any environment
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

print("--- [BUILD STEP] Starting NLTK Downloader ---")
print("--- [BUILD STEP] Attempting to download the 'punkt' package... ---")
nltk.download('punkt')
print("--- [BUILD STEP] 'punkt' package downloaded successfully. ---")