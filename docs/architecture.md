# Architecture Layout — AI Assessment Tracking Assistant

## System Overview

The AI Assessment Tracking Assistant is a cloud-ready academic workload management platform designed to help students manage assessments, deadlines, prioritization, and study planning using AI and machine learning.

The system follows a **layered modular architecture**.

The architecture contains:

1. Client Layer
2. Backend/API Layer
3. Application Services Layer
4. Machine Learning Layer
5. Data Layer
6. External Services Layer

---

# High-Level Architecture Diagram

```txt
┌───────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                          │
└───────────────────────────────────────────────────────────┘

    Web Application (Next.js)
            │
            │ HTTPS / REST API
            ▼

┌───────────────────────────────────────────────────────────┐
│                 BACKEND / API LAYER                       │
└───────────────────────────────────────────────────────────┘

        Laravel API Server

        • Authentication
        • Authorization
        • Request Validation
        • Rate Limiting
        • API Routing
        • Queue Management

            │
            │ Internal Service Calls
            ▼

┌───────────────────────────────────────────────────────────┐
│              APPLICATION SERVICES LAYER                   │
└───────────────────────────────────────────────────────────┘

 ┌──────────────────────┐
 │ User Service         │
 │ Profiles             │
 │ Preferences          │
 └──────────────────────┘

 ┌──────────────────────┐
 │ Assessment Service   │
 │ CRUD Operations      │
 │ Deadline Tracking    │
 │ Submission Status    │
 └──────────────────────┘

 ┌──────────────────────┐
 │ Notification Engine  │
 │ Email Reminders      │
 │ Push Notifications   │
 │ Scheduled Jobs       │
 └──────────────────────┘

 ┌──────────────────────┐
 │ Schedule Generator   │
 │ Study Planning       │
 │ Workload Allocation  │
 └──────────────────────┘

 ┌──────────────────────┐
 │ Priority Engine      │
 │ Urgency Calculation  │
 │ Risk Scoring         │
 └──────────────────────┘

            │
            │ REST API Requests
            ▼

┌───────────────────────────────────────────────────────────┐
│                 MACHINE LEARNING LAYER                    │
└───────────────────────────────────────────────────────────┘

        FastAPI ML Service

        • Deadline Risk Prediction
        • Assessment Prioritization
        • Study Recommendation
        • NLP Extraction Service

            │
            │ Read / Write Operations
            ▼

┌───────────────────────────────────────────────────────────┐
│                     DATA LAYER                            │
└───────────────────────────────────────────────────────────┘

 ┌────────────────────────────┐
 │ PostgreSQL / MySQL         │
 │                            │
 │ Users                      │
 │ Courses                    │
 │ Assessments                │
 │ Study Plans                │
 │ Notifications              │
 │ Logs                       │
 └────────────────────────────┘

 ┌────────────────────────────┐
 │ Redis Queue                │
 │ Background Jobs            │
 │ Reminder Processing        │
 │ Caching                    │
 └────────────────────────────┘

 ┌────────────────────────────┐
 │ File Storage               │
 │ PDF Uploads                │
 │ Assignment Documents       │
 │ Syllabi                    │
 └────────────────────────────┘

            │
            │ Third-Party Integrations
            ▼

┌───────────────────────────────────────────────────────────┐
│                EXTERNAL SERVICES LAYER                    │
└───────────────────────────────────────────────────────────┘

Google OAuth

Google Calendar API

Email APIs

Firebase Cloud Messaging

OpenAI / HuggingFace Models

Sentry Monitoring

PostHog Analytics
```

---

# Component Responsibilities

## 1. Client Layer

### Technology

Next.js + TailwindCSS

### Responsibilities

The frontend provides the user interface for:

* User registration/login
* Dashboard viewing
* Assessment management
* Progress monitoring
* Calendar visualization
* Notification display
* Study schedule viewing

The application is designed mobile-first because most target users rely primarily on smartphones.

---

## 2. Backend/API Layer

### Technology

Laravel API

### Responsibilities

The backend acts as the central orchestration layer.

Functions include:

* Authentication
* Authorization
* API routing
* Validation
* Queue handling
* Business logic coordination
* Communication with ML service

