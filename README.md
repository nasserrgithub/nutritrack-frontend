# NutriTrack Frontend — React concepts reference

A running reference of every concept, tool, and small discussion covered while building the NutriTrack React frontend. Mirrors the structure of the backend's `python_concepts_reference.md` — numbered sections, updated as each lesson progresses.

---

## 1 — What is React?

React is a JavaScript library for building user interfaces. Instead of manually updating HTML when data changes, you describe what the UI should look like for a given state, and React handles updating the DOM automatically.

Everything in React is a **component** — a JavaScript function that returns JSX (HTML-like syntax):

```jsx
function FoodCard({ name, calories }) {
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>{calories} kcal</p>
        </div>
    )
}
```

---

## 2 — What is Vite? Vite vs React

**React** is a UI library — components, JSX, state, rendering. It has no opinion about bundling, compiling, or serving files.

**Vite** is a build tool. It takes source files (`.jsx`, `.css`, etc.) and:

- Transpiles JSX into plain JavaScript the browser understands
- Bundles files into optimized output
- Runs a fast local dev server with instant hot-reload
- Loads plugins (like Tailwind) that need processing during the build

Vite is framework-agnostic — it supports React, Vue, Svelte, and vanilla JS via different templates:

```bash
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template vue
```

React needs _some_ build tool to convert JSX into runnable JavaScript. Other options exist (Create React App — now deprecated, Next.js, Webpack manually) but Vite is the current standard recommendation.

---

## 3 — Project setup commands

```bash
# scaffold a new Vite + React project
npm create vite@latest nutritrack-frontend -- --template react
cd nutritrack-frontend
npm install

# core packages used throughout Phase 6
npm install axios react-router-dom recharts

# Tailwind v4 (no init step needed — see section 5)
npm install @tailwindcss/vite

# run the dev server
npm run dev
```

No virtual environment needed — unlike Python, every `npm install` creates a project-local `node_modules/` folder automatically. Each project is isolated by default; there's no global environment to pollute.

---

## 4 — `.js` vs `.jsx`

```
.js   — plain JavaScript, NO JSX syntax (utility functions, axios client, helpers)
.jsx  — JavaScript file that CONTAINS JSX (any file returning React components)
```

JSX isn't real JavaScript — it's a syntax extension that gets **transpiled** into plain JS function calls before running in the browser:

```jsx
// what you write
const element = <h1>Hello</h1>

// what it becomes after transpiling
const element = React.createElement("h1", null, "Hello")
```

The `.jsx` extension tells the build tool "this file needs JSX processing." Vite handles this automatically via the `react()` plugin.

---

## 5 — Tailwind CSS v4 setup (no config files needed)

Tailwind v4 removed the need for `tailwind.config.js` and `postcss.config.js` entirely — a major change from v3.

```bash
npm install @tailwindcss/vite
```

```javascript
// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css */
@import "tailwindcss";
```

That's the entire setup. The `@tailwindcss/vite` plugin automatically scans source files for class names and generates only the CSS actually used — no `content: [...]` array to maintain like in v3.

`npx tailwindcss init -p` (the v3 setup command) fails on v4 with "could not determine executable to run" — this is expected; v4 doesn't need it.

Custom theming in v4 happens directly in CSS instead of a JS config file:

```css
@import "tailwindcss";

@theme {
    --color-brand: #1a1a2e;
}
```

---

## 6 — Plugins and hooks — general concepts

**A plugin** is a self-contained, installable unit that extends a host program's behavior, usually bundling multiple extension points together, registered once for the whole system:

```javascript
plugins: [react(), tailwindcss()]
```

**A hook** is one specific, narrow extension point — a single named moment where you can attach custom logic:

```javascript
// Vite plugin internals — "transform" is a hook
function myPlugin() {
    return {
        name: "my-plugin",
        transform(code, id) {
            /* called by Vite for every file */
        },
    }
}
```

**The relationship:** plugins are often _built from_ several hooks combined together. A hook is the raw extension point; a plugin is a packaged bundle of one or more hooks plus setup logic.

**A callback** is the actual mechanism underneath both — a function you hand to some other system, which calls it later, at the right moment:

```
Plugin  (installed package, e.g. tailwindcss())
   └── contains Hooks (named slots like "transform")
          └── each Hook's value IS a Callback (the function you wrote)
```

Backend equivalents already seen:

```python
@app.exception_handler(FoodNotFoundError)   # hook-like — one specific extension point
async def handler(request, exc): ...         # the callback itself

pip install pytest-flask                     # plugin-like — a packaged bundle
```

React's `useState`/`useEffect` are also called "hooks" — a related but distinct usage, meaning functions that let a component tap into React's internal state/lifecycle mechanisms from a plain function component.

---

## 7 — Arrow functions `() => {}`

JavaScript's shorthand function syntax:

