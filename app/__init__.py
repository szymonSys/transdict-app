import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask
from flask_hashing import Hashing
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = '<GENERATED_SECRET_KEY>'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://<USER_NAME>:<PASSWORD>@localhost/<DB_NAME>'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
hashing = Hashing(app)

from app import routes
