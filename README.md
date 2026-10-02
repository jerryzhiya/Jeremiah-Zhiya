# Jeremiah Zhiya — Portfolio & Admin Dashboard

A full-stack, production-ready portfolio platform built with Next.js, Express, TypeScript, Prisma, and PostgreSQL/MongoDB. Includes an admin management dashboard to dynamically edit projects, blog posts, personal bio, and experience data.

---

## 🚀 Live Demo & Services

* **Frontend App:** [Jeremiah Zhiya Portfolio](https://jeremiah-zhiya.vercel.app) *(or your Vercel/Netlify link)*
* **Backend API:** [Jeremiah-Zhiya API](https://jeremiah-zhiya.onrender.com)

---

## ✨ Features

- **Dynamic Content Management:** Full CRUD capabilities for Projects, Blog Articles, and Personal Profile.
- **Image Uploads:** Seamless media uploads integrated with Cloudinary/Multer storage.
- **Authentication:** Secure admin login using JWT tokens and password hashing.
- **Optimized Performance:** Next.js App Router for server-rendered speed and image optimization.
- **CI/CD Pipeline:** Automated linting, type-checking, and testing via GitHub Actions.
- **Responsive UI:** Clean, modern interface supporting Dark & Light themes built with Tailwind CSS.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js (App Router, Client & Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Lucide Icons
* **State & Fetching:** Axios, React Hooks

### **Backend**
* **Runtime & Framework:** Node.js, Express.js
* **Language:** TypeScript
* **ORM & Database:** Prisma ORM, PostgreSQL / MongoDB
* **Authentication:** JSON Web Tokens (JWT), bcrypt

### **DevOps & Infrastructure**
* **Deployment:** Render (Backend API), Vercel (Frontend App)
* **CI/CD:** GitHub Actions
* **Package Manager:** `pnpm`

---

## 📁 Repository Structure

```text
Jeremiah-Zhiya/
├── frontend/             # Next.js App Router Frontend
│   ├── app/              # Routes, pages, and API handlers
│   ├── components/       # Reusable UI components
│   └── public/           # Static assets
└── backend/              # Express API Server
    ├── src/              # Controllers, routes, and middleware
    ├── prisma/           # Database schemas and migrations
    └── dist/             # Compiled TypeScript output
