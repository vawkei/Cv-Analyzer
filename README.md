# AI CV Analyzer

An applied AI web application that analyzes a candidate’s CV against a job description using Large Language Models (LLMs) and returns structured, actionable insights such as fit score, strengths, skills, gaps, and a summary.

This project focuses on LLM application engineering, not model training; demonstrating how to integrate AI into real-world products with proper frontend, backend, and data flow architecture.

# Live Demo

**Frontend:**
https://cv-analyzer-nc73.onrender.com

(Backend is deployed as a separate web service on Render)

# What This App Does

Users can:

- Upload a PDF CV or paste raw CV text

- Provide a job description

**Receive an AI-generated analysis including:**

- Fit score (0–100)

- Strengths

- Tools & skills used by the candidate

- Gaps relative to the job role

- Concise summary

The analysis is returned as structured JSON, making it suitable for UI rendering, storage, or further processing.

# Key Design Decisions

- Frontend and backend are fully decoupled

- No model training. Focuses on applied AI usage

- LLM outputs constrained to strict JSON

- In-memory PDF processing (no filesystem dependency)

- State handled via React Query cache

# Tech Stack
**Frontend:**

- React

- TypeScript

- TanStack React Query

- React Router

- SCSS Modules

**Backend:**

- Node.js

- Express

- TypeScript

- Mongodb

- Multer (file uploads)

- unpdf (PDF text extraction)

# AI

- Google Gemini (LLM inference)

- Prompt-engineered structured output (JSON)

# Deployment

- Render (Static Site for frontend)

- Render (Web Service for backend)

# Important Notes

- LLM outputs are non-deterministic
Identical inputs may produce slightly different scores (expected behavior).

# Getting Started (Run Locally)

**Prerequisites**
- I used Node.js v20.19.0

- npm 

- A Gemini API key (or equivalent LLM provider)

# Clone the Repository
```bash
git clone https://github.com/your-username/cv-analyzer.git
```
# Start the Frontend
```bash
cd frontend
```

# Environment Variables
Create a .env file in the front directory:

```bash
VITE_BACKEND_URL=
VITE_FRONTEND_URL=
```

```bash
npm install
```

```bash
npm run dev
```

# Start the Backend
```bash
cd backend
```

# Environment Variables
Create a .env file in the backend directory:

```bash
JWT_LIFETIME=
JWT_SECRET_V=
GEMINI_API_KEY=
MONGODB_URI=
```

```bash
npm install
```

```bash
npm run dev
```

Also, make sure your internet connection is on, so as to connect the backend to mongodb

# Using the App

- Upload a PDF CV or paste CV text

- Enter a job description

- Submit for analysis

- View structured AI feedback on the results page

# Development Notes

- React Query is used for state caching across routes

- Backend processes PDFs in-memory

- LLM responses are validated before UI rendering


