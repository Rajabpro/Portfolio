/* =========================================================
   PORTFOLIO JAVASCRIPT
   Mobile menu + scroll reveal + active navigation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
  const desktopLinks = document.querySelectorAll(".desktop-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function openMenu(){
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.add("open");
    mobileMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded","true");
    menuToggle.setAttribute("aria-label","Close navigation menu");
    mobileMenu.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu(){
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded","false");
    menuToggle.setAttribute("aria-label","Open navigation menu");
    mobileMenu.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }

  if (menuToggle && mobileMenu){
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
    });
    mobileLinks.forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const revealElements = document.querySelectorAll(
    ".section-label, .about-grid > div, .skills-grid article, " +
    ".project-card, .contact .eyebrow, .contact h2, .email-link"
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      desktopLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  sections.forEach(section => navObserver.observe(section));
});
