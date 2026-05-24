AI Assessment Tracking Assistant — System Architecture

1. Overview

The AI Assessment Tracking Assistant is a system designed to help students manage academic workloads by tracking assessments, prioritizing tasks, generating study schedules, and sending intelligent reminders.

The system is built using a layered architecture consisting of:

Client Layer
Backend/Application Layer
AI/ML Services Layer
Data Layer
External Services Layer

2. System Architecture Layers

2.1 Client Layer

The client layer provides user access through web and mobile applications.

Components:
Web Application (React / Next.js)
Mobile Application (Flutter / React Native)
Responsibilities:
Add and view assessments
View dashboard and progress
Receive notifications and recommendations
Sync calendar and email data

2.2 Backend / API Gateway Layer

This layer acts as the central communication hub between client and services.

Components:
API Gateway / Backend Server
Responsibilities:
Authentication and authorization
Request routing
Input validation
Rate limiting
Communication with internal services

2.3 Application & AI Services Layer

This is the core logic layer of the system.

2.3.1 User Service
Manages user profiles
Stores preferences and settings

2.3.2 Assessment Service
Handles creation and updates of assessments
Tracks deadlines and submission status

2.3.3 Priority Engine (ML-Based)
Calculates priority scores
Performs workload analysis
Predicts deadline risk

2.3.4 Schedule Generator
Generates daily and weekly study plans
Optimizes time allocation based on workload

2.3.5 Notification Engine
Sends reminders and alerts
Supports push and email notifications
Manages scheduling of notifications

2.4 AI / ML Services Layer

This layer enhances intelligence and automation.

Responsibilities:
Extract assignment details from emails and documents
Perform NLP-based parsing of syllabi and instructions
Provide recommendation engine support
Run lightweight ML models for prediction tasks

2.5 Data Layer

The data layer stores all persistent system information.

Components:

1. PostgreSQL Database
   Users
   Assessments
   Courses
   Schedules
   Logs

2. Redis Cache / Queue
   Session storage
   Background job handling
   Task queue management
   Performance caching

3. File Storage
   Syllabus PDFs
   Attachments
   Extracted documents and notes

2.6 External Services Layer

The system integrates with external platforms for extended functionality.

Components:
Authentication Service
Firebase Auth / Google OAuth
Handles secure login and identity management
Email Service
Gmail API / Outlook API
Extracts assignment-related emails and updates
Calendar Service
Google Calendar API
Syncs deadlines and schedules
AI/ML Models (Optional)
Open-source ML models (Hugging Face / local models)
Supports NLP and prediction tasks
Push Notification Service
Firebase Cloud Messaging
Sends real-time alerts to users

3. Data Flow

3.1 Adding an Assessment

User submits assessment via app
Backend processes request
Assessment Service stores data
Priority Engine assigns urgency score
Schedule Generator creates plan
Notification Engine schedules reminders

3.2 External Data Ingestion (Email/LMS)

Email Service fetches messages
AI/ML Service extracts assignment details
Backend stores structured data
System updates schedules automatically

3.3 Daily User Interaction

User opens dashboard
Backend retrieves tasks and priorities
AI services generate recommendations
System displays “Today’s Focus Plan”

4.  Key Design Principles

Modular Architecture: Each service operates independently
Scalability: Services can be scaled separately
AI-Augmented Decision Making: Prioritization and scheduling are ML-assisted
Event-Driven Processing: Notifications and updates are triggered automatically
Cloud-Ready Design: Supports integration with cloud services and APIs

5.  System Goal

To reduce missed deadlines, improve academic planning, and help students manage multiple courses efficiently through AI-powered prioritization and scheduling.
