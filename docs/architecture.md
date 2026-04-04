# CampusSphere — System Architecture

## Overview

CampusSphere is a campus social networking platform designed as a microservices-ready monolith. The system is split into a FastAPI backend, a PostgreSQL database, Redis for caching and pub/sub, and a frontend (HTML prototype → React Native mobile).

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│   React Native App (iOS/Android) + Web (HTML/JS)    │
└─────────────┬───────────────────────────────────────┘
              │ HTTPS / WebSocket
┌─────────────▼───────────────────────────────────────┐
│                  FastAPI Backend                      │
│                                                       │
│  ┌─────────┐ ┌──────┐ ┌────────┐ ┌───────────────┐  │
│  │  Auth   │ │Posts │ │Events  │ │ Communities   │  │
│  │ Router  │ │Router│ │ Router │ │    Router     │  │
│  └─────────┘ └──────┘ └────────┘ └───────────────┘  │
│                                                       │
│  ┌──────────────────────────────────────────────┐    │
│  │          Chat Router (WebSocket)             │    │
│  └──────────────────────────────────────────────┘    │
└──────┬────────────────────────┬────────────────────── ┘
       │                        │
┌──────▼──────┐          ┌──────▼──────┐
│ PostgreSQL  │          │    Redis    │
│             │          │             │
│ - users     │          │ - sessions  │
│ - posts     │          │ - feed cache│
│ - events    │          │ - chat pub/ │
│ - messages  │          │   sub       │
│ - threads   │          │ - OTP codes │
│ + pgvector  │          └─────────────┘
└─────────────┘
       │
┌──────▼──────┐
│   AWS S3    │
│ (media/     │
│  avatars)   │
└─────────────┘
```

---

## Authentication Flow

```
1. User submits college email (e.g. arjun@iitk.ac.in)
2. Backend detects college from domain → confirms "IIT Kanpur"
3. OTP sent to college email (6-digit, 10 min expiry)
4. User enters OTP → account activated
5. JWT issued (7-day expiry)
6. All API calls use Bearer token
```

---

## Real-Time Chat

```
Client A ──WS connect──► FastAPI WebSocket
Client B ──WS connect──► FastAPI WebSocket

A sends msg ──► FastAPI ──► Redis pub/sub ──► FastAPI ──► B receives msg
                              (channel: user:{B.id})
```

For production: use Redis Streams or a dedicated message broker (RabbitMQ).

---

## Feed Ranking (AI Layer)

The personalised feed uses a simple scoring model:
- Recency score (time decay)
- Engagement score (likes + comments × weight)
- Relevance score (interest overlap via pgvector cosine similarity)
- College proximity score

```
final_score = 0.4 * recency + 0.3 * engagement + 0.2 * relevance + 0.1 * proximity
```

---

## Database Decisions

- **PostgreSQL** for relational data (users, posts, events)
- **pgvector** for AI-based recommendation (user/post embeddings)
- **Redis** for ephemeral data (OTPs, sessions, chat pub/sub, feed cache)
- **AWS S3** for media (avatars, post images, voice notes)

---

## Scaling Plan

| Component | Solution |
|-----------|----------|
| API servers | Horizontal scaling behind load balancer |
| DB reads | Read replicas + Redis cache |
| Chat | Redis pub/sub → Kafka at scale |
| Media | CDN (CloudFront) in front of S3 |
| Search | Meilisearch or pgvector for semantic search |
