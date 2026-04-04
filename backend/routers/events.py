"""CampusSphere — Events Router"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()

class CreateEventRequest(BaseModel):
    title: str
    description: str
    location: str
    event_date: datetime
    category: str
    is_online: bool = False
    is_free: bool = True
    max_capacity: Optional[int] = None

@router.get("/")
async def list_events(category: Optional[str] = None, page: int = 1):
    return {"events": [], "page": page}

@router.get("/{event_id}")
async def get_event(event_id: int):
    return {"id": event_id, "title": "HackSphere 2025"}

@router.post("/")
async def create_event(body: CreateEventRequest):
    return {"id": 1, **body.dict()}

@router.post("/{event_id}/register")
async def register_event(event_id: int):
    return {"event_id": event_id, "registered": True, "message": "Registration confirmed"}

@router.delete("/{event_id}/register")
async def unregister_event(event_id: int):
    return {"event_id": event_id, "registered": False}
