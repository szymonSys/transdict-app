from datetime import datetime
from app import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  publicId = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  isAdmin = db.Column(db.Boolean, default=False, nullable=False)

  collections = db.relationship('Collection', backref='user', lazy='dynamic')


class Collection(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('user.id'))

  translations = db.relationship('Translation', secondary='translation_collection', backref='collections', lazy='dynamic')


class Translation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  primaryPhrase = db.Column(db.Text, nullable=False)
  secondaryPhrase = db.Column(db.Text, nullable=False)
  primaryLanguage = db.Column(db.String(16), nullable=False)
  secondaryLanguage = db.Column(db.String(16), nullable=False)
  isLearned = db.Column(db.Boolean, nullable=False, default=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)

db.Table('translation_collection',
db.Column('collection_id', db.Integer, db.ForeignKey('collection.id')),
db.Column('translation_id', db.Integer, db.ForeignKey('translation.id')))