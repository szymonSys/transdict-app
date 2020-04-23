from random import randint
from app import db
from app.models import User, Collection, Translation, TranslationStatus
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
  db.session.commit()

  half_len = (len(collections) // 2)

  if half_len > 20:
    half_len = (len(collections) // 3)
  elif half_len > 80:
    half_len = (len(collections) // 5)
  elif half_len > 140:
    half_len = (len(collections) // 8)
  elif half_len > 220:
    half_len = (len(collections) // 10)
  elif half_len > 300:
    half_len = (len(collections) // 16)

  random_range = randint(0, half_len)

  for j in range(0, random_range):
    collectionIndex = randint(0,len(collections)-1)
    translationIndex = randint(0,len(translations)-1)
    collections[collectionIndex].translations.append(translations[translationIndex])
    # db.session.commit()
    new_translation_status = TranslationStatus(collectionId=collections[collectionIndex].id, translationId=translations[translationIndex].id)
    db.session.add(new_translation_status)

# db.session.commit()