```javascript
// regular function
function add(a, b) {
    return a + b
}

// arrow function — equivalent
const add = (a, b) => {
    return a + b
}

// arrow function with implicit return — no braces, no "return" keyword needed
const add = (a, b) => a + b
```

`() =>` means "a function taking no parameters." `(food) =>` means "a function taking one parameter named `food`."

Component style convention used throughout NutriTrack — arrow functions assigned to `const`:

```jsx
const App = () => {
    return <div>Hello</div>
}

export default App
```

This is consistent with how most other JS in the app is written (event handlers, helpers), and matches common modern React convention.

---

## 8 — `useState` — component state

```jsx
import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState(0) // count starts at 0

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </div>
    )
}
```

`useState(initialValue)` returns an array of exactly two things:

- the current value (read this to display data)
- a setter function (call this to update it)

Calling the setter triggers React to **re-render the entire component function from scratch** — not "continue" from where you left off, but call the whole function again, top to bottom, with the new state value in place.

```
Render 1: loading = true  → returns "Loading..." JSX, function exits here
   (state update happens via setLoading(false) inside useEffect)
Render 2: loading = false → "if (loading)" check is now skipped,
          function continues to the real JSX further down
```

For objects with many fields, one `useState({...})` is cleaner than many separate calls:

```jsx
const [formData, setFormData] = useState({
    email: "",
    password: "",
})
```

Updating one field without losing the others — spread operator + computed property key:

```jsx
const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
}
```

`{ ...prev, [name]: value }` means "copy everything from the previous object, then overwrite just the field whose name matches." Using the function form `(prev) => ...` instead of `{...formData, ...}` guarantees you're working with the latest state, avoiding subtle bugs when multiple updates happen close together.

---

## 9 — `useEffect` — side effects and the component lifecycle

A **side effect** is anything that reaches outside the component to interact with the world — API calls, timers, subscriptions. These shouldn't run directly during rendering, since render can happen many times for unrelated reasons.

```jsx
useEffect(() => {
    // side effect code
}, [dependencyArray])
```

**The dependency array controls when the effect re-runs:**

```jsx
useEffect(() => { ... }, [])        // run ONCE, after first render only
useEffect(() => { ... })            // run after EVERY render (rare, usually a mistake)
useEffect(() => { ... }, [date])    // run once initially, then again whenever "date" changes
```

**Render → effect timing, step by step:**

```
1. Component function runs, returns JSX
2. React updates the actual DOM to match that JSX
3. THEN — only after the screen visually updates — useEffect's callback runs
```

This is why a "Loading..." state is needed — the first render happens before any data exists; `useEffect` fires after that render and starts fetching; once the fetch resolves and state is set, a second render shows the real content.

**The effect function takes NO parameters** — unlike, say, an axios interceptor which receives `config`. It doesn't need parameters because it has access to everything via **closures** — it can directly read any variable already in scope from the surrounding component (same closure concept used in the backend's `@retry`/`@rate_limit` decorators).

**Why the effect function can't be `async` directly:**

```jsx
// ❌ not allowed
useEffect(async () => {
    await getDailySummary(today)
}, [])
```

`async` functions always implicitly return a Promise. `useEffect` expects its callback to return either nothing, or a cleanup function — a Promise conflicts with that contract. Two valid workarounds:

```jsx
// Option A — .then() chains, no async/await needed
useEffect(() => {
    getDailySummary(today).then(setSummary)
}, [])

// Option B — define a separate async function inside, then call it
useEffect(() => {
    const fetchData = async () => {
        const data = await getDailySummary(today)
        setSummary(data)
    }
    fetchData()
}, [])
```

Option B is preferred in NutriTrack since it reads sequentially (top-to-bottom) and scales better once multiple awaited calls need to be combined.

**Cleanup function** (returned from the effect, not used yet in NutriTrack but good to know):

```jsx
useEffect(() => {
    const timer = setInterval(() => console.log("tick"), 1000)
    return () => clearInterval(timer) // runs on unmount, or before the effect re-runs
}, [])
```

---

## 10 — Props — passing data between components

Props (properties) are how a parent component passes data down to a child — conceptually identical to function parameters.

```jsx
// child — receives props
const FoodCard = ({ name, calories }) => {
    return (
        <div>
            {name} — {calories} kcal
        </div>
    )
}

// parent — passes props
const FoodList = () => {
    return <FoodCard name="Banana" calories={105} />
}
```

**Props always flow one direction — downward, parent to child, never back up.** A three-level example:

```
DashboardPage  (owns state: entries)
    └── <FoodEntryList entries={entries} />
            └── entries.map(entry => <FoodEntryCard entry={entry} />)
                    └── displays ONE entry, knows nothing about the array or the page
```

Each level only knows what it directly receives. `FoodEntryCard` has no idea `DashboardPage` exists.

**The rule for where state should live:** state lives in the _highest_ component that needs it. If two sibling components both need the same data, that data's state lives in their common parent, and gets passed down to both as props.

