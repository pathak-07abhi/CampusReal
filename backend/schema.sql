-- CampusSphere PostgreSQL Schema
-- Run: psql -U postgres -d campussphere -f schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    college_email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    college       VARCHAR(200),
    course        VARCHAR(100),
    year          INTEGER,
    bio           TEXT,
    avatar_url    VARCHAR(500),
    is_verified   BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- User skills/interests
CREATE TABLE IF NOT EXISTS user_skills (
    id      SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill   VARCHAR(100) NOT NULL
);

-- Followers
CREATE TABLE IF NOT EXISTS follows (
    follower_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    followed_at  TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
    id         SERIAL PRIMARY KEY,
    content    TEXT NOT NULL,
    post_type  VARCHAR(20) DEFAULT 'text',
    author_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
    likes      INTEGER DEFAULT 0,
    comments   INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post tags
CREATE TABLE IF NOT EXISTS post_tags (
    id      SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    tag     VARCHAR(100)
);

-- Events
CREATE TABLE IF NOT EXISTS events (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    location      VARCHAR(300),
    event_date    TIMESTAMPTZ,
    category      VARCHAR(50),
    organizer_id  INTEGER REFERENCES users(id),
    max_capacity  INTEGER,
    registered    INTEGER DEFAULT 0,
    is_online     BOOLEAN DEFAULT FALSE,
    is_free       BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
    event_id      INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- Communities
CREATE TABLE IF NOT EXISTS communities (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(200) NOT NULL,
    description  TEXT,
    category     VARCHAR(100),
    college      VARCHAR(200),
    created_by   INTEGER REFERENCES users(id),
    member_count INTEGER DEFAULT 0,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Community members
CREATE TABLE IF NOT EXISTS community_members (
    community_id INTEGER REFERENCES communities(id) ON DELETE CASCADE,
    user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role         VARCHAR(50) DEFAULT 'member',
    joined_at    TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (community_id, user_id)
);

-- Threads
CREATE TABLE IF NOT EXISTS threads (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(300) NOT NULL,
    content      TEXT,
    community_id INTEGER REFERENCES communities(id) ON DELETE CASCADE,
    author_id    INTEGER REFERENCES users(id),
    reply_count  INTEGER DEFAULT 0,
    like_count   INTEGER DEFAULT 0,
    is_pinned    BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id          SERIAL PRIMARY KEY,
    sender_id   INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    group_id    INTEGER REFERENCES communities(id),
    content     TEXT NOT NULL,
    sent_at     TIMESTAMPTZ DEFAULT NOW(),
    is_read     BOOLEAN DEFAULT FALSE
);

-- OTP verification
CREATE TABLE IF NOT EXISTS otp_codes (
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL,
    code       VARCHAR(10) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used       BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_threads_community ON threads(community_id);
