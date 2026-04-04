"""CampusSphere — Communities Router"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class CreateCommunityRequest(BaseModel):
    name: str
    description: str
    category: str
    college: Optional[str] = None

class CreateThreadRequest(BaseModel):
    title: str
    content: str

@router.get("/")
async def list_communities(category: Optional[str] = None, college: Optional[str] = None):
    return {"communities": []}

@router.get("/{community_id}")
async def get_community(community_id: int):
    return {"id": community_id, "name": "Dev Club IITK"}

@router.post("/")
async def create_community(body: CreateCommunityRequest):
    return {"id": 1, **body.dict()}

@router.post("/{community_id}/join")
async def join_community(community_id: int):
    return {"community_id": community_id, "joined": True}

@router.delete("/{community_id}/join")
async def leave_community(community_id: int):
    return {"community_id": community_id, "joined": False}

@router.get("/{community_id}/threads")
async def get_threads(community_id: int, page: int = 1):
    return {"threads": [], "community_id": community_id}

@router.post("/{community_id}/threads")
async def create_thread(community_id: int, body: CreateThreadRequest):
    return {"id": 1, "community_id": community_id, **body.dict()}

@router.get("/{community_id}/members")
async def get_members(community_id: int):
    return {"members": [], "count": 0}