```jsx
const Dashboard = () => {
    const [summary, setSummary] = useState(null)
    // ...fetch logic in useEffect...

    return (
        <div>
            <MacroRing calories={summary?.total_calories} />
            <DailySummaryCard summary={summary} />
        </div>
    )
}
```

**`children` prop** — whatever is written _between_ a component's opening/closing tags automatically becomes its `children` prop:

```jsx
<ProtectedRoute>
    <DashboardPage /> {/* this becomes "children" inside ProtectedRoute */}
</ProtectedRoute>
```

```jsx
const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" />
    return children
}
```

**Passing extra props down through a wrapper** (mechanism exists, not currently needed in NutriTrack):

```jsx
import { cloneElement } from "react"

const ProtectedRoute = ({ children }) => {
    return cloneElement(children, { isAuthenticated: true })
}
```

`cloneElement` injects additional props into whatever was passed as `children`. NutriTrack doesn't need this yet since `ProtectedRoute`'s only job is a yes/no gate check — pages fetch their own data independently via `apiClient`, which already auto-attaches the token via interceptor.

---

## 11 — Pages vs components — folder conventions

React itself doesn't distinguish between "pages" and "components" — both are just functions returning JSX. The split is a convention _we_ impose for organization.

```
src/pages/        — full screens tied to a route/URL
                     LoginPage.jsx, DashboardPage.jsx, GoalsPage.jsx

src/components/    — smaller, reusable pieces used INSIDE pages
                     MacroRing.jsx, FoodCard.jsx, ProtectedRoute.jsx
```

**Pages typically:**

- Are referenced directly in `<Route element={<DashboardPage />} />`
- Own the overall layout for that screen
- Fetch the data the screen needs
- Compose multiple smaller components together

**Components typically:**

- Receive data via props rather than fetching it themselves
- Get reused across multiple pages
- Are smaller, focused — "just display this one thing"

`ProtectedRoute` lives in `components/` even though it wraps pages — nobody navigates "to" it directly; it's infrastructure, not a screen.

---

## 12 — React Router — client-side navigation

React Router enables navigation between different "pages" using the URL, **without full browser page reloads** — unlike Flask's server-rendered pages where every navigation reloads the entire page from scratch.

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}
```

- `BrowserRouter` — wraps the whole app, enables URL-based navigation using the browser's History API
- `Routes` — container for route definitions
- `Route path="..." element={...}` — maps a URL path to a component
- `<Navigate to="..." />` — a component that immediately redirects to another route

---

## 13 — `useNavigate()` — programmatic navigation

```jsx
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await login(email, password)
        localStorage.setItem("token", data.access_token)
        navigate("/dashboard")
    }
}
```

`navigate("/dashboard")`:

1. Updates the browser's URL bar via the History API — no network request, no reload
2. React Router matches the new path against `<Routes>`
3. React unmounts the current component, mounts the matched one

This is the SPA equivalent of `window.location.href = "..."`, except `window.location.href` causes a full page reload (app reinitializes, all state lost). `navigate()` swaps components in place instantly.

**Variations:**

```jsx
navigate("/login") // adds a new browser history entry
navigate("/login", { replace: true }) // REPLACES the current history entry instead
navigate(-1) // go back one step (like browser's Back button)
```

**When to use `replace: true`:** specifically when the page being left behind should become inaccessible going forward — e.g. after logout, so clicking the browser's Back button doesn't briefly attempt to render a now-unauthorized Dashboard before `ProtectedRoute` catches it. Login doesn't need `replace` — going back to `/login` after a successful login is harmless since the token still exists.

```
history stack WITHOUT replace (logout):
1. /login
2. /dashboard
3. /login   ← new entry added
Back button → lands on /dashboard → bounces back to /login (flash)

history stack WITH replace: true (logout):
1. /login
2. /login   ← REPLACED the /dashboard entry
Back button → lands on /login directly, no flash
```

---

## 14 — Controlled inputs

A "controlled" input ties its value directly to React state, rather than letting the browser manage it internally:

```jsx
const [email, setEmail] = useState("")

<input
  type="email"
  value={email}                                // input always reflects state
  onChange={(e) => setEmail(e.target.value)}    // every keystroke updates state
/>
```

`e` is the event object. `e.target` is the actual `<input>` DOM element. `e.target.value` is whatever the user just typed. Every keystroke fires `onChange`, updating state, which re-renders the input with the new value — appears instant, but state is what's actually driving the display.

**Generic handler for multiple fields** (used once a form has many inputs):

```jsx
const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
}
```

Requires each `<input>` to have a matching `name` attribute:

```jsx
<input name="email" value={formData.email} onChange={handleChange} />
<input name="password" value={formData.password} onChange={handleChange} />
```

---

## 15 — Forms — `onSubmit` and `preventDefault`

```jsx
<form onSubmit={handleSubmit}>
    ...
    <button type="submit">Log in</button>
