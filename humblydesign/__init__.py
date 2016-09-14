from flask import Flask
from flask_mail import Mail

app = Flask(__name__)

app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'localhost',
    MAIL_PORT = 25,
    MAIL_DEFAULT_SENDER = ('Humbly Design System', 'noreply@humblydesign.com')
))
mail = Mail(app)

import humblydesign.views
