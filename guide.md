# Portfolio Project Guide for AI Assistant

## 1. Project Overview
This is a personal portfolio website for Abdul-Mueez, built to showcase technical projects, skills, and contact information. The aesthetic is highly technical, brutalist, and terminal-inspired with a dark mode color scheme (neon accents like `#55E6C1` (teal), `#6C5CE7` (purple), and `#c6bfff` (light purple)).

## 2. Tech Stack
- **Framework:** Next.js 16.x (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (`index.css`)
- **Animation:** Framer Motion
- **3D Graphics:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Deployment:** Vercel (Static Export/Generation where applicable)

## 3. STRICT Architectural Constraints (CRITICAL)
- **100% STATIC SITE:** There is **NO BACKEND**, no database, no Supabase, and no authentication.
- **NO ADMIN DASHBOARD:** The `/admin` route, dashboard, and API routes have been completely purged. **Do not attempt to recreate or reference any admin functionality.**
- **NO CRUD:** All portfolio data is strictly hardcoded.
- **Form Submission:** The contact page uses a static HTML form pointing to `FormSubmit.co` (`https://formsubmit.co/abdulmueezshahid550@gmail.com`). It does NOT use a Next.js API route.

## 4. Data Source
- **Portfolio Projects:** The single source of truth for projects is the `projects` array exported from `app/portfolio/page.tsx`.
- **Current Projects:**
  1. **Alucard** (Featured) - AI persona chatbot.
  2. **EduIG-Pipeline** (Other) - Instagram data extraction pipeline.
  3. **Nabeel Photographic Moments** (Other) - Photography portfolio.
  4. **LeadMap** (Other) - Map scraping and lead scoring engine.

## 5. Key Pages & Layouts
- **Home (`/`)**: Must include the React Three Fiber (R3F) Hero section (floating laptop, boot gate, scroll lock, terminal typing effect, lid-open animation) at the very top.
- **About (`/about`)**: Contains personal details, education (NUCES, Peshawar), societies (AWS Student Builder Group - Lead), and a "Contact Me" button linking to `/contact`. The "Download CV" button is also here.
- **Portfolio (`/portfolio`)**: 
  - The "Download CV" button is present at the top.
  - Featured projects (Alucard) are displayed at the top.
  - "OTHER PROJECTS" (EduIG-Pipeline, Nabeel, LeadMap) are displayed using a **single `OrbitCardStack` component** that fans out on hover.
- **Contact (`/contact`)**: 
  - Contains a FormSubmit-powered contact form.
  - Uses `?sent=true` in the URL to conditionally replace the form with a `> MESSAGE_TRANSMITTED_SUCCESSFULLY` success message.
  - Includes a static Terminal Info Panel with social links and availability status (visible in both form and success states). **No map image exists.**

## 6. Key Components
- **`OrbitCardStack` (`components/ui/OrbitCardStack.tsx`)**: Handles the layout of project cards. It has been customized so that when collapsed, the cards have distinct X-translation and rotational offsets so they don't perfectly overlap, ensuring all cards in the stack are visible and clickable.
- **`Footer` (`components/layout/Footer.tsx`)**: Contains an Assembly motif (`MOV AH, 4Ch / INT 21h`) and social links (GitHub, LinkedIn, Instagram). The hidden `[admin]` link was removed.

## 7. Recent Context & Fixes
- **R3F Laptop Model:** The original `useGLTF.preload` call caused rendering crashes. The app now safely renders a laptop model without preloading issues.
- **Image Formats:** The `alucard-preview.png` file in `/public/images/` is a properly encoded PNG. Do not replace it with a `.jpg` file simply renamed to `.png`, as this causes Next.js image optimization build failures.

## Instructions for Next Session
When a new session starts, read this file immediately. Treat these constraints as absolute laws. Do not hallucinate missing databases or admin panels. Maintain the brutalist terminal aesthetic for all new UI additions.
