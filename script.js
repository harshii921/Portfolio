/**
 * ==========================================================================
 * Sai Harshini Nayani – Portfolio
 * Vanilla JavaScript. No build step, works in any modern browser.
 * ==========================================================================
 */

// 1. ADD YOUR PROJECTS HERE
// Each entry becomes a card that opens `liveUrl` in a new tab.
// Optional: `githubUrl` shows a "Code" link, `preview: "timeline"` shows the mini calendar preview.
const myProjects = [
  {
    title: "MeetWise – Intelligent Meeting Scheduler",
    description: "AI-powered planner that finds conflict-free meeting slots across busy calendars and timezones, using an interval-intersection engine and a natural-language request parser.",
    tags: ["FastAPI", "WebGL", "Vanilla JS", "NLP"],
    liveUrl: "https://intelligent-meeting-scheduler.onrender.com/",
    githubUrl: "", // add the repo link here when it is public
    preview: "timeline"
  }
];

// 2. PROFILE & CONTACT INFO
const profileInfo = {
  name: "Sai Harshini Nayani",
  github: "https://github.com/harshii921",
  githubUsername: "harshii921",
  email: "nayanisaiharshini@gmail.com"
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text == null ? '' : String(text);
  return div.innerHTML;
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/"/g, '&quot;');
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

// --------------------------------------------------------------------------
// Theme toggle (light / dark). The saved choice is applied in <head> already.
// --------------------------------------------------------------------------
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function sync() {
    const dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0e1410' : '#faf9f6');
  }

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* storage unavailable */ }
    sync();
  });

  sync();
})();

// --------------------------------------------------------------------------
// Mobile menu
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

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
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
// Highlight the nav link for the section currently in view
// --------------------------------------------------------------------------
(function initActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
})();

// --------------------------------------------------------------------------
// Copy email
// --------------------------------------------------------------------------
(function initCopyEmail() {
  const btn = document.getElementById('copy-email');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profileInfo.email);
      showToast('Email address copied');
    } catch (e) {
      showToast(`Email: ${profileInfo.email}`);
    }
  });
})();

// --------------------------------------------------------------------------
// Contact form – opens the visitor's email app with the message filled in
// --------------------------------------------------------------------------
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('form-error');
  if (!form) return;

  const nameEl = document.getElementById('form-name');
  const emailEl = document.getElementById('form-email');
  const subjectEl = document.getElementById('form-subject');
  const messageEl = document.getElementById('form-message');

  function fail(message, field) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    [nameEl, emailEl, messageEl].forEach((el) => el.removeAttribute('aria-invalid'));
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    if (!name) return fail('Enter your name.', nameEl);
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Enter a valid email address.', emailEl);
    if (!message) return fail('Enter a message.', messageEl);

    errorEl.hidden = true;
    [nameEl, emailEl, messageEl].forEach((el) => el.removeAttribute('aria-invalid'));

    const mailSubject = subject || `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href =
      `mailto:${profileInfo.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;

    showToast('Opening your email app…');
  });
})();

// --------------------------------------------------------------------------
// Projects (from the myProjects array above)
// --------------------------------------------------------------------------
function renderMyProjects() {
  const grid = document.getElementById('my-projects-grid');
  const empty = document.getElementById('projects-empty');
  if (!grid) return;

  if (!myProjects.length) {
    if (empty) empty.hidden = false;
    return;
  }

  grid.innerHTML = myProjects.map((p) => {
    let host = '';
    try { host = new URL(p.liveUrl).host; } catch (e) { /* ignore invalid URL */ }

    const preview = p.preview === 'timeline' ? `
      <div class="project-preview" aria-hidden="true">
        <div class="pp-window">
          <div class="pp-bar">
            <span class="pp-dot"></span><span class="pp-dot"></span><span class="pp-dot"></span>
            <span class="pp-url">${escapeHtml(host)}</span>
          </div>
          <div class="pp-body">
            <div class="pp-row"><span style="left:6%;width:32%"></span><span style="left:72%;width:20%"></span></div>
            <div class="pp-row"><span style="left:0;width:40%"></span><span style="left:68%;width:26%"></span></div>
            <div class="pp-row"><span style="left:18%;width:24%"></span><span style="left:66%;width:14%"></span></div>
          </div>
        </div>
      </div>` : '';

    const tags = (p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join('');

    const codeLink = p.githubUrl ? `
      <a class="project-code" href="${escapeAttr(p.githubUrl)}" target="_blank" rel="noopener noreferrer">
        ${icon('github')}<span>Code</span>
      </a>` : '';

    return `
      <article class="card project-card">
        ${preview}
        <div class="project-body">
          <h3>
            <a href="${escapeAttr(p.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.title)}</a>
          </h3>
          <p>${escapeHtml(p.description)}</p>
          <ul class="tags">${tags}</ul>
          <div class="project-footer">
            <span class="project-cta"><span>View live site</span>${icon('arrow-up-right')}</span>
            ${codeLink}
          </div>
        </div>
      </article>`;
  }).join('');
}

// --------------------------------------------------------------------------
// Extra GitHub repositories (public, non-fork, via the GitHub API)
// --------------------------------------------------------------------------
async function loadGitHubRepos() {
  const block = document.getElementById('github-block');
  const container = document.getElementById('github-repos-grid');
  const empty = document.getElementById('projects-empty');
  if (!container || !block) return;

  try {
    const res = await fetch(`https://api.github.com/users/${profileInfo.githubUsername}/repos?sort=updated&per_page=9`);
    if (!res.ok) return; // offline or rate limited: keep the page as it is

    const repos = (await res.json()).filter((r) => !r.fork).slice(0, 6);
    if (!repos.length) return;

    container.innerHTML = repos.map((repo) => `
      <article class="card repo-card">
        <h4>${escapeHtml(repo.name.replace(/[-_]/g, ' '))}</h4>
        <p>${escapeHtml(repo.description || 'Web project built with clean, responsive code.')}</p>
        <div class="repo-meta">
          <span>${escapeHtml(repo.language || 'Code')} · Updated ${escapeHtml(new Date(repo.updated_at).toLocaleDateString())}</span>
          <a href="${escapeAttr(repo.html_url)}" target="_blank" rel="noopener noreferrer">View code</a>
        </div>
      </article>`).join('');

    block.hidden = false;
    if (empty) empty.hidden = true;
  } catch (err) {
    /* network error: fail silently */
  }
}

// --------------------------------------------------------------------------
// Init
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  renderMyProjects();
  loadGitHubRepos();
});
