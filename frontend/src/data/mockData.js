// =============================================
// CampusSphere — Mock Data
// =============================================

var POSTS = [
  {
    id: 1,
    av: 'DC',
    avStyle: 'background:linear-gradient(135deg,#667eea,#764ba2)',
    name: 'Dev Club IITK',
    badge: 'Hackathon',
    badgeClass: 'p-hack',
    sub: '2 hours ago · IITK Campus',
    content: '<strong>HackSphere 2025 is here!</strong> 48-hour national hackathon open to all students. Build something amazing — AI, Web3, social impact. Prizes worth <strong>₹5L+</strong>, mentors from Google & Razorpay!',
    event: { day: '28', mon: 'Jun', title: 'HackSphere 2025', loc: 'IIT Kanpur · 48 hrs · 2,400 registered' },
    likes: 342,
    comments: 89
  },
  {
    id: 2,
    av: 'PK',
    avStyle: 'background:linear-gradient(135deg,#00D4AA,#0F6E56)',
    name: 'Priya Kulkarni',
    badge: 'Poll',
    badgeClass: 'p-poll',
    sub: "5 hours ago · NIT Trichy · CSE '26",
    content: 'Which tech stack are you picking for your final year project?',
    poll: [
      { label: 'MERN Stack', pct: 52 },
      { label: 'Django + React', pct: 28 },
      { label: 'FastAPI + Flutter', pct: 12 },
      { label: 'Go + Next.js', pct: 8 }
    ],
    pollVotes: 1284,
    likes: 97,
    comments: 34
  },
  {
    id: 3,
    av: 'AS',
    avStyle: 'background:linear-gradient(135deg,#FFB347,#854F0B)',
    name: 'Arjun Singh',
    badge: null,
    sub: "8 hours ago · BITS Pilani · ECE '25",
    content: 'Just cracked my first <strong>open source contribution</strong> — got a PR merged into a 12k★ repo! If you want to start contributing, I wrote a guide. DM me! #OpenSource #GitHub #StudentDev',
    likes: 218,
    comments: 56
  },
  {
    id: 4,
    av: 'MR',
    avStyle: 'background:linear-gradient(135deg,#f093fb,#f5576c)',
    name: 'Meera Rao',
    badge: null,
    sub: "10 hours ago · IISC Bangalore · AI/ML",
    content: 'Just got selected for the <strong>Google Research India Fellowship</strong>! 6 months of mentorship + stipend. Apply before June 30 — link in bio. Highly encourage everyone to apply!',
    likes: 892,
    comments: 143
  }
];

var SUGGESTIONS = [
  { initials: 'MR', style: 'background:linear-gradient(135deg,#f093fb,#f5576c)', name: 'Meera Rao', detail: 'IISC · ML Researcher' },
  { initials: 'KJ', style: 'background:linear-gradient(135deg,#4facfe,#00f2fe)', name: 'Karan Joshi', detail: 'DTU · Full-stack Dev' },
  { initials: 'SN', style: 'background:linear-gradient(135deg,#00D4AA,#0F6E56)', name: 'Sneha Nair', detail: 'NSIT · UI/UX Designer' },
  { initials: 'AV', style: 'background:linear-gradient(135deg,#FFB347,#854F0B)', name: 'Aman Verma', detail: 'VIT · GSoC Contributor' }
];

var CHATS = [
  {
    id: 0,
    initials: 'MR',
    style: 'background:linear-gradient(135deg,#f093fb,#f5576c)',
    name: 'Meera Rao',
    detail: 'IISC',
    preview: "Definitely! Let's do it.",
    time: '3:47',
    unread: 0,
    msgs: [
      { me: false, text: 'Hey! Saw your post about the open source contribution. Amazing work!', time: '3:42 PM' },
      { me: true, text: 'Thanks Meera! It took a while but totally worth it. You contributing too?', time: '3:44 PM' },
      { me: false, text: 'Yes! Exploring PyTorch repos. Also — are you joining HackSphere?', time: '3:45 PM' },
      { me: true, text: "Definitely! Already registered. Want to team up? I need an ML person 😄", time: '3:46 PM' },
      { me: false, text: "YES! Let's do it. I'll send you the team invite link.", time: '3:47 PM' }
    ]
  },
  {
    id: 1,
    initials: 'RS',
    style: 'background:linear-gradient(135deg,#667eea,#764ba2)',
    name: 'Riya Sharma',
    detail: 'IITK',
    preview: 'Did you see the new placement stats?',
    time: '2:10',
    unread: 2,
    msgs: [
      { me: false, text: 'Did you see the new placement stats? TCS is coming to campus next week!', time: '2:08 PM' },
      { me: false, text: 'I am preparing for the aptitude round. Any tips?', time: '2:10 PM' }
    ]
  },
  {
    id: 2,
    initials: 'DC',
    style: 'background:linear-gradient(135deg,#00D4AA,#0F6E56)',
    name: 'Dev Club · General',
    detail: 'Group · 48 members',
    preview: 'Registration link is live now',
    time: '1:30',
    unread: 5,
    msgs: [
      { me: false, text: 'Hey everyone! HackSphere registration is now live. Please share with your batchmates.', time: '1:28 PM' },
      { me: false, text: 'Registration link is live now — check pinned message!', time: '1:30 PM' }
    ]
  },
  {
    id: 3,
    initials: 'KJ',
    style: 'background:linear-gradient(135deg,#4facfe,#00f2fe)',
    name: 'Karan Joshi',
    detail: 'DTU',
    preview: "Sure, let's catch up Friday!",
    time: 'Yesterday',
    unread: 0,
    msgs: [
      { me: true, text: 'Hey Karan, want to collaborate on that open source project?', time: 'Yesterday' },
      { me: false, text: "Sure, let's catch up Friday!", time: 'Yesterday' }
    ]
  }
];

