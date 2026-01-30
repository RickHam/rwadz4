from flask import Flask, send_from_directory;

app = Flask(__name__)

@approute("/")
def index():
    return send_from_directory("static", "index.html")