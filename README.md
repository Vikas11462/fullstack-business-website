# Full-Stack Business Website

A modern, responsive full-stack business website built with **Next.js** and **TypeScript**, featuring a contact form, admin functionality, and database integration via Supabase.

---

## 🚀 Live Demo

[https://fullstack-business-website.vercel.app](https://fullstack-business-website.vercel.app)

---

## 🧠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Backend:** Next.js API Routes
* **Database & Auth:** Supabase (PostgreSQL)
* **Deployment:** Vercel

---

## ✨ Features

* 📱 Fully responsive business website
* 📩 Contact form with backend integration
* 🔐 Admin access for managing inquiries
* ⚡ Server-side rendering & SEO-friendly
* 🗄 PostgreSQL database (via Supabase)

---

## 📁 Project Structure

```
app/            → Next.js App Router pages
components/     → Reusable UI components
context/        → Global state/context providers
lib/            → Utility & helper functions
public/         → Static assets
scripts/        → SQL / setup scripts
supabase/       → Supabase configuration
```

---

## 🏗 Architecture Overview

```
Client (Next.js UI)
        ↓
API Routes (Next.js)
        ↓
Supabase (Auth + PostgreSQL)
```

---

## 🛠 Getting Started (Local Setup)

### Prerequisites

* Node.js **18+**
* npm or yarn
* Supabase account

### Installation

```
git clone https://github.com/Vikas11462/fullstack-business-website.git
cd fullstack-business-website
npm install
```

### Environment Variables

Create a `.env.local` file using the template below:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

⚠️ Never commit your `.env.local` file.

### Run Locally

```
npm run dev
```

Visit `http://localhost:3000`

---

## 🌱 Branching Strategy

```
main        → production-ready code
dev         → active development
feature/*   → new features or improvements
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Make your changes following the project structure
4. Commit with clear messages
5. Open a pull request against the `dev` branch

---

## 📜 License

This project is licensed under the **MIT License**.

---

⭐ If you find this project useful, please consider giving it a star!
