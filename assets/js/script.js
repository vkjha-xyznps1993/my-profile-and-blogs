'use strict';

/**
 * 1. Helper Element Toggle Function
 */
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

/**
 * 2. Light / Dark Mode Theme Switcher
 */
const themeToggles = document.querySelectorAll("[data-theme-toggle]");
const htmlElement = document.documentElement;

const updateThemeIcons = (theme) => {
  themeToggles.forEach(btn => {
    const icon = btn.querySelector("i");
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-regular fa-sun';
      } else {
        icon.className = 'fa-regular fa-moon';
      }
    }
  });
};

const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcons(currentTheme);

themeToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const nextTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcons(nextTheme);
  });
});

/**
 * 3. Mobile Navigation Hamburger Menu Toggle
 */
const navbar = document.querySelector("[data-navbar]");
const hamburgerBtn = document.querySelector("[data-hamburger-btn]");

if (hamburgerBtn && navbar) {
  hamburgerBtn.addEventListener("click", () => {
    elementToggleFunc(navbar);
    const icon = hamburgerBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });
}

/**
 * 4. Smooth Scrolling for Navbar Links
 */
const navLinks = document.querySelectorAll("[data-nav-link]");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    
    // Only intercept local hashes
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const header = document.querySelector("[data-site-header]");
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetSection.offsetTop - headerHeight - 15;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

      // Close mobile menu drawer if open
      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        const icon = hamburgerBtn.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      }
    }
  });
});

/**
 * 5. ScrollSpy - Active Navbar Item Highlighting on Scroll
 */
const sections = document.querySelectorAll("section[id]");

const scrollSpy = () => {
  const header = document.querySelector("[data-site-header]");
  const headerHeight = header ? header.offsetHeight : 70;
  let activeSectionId = "";

  // Check if we are at the very bottom of the page
  const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 20);

  if (isAtBottom && sections.length > 0) {
    activeSectionId = sections[sections.length - 1].getAttribute("id");
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 30;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        activeSectionId = section.getAttribute("id");
      }
    });
  }

  if (activeSectionId) {
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeSectionId}`) {
        link.classList.add("active");
      }
    });
  }
};

window.addEventListener("scroll", scrollSpy);
window.addEventListener("load", scrollSpy);

/**
 * 6. Dynamic GitHub Repositories Fetch & Categorized Filter
 */
const githubContainer = document.getElementById("github-repos-container");
let fetchedRepos = [];

const getRepoCategory = (repo) => {
  const name = (repo.name || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  
  if (name.includes('llm') || name.includes('gpt') || name.includes('generative') || name.includes('langchain') || name.includes('openai') || name.includes('rag') || name.includes('agent') || desc.includes('llm') || desc.includes('gpt') || desc.includes('generative-ai') || desc.includes('rag') || desc.includes('openai')) {
    return 'generative ai';
  }
  if (name.includes('machine-learning') || name.includes('ml') || name.includes('nlp') || name.includes('predict') || name.includes('model') || name.includes('deep-learning') || desc.includes('machine learning') || desc.includes('nlp') || desc.includes('deep learning') || desc.includes('prediction') || desc.includes('analytics')) {
    return 'machine learning';
  }
  if (repo.language && repo.language.toLowerCase() === 'python') {
    return 'python';
  }
  return 'other';
};

const renderGitHubRepos = (filterName = 'all') => {
  if (!githubContainer) return;
  githubContainer.innerHTML = '';

  const filtered = fetchedRepos.filter(repo => {
    if (filterName === 'all') return true;
    return getRepoCategory(repo) === filterName;
  });

  if (filtered.length === 0) {
    githubContainer.innerHTML = `<div class="no-repos-msg">No projects found in this category.</div>`;
    return;
  }

  filtered.forEach(repo => {
    const categoryLabel = getRepoCategory(repo);
    const techStack = repo.language || 'Software';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;

    const repoCard = document.createElement("div");
    repoCard.className = "repo-card glass-card";
    repoCard.innerHTML = `
      <div class="repo-header">
        <div class="folder-icon"><i class="fa-regular fa-folder-open"></i></div>
        <div class="repo-links">
          <a href="${repo.html_url}" target="_blank" title="View Source Code" class="social-link">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <h3 class="repo-title">${repo.name}</h3>
      <p class="repo-desc">${repo.description || 'No description available for this repository.'}</p>
      <div class="repo-meta-tags">
        <span class="category-tag">${categoryLabel}</span>
        <span class="tech-tag">${techStack}</span>
      </div>
      <div class="repo-footer">
        <div class="repo-stats">
          <span><i class="fa-regular fa-star"></i> ${stars}</span>
          <span><i class="fa-solid fa-code-fork"></i> ${forks}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="repo-btn">
          <span>Explore Code</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;
    githubContainer.appendChild(repoCard);
  });
};

