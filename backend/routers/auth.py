"""CampusSphere — Auth Router"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    college_email: EmailStr
    password: str
    college: Optional[str] = None
    course: Optional[str] = None
    year: Optional[int] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: str


@router.post("/register")
async def register(body: RegisterRequest):
    """Register a new student. Triggers OTP to college email."""
    # TODO: hash password, save user, send OTP
    return {
        "message": "OTP sent to college email",
        "email": body.college_email
    }


@router.post("/verify-otp")
async def verify_otp(body: OTPVerifyRequest):
    """Verify OTP from college email and activate account."""
    # TODO: check OTP, mark user verified, return JWT
    return {
        "message": "Account verified",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder"
    }


@router.post("/login")
async def login(body: LoginRequest):
    """Login with email and password."""
    # TODO: verify credentials, return JWT
    return {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder",
        "user": {
            "id": 1,
            "name": "Arjun Kumar",
            "college": "IIT Kanpur"
        }
    }


@router.post("/logout")
async def logout():
    return {"message": "Logged out"}
