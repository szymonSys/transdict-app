from random import randint
from app import db
from app.models import User, Collection, Translation
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

users = []
collections = []
translations = []

for i in range(1,400):

  if i <= 120:
    email = 'example'+str(i)+'@gmail.com'
    password = generate_password_hash('password', method='sha256')

    users.append(User(email=email, password=password, publicId=str(uuid.uuid4())))
    db.session.add(users[len(users)-1])

  if i <= 200:
    name = 'My collection'+str(i)

    collections.append(Collection(name=name, user=users[randint(0,len(users)-1)]))
    db.session.add(collections[len(collections)-1])

  primaryPhrase = 'Uwielbiam programować w Pythonie i JavaScript!'
  secondaryPhrase = 'I love programming in Python and JavaScript!'
  primaryLanguage = 'pl'
  secondaryLanguage = 'en'

  translations.append(Translation(primaryPhrase=primaryPhrase,secondaryPhrase=secondaryPhrase,primaryLanguage=primaryLanguage,secondaryLanguage=secondaryLanguage))
  db.session.add(translations[len(translations)-1])

  for j in range(1, randint(1, len(collections))):
    collections[randint(0,j)].translations.append(translations[len(translations)-1])

db.session.commit()

