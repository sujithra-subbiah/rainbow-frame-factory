
/* =========================================
   RAINBOW FRAME FACTORY
   Premium Website Interactions
   ========================================= */

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* MOBILE NAVIGATION */

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mainNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* STAGGERED SCROLL REVEAL */

  const revealElements = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      const parent = element.parentElement;
      const siblings = parent
        ? Array.from(parent.children).filter((child) =>
            child.classList.contains("reveal")
          )
        : [];

      const position = siblings.length > 1
        ? siblings.indexOf(element)
        : index % 4;

      const delay = reduceMotion ? 0 : Math.min(position * 100, 300);

      element.style.setProperty("--reveal-delay", `${delay}ms`);
      revealObserver.observe(element);
    });
  }

  

/* CINEMATIC SECTION NAVIGATION */

document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    // Smooth cinematic movement to the selected section
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });

    // Restart the entrance effect on repeated clicks
    target.classList.remove("rff-section-transition");
    void target.offsetWidth;
    target.classList.add("rff-section-transition");

    // Remove temporary animation classes after completion
    window.setTimeout(() => {
      target.classList.remove("rff-section-transition");
    }, 1000);

    if (history.replaceState) {
      history.replaceState(null, "", targetId);
    }
  });
});


  /* CURRENT YEAR */

  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* IMAGE FALLBACK */

  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.dataset.fallback;

      if (fallback && img.src !== fallback) {
        img.src = fallback;
      }
    });
  });

  console.info(
    "Rainbow Frame Factory: premium interactions initialized."
  );
});
