"""CampusSphere — Posts Router"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class CreatePostRequest(BaseModel):
    content: str
    post_type: Optional[str] = "text"

@router.get("/feed")
async def get_feed(page: int = 1, limit: int = 20):
    return {"posts": [], "page": page, "total": 0}

@router.post("/")
async def create_post(body: CreatePostRequest):
    return {"id": 1, "content": body.content, "created_at": "2025-06-15T10:00:00Z"}

@router.post("/{post_id}/like")
async def like_post(post_id: int):
    return {"post_id": post_id, "liked": True}

@router.post("/{post_id}/comment")
async def comment_post(post_id: int, content: str):
    return {"post_id": post_id, "comment": content}
