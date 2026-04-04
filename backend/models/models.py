"""
CampusSphere — SQLAlchemy Database Models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(100), nullable=False)
    email         = Column(String(255), unique=True, index=True, nullable=False)
    college_email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255), nullable=False)
    college       = Column(String(200))
    course        = Column(String(100))
    year          = Column(Integer)
    bio           = Column(Text)
    avatar_url    = Column(String(500))
    is_verified   = Column(Boolean, default=False)
    created_at    = Column(DateTime, default=datetime.utcnow)

    posts       = relationship("Post", back_populates="author")
    memberships = relationship("CommunityMember", back_populates="user")


class Post(Base):
    __tablename__ = "posts"

    id         = Column(Integer, primary_key=True, index=True)
    content    = Column(Text, nullable=False)
    post_type  = Column(String(20), default="text")  # text, image, poll, event
    author_id  = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    likes      = Column(Integer, default=0)
    comments   = Column(Integer, default=0)

    author   = relationship("User", back_populates="posts")
    post_tags = relationship("PostTag", back_populates="post")


class PostTag(Base):
    __tablename__ = "post_tags"

    id      = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    tag     = Column(String(100))

    post = relationship("Post", back_populates="post_tags")


class Event(Base):
    __tablename__ = "events"

    id           = Column(Integer, primary_key=True, index=True)
    title        = Column(String(200), nullable=False)
    description  = Column(Text)
    location     = Column(String(300))
    event_date   = Column(DateTime)
    category     = Column(String(50))  # hackathon, workshop, cultural, internship
    organizer_id = Column(Integer, ForeignKey("users.id"))
    max_capacity = Column(Integer)
    registered   = Column(Integer, default=0)
    is_online    = Column(Boolean, default=False)
    is_free      = Column(Boolean, default=True)
    created_at   = Column(DateTime, default=datetime.utcnow)

    registrations = relationship("EventRegistration", back_populates="event")


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id           = Column(Integer, primary_key=True)
    event_id     = Column(Integer, ForeignKey("events.id"))
    user_id      = Column(Integer, ForeignKey("users.id"))
    registered_at = Column(DateTime, default=datetime.utcnow)

    event = relationship("Event", back_populates="registrations")


class Community(Base):
    __tablename__ = "communities"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(200), nullable=False)
    description = Column(Text)
    category    = Column(String(100))
    college     = Column(String(200))
    created_by  = Column(Integer, ForeignKey("users.id"))
    created_at  = Column(DateTime, default=datetime.utcnow)
    member_count = Column(Integer, default=0)

    members = relationship("CommunityMember", back_populates="community")
    threads = relationship("Thread", back_populates="community")


class CommunityMember(Base):
    __tablename__ = "community_members"

    id           = Column(Integer, primary_key=True)
    community_id = Column(Integer, ForeignKey("communities.id"))
    user_id      = Column(Integer, ForeignKey("users.id"))
    role         = Column(String(50), default="member")  # admin, moderator, member
    joined_at    = Column(DateTime, default=datetime.utcnow)

    community = relationship("Community", back_populates="members")
    user      = relationship("User", back_populates="memberships")


class Thread(Base):
    __tablename__ = "threads"

    id           = Column(Integer, primary_key=True, index=True)
    title        = Column(String(300), nullable=False)
    content      = Column(Text)
    community_id = Column(Integer, ForeignKey("communities.id"))
    author_id    = Column(Integer, ForeignKey("users.id"))
    reply_count  = Column(Integer, default=0)
    like_count   = Column(Integer, default=0)
    is_pinned    = Column(Boolean, default=False)
    created_at   = Column(DateTime, default=datetime.utcnow)

    community = relationship("Community", back_populates="threads")


class Message(Base):
    __tablename__ = "messages"

    id          = Column(Integer, primary_key=True, index=True)
    sender_id   = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    group_id    = Column(Integer, ForeignKey("communities.id"), nullable=True)
    content     = Column(Text, nullable=False)
    sent_at     = Column(DateTime, default=datetime.utcnow)
    is_read     = Column(Boolean, default=False)
