# Sai Harshini Nayani – Developer Portfolio

A clean, responsive portfolio built with plain **HTML**, **CSS** and **JavaScript**. No build tools and no `node_modules`: open `index.html` in a browser, or deploy straight to GitHub Pages.

- **GitHub**: [github.com/harshii921](https://github.com/harshii921)
- **LinkedIn**: [Sai Harshini Nayani](https://www.linkedin.com/in/saiharshini-nayani-ba805032b?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **Email**: nayanisaiharshini@gmail.com

## Project structure

```text
portfolio/
├── index.html            # Page markup: hero, about, skills, projects, education, contact
├── style.css             # Design tokens, layout, light and dark themes
├── script.js             # Projects data, theme toggle, mobile menu, contact form, GitHub repos
├── assets/
│   ├── favicon.svg
│   └── images/
│       ├── profile.png
│       └── profile.webp
├── .github/workflows/
│   └── deploy.yml
└── README.md
```

## Features

- Opens straight onto the page (no landing screen)
- Sticky header with active-section highlighting and a mobile menu
- Light and dark themes: follows the visitor's system setting, with a toggle that remembers their choice
- Accessible by default: skip link, visible keyboard focus, semantic landmarks, reduced-motion support
- Contact form opens the visitor's email app with the message pre-filled
- Public, non-fork repositories are pulled in automatically from the GitHub API

## Editing your content

**Projects**: open `script.js` and edit the `myProjects` array at the top:

```javascript
const myProjects = [
  {
    title: "My Project Name",
    description: "One-line description of what this project does.",
    tags: ["React", "HTML5", "CSS3"],
    liveUrl: "https://my-demo-link.com",
    githubUrl: "https://github.com/harshii921/my-repo", // optional: shows a "Code" link
    preview: "timeline"                                  // optional: mini calendar preview
  }
];
```

Each card opens `liveUrl` in a new tab. If the array is empty, a "Projects coming soon" card links to your GitHub profile.

**Colours**: change the variables at the top of `style.css` (`--accent`, `--bg`, `--text`, and the `[data-theme="dark"]` block).

**Text**: headings, bio, skills and education are plain HTML in `index.html`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch** and select `/ (root)`.
