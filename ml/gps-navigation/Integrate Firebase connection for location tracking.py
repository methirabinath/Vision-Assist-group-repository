import firebase_admin
from firebase_admin import credentials, db

FIREBASE_DB_URL = 'https://visionassist-care-default-rtdb.firebaseio.com/'
SERVICE_ACCOUNT_PATH = "serviceAccountKey.json"

cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred, {'databaseURL': FIREBASE_DB_URL})