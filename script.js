/**
 * ==========================================================================
 * Sai Harshini Nayani – Modern Developer Portfolio
 * Vanilla JavaScript (No build required, works instantly in any browser)
 * ==========================================================================
 */

// 1. ADD YOUR REAL PROJECTS HERE
// To add a new project, simply add an object into this array:
const myProjects = [
  {
    title: "MeetWise – Intelligent Meeting Scheduler",
    description: "AI-powered planner that finds conflict-free meeting slots across busy calendars and timezones, using an interval-intersection engine and a natural-language request parser.",
    tags: ["FastAPI", "WebGL", "Vanilla JS", "NLP"],
    liveUrl: "https://intelligent-meeting-scheduler.onrender.com/",
    githubUrl: "",            // add the repo link here when it is public
    preview: "timeline"
  }
];

// Profile & Contact Info
const profileInfo = {
  name: "Sai Harshini Nayani",
  github: "https://github.com/harshii921",
  linkedin: "https://www.linkedin.com/in/saiharshini-nayani-ba805032b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  email: "nayanisaiharshini@gmail.com",
  githubUsername: "harshii921"
};

// --------------------------------------------------------------------------
// Door Intro: loads, then the doors swing open on click / Enter / auto
// --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');
  const bar = document.getElementById('loader-bar-fill');
  const openBtn = document.getElementById('door-open-btn');
  const skipBtn = document.getElementById('door-skip-btn');
  let progress = 0;
  let ready = false;
  let opened = false;
  let autoTimer;

  if (!loader) {
    document.body.classList.remove('door-closed');
    return;
  }

  function fastDismiss() {
    if (opened) return;
    opened = true;
    clearTimeout(autoTimer);
    loader.classList.add('hidden');
    document.body.classList.remove('door-closed');
    document.body.classList.add('door-opened');
  }

  function openDoor() {
    if (opened) return;
    opened = true;
    clearTimeout(autoTimer);
    loader.classList.add('is-opening');
    document.body.classList.add('door-opened');
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('door-closed');
    }, 1400);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fastDismiss();
    });
  }

  // Smooth fast progress bar
  const interval = setInterval(() => {
    progress += 8;
    if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
    if (progress >= 100) {
      clearInterval(interval);
      ready = true;
      loader.classList.add('ready');
      if (openBtn) openBtn.focus({ preventScroll: true });
      // Automatically opens after 2.8s so user never waits unnecessarily
      autoTimer = setTimeout(openDoor, 2800);
    }
  }, 25);

  loader.addEventListener('click', () => {
    if (ready) openDoor();
  });

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDoor();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !opened) {
      e.preventDefault();
      openDoor();
    } else if (e.key === 'Escape' && !opened) {
      fastDismiss();
    }
  });
});