</form>
```

```jsx
const handleSubmit = async (e) => {
    e.preventDefault() // stop the browser's default full-page-reload form submission
    // ...custom logic instead
}
```

`onSubmit` fires when the form is submitted (Enter key, or a `type="submit"` button click). `e.preventDefault()` stops the browser's native behavior (which would reload the page), letting React handle the submission via JavaScript instead.

---

## 16 — Conditional rendering patterns

```jsx
{
    error && <p className="text-red-500">{error}</p>
}
```

`&&` short-circuit pattern — if `error` is a non-empty string (truthy), render the `<p>`. If `error` is `""` (falsy), React renders nothing.

```jsx
if (loading) return <p>Loading...</p>
if (error) return <p>{error}</p>
return <div>...real content...</div>
```

Early returns inside the component function — different branches of the _same function call_ produce entirely different JSX depending on current state. Nothing is "skipped over" on a second pass — the whole function runs again from scratch on each render, and just happens to reach a different `return` statement depending on current state values.

---

## 17 — Optional chaining `?.`

Safely accesses a property on an object that might be `null` or `undefined`, without throwing an error.

```jsx
const [summary, setSummary] = useState(null)   // starts null, before data loads

// ❌ without optional chaining — crashes on first render, since summary is null
<MacroRing value={summary.total_calories} />

// ✅ with optional chaining — returns undefined instead of crashing
<MacroRing value={summary?.total_calories} />
```

If the left side is `null`/`undefined`, the expression short-circuits to `undefined` instead of throwing. Can be chained for deeper nesting:

```jsx
summary?.goal?.calories
// checks: is summary null? if not, is summary.goal null? if not, return .calories
```

Comes up constantly because of the gap between "component renders" and "async data finishes loading" — the component renders at least once before any fetched data exists.

---

## 18 — axios — HTTP client

axios is a library for making HTTP requests, comparable to Python's `requests`. Alternative to the browser's built-in `fetch`.

```javascript
// fetch — built-in, more verbose
fetch("http://localhost:8000/foods/")
    .then((res) => res.json())
    .then((data) => console.log(data))

// axios — needs npm install, cleaner
axios.get("http://localhost:8000/foods/").then((res) => console.log(res.data))
```

**Why axios over fetch:**

- Automatically parses JSON — no manual `.json()` call
- Rejects on HTTP error status codes (404, 500) — `fetch` does NOT reject on these, only on network failures
- Supports interceptors — auto-attach the JWT token to every outgoing request
- Cleaner syntax for POST/PUT with JSON bodies

```javascript
// fetch — verbose
fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(data) })

// axios — concise
axios.post(url, data)
```

---

## 19 — axios client setup with interceptors

```javascript
// src/api/client.js
import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:8000",
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    },
)

export default apiClient
```

**`axios.create({ baseURL })`** — a reusable, pre-configured axios instance. Every call through `apiClient` only needs the path, not the full URL.

**Request interceptor — `config` parameter:** `config` is the outgoing request's configuration object (URL, method, headers, body) — axios calls your function with it right before sending the request, letting you inspect/modify it before it actually goes out. Conceptually identical to FastAPI middleware's `dispatch(self, request, call_next)` — same idea (intercept, modify, pass along), but for outgoing client requests instead of incoming server requests.

**Response interceptor** — same pattern but for incoming responses. The 401 handler here automatically logs the user out and redirects whenever any API call comes back unauthorized (e.g. expired JWT after 24 hours). Uses `window.location.href` (full reload) instead of `useNavigate()`, since this code runs outside any React component — hooks like `useNavigate()` are only usable inside components.

**Token visibility — is this a security risk?** A user can see their own token in DevTools → Application → Local Storage, or in the Network tab's request headers. This is expected and not inherently a vulnerability — it's the user looking at their own session credential, similar to inspecting a session cookie. The real risks are: (1) someone else gaining access to the user's device and stealing the token before it expires, (2) XSS vulnerabilities letting malicious scripts read `localStorage`. Production apps sometimes use httpOnly cookies instead (unreadable by JavaScript, harder to steal via XSS) — `localStorage` is used here for simplicity while learning.

---

## 20 — `async`/`await` in JavaScript

Conceptually identical to Python's `async`/`await` — a function marked `async` can use `await` inside it to pause until a Promise resolves.

```javascript
export const login = async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password })
    return response.data
}
```

`response.data` — axios wraps every response in an object with `.data`, `.status`, `.headers`. `.data` is the parsed JSON body, equivalent to `res.json()` with plain `fetch`.

**try/catch** — same as Python's try/except:

```jsx
try {
    const data = await login(email, password)
    localStorage.setItem("token", data.access_token)
    navigate("/dashboard")
} catch (err) {
    console.error(err) // log full detail for developers
    setError("Invalid email or password") // simple message for end users
}
```

**Why `console.error(err)` rather than showing `err` directly to users:** end users (especially non-technical ones) shouldn't see backend-specific error text like `"Unauthorized, incorrect password provided"` or raw stack traces — that's developer-facing information. Logging the full error to the console keeps it available for debugging while showing a clean, friendly message in the UI. This became the standard pattern for every `catch` block in the app.

---

## 21 — JavaScript quirk: accessing a non-existent property never throws

Unlike Python (`KeyError`/`AttributeError`), JavaScript silently returns `undefined` when you access a property that doesn't exist:

```javascript
const data = { access_token: "eyJhbGc..." }

