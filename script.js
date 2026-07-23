const header = document.querySelector("[data-header]");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updatePage = () => {
  const scrollY = window.scrollY;
  header?.classList.toggle("is-scrolled", scrollY > 12);

  if (reducedMotion) return;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax);
    const rect = item.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const translateY = distance * speed;
    item.style.translate = `0 ${translateY}px`;
  });
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updatePage();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", updatePage, { passive: true });
updatePage();
