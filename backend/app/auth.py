# File to do all Auth related operations
from datetime import datetime, timedelta
from jose import jwt
from .database import SessionLocal
from .models import User as UserModel
import logging
logger = logging.getLogger(__name__)


SECRET_KEY=""
EXPIRY_IN_MINS=1440
ALGORITHM="HS256"

db = SessionLocal()

def create_access_token(data: dict):
    expire_time= datetime.utcnow() + timedelta(minutes=EXPIRY_IN_MINS)
    new_data= data.copy()
    new_data.update({"exp": expire_time})
    access_token= jwt.encode(new_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return access_token

def verify_token(token):
    try: 
        decode_token= jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
        logger.info("Decoded Payload: ", decode_token)
    except jwt.ExpiredSignatureError:
        logger.info("Token has expired.")
        return False
    except jwt.InvalidTokenError as e:
        logger.info(f"Invalid token: {e}")
        return False
    except Exception as e:
        logger.info(f"Error decoding token: {e}")
        return False
    
    check_user=db.query(UserModel).filter(UserModel.email==decode_token.email)
    if not check_user:
        logger.info(f"404 Error: User Not found")
        return False
    
    return True
        
    
    
    