from datetime import datetime
from app import db


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  publicId = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  isAdmin = db.Column(db.Boolean, default=False, nullable=False)
  collections = db.relationship('Collection', backref='user')


db.Table('translation_collection',
db.Column('collection_id', db.Integer, db.ForeignKey('collection.id')),
db.Column('translation_id', db.Integer, db.ForeignKey('translation.id')))


class Collection(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('user.id'))
  updatedAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  translations = db.relationship('Translation', secondary='translation_collection', backref='collections')


class Translation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  primaryPhrase = db.Column(db.Text, nullable=False)
  secondaryPhrase = db.Column(db.Text, nullable=False)
  primaryLanguage = db.Column(db.String(16), nullable=False)
  secondaryLanguage = db.Column(db.String(16), nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)


class TranslationStatus(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  collectionId = db.Column(db.Integer, db.ForeignKey('collection.id'), nullable=False)
  collection = db.relationship('Collection', backref='statuses')
  translationId = db.Column(db.Integer, db.ForeignKey('translation.id'), nullable=False)
  translation = db.relationship('Translation')
  isLearned = db.Column(db.Boolean, nullable=False, default=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updatedAt = db.Column(db.DateTime, default=datetime.now, nullable=False)


  
  


