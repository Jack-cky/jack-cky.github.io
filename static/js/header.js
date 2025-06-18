fetch("/template/header.html").then(response => response.text()).then(data => {
  document.getElementById("header").innerHTML = data;

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
    }).catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }
  
  document.querySelectorAll(".navbar a:not(.icon), .navbar-menu a:not(.icon), .service a").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const page = link.getAttribute("data-page");

      window.scrollTo(0, 0);

      loadContent(page).then(() => {
        closeMenu(event);
      }).catch(error => {
        console.error("Failed to load content:", error);
      });
    });
  });

  window.addEventListener("resize", () => {
    const navBarMenu = document.getElementsByClassName("navbar-menu")[0];

    if (window.innerWidth > 768 && navBarMenu.classList.contains("active"))
      closeMenu();
  });
});


function toggleMenu() {
  const navBarBtn = document.querySelector(".navbar-btn");
  const navBarMenu = document.getElementsByClassName("navbar-menu")[0];
  const body = document.body;

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
  const navBarBtn = document.querySelector(".navbar-btn");
  const navBarMenu = document.getElementsByClassName("navbar-menu")[0];
  const body = document.body;

  navBarBtn.classList.remove("active");
  navBarMenu.classList.remove("active");

  setTimeout(() => {
    navBarMenu.style.display = "none";
    body.classList.remove("no-scroll");
  }, 500);
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
  const cards = document.querySelectorAll(".project");
  const technologiaAudio = document.getElementById("technologiaAudio");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      cards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category").split(" ").includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      if (filter === "tec" && technologiaAudio) {
        technologiaAudio.currentTime = 0;
        technologiaAudio.play().catch(error => {
          console.error("Error playing audio:", error);
        });
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

  const slider = {
    init: () => {
      controls.forEach(control => 
        control.addEventListener("click", (e) => slider.clickedControl(e))
      );
      controls[current].classList.add("active");
      items[current].classList.add("active");
      items[current].style.pointerEvents = "auto";
    },

    nextSlide: () => {
      slider.reset();
      if (current === items.length - 1) current = -1;
      current++;
      controls[current].classList.add("active");
      items[current].classList.add("active");
      items[current].style.pointerEvents = "auto";
    },

    clickedControl: (e) => {
      slider.reset();
      clearInterval(intervalF);

      const control = e.target,
      dataIndex = Number(control.dataset.index);
      control.classList.add("active");

      items.forEach((item, index) => { 
        if (index === dataIndex) {
          item.classList.add("active");
          item.style.pointerEvents = "auto";
        }
      });

      current = dataIndex;
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
