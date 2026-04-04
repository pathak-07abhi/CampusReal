"""CampusSphere — Chat Router with WebSocket support"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Dict, List
import json

router = APIRouter()

# In-memory connection manager (replace with Redis pub/sub in production)
class ConnectionManager:
    def __init__(self):
        self.active: Dict[int, List[WebSocket]] = {}

    async def connect(self, user_id: int, ws: WebSocket):
        await ws.accept()
        self.active.setdefault(user_id, []).append(ws)

    def disconnect(self, user_id: int, ws: WebSocket):
        if user_id in self.active:
            self.active[user_id].remove(ws)

    async def send_to(self, user_id: int, message: dict):
        for ws in self.active.get(user_id, []):
            await ws.send_text(json.dumps(message))

manager = ConnectionManager()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    """Real-time WebSocket chat connection."""
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            # Echo to recipient
            await manager.send_to(msg.get("to"), {
                "from": user_id,
                "text": msg.get("text"),
                "time": msg.get("time")
            })
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)


@router.get("/conversations")
async def get_conversations(user_id: int):
    """Get all conversations for a user."""
    return {"conversations": []}


@router.get("/messages/{other_user_id}")
async def get_messages(other_user_id: int, page: int = 1):
    """Get message history between two users."""
    return {"messages": [], "page": page}


class SendMessageRequest(BaseModel):
    receiver_id: int
    content: str

@router.post("/messages")
async def send_message(body: SendMessageRequest):
    """Send a direct message."""
    return {"id": 1, "content": body.content, "sent": True}
