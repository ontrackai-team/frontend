# Tech Stack Writeup — AI Assessment Tracking Assistant

## Overview

This document explains the technical choices for the AI Assessment Tracking Assistant, including backend, frontend, ML services, and infrastructure decisions. All tools are selected based on free-tier availability, scalability, and ease of deployment for student teams.

---

## Frontend

### Technology: Next.js + Tailwind CSS

### Why Next.js

- Provides fast server-side rendering
- Supports API integration easily
- Strong ecosystem and deployment support via Vercel
- Ideal for dashboard-based applications

### Why Tailwind CSS

- Rapid UI development
- Mobile-first responsive design
- Reduces need for custom CSS files
- Clean and consistent UI system

---

## Backend

### Technology: Laravel (PHP Framework)

### Why Laravel

- Built-in authentication system
- Strong API routing support
- Secure and production-ready
- Excellent database integration
- Easy learning curve for team scalability

---

## Database

### Technology: MySQL (or PostgreSQL optional)

### Why MySQL

- Reliable relational database
- Free-tier support on multiple platforms
- Strong integration with Laravel
- Suitable for structured academic data (users, assessments, schedules)

---

## Machine Learning Service

### Technology: Python + FastAPI + Scikit-learn

### Why FastAPI

- High-performance API framework
- Easy integration with ML models
- Lightweight and production-ready

### Why Scikit-learn

- Simple ML models for classification and prediction
- Ideal for:
  - deadline risk prediction
  - priority scoring

- Works well on small datasets (perfect for Week 1–3 MVP stage)

---

## AI Integration

### Technology: OpenAI API (or HuggingFace models)

### Why

- Enables NLP-based extraction of assignments
- Helps generate summaries and study recommendations
- Reduces complexity of building NLP from scratch

---

## Caching & Background Jobs

### Technology: Redis (Upstash Free Tier)

### Why

- Handles reminder scheduling efficiently
- Supports queue-based architecture
- Improves system performance for notifications

---

## Hosting

### Frontend: Vercel (Free Tier)

- Fast deployment for Next.js
- GitHub integration
- Automatic CI/CD

### Backend: Render (Free Tier)

- Reliable Laravel hosting
- Easy API deployment
- Auto scaling support

### ML Service: Render (Python Service)

- Hosts FastAPI ML model
- Handles inference requests

---

## External Services

### Authentication: Google OAuth / Laravel Auth

### Notifications: Firebase Cloud Messaging / Email API

### Analytics: PostHog (Free Tier)

### Monitoring: Sentry (Free Tier)

### Calendar Sync: Google Calendar API

---

## Design Philosophy

- Free-tier first (no paid infrastructure)
- Modular architecture (each service independent)
- AI-enhanced decision making (not just reminders)
- Mobile-first UX (African student usage reality)
- Scalable microservice-ready design
