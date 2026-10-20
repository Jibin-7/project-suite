# DevKit Suite | Translator, Password Generator & React Tools

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![RapidAPI](https://img.shields.io/badge/RapidAPI-0055FF?style=for-the-badge&logo=rapid&logoColor=white)

**A polished React mini-app hub combining text translation, secure string generation, and client-side routing in one interface.**

[Features](#-core-features) • [Hook Architecture](#-react-hooks-mastery-showcase) • [Getting Started](#-getting-started) • [Live Hosting](#-live-deployment)

</div>

---

## Project Overview

This repository unites **three distinct core internship project requirements** into a single, cohesive, enterprise-grade React web suite engineered with **Vite**, styled with **Tailwind CSS**, and architected using **React Router DOM v6**. 

Rather than building three isolated repositories, this suite provides an interactive **Hub Dashboard**, dedicated workspace applications, and an embedded **Technical Specifications Report** designed to demonstrate full-stack readiness, clean code organization, and intuitive UI/UX design.

---

## Core Features

### 1. AI Text Translator (`/translator`)
A dynamic translation tool that converts English text into 14+ world languages with real-time feedback and audio speech synthesis.
* **RapidAPI Integration**: Connects directly to enterprise translation endpoints (such as *Google Translate API* and *Deep Translate API* on RapidAPI) using custom authentication headers (`X-RapidAPI-Key` and `X-RapidAPI-Host`).
* **Interactive API Key Drawer**: Allows evaluators or users to paste their own RapidAPI key or switch between translation providers in real time.
* **Dual-Tier Zero-Config Fallback**: To ensure 100% reliability during live demos and interviews, the application automatically connects to a **Free Live Public REST API** if no RapidAPI key is provided. Any arbitrary English sentence is translated into real Spanish, French, German, Hindi, Japanese, and more out of the box!
* **Web Speech API Pronunciation**: Equipped with browser-native text-to-speech (`window.speechSynthesis`) so evaluators can listen to accurate native pronunciations of translated text.
* **Extra Polish**: One-click clipboard copying with toast notifications, character counters, and persistent translation history stored in `localStorage`.

---

### 2. Random String and Password Generator (`/generator`)
An advanced string generation suite built specifically to demonstrate strict mastery of modern React Hooks.
* **Real-Time Auto-Regeneration**: Adjusting the length slider or toggling character types generates a secure cryptographic string instantly without requiring manual button clicks.
* **Entropy & Strength Calculation**: Evaluates character diversity and length to dynamically compute password strength (*Weak*, *Moderate*, *Strong*, or *Unbreakable*) with animated visual meters.
* **Custom Prefix Injection**: Users can inject custom prefixes (e.g., `REACT_`, `DEV_`) while maintaining exact mathematical string lengths.

---

### 3. Client-Side Routing (`react-router-dom` v6)
* **Single Page Application (SPA)**: Configured with centralized `<BrowserRouter>`, `<Routes>`, and `<Route>` architecture for zero-reload navigation.
* **Active State Preservation**: Implements `<NavLink>` across the application sidebar and navigation bar with dynamic visual styling and status badges.
* **Production Host Rewrites**: Pre-configured with Netlify (`_redirects`), Vercel (`vercel.json`), and static host (`200.html` / `404.html`) rewrite rules to guarantee that page refreshes on nested routes never throw 404 errors.

---

## React Hooks

The **Random String Generator** (`/generator`) serves as an interactive showcase demonstrating when, why, and how to implement core React Hooks cleanly:

| Hook | Architectural Purpose & Implementation in this Project |
| :--- | :--- |
| `useState` | **State Management & UI Reactivity:** Manages dynamic slider lengths (4 to 64 chars), character option checkboxes (uppercase, lowercase, numbers, symbols), custom prefix injection, generated output strings, copy confirmation toast states, and the recent generation history stack. |
| `useCallback` | **Algorithmic Memoization:** Wraps the core cryptographic string generation loop (`window.crypto.getRandomValues`). This guarantees that the function identity remains stable across component re-renders unless a specific dependency (length or character toggle) changes, preventing unnecessary recalculations. |
| `useEffect` | **Reactive Side-Effects & Event Listeners:** Observes the memoized callback and automatically triggers real-time string generation whenever options change. Additionally, it attaches global window keyboard listeners (allowing users to press `<Spacebar>` to regenerate quickly) and cleans them up on unmount. |

---

## 🎨 UI/UX & Design System

The suite is built with a premium visual aesthetic designed to impress at first glance:
* **Glassmorphism**: Utilizes tailored Tailwind CSS utilities (`backdrop-blur-xl`, `bg-slate-900/60`, subtle slate borders) to create depth and modern card hierarchy.
* **Dynamic Animations**: Smooth gradient text animations (`animate-gradient-x`), micro-interactions on hover/active states, and custom glowing ambient background spheres.
* **Responsive Layouts**: Fully optimized for desktop, tablet, and mobile screens with responsive navigation drawers and flex/grid layouts.

---

## 🛠️ Technology Stack

* **Core Framework**: React 18 (JavaScript / JSX)
* **Build Tool**: Vite v8 (High-performance HMR and bundling)
* **Styling**: Tailwind CSS v3 + Custom Utility Tokens
* **Routing**: React Router DOM v6
* **Icons**: Lucide React
* **External APIs**: RapidAPI Translation Endpoints, MyMemory Public REST API, Web Speech API, Web Crypto API

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jibin-7/project-suite.git
   cd project-suite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` in your web browser.

---

## 📦 Live Deployment

https://internship-suite.vercel.app/

---

## 🧑‍💻 Author & Evaluation Notes

**Built by Jibin** for Software Engineering Internship Evaluation.

All three tasks requested in the evaluation prompt have been integrated with strict adherence to best practices, robust error handling, and scalable modern web architecture. Thank you for reviewing this project!
