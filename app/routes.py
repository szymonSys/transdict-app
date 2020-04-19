from flask import request, jsonify, make_response
from app import app
from app import db
from app import hashing
from app.models import User, Collection, Translation
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
    return make_response('Could not verify user', 401, {'WWW-Authenticate': 'Basic realm="Not found user"'})

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

@app.route("/user/collections", methods=['GET'])
@token_required
def get_collections_with_limit_and_offset(current_user):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})
  limit = request.args.get('limit')
  offset = request.args.get('offset')
  if not(bool(limit) and bool(offset) and isinstance(limit, int) and isinstance(offset, int)) and offset != 0:
    return jsonify({'message': 'Invalid request. Please give correct limit and offset arguments', 'contentIsSent': False})
  return jsonify({'limit': limit, 'offset': offset})
 
@app.route("/user/collections/<int:collectionId>", methods=['GET'])
@token_required
def get_collection(current_user, collectionId):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

@app.route("/user/collections/new", methods=['POST'])
@token_required
def add_collection(current_user):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

@app.route("/user/collections/<int:collectionId>/update/<string:action>", methods=['POST', 'PUT', 'DELETE'])
@token_required
def update_collection(current_user, collectionId, action):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})

@app.route("/user/collections/<int:collectionId>/delete", methods=['DELETE'])
@token_required
def delete_collection(current_user, collectionId):
  if not check_session():
    return jsonify({'message': 'You are not logged in!', 'isLoggedIn': False})