var EVENTS = [
  { id: 1, day: '28', mon: 'Jun', title: 'HackSphere 2025', detail: 'IIT Kanpur · 48 hrs · In-person', tag: 'Hackathon', tagStyle: 'background:rgba(108,99,255,.12);color:#A09BFF;border:1px solid rgba(108,99,255,.25)', btnStyle: 'background:#6C63FF', cat: 'hack', dateDay: 28 },
  { id: 2, day: '20', mon: 'Jun', title: 'LLM Fine-tuning Workshop', detail: 'Online · Free · 72 seats left', tag: 'Workshop', tagStyle: 'background:rgba(0,212,170,.1);color:#00D4AA;border:1px solid rgba(0,212,170,.25)', btnStyle: 'background:rgba(0,212,170,.8);color:#0D2B22', cat: 'workshop', dateDay: 20 },
  { id: 3, day: '25', mon: 'Jun', title: 'TechFest Cultural Night', detail: 'NIT Trichy · Entry free', tag: 'Cultural', tagStyle: 'background:rgba(255,107,157,.1);color:#FF9CBF;border:1px solid rgba(255,107,157,.25)', btnStyle: 'background:rgba(255,107,157,.8)', cat: 'cultural', dateDay: 25 },
  { id: 4, day: '15', mon: 'Jun', title: 'Resume Workshop by LinkedIn', detail: 'Online · Free · 240 registered', tag: 'Workshop', tagStyle: 'background:rgba(0,212,170,.1);color:#00D4AA;border:1px solid rgba(0,212,170,.25)', btnStyle: 'background:rgba(0,212,170,.8);color:#0D2B22', cat: 'workshop', dateDay: 15 },
  { id: 5, day: '12', mon: 'Jun', title: 'Google Summer Internship Info', detail: 'Virtual · Open to all years', tag: 'Internship', tagStyle: 'background:rgba(255,179,71,.1);color:#FFB347;border:1px solid rgba(255,179,71,.25)', btnStyle: 'background:rgba(255,179,71,.8);color:#2B1A00', cat: 'intern', dateDay: 12 },
  { id: 6, day: '17', mon: 'Jun', title: 'Open Source Bootcamp', detail: 'BITS Pilani · 3 days', tag: 'Hackathon', tagStyle: 'background:rgba(108,99,255,.12);color:#A09BFF;border:1px solid rgba(108,99,255,.25)', btnStyle: 'background:#6C63FF', cat: 'hack', dateDay: 17 }
];

var COMMUNITIES = [
  { id: 0, initials: 'DC', style: 'background:linear-gradient(135deg,#00D4AA,#0F6E56)', name: 'Dev Club — IITK', members: '4,280 members', desc: 'Official tech club of IIT Kanpur', joined: true },
  { id: 1, initials: 'CS', style: 'background:linear-gradient(135deg,#667eea,#764ba2)', name: 'CyberSec Society', members: '1,840 members', desc: 'CTF and ethical hacking', joined: false },
  { id: 2, initials: 'ML', style: 'background:linear-gradient(135deg,#f093fb,#f5576c)', name: 'ML Research Group', members: '2,100 members', desc: 'Papers, models, discussions', joined: true },
  { id: 3, initials: 'NS', style: 'background:linear-gradient(135deg,#FFB347,#854F0B)', name: 'NSS Campus Cell', members: '890 members', desc: 'Social service initiatives', joined: false },
  { id: 4, initials: 'DR', style: 'background:linear-gradient(135deg,#4facfe,#00f2fe)', name: 'Dramatics Club', members: '620 members', desc: 'Theatre and performing arts', joined: false }
];
