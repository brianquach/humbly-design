#!/usr/bin/python
activate_this = '/var/www/humblydesign/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/humblydesign/")

from humblydesign import app as application
application.secret_key = '#umbleeD3s!gn'
