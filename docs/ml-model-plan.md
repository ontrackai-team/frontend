# ML Model Plan — AI Assessment Tracking Assistant

## Objective

The ML system provides intelligent academic workload assistance rather than fixed rule-based reminders.

The goal is to predict risk, prioritize work, and recommend scheduling decisions.

---

# ML Problem 1 — Deadline Risk Prediction

## Objective

Predict probability of a student missing an assessment deadline.

---

## Input Features

- Days remaining
- Assessment weight
- Course count
- Pending assessments
- Overdue assessments
- Study consistency score
- Completion history
- Workload score
- Assessment complexity

---

## Output

Risk probability.

Example:

```txt
Machine Learning Project
Risk Score: 84%
Status: HIGH RISK
```

---

## Candidate Models

Initial:

- Logistic Regression
- Random Forest Classifier

Later Experiments:

- XGBoost
- LightGBM

---

## Training Dataset Strategy

Week 1–2:

Synthetic academic behavior dataset generation.

Week 3+:

Collect anonymous behavioral usage data.

---

## Evaluation Metrics

Accuracy

Precision

Recall

F1 Score

ROC-AUC

---

# ML Problem 2 — Assessment Prioritization

## Objective

Predict which assessment should be completed first.

---

## Inputs

- Deadline proximity
- Importance weighting
- Estimated effort
- User workload
- Course urgency
- Historical delay patterns

---

## Output

Priority Score.

Example:

```txt
Operating Systems Assignment
Priority Score: 92
Rank: 1
```

---

## Candidate Models

- Gradient Boosting
- Random Forest Ranking
- Rule-assisted ML Hybrid

---

# ML Problem 3 — Study Schedule Recommendation

## Objective

Generate adaptive workload schedules.

---

## Inputs

- Available study hours
- Assessment deadlines
- Complexity scores
- User productivity behavior

---

## Outputs

Daily study plans.

Example:

Monday

2h — Data Structures

1h — Software Engineering Quiz

45m — Database Review

---

# NLP Extraction Service

## Goal

Automatically extract academic data from uploaded materials.

---

## Sources

Emails

PDF Syllabi

Assignment Instructions

Course Documents

---

## Tasks

Deadline Extraction

Course Identification

Assessment Type Classification

Instruction Summarization

---

## Candidate Models

Initial:

OpenAI API / HuggingFace Transformers

Future:

Fine-tuned extraction pipeline.

---

# ML Service Architecture

```txt
Laravel Backend
        ↓
REST Request
        ↓
FastAPI ML Service
        ↓
Model Inference
        ↓
Prediction Response
        ↓
Backend Database Storage
```

---

## Deployment Strategy

Inference API:

Python FastAPI

Hosting:

Render Free Tier

Model Storage:

Pickle / Joblib

Future Upgrade:

Dockerized model serving.

---

## Long-Term Vision

The system evolves from deadline tracking into a personalized academic intelligence platform that continuously adapts to student behavior and workload patterns.
