from flask import session

def check_session():
  if 'publicId' in session:
    return True
  return False

def end_session():
  print(check_session())
  if check_session():
    session.pop('publicId', None)
    return True
  return False

def start_session(publicId):
  session['publicId'] = publicId
  return session['publicId']
