# Gharpayy CRM MVP Assignment Explanation

## Assignment Overview

Gharpayy is a platform helping students and professionals find PG accommodations in Bangalore. Currently, lead management is fragmented across WhatsApp, website forms, and calls, leading to "lead leakage," unclear ownership, and inconsistent follow-ups.

The goal of this assignment is to build a **Minimum Viable Product (MVP)** of an internal **Lead Management System (CRM)**. This system will centralize all inquiries, ensure every lead is assigned to an owner, and track them through a professional sales pipeline.

## Objective of the Assignment

The objective is to evaluate your **system thinking, code structure, and product design clarity**. You are expected to demonstrate how the system would:

- Automatically capture leads from various sources.
- Assign clear ownership to agents.
- Track the lead lifecycle through a structured pipeline.
- Manage physical property visits.
- Provide real-time visibility into sales performance via a dashboard.

## What Needs to Be Built

You need to develop a functional internal web application. This is not just a landing page; it is a **business operating system**. It should replace manual WhatsApp tracking with a structured, data-driven workflow.

## Expected Features

### 1. Lead Capture

- **Automatic Creation:** Leads should be captured automatically (simulated via form submission).
- **Data Points:** Name, Phone number, Lead source, Timestamp, Assigned agent, and Status.

### 2. Lead Assignment

- **Mechanism:** Implementation of an assignment logic (e.g., **Round Robin** or workload balancing).
- **Accountability:** Each lead must have exactly one clear owner at all times.

### 3. Lead Pipeline

- **Structured Stages:** Move leads through: `New Lead` → `Contacted` → `Requirement Collected` → `Property Suggested` → `Visit Scheduled` → `Visit Completed` → `Booked` → `Lost`.
- **Tracking:** Visibility into where a lead is in the process.

### 4. Visit Scheduling

- **Coordination:** Agents select properties and schedule specific date/time slots for visits.
- **Outcome Logging:** Recording whether the visit resulted in a booking, consideration, or loss.

### 5. Follow-up Reminders

- **Automation:** The system should trigger reminders if a lead remains inactive/stagnant in a stage (e.g., a "Day 1" follow-up prompt).

### 6. Analytics Dashboard

- **Metrics:** A high-level view showing total leads, stage distribution, scheduled visits, and confirmed bookings.

## Project Structure Explanation

The provided environment is a standard **Next.js** setup. To implement the CRM, you should structure your development as follows:

- **UI/UX:** Use the `src/app` directory to build the core views (Dashboard, Lead Management, Visit Calendar).
- **Data Management:** Design a schema to store `Leads`, `Agents`, and `Visits`.
- **Services/Logic:** Implement the lead assignment engine and the reminder trigger logic.
- **Styles:** Use visual hierarchy to make the tool feel premium and easy for agents to use.

## Submission Expectations

Your final submission should include:

1.  **Working MVP:** A local setup or a hosted link where the functionality can be tested.
2.  **Source Code:** A clean, documented repository.
3.  **Technical Document:** A brief explanation covering:
    - **System Architecture:** How the different parts of your CRM interact.
    - **Database Design:** The schema used to manage leads and visits.
    - **Scalability:** How your design would handle thousands of leads daily in a production environment.
    - **Technical Expectations:** Your personal fit for this project and the tools you would choose for a full-scale build.
