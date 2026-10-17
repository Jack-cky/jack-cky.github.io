fetch("/template/header.html").then(response => response.text()).then(data => {
  document.getElementById("header").innerHTML = data;

  function loadContent(page) {
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

      const audioTrigger = document.querySelector(".services-audio-trigger");
      if (audioTrigger) {
        audioTrigger.addEventListener("click", () => playSafely(document.getElementById("buzzwordsAudio")));
      }
    }).catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }

  function stopAllAudio() {
    document.querySelectorAll("audio").forEach(audio => {
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

      loadContent(page).then(closeMenu);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && document.querySelector(".navbar-menu").classList.contains("active"))
      closeMenu();
  });
});


function toggleMenu() {
  const open = document.querySelector(".navbar-menu").classList.toggle("active");

  document.querySelector(".navbar-btn").classList.toggle("active", open);
  document.body.classList.toggle("no-scroll", open);
}


function closeMenu() {
  document.querySelector(".navbar-menu").classList.remove("active");
  document.querySelector(".navbar-btn").classList.remove("active");
  document.body.classList.remove("no-scroll");
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

  cards.forEach((card, i) => card.style.viewTransitionName = "project-" + i);

  function applyFilter(filter) {
    const update = () => cards.forEach(card => {
      card.hidden = filter !== "all" && !card.getAttribute("data-category").split(" ").includes(filter);
    });

    document.startViewTransition ? document.startViewTransition(update) : update();
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

  const dialog = document.getElementById("videoDialog");
  const video = dialog.querySelector("video");
  document.querySelectorAll(".concept[data-video]").forEach(el => {
    el.addEventListener("click", () => {
      video.src = el.dataset.video;
      dialog.showModal();
      playSafely(video);
    });
  });
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
  video.addEventListener("ended", () => dialog.close());
  dialog.addEventListener("close", () => video.pause());
}


function showEducationSlide() {
  const badges = document.querySelector(".certification .badges");
  badges.append(...[...badges.children].map(badge => badge.cloneNode(true)));

  const items = document.querySelectorAll(".school");
  const controls = document.querySelectorAll(".control");
  let current = 0;
  let timer;

  function show(index) {
    current = index;
    items.forEach((item, i) => item.classList.toggle("active", i === index));
    controls.forEach((control, i) => control.classList.toggle("active", i === index));
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % items.length), 8000);
  }

  controls.forEach(control => {
    control.addEventListener("click", () => {
      show(Number(control.dataset.index));
      restartTimer();
    });
  });

  show(0);
  restartTimer();
}
