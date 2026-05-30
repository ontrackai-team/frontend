# OnTrackAI

# AI Assessment Tracking Assistant

## Team Voke

An AI-powered academic workload management platform designed to help students track assessments, reduce missed deadlines, prioritize tasks intelligently, and manage academic pressure.

---

## Problem Statement

University students frequently manage multiple courses, assignments, quizzes, projects, and examinations simultaneously.

Across African universities, students report recurring challenges:

* Forgotten deadlines
* Last-minute assignment panic
* Poor task organization
* Overwhelming multi-course workloads
* Missed instructor updates
* Lack of prioritization support

Current solutions such as paper planners, phone calendars, and general productivity tools are fragmented, passive, and not built for academic assessment management.

The result is preventable academic stress, poor time management, and reduced performance.

---

## Proposed Solution

AI Assessment Tracking Assistant is a smart academic organization platform that helps students:

* Track assessments in one centralized workspace
* Receive intelligent deadline reminders
* Prioritize academic tasks automatically
* Generate adaptive study schedules
* Predict deadline risk using machine learning
* Extract assignments from emails, syllabi, and uploaded documents

Rather than acting as a simple reminder application, the system functions as an AI-powered academic workload manager.

---

## Core Features

### Smart Reminder Engine

Automated reminders:

* 7 days before deadline
* 3 days before deadline
* 1 day before deadline
* Submission day

---

### Unified Assessment Dashboard

Students can view:

* Pending assessments
* Submitted assessments
* Overdue assessments
* Upcoming deadlines

---

### AI Priority Engine

Machine learning-assisted prioritization based on:

* Deadline proximity
* Assessment importance
* Workload level
* User completion behavior
* Historical submission patterns

---

### Adaptive Study Scheduler

Automatically generates personalized study schedules based on:

* Available workload capacity
* Deadline urgency
* Assessment complexity

---

### Assignment Extraction Service

AI extracts academic information from:

* Emails
* Syllabus PDFs
* Assignment instructions
* Uploaded documents

---

### Deadline Risk Prediction

Predicts probability of missing deadlines using machine learning models.

Example:

> "Database Systems Project — 82% deadline risk."

---

## User Validation Summary

Based on 17 student responses across:

* Ethiopia
* Nigeria
* Kenya
* Uganda
* Malawi
* South Africa

Key findings:

* Frequent deadline forgetting
* Heavy last-minute rushing
* Poor organization systems
* Desire for proactive reminders
* Need for workload prioritization

---

## Technology Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | Next.js + TailwindCSS         |
| Backend        | Laravel API                   |
| Database       | MySQL / PostgreSQL            |
| Queue          | Redis                         |
| ML Service     | Python FastAPI + Scikit-learn |
| Authentication | Laravel Auth / Google OAuth   |
| Hosting        | Vercel + Render               |
| Notifications  | Email / Firebase              |
| Monitoring     | Sentry                        |
| Analytics      | PostHog                       |

---

## System Architecture

Architecture diagram available inside:

docs/architecture-layout.md

---

## Repository Structure

```txt
frontend/
backend/
ml-service/
docs/

README.md
LICENSE
```

---

## Deployment Strategy

Frontend:

Vercel Free Tier

Backend:

Render Free Tier

ML Service:

Render Python Service

Database:

Supabase / PostgreSQL

Redis Queue:

Upstash Redis

---

## Development Roadmap

### Week 1

Problem validation, architecture design, ML planning.

### Week 2

Live MVP deployment.

### Week 3

AI workflows, backend depth, observability.

### Week 4

Distribution experiments.

### Week 5

Security hardening and performance testing.

### Week 6

Production deployment and final release.

---

## License

MIT License
