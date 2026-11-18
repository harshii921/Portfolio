# Sai Harshini Nayani – Modern Developer Portfolio

A fast, responsive, and animated personal portfolio built with **pure HTML5**, **CSS3**, **Vanilla JavaScript**, and **Assets**. 

No complex build tools, no `node_modules` required. Just open `index.html` in any browser or deploy directly to GitHub Pages!

- **Developer**: Sai Harshini Nayani
- **GitHub**: [github.com/harshii921](https://github.com/harshii921)
- **LinkedIn**: [Sai Harshini Nayani](https://www.linkedin.com/in/saiharshini-nayani-ba805032b?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **Email**: nayanisaiharshini@gmail.com
- **Role**: Web Developer & UI Designer

---

## 📁 Simple & Clean Project Structure

```text
portfolio/
├── index.html            # Main semantic markup & all sections
├── style.css             # Responsive styling, color palette, animations & glassmorphism
├── script.js             # Typewriter, 3D tilt, navbar docking, contact celebration & GitHub API
├── assets/
│   ├── favicon.svg       # Brand monogram favicon
│   └── images/
│       ├── profile.png   # Portrait photo (head-and-shoulders crop)
│       └── profile.webp  # Optimized WebP portrait
├── .github/workflows/
│   └── deploy.yml        # Instant 0-build GitHub Pages deployment
└── README.md             # Project documentation
```

---

## 🚪 Door Landing

The site opens like a pair of doors: a short loading bar, then **Open the door** (click, tap, or press Enter). The two panels swing inward, light floods through, and the hero walks forward into view. If nobody clicks, the doors open on their own after a few seconds. With `prefers-reduced-motion` the doors simply fade.

---

## 🎨 Color Palette & Visual Design

Extracted directly from Sai Harshini's portrait:
- **Warm Cream / Ivory** (`#f6f0e6`, `#ede3d2`): Matches the background of the portrait and creates a soft glowing halo with no harsh edges.
- **Deep Obsidian / Noir** (`#0a0c0e`, `#101318`): Inspired by the blazer, creating clean contrast.
- **Leafy Botanical Green** (`#4ade80`, `#22c55e`, `#15803d`): Inspired by the trailing foliage, used for accents, badges, and progress indicators.

---

## 📸 Profile Photo Treatments

1. **Hero Centerpiece**:
   - Framed in an arch shape with glowing accent borders.
   - Head-and-shoulders crop.
   - Ambient warm cream glow eliminating any harsh boundary against the dark background.
   - 3D parallax tilt reacting to mouse movements.

2. **Sticky Navbar Avatar**:
   - On scrolling past the hero section, the photo smoothly shrinks into a circular avatar next to Sai Harshini's name.

3. **About Section**:
   - A tighter crop focusing on the face.
   - Interactive card with a slow zoom-on-hover effect.
   - Alt text: `"Portrait of Sai Harshini Nayani, web developer"`.

---

## 🚀 How to Add Your Real Projects

Open **[`script.js`](script.js)** and add your project details into the `myProjects` array at the top of the file:

```javascript
const myProjects = [
  {
    title: "My Project Name",
    description: "One-line description of what this project does.",
    tags: ["React", "HTML5", "CSS3"],
    liveUrl: "https://my-demo-link.com",
    githubUrl: "https://github.com/harshii921/my-repo"
  }
];
```

Each entry renders as a clickable card: clicking anywhere on the card opens `liveUrl` in a new tab. The first entry is **MeetWise – Intelligent Meeting Scheduler** (https://intelligent-meeting-scheduler.onrender.com/). Add `githubUrl` to show a "Code" link, and `preview: "timeline"` for the mini calendar preview.

If `myProjects` is empty, the portfolio displays a clean **"Projects in Development"** card with direct links to your GitHub profile, and automatically pulls public repositories live from the GitHub API for `harshii921`!

---

## 🌐 How to View & Deploy

### View Locally
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox!

### Deploy to GitHub Pages
1. Push your repository to GitHub (`main` or `Harshini` branch).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment**, select **Deploy from a branch** and choose `/ (root)`.
4. Your website will be live in seconds without any build tools needed!