data.access_token // "eyJhbGc..."  ✅
data.acceess_token // undefined     ❌ typo, but NO error thrown
```

This is why a misspelled property access (`data.acceess_token` instead of `data.access_token`) doesn't crash — it just silently stores `undefined` wherever it's used next, making the bug much harder to spot than Python's equivalent would be. This exact typo caused a real debugging session in NutriTrack: login appeared to succeed (200 OK from the backend), but the token was never actually saved, since `localStorage.setItem("token", undefined)` doesn't throw — it just stores a useless value silently.

**Lesson:** always verify actual values directly (`console.log`, or checking `localStorage.getItem("token")` in DevTools console) rather than assuming a successful network response means everything downstream worked correctly.

---

## 22 — Template literals (backticks)

JavaScript's equivalent of Python f-strings:

```python
# Python
f"/summary/{date}"
```

```javascript
// JavaScript — note the BACKTICKS, not regular quotes
;`/summary/${date}`
```

Regular quotes (`'` or `"`) do NOT support `${}` interpolation — only backticks do.

**Common mistake:** mixing backticks with JSX curly braces unnecessarily. JSX's `{}` already evaluates JavaScript directly — you don't need backticks around something already inside `{}`:

```jsx
// ❌ wrong — backticks here are literal characters that print on screen
<h1>`{label}: {percentage}%`</h1>

// ✅ correct — JSX curly braces already handle interpolation
<h1>{label}: {percentage}%</h1>

// ✅ also correct — template literal used INSIDE a single curly-brace expression
<h1>{`${label}: ${percentage}%`}</h1>
```

---

## 23 — `localStorage`

The browser's built-in persistent storage — survives page reloads and closing/reopening the browser (unlike React state, which resets on every reload).

```javascript
localStorage.setItem("token", accessToken) // save
localStorage.getItem("token") // read — returns string or null
localStorage.removeItem("token") // delete one key
localStorage.clear() // wipe everything for this site
```

Used in NutriTrack to persist the JWT token across page reloads, so a logged-in user doesn't get logged out just by refreshing the page.

**Clearing it for testing** — DevTools → Application (Chrome) / Storage (Firefox) tab → Local Storage → delete entries manually, or run `localStorage.clear()` directly in the Console tab. An Incognito/Private window also always starts with empty storage, useful for repeatedly testing registration/login flows without manual cleanup each time.

---

## 24 — Protected routes pattern

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute
```

```jsx
// App.jsx
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    }
/>
```

This only checks that a token _exists_ in localStorage — it does NOT verify the token is actually valid or unexpired. An expired token would still pass this check; the actual rejection happens later when an API call returns 401, caught by the response interceptor (section 19), which then clears the token and redirects.

---

## 25 — Full auth flow — end to end

```
1. User submits login form (email + password)
        ↓
2. React calls POST /auth/login
        ↓
3. FastAPI validates credentials, returns { access_token, token_type }
        ↓
4. React saves the token: localStorage.setItem("token", access_token)
        ↓
5. navigate("/dashboard")
        ↓
6. User makes further API calls (GET /summary/..., etc.)
        ↓
7. BEFORE each request, the request interceptor reads localStorage
   and attaches "Authorization: Bearer <token>" automatically
        ↓
8. FastAPI's get_current_user() validates the token, request proceeds

   ... 24 hours later, or on logout ...

9. Either the user clicks "Log out" (manually clears token, navigates to /login)
   OR an API call returns 401 (token expired) — caught by the response
   interceptor, which clears the token and redirects automatically
```

---

## 26 — Recharts — donut/ring charts for progress visuals

Recharts doesn't have a dedicated "progress ring" component — a `PieChart` configured as a donut (nonzero inner radius) achieves the same visual.

```jsx
import { PieChart, Pie, Cell } from "recharts"

