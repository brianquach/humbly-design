#!/bin/bash -e

#load NVM
source /$HOME/.nvm/nvm.sh

#start the app
app=$HOME/humblydesign
cd $app/dist && cp ./ /var/www/humblydesign
