"""CampusSphere — Users Router"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

@router.get("/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": "Arjun Kumar", "college": "IIT Kanpur", "course": "CSE", "year": 3}

@router.get("/{user_id}/followers")
async def get_followers(user_id: int):
    return {"followers": [], "count": 1200}

@router.post("/{user_id}/follow")
async def follow_user(user_id: int):
    return {"message": "Followed", "user_id": user_id}

@router.get("/explore")
async def explore_users(skill: Optional[str] = None, college: Optional[str] = None):
    return {"users": []}
