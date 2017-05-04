#!/bin/bash -e

#load NVM
source /$HOME/.nvm/nvm.sh

#start the app
app=$HOME/humblydesign
cd /var/www/humblydesign && rm -rf * && cd $app/dist && cp -R * /var/www/humblydesign
