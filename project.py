import os
import subprocess

# Change directory to the React app directory
os.chdir('client')

# Install dependencies (if necessary)
subprocess.run(['npm', 'install'])

# Build the React app
subprocess.run(['npm', 'run', 'dev'])

# Change directory to the Flask backend directory
os.chdir('server')

# Install dependencies (if necessary)
subprocess.run(['pip', 'install', '-r', 'requirements.txt'])

# Start the Flask backend server
subprocess.Popen(['python', 'server.py'])

# Change directory back to the React app directory
os.chdir('client')

# Start the React app server
subprocess.Popen(['serve', '-s', 'build'])