from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import User as UserModel
from ..auth import create_access_token, verify_token, get_password_hash, verify_password, verify_email_format, check_password_strength
from ..schemas import (
    UserSignup,
    UserLogin,
    TokenResponse,
    UserInfo,
    UserCreate
)

router=APIRouter(prefix="/auth") # Added auth path properly and added new auth apis

# This file is resposible of handling all the requests to auth and its different endpoints

# Sign Up of User

@router.post("/signup",response_model=TokenResponse)
async def signup(user:UserSignup ,db: Session= Depends(get_db)):
    if not verify_email_format(user.email):
        raise HTTPException(status_code=422,detail="Invalid Email Format")
    
    pass_score, remarks = check_password_strength(user.password)
    if pass_score <=3:
        raise HTTPException(status_code=422,detail=remarks)
    
    existing_user=db.query(UserModel).filter(UserModel.email==user.email).first()
    if existing_user:
        raise HTTPException(status_code=409,detail="User Already Exists")
    
    hashed_password= get_password_hash(user.password)
    
    add_user= UserCreate(
        email=user.email,
        hashed_password=hashed_password,
        name=user.name
    )
    
    db_user=UserModel(**add_user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    token_data=({"name":user.name, "email":user.email})
    token = create_access_token(token_data)
    token_response = TokenResponse(
        access_token=token,
        token_type="Bearer"
    )
    
    return token_response
    