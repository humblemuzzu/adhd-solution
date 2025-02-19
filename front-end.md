# Front-End Architecture for FocusFlow Lite

## 1. Overview
The front end will be designed for simplicity and speed. We'll use a **component-based** approach (e.g., React on the web, SwiftUI on iOS) to ensure each feature is isolated and easily maintained.

## 2. Tech & Frameworks

### Web (React)
- **React** (with hooks) for core UI
- **State Management**: Context API or Redux (leaning on Context for simplicity)
- **UI Library**: Tailwind CSS or a minimal custom CSS approach to keep it lightweight
- **Routing**: React Router (if needed for multiple pages, but might be a single-page app)

### iOS (SwiftUI)
- **SwiftUI** for declarative UI
- **ViewModel** for each screen (MVVM pattern)
- **Combine** for reactive data flows

## 3. Component Breakdown

### 3.1 Dashboard/Home Screen
- **TodayTasksList**: Renders top 3–5 tasks
  - Each task displays a short label + micro-steps count
- **FocusSprintButton**: Large CTA to start a focus sprint
- **DailyProgressBar**: A ring or bar at the top showing % of tasks/micro-steps completed

### 3.2 Task Creation Modal
- **TaskTitleInput**: Single line for main task name
- **MicroStepInputs**: Suggest user create 2–3 micro-steps
- **SaveButton**: Creates the new task in the DB and returns user to Dashboard

### 3.3 Focus Sprint Overlay
- **TimerDisplay**: Countdown for 10–15 minutes
- **TaskStepIndicator**: Which micro-step is currently in focus?
- **Pause/End Buttons**: Let user end or pause early
- **IdleCheck**: If no action for X seconds, prompt user with “Still working on this?”

### 3.4 Brain Dump (Inbox)
- **QuickAddBar**: Always visible or easily accessible “+ Quick Add”
- **InboxList**: Shows unsorted tasks/notes
- **Sort/Tag**: Minimal options for sorting or labeling

### 3.5 Gamification Elements
- **MiniRewardPopup**: When a user completes a micro-step or ends a focus sprint
  - Could show small animation (confetti) and “+10 points”
- **DailyProgressBar**: Incremented each time a micro-step is done

### 3.6 Body Doubling (Optional for MVP)
- **FocusBuddyButton**: Opens a minimal chat or link to a co-working session
- **FocusBuddyOverlay**: Could be a small video feed if integrated with a 3rd-party service

## 4. Data Flow & State Management

### React (Web)
- **GlobalContext**: 
  - Holds user’s tasks, micro-steps, daily stats
  - Provides actions like `addTask()`, `completeStep()`, `startFocusSprint()`
- **Local State** in components for ephemeral UI states (e.g., whether a modal is open)

### SwiftUI (iOS)
- **ViewModel**:
  - ObservedObject or StateObject for tasks & steps
  - Methods to handle data fetching and updates from a back-end
- **Combine**:
  - Streams for real-time updates (e.g., if using Firebase’s real-time listeners)

## 5. UI/UX Guidelines

1. **Minimal Screens**:
   - Ideally one main screen (Dashboard) + small modals or overlays
2. **Large, Touchable Elements**:
   - Big CTA buttons, easy to read fonts
3. **Encouraging Language**:
   - “Ready to focus?” vs. “Start Timer”
   - “Woohoo!” for completion messages
4. **Light or Dark Mode**:
   - Provide a simple toggle or auto detection

## 6. Interaction Flow

1. **User Opens App** → Sees the Dashboard
2. **User Taps “Focus Sprint”** → A short prompt to pick a micro-step (or picks from a task’s micro-steps) → Timer overlay
3. **Focus Sprint Ends** → Confetti + mini reward pop-up → Progress bar increments
4. **User Adds a New Task** → “Task Creation” modal with micro-step suggestions
5. **User Brain Dump** → Taps “+ Quick Add” to store random idea in Inbox


## 8. Styling & Themes

- **Color Palette**:
  - Calm neutrals for background
  - One accent color (e.g., a cheerful blue or purple) for CTA buttons and progress bars
- **Font Choices**:
  - Sans-serif, easily readable (e.g., Inter, Roboto)

## 9. Future Enhancements

1. **AI Nudges**:
   - Integrate a rules-based or GPT-based system to send motivational or guiding messages
2. **Advanced Gamification**:
   - Streak tracking, achievements, leveling system
3. **Routine Builder**:
   - Users can set up daily routines with pre-set tasks
4. **Calendar Integration**:
   - Optionally sync tasks to Google Calendar or iCal

## 10. Development Phases for the Front End

1. **Phase 1**: Build out the main Dashboard, tasks, micro-steps, basic focus timer
2. **Phase 2**: Add animations (confetti), daily progress bar, quick-add Brain Dump
3. **Phase 3**: Gamification pop-ups, optional body doubling integration

---

**End of Front-End Architecture Document**