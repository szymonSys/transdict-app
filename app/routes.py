from flask import request, jsonify, make_response
from app import app
from app import db
from app import hashing
from app.models import User, Collection, Translation, TranslationStatus
from app.session_handler import start_session, end_session, check_session
from app.token_authentication import token_required
from secrets import token_urlsafe
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import uuid
import jwt

@app.route("/sign-up", methods=['POST'])
def create_user():
  if check_session():

    return jsonify({'message': 'You already are logged in', 'isLoggedIn': True})

  data = request.get_json()
  hashed_password = generate_password_hash(data['password'], method='sha256')

  try:
    new_user = User(email=data['email'],password=hashed_password, publicId=str(uuid.uuid4()))
    db.session.add(new_user)
    db.session.commit()
  except:

    return jsonify({
    'message': 'Signing up failed',
    })

  token = jwt.encode({'publicId': new_user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=90)}, app.config['SECRET_KEY'])
  start_session(new_user.publicId)

  return jsonify({
    'message': 'You are signed up successfully!',
    'token': token.decode('UTF-8'),
    'isLoggedIn': True
    })





@app.route("/login", methods=['GET'])
def login():
  if check_session():

    return jsonify({'message': 'You already are logged in', 'isLoggedIn': True})

  auth = request.authorization
  if not auth or not auth.username or not auth.password:

    return make_response('Could not verify user', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})

  user = User.query.filter_by(email=auth.username).first()
  if not user:

    return make_response('There is not these user', 401, {'WWW-Authenticate': 'Basic realm="Not found user"'})

  if check_password_hash(user.password, auth.password):
    token = jwt.encode({'publicId': user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=90)}, app.config['SECRET_KEY'])
    start_session(user.publicId)

    return jsonify({'token': token.decode('UTF-8'), 'isLoggedIn': True})

  return make_response('Could not verify user', 401, {'WWW-Authenticate': 'Basic realm="Incorrect password"'})





@app.route("/logout", methods=['GET'])
@token_required
def logout(current_user):
  if end_session():

    return jsonify({'message': 'You are logged out', 'isLoggedIn': False})

  return jsonify({'message': 'You are not logged in', 'isLoggedIn': False})





@app.route("/user", methods=['GET'])
@token_required
def get_user(current_user):
  if not check_session():

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

  return jsonify({
    'publicId': current_user.publicId,
    'email': current_user.email,
    'createdAt': current_user.createdAt
    })





@app.route("/user/collections/<string:collectionName>/update", methods=['POST', 'PUT', 'DELETE'])
@token_required
def update_collection(current_user, collectionName):
  if not check_session():

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

  data = request.get_json()
  request_collection_id = request.args.get('collectionId')

  if request_collection_id == None:

    return jsonify({'message': '"collectionId" argument has to be instance of Int', 'isUpdated': False})

  target_collection =  None
  target_collection = Collection.query.filter(db.and_(Collection.id==int(request_collection_id), Collection.userId==current_user.id)).first()
  
  if not target_collection:

    return jsonify({'message': 'Not found collection named', 'isUpdated': False})

  translation = Translation.query.filter(db.and_(Translation.primaryPhrase == data["primaryPhrase"], Translation.secondaryPhrase==data["secondaryPhrase"])).first()
  
  if request.args['action'] == 'add':
    if not translation:
      translation = Translation(
        primaryPhrase=data["primaryPhrase"],
        secondaryPhrase=data["secondaryPhrase"],
        primaryLanguage=data["primaryLanguage"],
        secondaryLanguage=data["secondaryLanguage"]
        )
    for translation_in_col in target_collection.translations:
      if translation.primaryPhrase == translation_in_col.primaryPhrase and  translation.secondaryPhrase == translation_in_col.secondaryPhrase:

        return jsonify({'message': 'You already have the same translation in this collection','isUpdated': False})
    
    db.session.add(translation)
    db.session.commit()
    target_collection.translations.append(translation)
    new_translation_status = TranslationStatus(collectionId=target_collection.id,translationId=translation.id)
    db.session.add(new_translation_status)
    db.session.commit()

    return jsonify({'isUpdated': True})

  elif request.args['action'] == 'delete':
    if request.args.get('translationId') == None:

      return jsonify({'message': '"translationId" argument has to be instance of Int', 'isUpdated': False})
    
    target_translation = None

    for translation_in_coll in target_collection.translations:
      if translation_in_coll.id == int(request.args.get('translationId')):
        target_translation = translation_in_coll
        break

    if not target_translation:

      return jsonify({'message': 'Translation is not found', 'isUpdated': False})

    translation_status = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==target_collection.id, TranslationStatus.translationId==target_translation.id)).first()

    if translation_status:
      db.session.delete(translation_status) 

    target_collection.translations.remove(translation)
    db.session.commit()

    return jsonify({'isUpdated': True})

  elif request.args['action'] == 'check':
 
    translation_status = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==target_collection.id, TranslationStatus.translationId==translation.id)).first()
    if not translation_status:

      return jsonify({'message': 'Translation does not have any status', 'isUpdated': False})

    translation_status.isLearned = not translation_status.isLearned
    translation_status.updatedAt = datetime.datetime.now()
    db.session.commit()

    return jsonify({'translationIsLearned': translation_status.isLearned, 'isUpdated': False})

  else:

    return jsonify({'message': 'Invalid request "action" argument', 'isUpdated': False})





