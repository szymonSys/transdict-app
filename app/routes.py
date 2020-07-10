from flask import request, jsonify, make_response
from app import app
from app import db
from app import hashing
from app.models import User, Collection, Translation, TranslationStatus
from app.session_handler import start_session, end_session, check_session
from app.list_to_string import list_to_string
from app.set_sort_direction import set_direction
from app.token_authentication import token_required
from secrets import token_urlsafe
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func
import datetime
import uuid
import jwt



@app.route("/sign-up", methods=['POST'])
def create_user():
  if check_session():

    return jsonify({'message': 'You already are logged in', 'isSignedUp': False, 'isLoggedIn': True})

  data = request.get_json(silent=True, force=True)
  password = data.get('password')
  email = data.get('email')

  if not (password or email):
    return jsonify({'message': 'Invalid user data', 'isSignedUp': False, 'isLoggedIn': False})

  hashed_password = generate_password_hash(password, method='sha256')

  try:
    if User.query.filter_by(email=email).first():
      return jsonify({
    'message': 'The email provided is already taken',
    'isSignedUp': False,
    'isLoggedIn': False
    })
    
    new_user = User(email=email,password=hashed_password, publicId=str(uuid.uuid4()))
    db.session.add(new_user)
    db.session.commit()
  except:
    return jsonify({
    'message': 'Signing up failed',
    'isSignedUp': False,
    'isLoggedIn': False
    })

  token = jwt.encode({'publicId': new_user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=1000)}, app.config['SECRET_KEY'])
  start_session(new_user.publicId)

  return jsonify({
    'message': 'You are signed up successfully!',
    'token': token.decode('UTF-8'),
    'publicId': new_user.publicId,
    'email': new_user.email,
    'isSignedUp': True,
    'isLoggedIn': True
    })





@app.route("/login", methods=['POST'])
def login():
  if check_session():

    return jsonify({'message': 'You already are logged in', 'isLoggedIn': True})

  data = request.get_json(silent=True, force=True)
  email = data.get('email')
  password = data.get('password')

  if not email or not password:

    return jsonify({'message':'Could not verify user', 'isLoggedIn': False})

  user = User.query.filter_by(email=email).first()
  if not user:

    return jsonify({'message':'There is not these user', 'isLoggedIn': False})

  if check_password_hash(user.password, password):
    token = jwt.encode({'publicId': user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=1000)}, app.config['SECRET_KEY'])
    start_session(user.publicId)

    return jsonify({'message': 'Logging in success!','token': token.decode('UTF-8'), 'isLoggedIn': True, 'publicId': user.publicId,
    'email': user.email})

  return jsonify({'message': 'Incorrect password', 'isLoggedIn': False})





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

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False, 'isAuthenticated': False})

  return jsonify({
    'message': 'authentication success!',
    'publicId': current_user.publicId,
    'email': current_user.email,
    'isAuthenticated': True,
    })





