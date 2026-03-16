const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(element);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId) {
      return;
    }

    if (targetId === "#") {
      event.preventDefault();
      return;
    }

    const section = document.querySelector(targetId);

    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const supportsMouseGlow =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsMouseGlow) {
  const root = document.documentElement;
  let frameId = null;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  const updateGlow = () => {
    root.style.setProperty("--mouse-x", `${pointerX}px`);
    root.style.setProperty("--mouse-y", `${pointerY}px`);
    frameId = null;
  };

  const queueGlowUpdate = () => {
    if (frameId !== null) {
      return;
    }

    frameId = window.requestAnimationFrame(updateGlow);
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    queueGlowUpdate();
  });

  window.addEventListener("pointerleave", () => {
    pointerX = window.innerWidth / 2;
    pointerY = window.innerHeight / 2;
    queueGlowUpdate();
  });
}
