// ============================================================
// PORTFOLIO DATA
// Add your Cloudinary image URLs to the `images` arrays below.
// `desc` is where you write the project description.
// `category` must match one of the PORTFOLIO_CATEGORIES below —
// this powers the filter dropdown, so keep spelling consistent.
// ============================================================
const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Gates & Entrances",
  "Staircases & Railings",
  "Doors & Screens",
  "Furniture & Décor",
  "Restoration",
  "Custom Commissions"
];

const projects = [
  {
    title: "Emirates Hills Villa — Grand Entrance Gate",
    subtitle: "Luxury Residential · Dubai",
    category: "Gates & Entrances",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481368/Screenshot_2026-06-26_172522_ala4yd.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172454_xzwh8v.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172404_qt6tw4.png"
    ]
  },
  {
    title: "Spiral Staircase & Railing System",
    subtitle: "Commercial Tower · Abu Dhabi",
    category: "Staircases & Railings",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172431_sv1wrf.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172318_v09gru.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172349_vako9o.png"
    ]
  },
  {
    title: "Bespoke Iron Chandelier Collection",
    subtitle: "Interior Décor · Sharjah",
    category: "Furniture & Décor",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172258_ykj2zr.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171612_novzmk.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172240_nqinly.png"
    ]
  },
  {
    title: "Mashrabiya Screen — Heritage Villa",
    subtitle: "Restoration · Old Dubai",
    category: "Restoration",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171636_ua179j.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172141_bsrojb.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_2_ruhxod.png"
    ]
  },
  {
    title: "Palace Perimeter Fencing — Custom Commission",
    subtitle: "Ultra-Luxury · Umm Al Quwain",
    category: "Custom Commissions",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_drn5lm.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171553_iztnsw.png"
    ]
  },
  {
    title: "Water Jet — Custom Commission",
    subtitle: "Ultra-Luxury · Umm Al Quwain",
    category: "Custom Commissions",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_drn5lm.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171553_iztnsw.png"
    ]
  }
];

// ============================================================
// PORTFOLIO GRID — dynamic render + category filter
// Cards are built from the `projects` array above, so adding a
// new project or extra images never requires touching the HTML.
// ============================================================
function renderPortfolioFilters() {
  const select = document.getElementById('port-filter');
  if (!select) return;
  select.innerHTML = PORTFOLIO_CATEGORIES
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');
  select.addEventListener('change', () => renderPortfolioGrid(select.value));
}

function renderPortfolioGrid(filter) {
  const grid = document.getElementById('port-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const activeFilter = filter || 'All Projects';

  projects.forEach((p, idx) => {
    if (activeFilter !== 'All Projects' && p.category !== activeFilter) return;

    const card = document.createElement('div');
    card.className = 'port-item';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View ' + p.title);

    card.innerHTML =
      '<img src="' + p.images[0] + '" alt="' + p.title + '" loading="lazy" ' +
      'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.85">' +
      '<div class="port-frame"></div>' +
      '<div class="port-cat-tag">' + p.category + '</div>' +
      '<div class="port-overlay"><div>' +
      '<div class="port-label-title">' + p.title + '</div>' +
      '<div class="port-label-sub">' + p.subtitle + '</div>' +
      '</div></div>';

    card.addEventListener('click', () => openLightbox(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });

    grid.appendChild(card);
  });

  if (!grid.children.length) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;padding:3.5rem 1rem;' +
      'font-family:var(--ff-display);font-style:italic;color:var(--text-muted)">' +
      'No projects in this category yet — check back soon, or ' +
      '<a href="#contact" style="color:var(--copper)">commission your own</a>.</p>';
  }
}

renderPortfolioFilters();
renderPortfolioGrid('All Projects');

// ============================================================
// LIGHTBOX ENGINE
// ============================================================
let currentProject = null;
let currentImg = 0;

function openLightbox(index) {
  const p = projects[index];
  currentProject = p;
  currentImg = 0;
  document.getElementById('lb-title').textContent = p.title;
  document.getElementById('lb-subtitle').textContent = p.subtitle;
  document.getElementById('lb-desc').textContent = p.desc;
  renderThumbs(p);
  showImage(0);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function showImage(i) {
  const p = currentProject;
  const hasImages = p.images && p.images.length > 0;
  const ph = document.getElementById('lb-placeholder');
  const img = document.getElementById('lb-main-img');
  const counter = document.getElementById('lb-counter');

  if (hasImages) {
    currentImg = Math.max(0, Math.min(i, p.images.length - 1));
    ph.style.display = 'none';
    img.style.display = 'block';
    img.src = p.images[currentImg];
    counter.textContent = (currentImg + 1) + ' / ' + p.images.length;
    document.querySelectorAll('.lb-thumb').forEach((t, idx) => {
      t.classList.toggle('active', idx === currentImg);
    });
  } else {
    ph.style.display = 'flex';
    img.style.display = 'none';
    counter.textContent = '— / —';
  }
}

function lbPrev() { showImage(currentImg - 1); }
function lbNext() { showImage(currentImg + 1); }

function renderThumbs(p) {
  const container = document.getElementById('lb-thumbs');
  container.innerHTML = '';
  if (p.images && p.images.length > 0) {
    p.images.forEach((url, i) => {
      const t = document.createElement('div');
      t.className = 'lb-thumb' + (i === 0 ? ' active' : '');
      t.onclick = () => showImage(i);
      const im = document.createElement('img');
      im.src = url; im.alt = 'Project image ' + (i + 1);
      t.appendChild(im);
      container.appendChild(t);
    });
  } else {
    const t = document.createElement('div');
    t.className = 'lb-thumb active';
    t.innerHTML = '<div class="lb-thumb-ph">Add images</div>';
    container.appendChild(t);
  }
}

// Close on backdrop click & Escape key
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
(function () {
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-mobile-panel');
  
  if (!toggle || !panel) return;

  function toggleMenu() {
    const isOpen = panel.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  toggle.addEventListener('click', toggleMenu);

  // Close when clicking links
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      panel.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
})();

// ============================================================
// CONTACT FORM — FORMSPREE SUBMISSION
// Submits via fetch so we control exactly what happens on
// success/failure, then redirects to the Thank You page only
// once Formspree confirms the submission actually went through.
// ============================================================
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

  function showStatus(message, variant) {
    if (!status) return;
    status.style.display = 'block';
    status.className = 'form-status form-status-' + variant;
    status.textContent = message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      showStatus('Form is not yet connected — replace YOUR_FORM_ID in the form action with your real Formspree form ID.', 'error');
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }
    showStatus('Sending your enquiry…', 'sending');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          showStatus('Thank you — your enquiry has been received. Redirecting…', 'success');
          setTimeout(function () {
            window.location.href = 'ThankYou.html';
          }, 1200);
        } else {
          return response.json().then(function (data) {
            const msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (err) { return err.message; }).join(', ')
              : 'Something went wrong. Please try again or contact us directly.';
            showStatus(msg, 'error');
          });
        }
      })
      .catch(function () {
        showStatus('Network error — please check your connection and try again, or reach us on WhatsApp.', 'error');
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
      });
  });
})();
