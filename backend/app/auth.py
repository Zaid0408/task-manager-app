# File to do all Auth related operations
from datetime import datetime, timedelta
from jose import jwt
from .database import SessionLocal
from .models import User as UserModel

import bcrypt
import re
import logging
logger = logging.getLogger(__name__)


SECRET_KEY="BIG_SECRET"
EXPIRY_IN_MINS=1440
ALGORITHM="HS256"

def create_access_token(data: dict):
    expire_time= datetime.utcnow() + timedelta(minutes=EXPIRY_IN_MINS)
    new_data= data.copy()
    new_data.update({"exp": expire_time})
    access_token= jwt.encode(new_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return access_token

def verify_token(token):
    db = SessionLocal()
    try: 
        # Decode and validate token
        try:
            decode_token = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
            logger.info(f"Decoded Payload: {decode_token}")
        except jwt.ExpiredSignatureError:
            logger.info("Token has expired.")
            return False
        except jwt.InvalidTokenError as e:
            logger.info(f"Invalid token: {e}")
            return False
        except Exception as e:
            logger.info(f"Error decoding token: {e}")
            return False
        
        # Extract and validate email from token
        check_email = decode_token.get("email")
        if not check_email:
            logger.info("Email not found in token payload")
            return False
        
        # Query user from database
        try:
            check_user = db.query(UserModel).filter(UserModel.email == check_email).first()
        except Exception as e:
            logger.info(f"Error in fetching User data: {e}")
            return False
        
        # Verify user exists
        if not check_user:
            logger.info("User not found in database")
            return False
        
        return True
    finally:
        # Always close database session, even if function returns early
        db.close()

def get_password_hash(password):
    salt=bcrypt.gensalt(rounds=12)
    hashed_password= bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(password:str, hashed_password_stored:str):
    # Use bcrypt.checkpw() which extracts salt from stored hash automatically
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password_stored.encode('utf-8'))

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
        remarks.append("Password should be atleast 8 characters")
        
    return score, remarks
    
        
    
    
    