const MacroRing = ({ label, total, goal }) => {
    const consumed = Math.min(total, goal)
    const remaining = Math.max(goal - total, 0)

    const data = [
        { name: "consumed", value: consumed },
        { name: "remaining", value: remaining },
    ]

    const percentage = goal > 0 ? (total / goal) * 100 : 0

    return (
        <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2 self-start">
                {label}
            </h3>

            <PieChart width={140} height={140}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#e5e7eb" />
                </Pie>
            </PieChart>

            <p className="text-lg font-bold text-gray-800 -mt-20">
                {percentage.toFixed(0)}%
            </p>

            <p className="text-sm text-gray-400 mt-16">
                {total} / {goal}
            </p>
        </div>
    )
}
```

**Key props explained:**

- `data` — array where each object represents a slice; `dataKey="value"` tells Recharts which field controls slice size
- `cx="50%" cy="50%"` — centers the pie within its container
- `innerRadius` / `outerRadius` — nonzero `innerRadius` cuts a hole in the middle, turning a solid pie into a donut/ring
- `startAngle={90} endAngle={-270}` — Recharts defaults to starting at 3 o'clock, counter-clockwise; this config starts at 12 o'clock and sweeps clockwise — the conventional orientation for progress rings
- `<Cell fill="..." />` — one per data entry, in the same order as the `data` array, controlling each slice's color

**Centering text inside the ring** — Recharts has no simple built-in way to overlay text in a donut's center. The common workaround: render the percentage as a separate HTML element positioned with negative top-margin to visually pull it up into the chart's empty middle. A bit hacky, but simple to reason about while learning; more "proper" approaches exist using Recharts' `label` props.

**Clamping math, explained:**

```javascript
const consumed = Math.min(total, goal)
```

Prevents the "consumed" slice from exceeding the goal even if the real `total` is higher — e.g. eating 2200 against an 1800 goal still renders as a fully-filled ring (100%), not a broken/meaningless overflow.

```javascript
const remaining = Math.max(goal - total, 0)
```

Prevents the "remaining" slice from going negative (which would either break the chart or render nonsensically) when `total` exceeds `goal`.

Both clamps only affect the _visual ring_ — the percentage _text_ above it deliberately uses the raw, unclamped `total / goal`, so it can correctly read `"122%"` even while the ring itself visually caps at a full circle.

---

## 27 — Debugging workflow — browser console vs backend logs

When the UI behaves unexpectedly but backend logs show success (e.g. `201 Created`, `200 OK`), the bug is almost always happening **entirely on the frontend, after the network call already completed**. Always check the browser DevTools Console first in this situation — it surfaces JavaScript errors (like `ReferenceError: response is not defined`) that never reach the backend logs at all.

**DevTools Network tab tips:**

- Filter by **Fetch/XHR** to hide Vite's own dev-server traffic (websockets, module-loading scripts) and see only actual API calls
- Use the filter search box (e.g. type `login`) to narrow results by URL
- Click a request → **Payload/Request** tab to see exactly what was sent
- Click a request → **Response** tab to see exactly what the server sent back
- Click a request → **Headers** tab to confirm whether `Authorization: Bearer ...` was actually attached

**General debugging principle reinforced across two real bugs found in this project:**

1. A typo (`rseponse` vs `response`) in `auth.js` caused a `ReferenceError`, caught by `try/catch`, displaying a generic "Registration failed" message — even though the backend had already created the user successfully.
2. A typo (`acceess_token` vs `access_token`) silently stored `undefined` into `localStorage` instead of throwing any error at all (per section 21) — leading to a confusing chain of 401 errors on every subsequent API call, even though login itself succeeded with `200 OK`.

Both bugs were invisible from backend logs alone — confirming the rule: **if the backend log looks correct but the UI doesn't, check the browser console next, not the backend code.**

---

## 28 — Linting — ESLint and Prettier (the `mypy`/`black` equivalents)

**ESLint** — static analysis for JS/JSX, catching bugs and bad patterns before running the code:

```
mypy    → type errors, missing imports, type mismatches
ESLint  → unused variables, undefined references, React-specific issues
          (e.g. missing useEffect dependencies), style issues
```

```bash
npm run lint
```

The `rseponse`/`response` typo (section 27) is exactly the kind of mistake ESLint's `no-undef` rule would catch instantly, before ever running the code.

**Handling `'err' is defined but never used'` in a catch block:**

```jsx
// Option 1 — log for debugging (used throughout NutriTrack, see section 20)
} catch (err) {
  console.error(err)
  setError("Invalid email or password")
}

// Option 2 — surface backend detail to the user (rejected for NutriTrack — too technical for end users)
} catch (err) {
  setError(err.response?.data?.detail || "Invalid email or password")
}

// Option 3 — explicitly mark as intentionally unused
} catch (_err) {
  setError("Invalid email or password")
}
```

NutriTrack uses Option 1 consistently — clean, friendly messages for end users; full error detail logged to the console for developers.

**Prettier** — auto-formatter, equivalent to `black`:

```bash
npm install -D prettier
npx prettier --write .
```

**TypeScript** — the actual `mypy` equivalent (adds real static type-checking, not just linting). A bigger structural change (renaming `.jsx`→`.tsx`, typing every prop/function) — noted as a possible future deep-dive, not adopted in the initial build of NutriTrack's frontend.

