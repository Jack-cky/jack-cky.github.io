fetch("/pages/splash-page.html").then(response => response.text()).then(data => {
  document.getElementById("splash-page").innerHTML = data;

  const phrases = ["skint.", "cooked.", "This is Jack Chan."];
  const typewriterElement = document.getElementsByClassName("typewriter")[0];
  const prefixElement = document.getElementsByClassName("prefix")[0];
  let currentPhrase = 0;
  let currentIndex = 0;
  let isStopped = false;
  const timeoutIds = new Set();

  function shouldContinueAnimation() {
    const splashPage = document.getElementById("splash-page");
    return !isStopped && !document.hidden && splashPage && splashPage.style.display !== "none";
  }

  function queueTimeout(callback, delay) {
    const timeoutId = setTimeout(() => {
      timeoutIds.delete(timeoutId);

      if (!shouldContinueAnimation()) {
        return;
      }

      callback();
    }, delay);

    timeoutIds.add(timeoutId);
  }

  function stopSplashPageAnimation() {
    isStopped = true;
    timeoutIds.forEach(clearTimeout);
    timeoutIds.clear();
  }

  window.stopSplashPageAnimation = stopSplashPageAnimation;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSplashPageAnimation();
    }
  });

  function type() {
    if (!shouldContinueAnimation()) {
      return;
    }

    if (currentPhrase < phrases.length) {
      if (currentPhrase === 2) {
        prefixElement.style.display = "none";
      } else {
        prefixElement.style.display = "inline";
      }

      if (currentIndex < phrases[currentPhrase].length) {
        typewriterElement.textContent += phrases[currentPhrase][currentIndex];

        const containerWidth = typewriterElement.parentElement.offsetWidth;
        const textWidth = typewriterElement.offsetWidth;

        if (textWidth > containerWidth) {
          typewriterElement.textContent = typewriterElement.textContent.slice(0, -1);
          typewriterElement.textContent += "\n" + phrases[currentPhrase][currentIndex];
        }

        currentIndex++;
        queueTimeout(type, 120);
      } else {
        if (currentPhrase < phrases.length - 1) {
          queueTimeout(deleteWord, 500);
        } else {
          queueTimeout(() => {
            typewriterElement.classList.add("hide-cursor");

            if (shouldContinueAnimation()) {
              gradualScroll();
            }
          }, 2000);
        }
      }
    }
  }

  function deleteWord() {
    if (!shouldContinueAnimation()) {
      return;
    }

    if (currentIndex > 0) {
      typewriterElement.textContent = phrases[currentPhrase].slice(0, currentIndex - 1);
      currentIndex--;
      queueTimeout(deleteWord, 130);
    } else {
      currentPhrase++;
      currentIndex = 0;
      if (currentPhrase < phrases.length) {
        type();
      }
    }
  }

  function gradualScroll() {
    const targetHeight = document.body.scrollHeight;
    const step = targetHeight / 50;
    let currentScroll = 0;

    function scroll() {
      if (!shouldContinueAnimation()) {
        return;
      }

      if (currentScroll < targetHeight) {
        currentScroll += step;
        window.scrollTo(0, currentScroll);
        queueTimeout(scroll, 50);
      }
    }

    scroll();
  }

  type();
});
