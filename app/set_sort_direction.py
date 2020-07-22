from sqlalchemy import asc, desc

def set_direction(direction='desc'):
  if direction.lower() == 'desc':
    return desc
  return asc