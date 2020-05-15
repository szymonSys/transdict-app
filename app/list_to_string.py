def list_to_string(elemsList, inter=', ', prefix='', sufix=''):
  if not isinstance(elemsList, (list, tuple)):

    return None

  elemsString = prefix

  for elem in elemsList:
    elemsString += str(elem)

    if elemsList.index(elem) < len(elemsList) - 1:
      elemsString += inter

  elemsString += sufix

  return elemsString
  