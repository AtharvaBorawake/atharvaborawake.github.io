const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === `#${entry.target.id}`
      ));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/*
  Add your actual profiles here before publishing.
  Example:
  const PROFILE_LINKS = { github: "https://github.com/AtharvaBorawake", linkedin: "https://www.linkedin.com/in/atharva-borawake-76a370197/" };
*/
const PROFILE_LINKS = { github: "https://github.com/AtharvaBorawake", linkedin: "https://www.linkedin.com/in/atharva-borawake-76a370197/" };

document.querySelectorAll("[data-link]").forEach(link => {
  const type = link.dataset.link;
  const url = PROFILE_LINKS[type];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`Add your ${type} URL in script.js before publishing.`);
    });
  }
});
