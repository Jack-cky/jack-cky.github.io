fetch("/template/header.html").then(response => response.text()).then(data => {
  document.getElementById("header").innerHTML = data;

  const audioCache = new Map();

  async function loadContent(page) {
    return fetch(page).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    }).then(data => {
      document.getElementById("splash-page").style.display = "none";
      document.getElementById("content").innerHTML = data;

      if (document.querySelector(".project-cat")) {
        initProjectFiltering();
      }

      if (document.querySelector(".education")) {
        showEducationSlide();
      }

      if (document.querySelector(".services-audio-trigger")) {
        initServicesAudioTrigger();
      }
    }).catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }

  function playAudio(audioPath) {
    if (!audioPath) return;

    let audio = audioCache.get(audioPath);

    if (!audio) {
      audio = new Audio(audioPath);
      audioCache.set(audioPath, audio);
    }

    playSafely(audio);
  }

  function initServicesAudioTrigger() {
    document.querySelectorAll(".services-audio-trigger").forEach(trigger => {
      trigger.addEventListener("click", () => {
        playAudio(trigger.getAttribute("data-audio"));
      });
    });
  }

  function stopAllAudio() {
    const audios = [...audioCache.values(), ...document.querySelectorAll("audio")];

    audios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAllAudio();
    }
  });

  document.querySelectorAll(".navbar a:not(.icon), .navbar-menu a:not(.icon)").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const page = link.getAttribute("data-page");

      window.stopSplashPageAnimation?.();
      stopAllAudio();
      window.scrollTo(0, 0);

      loadContent(page).then(() => {
        closeMenu(event);
      }).catch(error => {
        console.error("Failed to load content:", error);
      });
    });
  });

  window.addEventListener("resize", () => {
    const navBarMenu = document.querySelector(".navbar-menu");

    if (window.innerWidth > 768 && navBarMenu.classList.contains("active"))
      closeMenu();
  });
});


function getMenuElements() {
  return {
    navBarBtn: document.querySelector(".navbar-btn"),
    navBarMenu: document.querySelector(".navbar-menu"),
    body: document.body,
  };
}


function toggleMenu() {
  const { navBarBtn, navBarMenu, body } = getMenuElements();

  navBarBtn.classList.toggle("active");
  navBarBtn.setAttribute("aria-expanded", navBarBtn.classList.contains("active"));

  if (navBarMenu.classList.contains("active")) {
    closeMenu();
  } else {
    navBarMenu.style.display = "flex";
    setTimeout(() => {
      navBarMenu.classList.add("active");
      body.classList.add("no-scroll");
    }, 10);
  }
}


function closeMenu() {
  const { navBarBtn, navBarMenu, body } = getMenuElements();

  navBarBtn.classList.remove("active");
  navBarMenu.classList.remove("active");

  setTimeout(() => {
    navBarMenu.style.display = "none";
    body.classList.remove("no-scroll");
  }, 500);
}


function playSafely(audio) {
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.error("Error playing audio:", error);
  });
}


function showNotification(message) {
  const msgBox = document.getElementById("msgBox");

  msgBox.textContent = message;
  msgBox.style.opacity = 1;

  setTimeout(() => {
    msgBox.style.opacity = 0;
  }, 2000);
}


function initProjectFiltering() {
  const tabs = document.querySelectorAll(".project-cat div");
  const cards = [...document.querySelectorAll(".project")];
  const technologiaAudio = document.getElementById("technologiaAudio");
  const FADE_MS = 200;
  const MOVE_MS = 300;

  function isShown(card) {
    return card.style.display !== "none";
  }

  function applyFilter(filter) {
    const toHide = [];
    const staying = [];
    const toShow = [];

    cards.forEach(card => {
      const matches = filter === "all" || card.getAttribute("data-category").split(" ").includes(filter);
      const shown = isShown(card);

      if (shown && !matches) toHide.push(card);
      else if (shown && matches) staying.push(card);
      else if (!shown && matches) toShow.push(card);
    });

    const firstRects = new Map(staying.map(card => [card, card.getBoundingClientRect()]));

    toHide.forEach(card => {
      card.style.transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`;
      card.style.opacity = "0";
      card.style.transform = "scale(0.85)";
      card.style.pointerEvents = "none";
    });

    const reveal = () => {
      toHide.forEach(card => {
        card.style.display = "none";
      });

      toShow.forEach(card => {
        card.style.transition = "none";
        card.style.display = "block";
        card.style.opacity = "0";
        card.style.transform = "scale(0.85)";
      });

      staying.forEach(card => {
        const first = firstRects.get(card);
        const last = card.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;

        card.style.transition = "none";
        card.style.transform = (dx || dy) ? `translate(${dx}px, ${dy}px)` : "";
      });

      void document.body.offsetHeight;

      [...staying, ...toShow].forEach(card => {
        card.style.transition = `opacity ${MOVE_MS}ms ease, transform ${MOVE_MS}ms ease`;
        card.style.opacity = "";
        card.style.transform = "";
        card.style.pointerEvents = "";
      });
    };

    if (toHide.length) {
      setTimeout(reveal, FADE_MS);
    } else {
      reveal();
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      applyFilter(filter);

      if (filter === "tec" && technologiaAudio) {
        playSafely(technologiaAudio);
      }
    });
  });

  cards.forEach(card => card.style.display = "block");
}


function showEducationSlide() {
  const items = document.querySelectorAll(".school"),
  controls = document.querySelectorAll(".control"),
  interval = 8000;

  let current = 0;

  function activate(index) {
    controls[index].classList.add("active");
    items[index].classList.add("active");
    items[index].style.pointerEvents = "auto";
  }

  const slider = {
    init: () => {
      controls.forEach(control =>
        control.addEventListener("click", (e) => slider.clickedControl(e))
      );
      activate(current);
    },

    nextSlide: () => {
      slider.reset();
      if (current === items.length - 1) current = -1;
      current++;
      activate(current);
    },

    clickedControl: (e) => {
      slider.reset();
      clearInterval(intervalF);

      current = Number(e.target.dataset.index);
      activate(current);

      intervalF = setInterval(slider.nextSlide, interval);
    },

    reset: () => {
      items.forEach(item => {
        item.classList.remove("active");
        item.style.pointerEvents = "none";
      });
      controls.forEach(control => control.classList.remove("active"));
    }
  }

  let intervalF = setInterval(slider.nextSlide, interval);
  slider.init();
}
