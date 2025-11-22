# File to do all Auth related operations
from datetime import datetime, timedelta
from jose import jwt
from .database import SessionLocal
from .models import User as UserModel

import bcrypt
import re
import logging
logger = logging.getLogger(__name__)


SECRET_KEY=""
EXPIRY_IN_MINS=1440
ALGORITHM="HS256"

db: Session= Depends(get_db)

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
    
    check_user=db.query(UserModel).filter(UserModel.email==decode_token.email).first()
    if not check_user:
        logger.info(f"404 Error: User Not found")
        return False
    
    return True

def get_password_hash(password):
    salt=bcrypt.gensalt(rounds=12)
    hashed_password= bcrypt.hashpw(password, salt)
    return hashed_password

def verify_password(hashed_password):
    check_password= db.query(UserModel).filter(UserModel.hashed_password==hashed_password)
    
    if not check_password:
        logger.info(f"404 Error: User Not found")
        return False
    
    return True

def verify_email_format(email): # regex pattern matching
    regex = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
    if re.fullmatch(regex,email):
        return True
    
    return False

# Append score and remarks for each of the password check if successful
def check_password_strength(password): 
    score=0
    remarks=[]
    
    if re.search(r"[A-Z]",password):
        score +=1
    else:
        remarks.append("Password should contain atleast 1 Uppercase letter!")
        
    if re.search(r"[a-z]",password):
        score +=1
    else:
        remarks.append("Password should contain atleast 1 lowercase letter!")
        
    if re.search(r"\d", password):
        score += 1
    else:
        remarks.append("Password should contain at least one digit!")
        
    if len(password) >=8 :
        score +=1
    else:
        remarks.append("Password should cbe atleast 8 digits")
        
    return score, remarks
    
        
    
    
    