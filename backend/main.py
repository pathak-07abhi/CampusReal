"""
CampusSphere — FastAPI Backend
Run: uvicorn main:app --reload
Docs: http://localhost:8000/docs
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from typing import Optional
import uvicorn

app = FastAPI(
    title="CampusSphere API",
    description="Backend API for CampusSphere — Campus Social Network",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers import auth, users, posts, events, communities, chat

app.include_router(auth.router,        prefix="/api/auth",        tags=["Authentication"])
app.include_router(users.router,       prefix="/api/users",       tags=["Users"])
app.include_router(posts.router,       prefix="/api/posts",       tags=["Posts"])
app.include_router(events.router,      prefix="/api/events",      tags=["Events"])
app.include_router(communities.router, prefix="/api/communities", tags=["Communities"])
app.include_router(chat.router,        prefix="/api/chat",        tags=["Chat"])


@app.get("/")
async def root():
    return {
        "app": "CampusSphere",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
