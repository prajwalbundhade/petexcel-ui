(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const cards = [...track.children];
    const dots = carousel.querySelector(".carousel-dots");
    const previous = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");
    if (!track || !cards.length) return;

    const cardStep = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return Math.max(1, cards[0].getBoundingClientRect().width + gap);
    };
    const pageCount = () => Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / cardStep()) + 1);
    const currentPage = () => Math.min(pageCount() - 1, Math.round(track.scrollLeft / cardStep()));

    const renderDots = () => {
      if (!dots) return;
      const count = pageCount();
      dots.replaceChildren(...Array.from({ length: count }, (_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.setAttribute("aria-current", String(index === currentPage()));
        dot.addEventListener("click", () => track.scrollTo({ left: Math.min(index * cardStep(), track.scrollWidth - track.clientWidth), behavior: "smooth" }));
        return dot;
      }));
    };

    const syncDots = () => dots?.querySelectorAll("button").forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === currentPage()));
    });

    previous?.addEventListener("click", () => track.scrollBy({ left: -cardStep(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: cardStep(), behavior: "smooth" }));
    track.addEventListener("scroll", syncDots, { passive: true });
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") track.scrollBy({ left: cardStep(), behavior: "smooth" });
      if (event.key === "ArrowLeft") track.scrollBy({ left: -cardStep(), behavior: "smooth" });
    });
    new ResizeObserver(renderDots).observe(track);
    renderDots();
  });

  document.querySelectorAll(".video-card").forEach((card) => {
    const video = card.querySelector("video");
    const playButton = card.querySelector(".play");
    if (!video || !playButton) return;

    let soundMode = false;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {});

    playButton.addEventListener("click", () => {
      soundMode = true;
      video.currentTime = 0;
      video.loop = false;
      video.muted = false;
      video.controls = true;
      playButton.hidden = true;
      video.play().catch(() => {
        soundMode = false;
        video.muted = true;
        video.loop = true;
        video.controls = false;
        playButton.hidden = false;
        playButton.setAttribute("aria-label", "Video could not be played");
      });
    });
    video.addEventListener("pause", () => {
      if (!soundMode) return;
      playButton.hidden = false;
      playButton.setAttribute("aria-label", "Play video with sound");
    });
    video.addEventListener("play", () => {
      if (soundMode) playButton.hidden = true;
    });
    video.addEventListener("ended", () => {
      soundMode = false;
      video.controls = false;
      video.muted = true;
      video.loop = true;
      video.currentTime = 0;
      playButton.hidden = false;
      video.play().catch(() => {});
    });
  });

  const form = document.getElementById("subscribe-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.querySelector(".form-message");
    if (!name || !email) {
      message.textContent = "Please enter your name and email address.";
      return;
    }
    message.textContent = "Thanks! Connect your email platform to activate subscriptions.";
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
