# FocusFlow Lite: User Flow

This document outlines the step-by-step flow of how a user interacts with FocusFlow Lite. It covers the journey from initial sign-up through daily usage and optional advanced features like body doubling.

---

## 1. Onboarding & Sign-Up

1. **Landing Screen**  
   - The user opens the app or visits the website for the first time.  
   - They see a friendly welcome message: “Welcome to FocusFlow Lite!”  
   - They can choose **Sign Up** or **Log In** if they already have an account.

2. **Sign Up / Log In**  
   - The user enters their email & password (or uses a third-party auth like Google/Facebook).  
   - On successful authentication, they move to a brief setup wizard.

3. **Setup Wizard**  
   - **Step 1: Basic Info**  
     - The user is asked for a display name (e.g., “Sam”), and time zone if needed.  
   - **Step 2: Quick Preferences**  
     - Choose default focus sprint length (10 or 15 minutes).  
     - Choose light or dark mode.  
   - **Finish**  
     - The user taps “Done” and is taken to the Dashboard.

---

## 2. First-Time Dashboard Experience

1. **Dashboard Intro Tooltip**  
   - A short pop-up or tooltip highlights key areas:  
     - “Focus Sprint” button  
     - “Today’s Tasks” list  
     - “Progress Bar” at the top

2. **Prompt to Add First Task**  
   - A floating button or banner: “Add your first task now!”  
   - Tapping it opens the **New Task Modal**.

3. **New Task Modal**  
   - **Task Name** field  
   - **Micro-Steps** suggestion (user can add 2–3 subtasks)  
   - **Save** to store in the user’s task list

4. **Dashboard Refresh**  
   - The newly created task (and its micro-steps) appear in the “Today’s Focus” section.  
   - The daily progress bar is still at 0%.

---

## 3. Daily Usage Flow

### 3.1 Starting the Day
1. **Open App → Dashboard**  
   - User sees the date, a friendly greeting, and the top tasks for today (3–5 max).
2. **Check Micro-Steps**  
   - Each task is collapsible. The user can expand to see micro-steps.

### 3.2 Focus Sprint
1. **Tap “Start Focus Sprint”**  
   - If the user has multiple tasks, they pick which micro-step to tackle first.  
   - A 10–15 minute timer starts.  
   - The screen transitions to a minimal countdown view.
2. **During Sprint**  
   - If the user is idle, a gentle nudge: “Still focusing on [Task]?”  
   - They can pause or end early if needed.
3. **Sprint Completion**  
   - The timer ends with a small animation (e.g., confetti).  
   - The user is prompted to mark the micro-step as complete.  
   - The daily progress bar increments.

### 3.3 Completing Tasks & Micro-Steps
1. **Check Off Micro-Step**  
   - The user checks a box next to the micro-step.  
   - A mini “+10 points” or “Great job!” pop-up appears.  
2. **Repeat**  
   - The user can pick the next micro-step, start another Focus Sprint, or move on to another task.

### 3.4 Brain Dump (Inbox)
1. **Random Idea Mid-Task**  
   - The user taps the “+ Quick Add” bar (visible at the top or bottom).  
   - A text field pops up for them to type an idea or new task.  
   - It automatically goes to the **Inbox** for later sorting.  
2. **Review Inbox**  
   - Periodically, the user can open the Inbox screen, see all items, and either delete or convert them into tasks.

---

## 4. Gamification & Progress

1. **Daily Progress Bar**  
   - A ring or bar at the top that fills as micro-steps are completed.  
   - Resets each day at midnight or user’s chosen reset time.
2. **Mini Achievements**  
   - “Finish 3 micro-steps in one day” triggers a small celebration animation.  
   - The user can see a summary at day’s end (e.g., “You completed 5 micro-steps today!”).
3. **Optional Score**  
   - The user can see a total point tally if they want, but it’s not forced.  
   - They can redeem points for small visual perks (e.g., new theme color).

---

## 5. Optional Body Doubling Flow

1. **Focus Buddy**  
   - On the dashboard or a separate tab, there’s a “Focus Buddy” button.  
2. **Start a Session**  
   - User taps “Start a Co-Working Session” → gets a shareable link.  
   - They can share it with a friend or colleague to join a minimal video/audio call.  
3. **Co-Working Interface**  
   - A small floating window shows the other person’s video feed (or audio only).  
   - Both can see each other’s status: “Currently focusing on [Task name].”  
   - They can do Focus Sprints together or simply keep each other company.
4. **End Session**  
   - They exit the call, returning to the normal dashboard.

---

## 6. Evening / End-of-Day Flow

1. **Daily Summary (Optional)**  
   - When the user logs in at the end of the day or after finishing tasks, a small summary might appear:  
     - “Today you completed X micro-steps, Y tasks. Great job!”
2. **Reflection Prompt**  
   - If enabled, the user can answer a quick question: “What went well today?” or “Any improvements for tomorrow?”
3. **Plan Tomorrow**  
   - The user can quickly add tasks for the next day or reassign tasks from Inbox to tomorrow’s list.

---

## 7. Notifications & Nudges

1. **Focus Sprint Reminders**  
   - If the user hasn’t opened the app by midday, they might get a push notification:  
     - “Ready for a quick focus sprint?”  
2. **Task Overdue Nudge**  
   - If a user sets a due date, the app can gently remind them: “Task X is due soon. Break it down and tackle it now?”
3. **Idle Session**  
   - If the user starts a focus sprint but doesn’t complete it, the app can ask, “Still working or need more time?”

---

## 8. Additional Flows

1. **Edit Task Flow**  
   - The user can tap a task to rename, add more micro-steps, or delete.  
   - Micro-steps can be rearranged or expanded if the user finds them too big.
2. **Settings Flow**  
   - Change theme (light/dark)  
   - Update default sprint duration  
   - Manage notifications (enable/disable push or email reminders)

---

## 9. Error Handling & Edge Cases

1. **No Tasks Today**  
   - Show a friendly message: “Nothing here yet. Add a task or do a brain dump!”  
2. **No Internet Connection**  
   - The app operates in offline mode, saving tasks locally and syncing when back online (if supported by local storage or service worker).  
3. **Overdue Tasks**  
   - Tasks from previous days remain in the user’s “Today” list until completed or rescheduled.

---

## 10. Summary of the User Journey

1. **Sign Up** → Minimal Setup Wizard  
2. **First Dashboard** → Add tasks & micro-steps  
3. **Focus Sprint** → Timed sessions for short bursts  
4. **Complete Micro-Steps** → Quick dopamine hits & progress bar  
5. **Brain Dump** → Keep random ideas out of the user’s head and into Inbox  
6. **End of Day** → Quick summary, optional reflection  
7. **(Optional) Body Doubling** → Shared focus sessions for accountability

This user flow ensures the app remains **simple** and **action-oriented**, aligning with the needs of ADHD users who benefit from short, high-impact interactions and minimal friction.