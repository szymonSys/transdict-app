from app import app
from app.models import User
from app.session_handler import end_session, start_session, check_session
from flask import request, jsonify, session
from functools import wraps
import jwt

def token_required(func):
  @wraps(func)
  def wrapped_func(*args, **kwargs):
    token = None
    if 'x-access-token' in request.headers:
      token = request.headers['x-access-token']
    
    if not token:
      end_session()
      return jsonify({'message': 'Token is missing!', 'isAuthenticated:': False}), 401

    try:
      data = jwt.decode(token, app.config['SECRET_KEY'])
      current_user = User.query.filter_by(publicId=data['publicId']).first()
    except:
      end_session()
      return jsonify({'message': 'Token is invalid!', 'isAuthenticated:': False}), 401

    return func(current_user, *args, **kwargs)

  return wrapped_func