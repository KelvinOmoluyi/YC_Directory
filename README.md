# 🚀 YC Directory

A beautifully crafted, searchable directory of Y Combinator-backed startups. Built with the latest Next.js 15 app router, Tailwind CSS v4, and powered by Sanity CMS.

---

## 🔍 Features

- 🔎 Search and filter Y Combinator startups by category
- 📊 Track views on each startup listing
- 🧠 Submit new startups with live image validation
- 🎨 Fully responsive UI with TailwindCSS 4 and custom themes
- 🔐 GitHub OAuth authentication
- 🧰 Sanity Studio integration for content management

---

## ⚙️ Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4, ShadCN UI, Lucide Icons
- **Backend:** Sanity v3 (CMS + API)
- **Database:** Sanity Dataset (production)
- **Auth:** NextAuth.js with GitHub provider
- **Deployment:** Netlify
---
## 📁 Folder Structure
## Deploy on Vercel

###YC_Directory  
├── app  
│ ├── (root)  
│ │ ├── layout.tsx  
│ │ └── page.tsx  
│ ├── startup  
│ ├── user  
│ ├── api  
│ │ ├── auth  
│ │ ├── author-startups  
│ │ ├── increment-view  
│ │ ├── sentry-example-api  
│ │ └── sentry-example-page  
│ └── studio  
│  
├── components  
├── hooks  
├── lib  
├── node_modules  
├── public  
├── sanity  
│  ├── lib  
│  ├── SchemTypes  
│  ├── env.ts  
│  ├── structure.ts  
│  ├── types.ts  
│  
├── .env.local  
├── .env.sentry-build-plugin  
├── .gitignore  
├── auth.ts  
├── eslint.config.mjs  
├── functions.ts  
├── instrumentation-client.ts  
├── instrumentation.ts  
├── next-auth.d.ts  
├── next-env.d.ts  
├── next.config.ts  
├── package-lock.json  
├── package.json  
├── postcss.config.mjs  
├── README.md  
├── sanity.cli.ts  
├── sanity.config.ts  
├── sentry.edge.config.ts  
├── sentry.server.config.ts  
├── tailwind.config.js  
---

## 🚧 Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/KelvinOmoluyi/YC_Directory.git
cd yc-directory
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
Create a .env.local file and add:
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-08-01
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

### 4. Start the development server
```bash
npm run dev
```

### 5. (Optional) Run Sanity Studio
```bash
cd app/studio
npx sanity dev
```

---

## 🔒 Authentication
OAuth via GitHub using NextAuth.js. Only authenticated users can submit new startups.

---

## 📦 Deployment
The frontend is deployed to Netlify, and the CMS is hosted via Sanity Studio.

---

## 🤝 Contributions
PRs are welcome. Please fork the repo, commit with clear messages, and open a pull request.

---

## 📄 License
MIT License © Kelvin Omoluyi