@app.route("/user/collections/new", methods=['POST'])
@token_required
def add_collection(current_user):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})
  request_data = request.get_json()
  if not (request_data or request_data['name']):

    return jsonify({'message': 'Something went wrong!', 'isAdded': False})
  
  same_named_collection = None
  for collection in current_user.collections:
    if collection.name == request_data['name']:
      same_named_collection = collection
      break
  
  if same_named_collection:
    return jsonify({'message': 'You already have collection named'+request_data['name'], 'isAdded': False})

  new_collection = Collection(name=request_data['name'])
  db.session.add(new_collection)
  current_user.collections.append(new_collection)
  db.session.commit()

  return jsonify({'isAdded': True})





@app.route("/user/collections/<string:collectionName>/delete", methods=['DELETE'])
@token_required
def delete_collection(current_user, collectionName):
  if not check_session():

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

  collectionId = request.args.get('collectionId')

  if collectionId == None:

    return jsonify({'message': 'Invalid request "collectionId" argument', 'isDeleted': False})

  collection = Collection.query.filter(db.and_(Collection.id==collectionId, Collection.userId==current_user.id)).first()

  if not collection:

    return jsonify({'message': 'Collection is not founded', 'isDeleted': False})

  del_translations_statuses = TranslationStatus.query.filter_by(collectionId=collection.id).all()

  if len(del_translations_statuses):
    for del_trans_status in del_translations_statuses:
      db.session.delete(del_trans_status)

  db.session.delete(collection)
  db.session.commit()

  return jsonify({'deletedCollectionId': collection.id, 'deletedCollectionName': collection.name, 'isDeleted': True})





@app.route("/user/collections", methods=['GET'])
@token_required
def get_collections_with_limit_and_offset(current_user):
  if not check_session():

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

  limit = request.args.get('limit')
  offset = request.args.get('offset')

  if limit == None or offset == None:

    return jsonify({'message': 'Invalid request. Please give correct limit and offset arguments', 'contentIsSent': False})

  collections = Collection.query.filter_by(userId=current_user.id).limit(limit).offset(offset).all()
  response_collections = []

  for collection in collections:
    coll = {}
    learned_quantity = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==collection.id, TranslationStatus.isLearned==True)).count()
    coll['name'] = collection.name
    coll['id'] = collection.id
    coll['createdAt'] = collection.createdAt
    coll['updatedAt'] = collection.updatedAt
    coll['translationsQauntity'] = len(collection.translations)
    coll['learnedQuantity'] = learned_quantity

    response_collections.append(coll)

  return jsonify({'collections': response_collections,'limit': int(limit), 'offset': int(offset), 'contentIsSent': True})





@app.route("/user/collections/<string:collectionName>", methods=['GET'])
@token_required
def get_translations_with_limit_and_offset(current_user, collectionName):
    if not check_session():

      return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

    limit = request.args.get('limit')
    offset = request.args.get('offset')
    collectionId = request.args.get('collectionId')

    if limit == None or offset == None or collectionId == None:
      
      return jsonify({'message': 'Invalid request. Limit, offset and collectionId arguments have to be instance of Ing', 'contentIsSent': False})

    collection = Collection.query.with_entities(Collection.name, Collection.id, Collection.createdAt, Collection.updatedAt).filter(db.and_(Collection.id==collectionId,Collection.userId==current_user.id)).first()
    translations_statuses = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==collection.id)).limit(limit).offset(offset).all()

    if not collection:

      return jsonify({'message': 'Collection is not found!', 'contentIsSent': False})

    translations_response = []

    for translation_status in translations_statuses:
      translation = Translation.query.filter_by(id=translation_status.translationId).first()
      trans = {}
      trans['id'] = translation.id
      trans['primatyLanguage'] = translation.primaryLanguage
      trans['secondaryLanguage'] = translation.secondaryLanguage
      trans['primatyPhrase'] = translation.primaryPhrase
      trans['secondaryPhrase'] = translation.secondaryPhrase
      trans['isLearned'] = translation_status.isLearned
      trans['updatedAt'] = translation_status.updatedAt
      trans['collectionId'] = translation_status.collectionId

      translations_response.append(trans)
    
    return jsonify({'collectionName': collection.name, 'collectionId': collection.id, 'createdAt': collection.createdAt, 'updatedAt': collection.updatedAt, 'translations': translations_response, 'contentIsSent': True})




