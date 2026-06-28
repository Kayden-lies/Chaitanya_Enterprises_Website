/**
 * Chaitanya Enterprises — script.js
 * Features:
 *   1. Navbar shrink + shadow on scroll
 *   2. Active nav link tracking (IntersectionObserver)
 *   3. Fade-in-up scroll animations
 *   4. Smooth scroll for all internal links
 */

(function () {
  "use strict";

  /* -------------------------------------------------------
     1. NAVBAR: shrink on scroll
  ------------------------------------------------------- */
  const navbar = document.getElementById("mainNavbar");

  function handleNavbarScroll() {
    if (window.scrollY > 48) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on page load


  /* -------------------------------------------------------
     2. ACTIVE NAV LINK: highlight based on visible section
  ------------------------------------------------------- */
  const sections      = document.querySelectorAll("section[id]");
  const navLinks      = document.querySelectorAll(".navbar-nav .nav-link[href^='#']");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
              link.setAttribute("aria-current", "page");
            }
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));


  /* -------------------------------------------------------
     3. FADE-IN-UP: animate elements as they enter viewport
  ------------------------------------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));


  /* -------------------------------------------------------
     4. SMOOTH SCROLL: for all anchor links within the page
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile navbar if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }

      // Offset for fixed navbar
      const offset = navbar.offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });


  /* -------------------------------------------------------
     5. CONSOLE CREDIT
  ------------------------------------------------------- */
  console.log(
    "%c Chaitanya Enterprises %c Built with care ",
    "background:#0D5C4F;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px;",
    "background:#111;color:#fff;padding:4px 8px;border-radius:0 4px 4px 0;"
  );

})();
