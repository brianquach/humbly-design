#!/bin/bash -e

#load NVM
source /$HOME/.nvm/nvm.sh

#start the app
app=$HOME/humblydesign

# Clear all files and copy over updated files
cd /var/www/humblydesign && rm -rf * && cd $app/dist && cp -R * /var/www/humblydesign

# Activate virtual environment
cd /var/www/humblydesign && source venv/bin/activate
pip install $app/requirements.txt && deactivate