@app.route("/user/collections/update", methods=['POST', 'PUT', 'DELETE'])
@token_required
def update_collection(current_user):
  if not check_session():

    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

  data = request.get_json(silent=True, force=True)

  if data == None:
    data = {}

  request_action = request.args.get('action')
  request_collection_id = request.args.get('collectionId')
  request_translation_id = request.args.get('translationId')

  primaryLanguage = data.get('primaryLanguage')
  secondaryLanguage = data.get('secondaryLanguage')
  primaryPhrase = data.get('primaryPhrase')
  secondaryPhrase = data.get('secondaryPhrase')

  if request_collection_id == None:

    return jsonify({'message': '"collectionId" argument has to be instance of Int', 'isUpdated': False})

  target_collection =  None
  target_collection = Collection.query.filter(db.and_(Collection.id==int(request_collection_id), Collection.userId==current_user.id)).first()

  if not target_collection:

    return jsonify({'message': 'Not found collection named', 'isUpdated': False})


  if request_action == 'add':
    translation = Translation.query.filter(db.and_(Translation.primaryPhrase == primaryPhrase, Translation.secondaryPhrase==secondaryPhrase)).first()

    if not translation:
      translation = Translation(
        primaryPhrase=primaryPhrase,
        secondaryPhrase=secondaryPhrase,
        primaryLanguage=primaryLanguage,
        secondaryLanguage=secondaryLanguage
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

    return jsonify({'isUpdated': True, 'newTranslation': {'id': translation.id, 'primaryPhrase': translation.primaryPhrase, 'secondaryPhrase': translation.secondaryPhrase, 'primaryLanguage': translation.primaryLanguage, 'secondaryLanguage': translation.secondaryLanguage, 'updatedAt': translation.updatedAt, 'createdAt': translation.createdAt, 'collectionId': new_translation_status.collectionId, 'isLearned': new_translation_status.isLearned }})

  elif request_action == 'delete':
    if request.args.get('translationId') == None:

      return jsonify({'message': '"translationId" argument has to be instance of Int', 'isUpdated': False})
    
    target_translation = None

    for translation_in_coll in target_collection.translations:
      if translation_in_coll.id == int(request_translation_id):
        target_translation = translation_in_coll
        break

    if not target_translation:

      return jsonify({'message': 'Translation is not found', 'isUpdated': False})

    translation_status = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==target_collection.id, TranslationStatus.translationId==target_translation.id)).first()

    if translation_status:
      db.session.delete(translation_status) 

    translationId = target_translation.id

    target_collection.translations.remove(target_translation)
    db.session.commit()

    return jsonify({'isUpdated': True, 'id': translationId})

  elif request_action == 'check':
 
    translation_status = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId==target_collection.id, TranslationStatus.translationId==request_translation_id)).first()

    if not translation_status:

      return jsonify({'message': 'Translation does not have any status', 'isUpdated': False})

    translation_status.isLearned = not translation_status.isLearned
    translation_status.updatedAt = datetime.datetime.now()
    db.session.commit()

    return jsonify({'translationIsLearned': translation_status.isLearned, 'isUpdated': True, 'id': translation_status.id})

  else:

    return jsonify({'message': 'Invalid request "action" argument', 'isUpdated': False})





@app.route("/user/collections/new", methods=['POST'])
@token_required
def add_collection(current_user):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})
  request_data = request.get_json(silent=True, force=True)
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

  return jsonify({'isAdded': True, 'newCollectionName': new_collection.name})





@app.route("/user/collections/delete", methods=['DELETE'])
@token_required
def delete_collection(current_user):
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
  sort_by = request.args.get('sortBy')
  sort_direction = request.args.get('sortDirection')

  if limit == None or offset == None:

    return jsonify({'message': 'Invalid request. Please give correct limit and offset arguments', 'contentIsSent': False})

  order_by_options = {"name": Collection.name, "translationsQuantity": 'total', "learnedQuantity": 'learned',"createdAt": Collection.createdAt, "updatedAt": Collection.updatedAt, "id": Collection.id,}

  order_by = order_by_options.get(sort_by)

  learned_by_collection_sq = db.session.query(Collection.id.label('c_id'), func.count(TranslationStatus.id).label('learned')).outerjoin(Collection, Collection.id==TranslationStatus.collectionId).filter(db.and_(TranslationStatus.isLearned==True, Collection.userId==current_user.id)).group_by(Collection.id).subquery()

  
  collections = db.session.query(Collection, func.count(TranslationStatus.id).label('total'), learned_by_collection_sq.c.learned.label('learned')).outerjoin(Collection, Collection.id == TranslationStatus.collectionId).outerjoin(learned_by_collection_sq , Collection.id==learned_by_collection_sq.c.c_id).filter(db.and_(Collection.userId==current_user.id)).group_by(Collection).order_by(set_direction(sort_direction)(order_by)).all()

  response_collections = []

  for collection_data in collections:
    collection = {}
    collection['name'] = collection_data[0].name
    collection['id'] = collection_data[0].id
    collection['createdAt'] = collection_data[0].createdAt
    collection['updatedAt'] = collection_data[0].updatedAt
    collection['translationsQauntity'] = collection_data[1]
    collection['learnedQuantity'] = collection_data[2]

    response_collections.append(collection)

  return jsonify({'collections': response_collections,'limit': int(limit), 'offset': int(offset), 'contentIsSent': True})





