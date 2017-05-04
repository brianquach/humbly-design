#!/bin/bash -e

#start the app
app=$HOME/humblydesign

# Clear all files and copy over updated files
cd /var/www/humblydesign && rm -rf * && cd $app/dist && cp -R * /var/www/humblydesign

# Activate virtual environment
cd /var/www/humblydesign && virtualenv venv && source venv/bin/activate
pip install -r $app/requirements.txt && deactivate