The backend exposes REST endpoints consumed by the frontend.

---

## 3. Application Services Layer

### User Service

Manages:

* user profiles
* preferences
* personalization settings

---

### Assessment Service

Handles:

* assessment creation
* updates
* deletion
* status tracking
* deadline monitoring

---

### Notification Engine

Schedules:

* 7-day reminders
* 3-day reminders
* 1-day reminders
* deadline-day reminders

Supports:

* email notifications
* push notifications

---

### Schedule Generator

Creates personalized study plans based on:

* deadline urgency
* workload level
* available study time

---

### Priority Engine

Computes assessment importance using:

* deadline proximity
* assessment weight
* workload pressure
* predicted risk score

---

## 4. Machine Learning Layer

### Technology

Python FastAPI + Scikit-learn

The ML layer provides intelligent decision support.

---

### Deadline Risk Prediction

Predicts likelihood of missed submissions.

Inputs:

* days remaining
* workload level
* completion history
* overdue count
* assessment complexity

Outputs:

Risk score.

Example:

```txt
Software Engineering Project
Risk: 84%
Status: HIGH RISK
```

---

### Assessment Prioritization

Ranks academic tasks by urgency.

Factors:

* deadline proximity
* course importance
* workload intensity
* historical behavior

---

### Study Recommendation System

Generates adaptive schedules.

Outputs:

daily study plans.

---

### NLP Extraction Service

Extracts assignment details from:

* uploaded PDFs
* syllabi
* assignment instructions
* emails

Performs:

* deadline extraction
* task classification
* instruction summarization

---

## 5. Data Layer

### Database

PostgreSQL / MySQL

Stores:

* users
* courses
* assessments
* schedules
* notifications
* activity logs

---

### Redis Queue

Supports:

* asynchronous reminder jobs
* background processing
* caching
* scheduled task execution

---

### File Storage

Stores:

* syllabus PDFs
* uploaded files
* extracted documents

---

## 6. External Services Layer

### Authentication

Google OAuth.

---

### Calendar Integration

Google Calendar API.

Syncs deadlines automatically.

---

### Email Integration

Extracts assignment-related communication.

---

### Notifications

Firebase Cloud Messaging.

---

### Monitoring

Sentry.

Tracks:

* backend errors
* API failures
* production issues

---

### Analytics

PostHog.

Tracks:

* sessions
* feature usage
* engagement metrics

---

# System Data Flows

## Flow 1 — Assessment Creation

1. Student submits assessment.

2. Frontend sends request to Laravel API.

3. Backend validates request.

4. Assessment Service stores data.

5. Priority Engine calculates score.

6. ML Service predicts risk level.

7. Notification Engine schedules reminders.

8. Database stores final state.

---

## Flow 2 — Assignment Extraction

1. User uploads syllabus PDF.

2. Backend forwards file to ML Service.

3. NLP extraction model processes content.

4. Deadline and instructions extracted.

5. Structured assessment data created.

6. Database updated automatically.

---

## Flow 3 — Daily User Dashboard

1. User opens dashboard.

2. Frontend requests dashboard data.

3. Backend fetches:

* pending tasks
* overdue tasks
* schedules
* risk scores

4. ML service generates recommendations.

5. Dashboard displays:

Today's Focus Plan.

---

# Deployment Architecture

Frontend:

Vercel Free Tier

Backend:

Render Free Tier

ML Service:

Render Python Service

Database:

Supabase PostgreSQL / MySQL

Queue:

Upstash Redis

Monitoring:

Sentry Free Tier

Analytics:

PostHog Free Tier

---

# Design Principles

## Modular Design

Services remain independently scalable.

---

## AI-Augmented Decisions

Machine learning assists prioritization and prediction.

---

## Event-Driven Processing

Notifications and reminders operate asynchronously.

---

## Cloud-Ready Deployment

Supports containerized and service-based deployment.

---

## Mobile-First User Experience

Designed for African students primarily using smartphones.

---

# System Goal

Reduce missed deadlines, improve academic planning, and provide personalized academic workload management using intelligent automation and machine learning.
