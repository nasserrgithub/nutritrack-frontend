# NutriTrack — Frontend

The React frontend for NutriTrack, a food and nutrition tracker. Built with Vite, React, Tailwind CSS v4, and Recharts.

This frontend communicates with the [NutriTrack backend](https://github.com/your-username/nutritrack) via its REST API.

---

## Features

**Authentication**

- Register a new account with body metrics (weight, height, age, gender)
- Login with JWT token stored in localStorage
- Automatic logout on token expiry (401 response intercepted globally)
- Protected routes — unauthenticated users are redirected to `/login`

**Dashboard** (`/dashboard`)

- Four macro progress rings (calories, protein, carbs, fat) showing today's consumed vs goal amounts
- Recharts donut chart with percentage, total/goal display, and clamped progress visualization
- Real-time data pulled from the daily summary and active goal endpoints

**Food log** (`/log`)

- Log food by name — the backend's AI service looks up macros automatically for unknown foods
- Log food via natural language (e.g. "I had chicken and rice for lunch")
- Today's food entries listed with per-entry macro breakdown (calories, protein, carbs, fat — scaled to the logged weight)
- Delete individual entries with instant client-side list update (no page reload)

**Weight history** (`/weight`)

- Log daily weight entries with optional notes
- Recharts line chart showing weight trend over the last 30 days
- Chart auto-updates after logging a new entry without a page reload

**Macro goals** (`/goals`)

- Set daily macro targets (calories, protein, carbs, fat)
- Current active goal displayed alongside the form with its effective date

**AI suggestions** (`/suggestions`)

- Enter up to 5 foods you have available
- Claude suggests portions and combinations to help hit your remaining daily macros
- Spinner with an explicit "this may take a few seconds" message (the AI call is uncached)
- Results displayed as styled suggestion cards with per-suggestion macro breakdown

**Navigation**

- Persistent navbar across all protected pages with active-link highlighting
- Responsive layout — single column on mobile, multi-column grid on tablet/desktop
- Maximum content width capped at `max-w-5xl` for readability on large monitors

---

## Tech stack

|             |                                              |
| ----------- | -------------------------------------------- |
| Framework   | React 18                                     |
| Build tool  | Vite                                         |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Charts      | Recharts                                     |
| HTTP client | axios (with request/response interceptors)   |
| Routing     | React Router v6                              |
| Linting     | ESLint                                       |

---

## Project structure

```
src/
├── api/
│   ├── client.js        ← axios instance, JWT interceptor, auto-logout on 401
│   ├── auth.js          ← login(), register()
│   ├── summary.js       ← getDailySummary()
│   ├── goals.js         ← createGoal(), getActiveGoal()
│   ├── logs.js          ← logFood(), logNaturalMeal(), getFoodLog(), deleteFoodEntry()
│   ├── weight.js        ← logWeight(), getWeightHistory()
│   └── suggestions.js   ← getSuggestions()
├── components/
│   ├── Navbar.jsx           ← shared nav, active-link highlighting, logout
│   ├── ProtectedRoute.jsx   ← token check + Navbar injection for all protected pages
│   ├── MacroRing.jsx        ← Recharts donut chart (consumed vs goal)
│   ├── FoodEntryCard.jsx    ← single food log entry with macro breakdown + delete
│   ├── FoodEntryList.jsx    ← fetches and lists today's food entries
│   ├── LogFoodForm.jsx      ← log food by name form
│   ├── NaturalLanguageForm.jsx ← natural language meal logging form
│   ├── WeightLogForm.jsx    ← weight entry form
│   ├── WeightChart.jsx      ← Recharts line chart for weight history
│   ├── GoalForm.jsx         ← macro goal creation form
│   ├── SuggestionForm.jsx   ← available foods input (up to 5 fields)
│   ├── SuggestionCard.jsx   ← single AI suggestion card with macro breakdown
│   └── Spinner.jsx          ← CSS border-t-transparent spinning loader
├── context/
│   └── ThemeContext.jsx     ← dark mode toggle (ThemeProvider, useTheme)
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── FoodLogPage.jsx
│   ├── WeightHistoryPage.jsx
│   ├── GoalsPage.jsx
│   └── SuggestionsPage.jsx
├── utils/
│   └── date.js          ← getTodayDate() → "YYYY-MM-DD" string
├── App.jsx              ← BrowserRouter + all route definitions
├── main.jsx             ← React root, ThemeProvider wrapper
└── index.css            ← @import "tailwindcss"
```

---

## Local setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- The [NutriTrack backend](https://github.com/your-username/nutritrack) running locally on port 8000

### 1 — Clone and install dependencies

```bash
git clone https://github.com/your-username/nutritrack-frontend.git
cd nutritrack-frontend
npm install
```

### 2 — Configure the API base URL

The axios client in `src/api/client.js` points to `http://localhost:8000` by default — no `.env` file is needed for local development as long as the backend is running on port 8000.

If your backend runs on a different port, update `src/api/client.js`:

```javascript
const apiClient = axios.create({
    baseURL: "http://localhost:YOUR_PORT",
})
```

### 3 — Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4 — Verify it's working

1. The app redirects to `/login`
2. Register a new account via `/register`
3. Login — you should land on `/dashboard` with empty macro rings (0% — no goal set yet)
4. Go to `/goals` and set your daily macro targets
5. Return to `/dashboard` — the rings now show your goal values as the denominator

---

## Available scripts

```bash
npm run dev      # start the local development server (hot reload)
npm run build    # build for production (outputs to dist/)
npm run preview  # preview the production build locally
npm run lint     # run ESLint across all source files
```

---

## Key design decisions

**Token storage:** JWT is stored in `localStorage`. The axios request interceptor attaches it as `Authorization: Bearer <token>` on every request automatically. The response interceptor clears the token and redirects to `/login` on any 401 response.

**`ProtectedRoute` as a shared layout:** rather than importing `Navbar` into every page individually, the navbar is rendered inside `ProtectedRoute` — since every protected page is already wrapped there, all protected pages get the navbar automatically with zero per-page changes.

**Refresh patterns:**

- `key`-based remount (e.g. `FoodEntryList`) — forces a full component remount and refetch when the user submits a form without navigating away
- Dependency-array refetch (e.g. `WeightChart`) — `refreshKey` passed as a prop and listed in `useEffect`'s dependency array, triggering a refetch when the value changes
- Client-side `.filter()` (e.g. deleting a food entry) — no network round-trip needed when the change is fully known client-side

**AI suggestions loading:** the suggestions endpoint is a live, uncached Anthropic API call that can take 5-10 seconds. `isGenerating` state is lifted from `SuggestionForm` to `SuggestionsPage` via an `onLoadingChange` callback, allowing a spinner + explanatory message to appear in the results panel during the wait.

---

## Backend dependency

This frontend requires the NutriTrack backend to be running. All API calls go to `http://localhost:8000` in development. See the [backend repository](https://github.com/your-username/nutritrack) for setup instructions.

The backend must be running with:

- PostgreSQL connected and migrated (`alembic upgrade head`)
- At least one registered user
- An active macro goal set for that user (required for `/dashboard` to show data)