// --------------------------------------------------------------------------
// Typewriter Effect
// --------------------------------------------------------------------------
const typewriterRoles = [
  "Web Developer",
  "UI/UX Designing Enthusiast",
  "Frontend Developer",
  "Creative Thinker"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter-text');

function typeEffect() {
  if (!typewriterEl) return;
  const currentRole = typewriterRoles[roleIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 1800; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typewriterRoles.length;
    typeSpeed = 400; // Pause before typing new word
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// --------------------------------------------------------------------------
// 3D Parallax Tilt for Hero Avatar Centerpiece
// --------------------------------------------------------------------------
const avatarCard = document.getElementById('hero-avatar-card');

if (avatarCard) {
  avatarCard.addEventListener('mousemove', (e) => {
    const rect = avatarCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized -1 to 1
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    const rotateX = -yNorm * 12;
    const rotateY = xNorm * 12;

    avatarCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  avatarCard.addEventListener('mouseleave', () => {
    avatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

// --------------------------------------------------------------------------
// Scroll Progress, Sticky Navbar & Active Section Highlighting
// --------------------------------------------------------------------------
const navbar = document.getElementById('navbar');
const scrollProgressBar = document.getElementById('scroll-progress');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressPercent = (scrollTop / scrollHeight) * 100;

  // Scroll bar
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${progressPercent}%`;
  }

  // Sticky navbar & avatar docking
  if (navbar) {
    if (scrollTop > 180) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active navigation highlight
  let currentSec = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 220;
    const sectionHeight = section.offsetHeight;
    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      currentSec = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSec}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// --------------------------------------------------------------------------
// Dark / Light Theme Switcher
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');

// Check saved preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  updateThemeIcon(true);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
  });
}

function updateThemeIcon(isLight) {
  if (!themeIcon) return;
  if (isLight) {
    themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    themeIcon.setAttribute('data-lucide', 'sun');
  }
  if (window.lucide) window.lucide.createIcons();
}

// --------------------------------------------------------------------------
// Mobile Menu Toggle
// --------------------------------------------------------------------------
const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggleBtn && mobileMenu) {
  mobileToggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close when clicking any mobile link
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// --------------------------------------------------------------------------
// 1-Click Copy Email
// --------------------------------------------------------------------------
function copyEmailToClipboard() {
  navigator.clipboard.writeText(profileInfo.email).then(() => {
    showToast('✓ Email copied: ' + profileInfo.email);
  }).catch(() => {
    showToast('Email: ' + profileInfo.email);
  });
}

function showToast(text) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// --------------------------------------------------------------------------
// Contact Form Submission (with Confetti)
// --------------------------------------------------------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Trigger confetti celebratory burst
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4ade80', '#ede3d2', '#22c55e', '#fdfbf7']
      });
    }

    showToast(`✓ Thank you ${name}! Message sent successfully.`);
    contactForm.reset();
  });
}

// --------------------------------------------------------------------------
// Custom Follower Cursor
// --------------------------------------------------------------------------
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    
    // Smooth follower ring
    cursorRing.animate({
      left: `${x}px`,
      top: `${y}px`
    }, { duration: 250, fill: 'forwards' });
  });

  document.querySelectorAll('a, button, input, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });
}

// --------------------------------------------------------------------------
// My Projects (from the myProjects array) – the whole card opens the live link
// --------------------------------------------------------------------------
function escapeAttr(text) {
  return escapeHtml(String(text)).replace(/"/g, '&quot;');
}

function renderMyProjects() {
  const grid = document.getElementById('my-projects-grid');
  if (!grid || !myProjects.length) return;

  const emptyState = document.querySelector('.projects-empty-state');
  const moreRow = document.getElementById('projects-more');
  if (emptyState) emptyState.style.display = 'none';
  if (moreRow) moreRow.classList.add('is-visible');

  grid.innerHTML = myProjects.map((p) => {
    let host = '';
    try { host = new URL(p.liveUrl).host; } catch (e) { host = ''; }

    const preview = p.preview === 'timeline' ? `
      <div class="project-preview" aria-hidden="true">
        <div class="pp-bar">
          <span class="pp-dot"></span><span class="pp-dot"></span><span class="pp-dot"></span>
          <span class="pp-url">${escapeHtml(host)}</span>
        </div>
        <div class="pp-body">
          <div class="pp-row"><span style="left:6%;width:32%"></span><span style="left:72%;width:20%"></span></div>
          <div class="pp-row"><span style="left:0;width:40%"></span><span style="left:68%;width:26%"></span></div>
          <div class="pp-row"><span style="left:18%;width:24%"></span><span style="left:66%;width:14%"></span></div>
          <div class="pp-free"></div>
        </div>
      </div>` : '';

    const tags = (p.tags || []).map((t) => `<span class="repo-tag">${escapeHtml(t)}</span>`).join('');

    const codeLink = p.githubUrl ? `
      <a class="project-gh" href="${escapeAttr(p.githubUrl)}" target="_blank" rel="noopener noreferrer">
        <i data-lucide="github" style="width:14px;height:14px;"></i><span>Code</span>
      </a>` : '';

    return `
      <article class="glass-card project-card">
        ${preview}
        <div class="repo-top">
          <span class="repo-badge">
            <i data-lucide="rocket" style="width:14px;height:14px;"></i>
            Live Project
          </span>
          <span class="project-live"><span class="status-dot-pulse"></span>Online</span>
        </div>
        <h4 class="repo-name project-title">
          <a class="project-link" href="${escapeAttr(p.liveUrl)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(p.title)}
          </a>
        </h4>
        <p class="repo-desc">${escapeHtml(p.description)}</p>
        <div class="repo-tags">${tags}</div>
        <div class="project-footer">
          <span class="project-cta">
            <span>Open live site</span>
            <i data-lucide="arrow-up-right" style="width:14px;height:14px;"></i>
          </span>
          ${codeLink}
        </div>
      </article>`;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderMyProjects);

// --------------------------------------------------------------------------
// Dynamic GitHub Repositories Fetcher
// --------------------------------------------------------------------------
async function loadGitHubRepos() {
  const container = document.getElementById('github-repos-grid');
  if (!container) return;

  try {
    const res = await fetch(`https://api.github.com/users/${profileInfo.githubUsername}/repos?sort=updated&per_page=6`);
    if (!res.ok) return; // Keep clean default state if offline or rate limited

    const repos = await res.json();
    const publicRepos = repos.filter(r => !r.fork);

    if (publicRepos.length > 0) {
      container.innerHTML = '';
      publicRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'glass-card repo-card';
        card.innerHTML = `
          <div>
            <div class="repo-top">
              <span class="repo-badge">
                <i data-lucide="folder-git-2" style="width:14px;height:14px;"></i>
                Repository
              </span>
              <span style="font-size:0.75rem;font-family:monospace;color:var(--cream-200);">
                ★ ${repo.stargazers_count}
              </span>
            </div>
            <h4 class="repo-name">${escapeHtml(repo.name.replace(/[-_]/g, ' '))}</h4>
            <p class="repo-desc">${escapeHtml(repo.description || 'Modern web application developed with clean code.')}</p>
            <div class="repo-tags">
              <span class="repo-tag">${repo.language || 'JavaScript'}</span>
            </div>
          </div>
          <div class="repo-footer">
            <span style="font-size:0.7rem;font-family:monospace;color:var(--text-muted);">
              Updated ${new Date(repo.updated_at).toLocaleDateString()}
            </span>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color:var(--leaf-300);font-size:0.8rem;font-weight:600;display:inline-flex;align-items:center;gap:0.3rem;">
              <span>View Code</span>
              <i data-lucide="arrow-up-right" style="width:14px;height:14px;"></i>
            </a>
          </div>
        `;
        container.appendChild(card);
      });

      if (window.lucide) window.lucide.createIcons();
    }
  } catch (err) {
    // Graceful fallback to empty state
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadGitHubRepos);

// Initialize Lucide icons if loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
