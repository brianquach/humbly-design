from humblydesign import app
from humblydesign import mail
from flask import render_template
from flask import request
from flask_mail import Message


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/email', methods=['POST'])
def email():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message = request.form['message']

    msg = Message(
        subject,
        recipients=["hi@humblydesign.com"]
    )
    msg.html = """<strong>Name:</strong> {0}<br>
    <strong>Email:</strong> {1}<br>
    <strong>Subject:</strong> {2}<br>
    <strong>Message:</strong> <p>{3}</p>
    """.format(name, email, subject, message)
    mail.send(msg)
    return 'sent'
