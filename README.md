# 🚀 IdeaVault – Startup Idea Sharing Platform

IdeaVault is a premium, high-performance web application engineered for entrepreneurs and innovators to crowdsource, validate, and refine startup concepts. Moving away from typical scheduling or booking engines, this platform centers entirely on community engagement, offering instant idea feedback, robust interaction metrics, and real-time concept validation.

**Live Site URL:** [Deploying Link Goes Here](https://idea-vault-client-ten.vercel.app/)

---

## ✨ Key Features

* **Advanced Next.js App Router Architecture:** Utilizes optimized client and server-side rendering pipelines ensuring that page updates occur dynamically with custom, route-based document titles and zero layout shifts.
* **Streamlined Discovery with Real-Time Search & Filters:** Features a robust search engine (case-insensitive title matching) coupled with fast category and structural filtration on a unified 3-column responsive catalog grid.
* **Secure Session Architecture via BetterAuth:** Completely secured with BetterAuth incorporating both traditional Email/Password credentials (with uppercase, lowercase, and minimum 6-character validation rules) and unified Google Single Sign-On (SSO).
* **Granular Session & Private Route Persistence:** Implements rigid JSON Web Token (JWT) authorization guardrails that fully persist across deep refreshes, preventing authenticated users from experiencing jarring login page redirects.
* **Polished Interaction & Mutation Workflows:** Leverages premium custom modals and interactive layers for complete CRUD operations (create, read, update, delete) on ideas and comments, paired with clean contextual timestamps.

---

## 🛠️ Technology Stack & Architecture

### Client-Side (Frontend)
* **Framework:** Next.js (App Router)
* **Authentication:** BetterAuth (Session persistence, Google OAuth, & Secure Cookies)
* **Styling & Layout:** Tailwind CSS & HeroUI (Consistent component spacing, padding, and layout continuity)
* **UI Component Library:** shadcn/ui (Accessible, custom-built modular primitives)
* **Feedback Systems:** Sonner Toast (Replaces all standard browser alert popups for full application mutations)

### Server-Side (Backend & Database)
* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js (RESTful API architecture handling JWT verification middleware)
* **Database Management:** MongoDB (Document-driven architecture leveraging `$limit`, `$regex`, and aggregation pipelines)

---

## 📱 Core Layout & App Routes

### Public Access
* **`/` (Home):** Dynamic landing layout including a minimum 3-slide innovation hero banner, structural Call-To-Actions (CTAs), and a top trending container limited to the highest-performing 6 startup ideas.
* **`/ideas`:** Clean 3-column responsive explorer layout complete with title search bars, category selectors, and custom-proportioned view cards.
* **`/login` & `/register`:** Unified authentication access gates featuring responsive validation feedback.
* **`404 Not Found`:** Custom, brand-aligned visual page for handling broken or unmatched application routes.

### Private/Protected Access (Requires Authentication)
* **`/ideas/[id]` (Details):** Deep informational lookup displaying complete problem statements, proposed solutions, estimated budgets, and a custom multi-author commenting stream.
* **`/add-idea`:** Structured validation form for pitching title layouts, deep analytical content, target audiences, and relevant tag groups.
* **`/my-ideas`:** Personalized user dashboard housing fast, modal-driven editing panels and distinct action deletion confirmations.
* **`/my-interactions`:** Dedicated summary screen chronicling user history, including tracked commenting metrics across the platform.

---

## 🤝 Contact & Support
If you have any questions or want to discuss this project, feel free to reach out:

*   **Developer:** Shariea Reza Nabil
*   **LinkedIn:** [https://www.linkedin.com/in/shariea-reza-nabil/]
*   **Email:** [nabilreza183@gmail.com]