@app.route("/user/collection/translations", methods=['GET'])
@token_required
def get_translations_with_limit_and_offset(current_user):
    if not check_session():

      return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})


    limit = request.args.get('limit')
    offset = request.args.get('offset')
    sort_by = request.args.get('sortBy')
    collectionId = request.args.get('collectionId')
    sort_direction = request.args.get('sortDirection')

    if limit == None or offset == None or collectionId == None:
      
      return jsonify({'message': 'Invalid request. Limit, offset and collectionId arguments have to be instance of Ing', 'contentIsSent': False})

    collection = Collection.query.with_entities(Collection.name, Collection.id, Collection.createdAt, Collection.updatedAt).filter(db.and_(Collection.id==collectionId,Collection.userId==current_user.id)).first()

    if not collection:

      return jsonify({'message': 'Collection is not found!', 'contentIsSent': False})

    order_by_options = {"primaryPhrase": Translation.primaryPhrase, "secondaryPhrase": Translation.secondaryPhrase, "createdAt": TranslationStatus.createdAt, "updatedAt": TranslationStatus.updatedAt, "id": Translation.id,}

    order_by = order_by_options.get(sort_by)

    translations = db.session.query(Translation, TranslationStatus).outerjoin(TranslationStatus, Translation.id == TranslationStatus.translationId).filter(db.and_(TranslationStatus.collectionId==collection.id)).order_by(set_direction(sort_direction)(order_by)).limit(limit).offset(offset).all()


    translations_response = []

    for translation in translations:
      trans = {}
      trans['id'] = translation[0].id
      trans['primatyLanguage'] = translation[0].primaryLanguage
      trans['secondaryLanguage'] = translation[0].secondaryLanguage
      trans['primaryPhrase'] = translation[0].primaryPhrase
      trans['secondaryPhrase'] = translation[0].secondaryPhrase
      trans['isLearned'] = translation[1].isLearned
      trans['updatedAt'] = translation[1].updatedAt
      trans['collectionId'] = translation[1].collectionId

      translations_response.append(trans)
    
    return jsonify({'collectionName': collection.name, 'collectionId': collection.id, 'createdAt': collection.createdAt, 'updatedAt': collection.updatedAt, 'translations': translations_response, 'contentIsSent': True})




@app.route("/user/translations", methods=['POST'])
@token_required
def get_translations_by_ids(current_user):
    if not check_session():

      return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})


    collectionId = request.args.get('collectionId')
    data = request.get_json(silent=True, force=True)

    if not data or not collectionId:

      return jsonify({'message': 'No data to download', 'contentIsSent': False})

    translations_ids = data.get('translationsIds')

    if not isinstance(translations_ids, (list, tuple)) or  not len(translations_ids):

      return jsonify({'message': 'translationsIds must be a non-empty list or tuple', 'contentIsSent': False})

    translations_statuses = TranslationStatus.query.filter(db.and_(TranslationStatus.collectionId == collectionId, TranslationStatus.translationId.in_(translations_ids))).all()

    translations_response = []

    for translation_status in translations_statuses:
      translation = {}
      translation['id'] = translation_status.translation.id
      translation['primatyLanguage'] = translation_status.translation.primaryLanguage
      translation['secondaryLanguage'] = translation_status.translation.secondaryLanguage
      translation['primaryPhrase'] = translation_status.translation.primaryPhrase
      translation['secondaryPhrase'] = translation_status.translation.secondaryPhrase
      translation['isLearned'] = translation_status.isLearned
      translation['updatedAt'] = translation_status.updatedAt
      translation['collectionId'] = translation_status.collectionId
      translations_response.append(translation)

    return jsonify({'translations': translations_response, 'contentIsSent': True})



@app.route("/user/collection/translationsIds", methods=['GET'])
@token_required
def getAllTranslationsIdsFromCollection(current_user):
    if not check_session():
      return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

    collectionId = request.args.get('collectionId')
    areLearned = request.args.get('areLearned')

    if not collectionId:

      return jsonify({'message': 'No data to download', 'contentIsSent': False})

    query_resoult = db.session.query(TranslationStatus.translationId).outerjoin(Collection, Collection.id == TranslationStatus.collectionId).filter(db.and_(TranslationStatus.collectionId == collectionId, Collection.userId == current_user.id))

    if areLearned != None:
      boolIsLearned = False
      if areLearned == 'true': 
        boolIsLearned = True

      query_resoult = query_resoult.filter(TranslationStatus.isLearned==boolIsLearned)

    query_resoult = query_resoult.all()

    translationsIds = []

    for row in query_resoult:
      translationsIds.append(row[0])


    return jsonify({'translationsIds': translationsIds, 'isSent': True, 'areLearned': areLearned})









