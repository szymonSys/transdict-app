import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask
from flask_hashing import Hashing
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'GQ227Lpuzgv-fVSznfxnN_u3jpHOseG5wYwWsCyY1OI'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://szymon:Malopolska1@localhost/transdict_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
hashing = Hashing(app)

from app import routes