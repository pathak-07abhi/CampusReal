# CampusSphere 🎓

> A unified campus ecosystem — social media, real-time chat, events, and professional networking for college students.

---

## Project Structure

```
campussphere/
├── frontend/                  # Standalone HTML/CSS/JS app (open index.html)
│   ├── index.html             # Main app entry point
│   └── src/
│       ├── styles/
│       │   └── main.css       # All styles
│       ├── data/
│       │   └── mockData.js    # Mock data (posts, chats, events, communities)
│       └── components/
│           ├── app.js         # Navigation & state controller
│           ├── feed.js        # Feed, posts, compose
│           ├── chat.js        # Messaging UI
│           ├── events.js      # Events hub & calendar
│           └── communities.js # Communities & threads
│
├── backend/                   # FastAPI Python backend
│   ├── main.py                # App entry point
│   ├── requirements.txt       # Python dependencies
│   ├── schema.sql             # PostgreSQL schema
│   ├── .env.example           # Environment variables template
│   ├── models/
│   │   └── models.py          # SQLAlchemy ORM models
│   └── routers/
│       ├── auth.py            # Registration, login, OTP
│       ├── users.py           # User profiles, follow/unfollow
│       ├── posts.py           # Feed, create post, like, comment
│       ├── events.py          # Events CRUD & registration
│       ├── communities.py     # Communities, threads, members
│       └── chat.py            # WebSocket real-time chat
│
└── docs/
    └── architecture.md        # System architecture notes
```

---

## Quick Start

### Frontend (no setup needed)
Just open `frontend/index.html` in any browser. No build step required.

**Working features:**
- 🏠 Feed — like posts, follow users, publish new posts
- 💬 Chat — switch conversations, send messages in real time
- 📅 Events — filter by category, register for events
- 🏢 Communities — browse, join/leave, switch tabs (Threads / Events / Members)
- 👤 Profile — achievements, stats, skills

---

### Backend Setup

**Requirements:** Python 3.11+, PostgreSQL 15+, Redis 7+

```bash
cd backend

# 1. Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Create database
createdb campussphere
psql -U postgres -d campussphere -f schema.sql

# 5. Run the server
uvicorn main:app --reload --port 8000
```

API docs auto-available at: **http://localhost:8000/docs**

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with college email |
| POST | `/api/auth/verify-otp` | Verify OTP from college email |
| POST | `/api/auth/login` | Login, receive JWT |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/feed` | Get personalised feed |
| POST | `/api/posts/` | Create a post |
| POST | `/api/posts/{id}/like` | Like a post |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events/` | List events (filter by category) |
| POST | `/api/events/` | Create event |
| POST | `/api/events/{id}/register` | Register for event |

### Communities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/communities/` | List communities |
| POST | `/api/communities/{id}/join` | Join a community |
| GET | `/api/communities/{id}/threads` | Get threads |
| POST | `/api/communities/{id}/threads` | Post a thread |

### Chat (WebSocket)
```
ws://localhost:8000/api/chat/ws/{user_id}
```
Send: `{ "to": 2, "text": "Hello!", "time": "10:30 AM" }`
Receive: `{ "from": 1, "text": "Hello!", "time": "10:30 AM" }`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS (prototype) → React Native (mobile) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + pgvector (AI search) |
| Cache | Redis |
| Real-time | WebSockets |
| Auth | JWT + OTP via college email |
| Storage | AWS S3 / Firebase Storage |
| Hosting | Railway / Render (backend), Vercel (web) |

---

## Roadmap

- [ ] Connect frontend to live FastAPI backend
- [ ] React Native mobile app (iOS + Android)
- [ ] AI-powered feed ranking
- [ ] Voice rooms (WebRTC)
- [ ] Campus marketplace
- [ ] Leaderboards & gamification
- [ ] AI campus assistant ("Jan Setu AI")

---

## Design System

- **Primary font:** Syne (headings) + DM Sans (body)
- **Accent:** `#6C63FF` (purple) + `#FF6B9D` (pink)
- **Surface:** Dark theme — `#0D0F14` bg, `#161921` surfaces
- **Teal:** `#00D4AA` for success / communities
- **Amber:** `#FFB347` for warnings / highlights

---

Made with ❤️ for campus life.