---

## 29 — Frontend project structure (as of lesson 6.2)

```
nutritrack-frontend/
├── src/
│   ├── api/
│   │   ├── client.js       ← axios instance, request/response interceptors
│   │   ├── auth.js         ← login(), register()
│   │   └── summary.js      ← getDailySummary(), getActiveGoal()
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   └── MacroRing.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── DashboardPage.jsx
│   ├── utils/
│   │   └── date.js         ← getTodayDate()
│   ├── App.jsx              ← BrowserRouter + Routes
│   ├── main.jsx
│   └── index.css            ← @import "tailwindcss";
├── vite.config.js           ← react() + tailwindcss() plugins
├── package.json
└── package-lock.json
```

This frontend is a **completely separate project** from the FastAPI/Flask backend — its own `package.json`, own dependency tree, deployed independently (planned for Phase 8). The only connection between the two is HTTP calls made via `apiClient`, pointed at the backend's `baseURL`.

---

## 30 — A real bug found and fixed during this phase — `MacroAggregator.remaining_macros()`

While testing the dashboard end-to-end with a genuinely fresh account (the first time this had actually been tested with zero existing food entries), a backend bug surfaced that the frontend work directly exposed:

**Original Phase 1/3 design** — `remaining_macros()` had a `today_only: bool = True` parameter that, when true, required `self.latest_food_entry` to exist, raising `ValueError("No food entries logged yet")` otherwise. The daily summary endpoint called it with the default (`today_only=True`), which crashed with a `500` whenever a user had zero entries for the day — a state that should be completely normal (a new user, or simply someone who hasn't logged anything yet today).

**Root cause traced via:** backend terminal logs showing a clean traceback ending in `parsers.py`'s `raise ValueError(...)` — found only after first ruling out frontend-side causes (token issues, typos) since the error initially manifested in the UI as a generic `401`-adjacent failure.

**Final fix** — replaced the implicit, loop-inferred day-counting with an explicit `num_days` constructor parameter, removing the `today_only` flag and the `latest_food_entry` special case entirely:

```python
class MacroAggregator:
    def __init__(self, food_entries, macro_goal, num_days: int = 1) -> None:
        ...
        self.date_counter = num_days   # explicit, not inferred from entries

    def remaining_macros(self) -> dict:
        return {
            "calories": self.macro_goal.calories * self.date_counter - self.total_calories,
            ...
        }
```

Call sites updated accordingly:

```python
# api/routers/summary.py — single-day summary
MacroAggregator(food_entries, macro_goal)            # num_days defaults to 1

# worker/tasks.py — weekly report
MacroAggregator(food_entries, macro_goal, num_days=7)  # explicit 7-day window
```

**Why this is a better design:** the previous version silently inferred "how many days" from counting distinct dates _present in the entries_ — which breaks down precisely when there are zero entries (zero days inferred, when the correct answer for a daily summary is "I am still asking about exactly 1 day, regardless of whether anything was logged"). Making `num_days` an explicit parameter moves that decision to the call site, where it's unambiguous and can never silently default to the wrong number.

**Lesson:** a frontend integration test (the dashboard, hitting real endpoints with a fresh account) caught a backend bug that unit-level testing of `MacroAggregator` alone — using only pre-populated, non-empty fixture data — would likely never have surfaced. End-to-end testing with deliberately "empty" or "fresh" states is valuable precisely because it exercises edge cases that hand-picked happy-path test data tends to skip.

---

## 31 — Smaller Q&As — standalone clarifications

A handful of quick exchanges that came up while building, collected here since they don't each warrant a full section above.

**"Should we structure `App()` using arrow function syntax?"**
Yes — both `function App() {}` and `const App = () => {}` are valid and behave identically. NutriTrack standardized on arrow functions going forward (see section 7) for consistency with the rest of the JS in the app.

**"How can I have a clean state of my browser without any token?"**
Three options: manually delete the entry in DevTools → Application → Local Storage; run `localStorage.clear()` in the Console tab (fastest); or just open an Incognito/Private window, which always starts with empty storage. The third option is most convenient for repeatedly testing auth flows.

**"Should we use props in `ProtectedRoute`? Why aren't we passing data down to children there?"**
`children` is itself a (special, conventional) prop — whatever's nested between a component's opening/closing tags. `ProtectedRoute` doesn't need to pass _additional_ data into its children because its only job is a yes/no gate check; the wrapped pages fetch their own data independently. The mechanism to inject extra props into `children` does exist (`cloneElement`, section 10) for cases where a wrapper computes something its children genuinely need.

**"What is the difference between pages and components?"**
Purely a convention, not something React enforces — see section 11 for the full breakdown (pages = routed screens that own data-fetching and layout; components = smaller reusable pieces driven entirely by props).

**"What is `config` inside the axios interceptor's `.use()` callback?"**
`config` is the outgoing request's configuration object (URL, headers, method, body) — axios calls your function with it automatically, right before sending the request, the same way FastAPI calls a `Depends()` function or `dispatch(request, call_next)` automatically at the right moment. You don't choose what's passed in; the host system (axios, in this case) decides and hands it to you.

**"Is it possible for a user to find their JWT token in the browser themselves?"**
Yes — via DevTools (Application → Local Storage) or the Network tab's request headers, both showing the token in plain text. This is expected and not inherently a vulnerability; the token identifies that browser's own session. The actual risks are someone else gaining access to that device, or an XSS vulnerability letting a malicious script read `localStorage` — production apps sometimes mitigate this with httpOnly cookies instead. See section 19 for the full discussion.

**"So basically: user logs in, frontend extracts the JWT from localStorage, and uses it for FastAPI calls?"**
Almost — small but important correction: the token isn't _already_ in localStorage at login time. Login is the moment that _writes_ it there (`localStorage.setItem(...)`, after a successful `POST /auth/login`). Every _subsequent_ request is what _reads_ it back out via the interceptor. See section 25 for the full step-by-step flow distinguishing these two moments.

**"What is the meaning of `worker` in `celery -A myapp worker`?"** _(asked while debugging Phase 5, included here since it's part of the same broader session)_
`worker` is a Celery subcommand specifically meaning "start a process that executes tasks from the queue," as opposed to other subcommands like `beat` (scheduler) or `flower` (monitoring UI). Without specifying a subcommand, Celery doesn't know what role to run as.

**"What is the difference between a hook and a plugin? They seem to share the same core concept."**
Correct instinct on the shared philosophy (extend behavior without modifying source). The actual difference is scope/packaging: a hook is one narrow, specific extension point; a plugin is a packaged bundle of one or more hooks plus setup logic, installed once as a reusable unit. Full breakdown with backend analogies (FastAPI exception handlers, `pytest-flask`) in section 6.

**"Can you elaborate the connection between callback, hook, and plugin?"**
A callback is the literal _mechanism_ underneath both hooks and plugins — a function handed over for something else to call later. "Hook" names a specific named slot expecting a callback; "plugin" names a whole bundle of such slots packaged together. `useEffect`'s callback, an axios interceptor's callback, and a FastAPI exception handler are all the exact same underlying pattern, just appearing in different frameworks/languages. Full layered diagram in section 6.

**"What is the parameter of the function `useEffect` itself accepts?"**
`useEffect` takes exactly two arguments: the effect function itself, and a dependency array. The effect function takes no parameters of its own — it doesn't need any, since it can read any variable already in scope via closures (the same closure concept from the backend's decorators). Contrast with axios's interceptor callback, which _does_ receive a parameter (`config`) because axios explicitly passes one in.

**"Why can't we just directly call `getDailySummary`/`getActiveGoal` outside the async wrapper function?"**
Two layered reasons: (1) calling an `async` function without `await` just gives you back a pending Promise, not the actual data — you'd need `.then()` chains instead; (2) `await` syntax specifically requires being inside a function marked `async`, and `useEffect`'s own callback can't be `async` (section 9) — so if you want `await`-style code, a separate inner `async` function is required. Both `.then()` chaining and the inner-async-function approach are valid; NutriTrack uses the latter for readability once multiple awaited values need to be combined.

**"Since `loading` is `true` initially and we already returned the loading JSX, how does the actual dashboard ever get rendered?"**
The core mental model shift: React components don't "continue" execution from where an early `return` happened — the entire function is called again, completely from scratch, every time state changes. First call: `loading` is `true`, function returns the loading paragraph and exits. State update (`setLoading(false)`) schedules a second call. Second call: `loading` is now `false`, so that `if` block is skipped this time, and the function reaches the real dashboard JSX further down. Full step-by-step trace in section 8.

**"Why do we need to round numbers (`toFixed`), and what's the JS equivalent of Python's `round()`?"**
`.toFixed(n)` rounds a number to `n` decimal places — but unlike Python's `round()`, it always returns a **string**, not a number. Relevant when formatting percentages or totals for display (e.g. `percentage.toFixed(0)` to show `"17"` instead of `"17.384726..."`).

**"Can you explain `Math.min(total, goal)` and `Math.max(goal - total, 0)` in the MacroRing component line by line?"**
Both exist to handle the same edge case — eating more than the goal. `Math.min(total, goal)` caps the "consumed" ring segment so it visually never exceeds a full circle even if real intake is higher. `Math.max(goal - total, 0)` prevents the "remaining" segment from going negative (a pie chart segment can't have negative size). Both only affect the _visual ring_; the percentage _text_ deliberately still shows the true, unclamped value (e.g. "122%") even while the ring itself caps at 100%. Full walkthrough with numeric examples in section 26.

---

_Last updated through Phase 6, lesson 6.2 (Dashboard with macro rings). Next: lesson 6.3 — food log interface._
