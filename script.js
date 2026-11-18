/**
 * ==========================================================================
 * Sai Harshini Nayani – Portfolio JavaScript
 * Palette: Jet Black, Muted Moss Green, Neon Green
 * Vanilla ES6+ logic: Theme toggling, scroll progress bar,
 * dynamic projects, GitHub API repository integration, smooth navigation,
 * clipboard copy, and contact form handling.
 * ==========================================================================
 */

// 1. PROJECTS CONFIGURATION
const myProjects = [
  {
    title: "DevCanvas – UI Component System",
    description: "A modular, accessible UI library and design token system built with React and Tailwind CSS, based on interactive component specifications prototyped in Figma.",
    tags: ["React", "Tailwind CSS", "Figma", "UI Tokens", "WCAG"],
    liveUrl: "https://github.com/harshii921",
    githubUrl: "https://github.com/harshii921",
    badge: "Design System"
  },
  {
    title: "WeatherSphere – Forecast Dashboard",
    description: "A clean, responsive weather application consuming open REST APIs for real-time weather metrics, multi-day forecasts, and dynamic interactive meteorological displays.",
    tags: ["JavaScript (ES6+)", "REST APIs", "CSS Grid", "Responsive"],
    liveUrl: "https://github.com/harshii921",
    githubUrl: "https://github.com/harshii921",
    badge: "Web App"
  }
];

// 2. PROFILE CONFIGURATION
const profileInfo = {
  name: "Sai Harshini Nayani",
  email: "nayanisaiharshini@gmail.com",
  github: "https://github.com/harshii921",
  githubUsername: "harshii921",
  linkedin: "https://www.linkedin.com/in/saiharshini-nayani-ba805032b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
};

// --------------------------------------------------------------------------
// Utilities
// --------------------------------------------------------------------------
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text == null ? '' : String(text);
  return div.innerHTML;
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/"/g, '&quot;');
}

const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

// --------------------------------------------------------------------------
// Theme Toggle (Jet Black & Moss vs Refined Light)
// --------------------------------------------------------------------------
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function syncTheme() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#080a09' : '#f5f8f6');
    }
  }

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark';
    const next = current ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (e) {}
    syncTheme();
  });

  syncTheme();
})();

// --------------------------------------------------------------------------
// Scroll Progress Bar & Floating Back-To-Top Button
// --------------------------------------------------------------------------
(function initScrollListeners() {
  const progressEl = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressEl) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      progressEl.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// --------------------------------------------------------------------------
// Mobile Navigation Drawer
// --------------------------------------------------------------------------
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', () => {
    setOpen(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 801px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
})();

// --------------------------------------------------------------------------
// Active Navigation Link Highlighting (IntersectionObserver)
// --------------------------------------------------------------------------
(function initActiveNav() {
  const links = document.querySelectorAll('.nav .nav-link');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((section) => observer.observe(section));
})();

// --------------------------------------------------------------------------
// Copy Email to Clipboard
// --------------------------------------------------------------------------
(function initCopyEmail() {
  async function copyEmailAction() {
    try {
      await navigator.clipboard.writeText(profileInfo.email);
      showToast('✓ Email copied to clipboard');
    } catch (e) {
      showToast(`Email: ${profileInfo.email}`);
    }
  }

  ['copy-email', 'copy-email-hero', 'hero-copy-email'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', copyEmailAction);
    }
  });
})();

// --------------------------------------------------------------------------
// Contact Form Submission (Mailto Handler with Validation)
// --------------------------------------------------------------------------
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('form-error');
  if (!form) return;

  const nameEl = document.getElementById('form-name');
  const emailEl = document.getElementById('form-email');
  const subjectEl = document.getElementById('form-subject');
  const messageEl = document.getElementById('form-message');

  function showError(msg, targetField) {
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.hidden = false;
    }
    [nameEl, emailEl, messageEl].forEach((el) => {
      if (el) el.removeAttribute('aria-invalid');
    });
    if (targetField) {
      targetField.setAttribute('aria-invalid', 'true');
      targetField.focus();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const subject = subjectEl ? subjectEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    if (!name) return showError('Please enter your name.', nameEl);
    if (!/^\S+@\S+\.\S+$/.test(email)) return showError('Please enter a valid email address.', emailEl);
    if (!message) return showError('Please write a message before sending.', messageEl);

    if (errorEl) errorEl.hidden = true;
    [nameEl, emailEl, messageEl].forEach((el) => {
      if (el) el.removeAttribute('aria-invalid');
    });

    const mailSubject = subject || `Portfolio enquiry from ${name}`;
    const mailBody = `Hi Sai Harshini,\n\n${message}\n\n--\nFrom: ${name}\nEmail: ${email}`;

    window.location.href = `mailto:${profileInfo.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    showToast('Opening your email app…');
  });
})();

// --------------------------------------------------------------------------
// Render Showcase Projects
// --------------------------------------------------------------------------
function renderMyProjects() {
  const grid = document.getElementById('my-projects-grid');
  if (!grid) return;

  if (!myProjects || !myProjects.length) return;

  grid.innerHTML = myProjects.map((p) => {
    const tagsHtml = (p.tags || []).map((t) => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
    const badgeHtml = p.badge ? `<span class="badge badge-moss">${escapeHtml(p.badge)}</span>` : '';
    const codeBtn = p.githubUrl ? `
      <a href="${escapeAttr(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        <svg class="icon" aria-hidden="true"><use href="#i-github"/></svg>
        <span>Code</span>
      </a>` : '';

    return `
      <article class="card project-card">
        <div class="project-card-header">
          ${badgeHtml}
          <a href="${escapeAttr(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="text-link" style="font-size:0.85rem;">
            <span>Open</span>
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg>
          </a>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="project-card-tags">
          ${tagsHtml}
        </div>
        <div class="project-card-footer">
          <a href="${escapeAttr(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <span>Explore Project</span>
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg>
          </a>
          ${codeBtn}
        </div>
      </article>`;
  }).join('');
}

// --------------------------------------------------------------------------
// Live GitHub Repositories (Fetch from GitHub API)
// --------------------------------------------------------------------------
async function loadGitHubRepos() {
  const block = document.getElementById('github-block');
  const container = document.getElementById('github-repos-grid');
  if (!container || !block) return;

  try {
    const res = await fetch(`https://api.github.com/users/${profileInfo.githubUsername}/repos?sort=updated&per_page=9`);
    if (!res.ok) return;

    const repos = (await res.json())
      .filter((r) => !r.fork)
      .slice(0, 6);

    if (!repos.length) return;

    container.innerHTML = repos.map((repo) => {
      const cleanName = repo.name.replace(/[-_]/g, ' ');
      const desc = repo.description || 'Clean, responsive web project built with modern frontend standards.';
      const lang = repo.language || 'Code';
      const stars = repo.stargazers_count > 0 ? `<span>★ ${repo.stargazers_count}</span> &bull; ` : '';
      const date = new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

      return `
        <article class="card repo-card">
          <h4>${escapeHtml(cleanName)}</h4>
          <p>${escapeHtml(desc)}</p>
          <div class="repo-meta">
            <span>${stars}${escapeHtml(lang)} &bull; ${escapeHtml(date)}</span>
            <a href="${escapeAttr(repo.html_url)}" target="_blank" rel="noopener noreferrer">View code &rarr;</a>
          </div>
        </article>`;
    }).join('');

    block.hidden = false;
  } catch (err) {
    /* Network or rate limit: fail gracefully */
  }
}

// --------------------------------------------------------------------------
// DOM Ready
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  renderMyProjects();
  loadGitHubRepos();
});