if (githubContainer) {
  fetch('https://api.github.com/users/vivekjhaconnect/repos')
    .then(res => res.json())
    .then(repos => {
      fetchedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      renderGitHubRepos('all');
    })
    .catch(err => {
      console.error("Failed to load GitHub repos: ", err);
      githubContainer.innerHTML = `
        <div class="fetch-error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Could not fetch GitHub repositories. Please check connection or visit <a href="https://github.com/VivekJhaConnect" target="_blank">GitHub profile</a>.</p>
        </div>
      `;
    });
}

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterSelect = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

if (filterSelect) {
  filterSelect.addEventListener("click", () => {
    elementToggleFunc(filterSelect);
  });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedText = this.textContent.trim();
    if (selectValue) selectValue.textContent = selectedText;
    elementToggleFunc(filterSelect);
    renderGitHubRepos(selectedText.toLowerCase());
  });
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const filter = this.textContent.trim().toLowerCase();
    renderGitHubRepos(filter);
  });
});

/**
 * 7. Dynamic Blog Fetching & Details Modal Popup
 */
const blogGrid = document.getElementById("blog-posts-grid");
const blogModal = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");

let blogPosts = [];

const renderBlogPosts = () => {
  if (!blogGrid) return;
  blogGrid.innerHTML = '';

  const latestPosts = blogPosts.slice(0, 3);

  if (latestPosts.length === 0) {
    blogGrid.innerHTML = `<div class="no-posts-msg">No articles published yet.</div>`;
    return;
  }

  latestPosts.forEach(post => {
    const postCard = document.createElement("div");
    postCard.className = "blog-card glass-card";
    postCard.innerHTML = `
      <figure class="blog-banner">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </figure>
      <div class="blog-card-content">
        <div class="blog-meta">
          <span class="blog-category-label">${post.category}</span>
          <span class="dot"></span>
          <time>${post.date}</time>
        </div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-summary">${post.summary}</p>
        <button class="blog-read-more-btn" data-post-id="${post.id}">
          <span>Read Full Article</span>
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    `;
    blogGrid.appendChild(postCard);
  });

  const readMoreBtns = blogGrid.querySelectorAll(".blog-read-more-btn");
  readMoreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const postId = parseInt(btn.dataset.postId);
      openBlogModal(postId);
    });
  });
};

const openBlogModal = (postId) => {
  const post = blogPosts.find(p => p.id === postId);
  if (!post || !blogModal) return;

  const mImg = blogModal.querySelector("[data-blog-modal-img]");
  const mCategory = blogModal.querySelector("[data-blog-modal-category]");
  const mDate = blogModal.querySelector("[data-blog-modal-date]");
  const mTitle = blogModal.querySelector("[data-blog-modal-title]");
  const mText = blogModal.querySelector("[data-blog-modal-text]");

  if (mImg) {
    mImg.src = post.image;
    mImg.alt = post.title;
  }
  if (mCategory) mCategory.textContent = post.category;
  if (mDate) {
    mDate.textContent = post.date;
    mDate.setAttribute("datetime", post.date);
  }
  if (mTitle) mTitle.textContent = post.title;
  if (mText) mText.innerHTML = post.content;

  blogModal.classList.add("active");
  if (blogOverlay) blogOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Lock background scroll
};

const closeBlogModal = () => {
  if (blogModal) blogModal.classList.remove("active");
  if (blogOverlay) blogOverlay.classList.remove("active");
  document.body.style.overflow = ""; // Restore background scroll
};

if (blogModalCloseBtn && blogOverlay) {
  blogModalCloseBtn.addEventListener("click", closeBlogModal);
  blogOverlay.addEventListener("click", closeBlogModal);
}

if (blogGrid) {
  fetch('./posts.json')
    .then(res => res.json())
    .then(data => {
      blogPosts = data;
      renderBlogPosts();
    })
    .catch(err => {
      console.error("Failed to load blog posts: ", err);
      blogGrid.innerHTML = `
        <div class="fetch-error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Failed to load dynamic blog posts. Please check posts.json status.</p>
        </div>
      `;
    });
}

/**
 * 8. Contact Form Validator Toggling
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

/**
 * 9. Floating Back-to-Top Button
 */
const backToTopBtn = document.querySelector("[data-back-to-top]");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}