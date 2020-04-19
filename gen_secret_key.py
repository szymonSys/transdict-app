import secrets
key = (lambda bits : secrets.token_urlsafe(bits))(32)
print(key)