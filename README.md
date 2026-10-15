# Paulo Peñaflor - Portfolio Website

> **BSCS Graduate (Major in Programming) · Technical Virtual Assistant · IT Support Specialist**  
> Direct Email: [paulopenaflor55@gmail.com](mailto:paulopenaflor55@gmail.com)  
> LinkedIn: [linkedin.com/in/penaflorpaulothegreat](https://www.linkedin.com/in/penaflorpaulothegreat)  
> Facebook: [facebook.com/paulo.penaflor.71](https://www.facebook.com/paulo.penaflor.71)

---

## 🚀 How to View Your Portfolio Online via GitHub Pages (Free)

This repository includes a pre-configured **GitHub Actions automated deployment workflow** (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'`) in `vite.config.ts`.

### Step 1: Push This Code to GitHub
If you haven't already pushed to your GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit of Paulo Peñaflor Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in 2 Clicks
1. On GitHub, go to your repository page.
2. Click **Settings** (top navigation tab).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment** > **Source**, select **`GitHub Actions`**.
5. That's it! GitHub will automatically trigger the included workflow (`Deploy to GitHub Pages`).
6. Within 1–2 minutes, your website will be live at:
   ```
   https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
   ```

---

## ⚡ Alternative Free 1-Click Deployments

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** > **Project**.
3. Select this repository and click **Deploy**.
4. Vercel automatically detects Vite and builds your site in 30 seconds with a free `.vercel.app` URL and custom domain support.

### Option C: Netlify
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
2. Click **Add new site** > **Import an existing project**.
3. Select this repository. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy Site**.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18 or v20+)
- npm

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## ✨ Features Included

- **Repeating Video Background**: Upload custom MP4/WebM motion backgrounds with continuous loop playback, opacity controls, and persistent browser storage.
- **Storytelling Layout**: Fluid snap navigation through Profile Overview, Hardware & Tech Rig, Accounts & Impact Matrix, Education & Certifications, and Direct Contact.
- **BSCS Degree & IT Support Credentials**: Highlights your Bachelor of Science in Computer Science (Major in Programming) degree, hardware diagnostics, automation scripting, and Google Skillshop certificates.
- **Social Media Hub**: Instant links and copy buttons for LinkedIn and Facebook.
- **Interactive Workspace Customizer**: On-the-fly specs editor with custom photo uploads.
- **Real-Time Manila Clock**: Automatic GMT+8 time display.
- **Glassmorphic Aesthetics**: Modern luxury liquid-glass styling powered by Tailwind CSS and smooth GSAP animations.
