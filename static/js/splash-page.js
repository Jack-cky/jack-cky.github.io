fetch("/pages/splash-page.html").then(response => response.text()).then(data => {
  document.getElementById("splash-page").innerHTML = data;
  
  const phrases = ["a Data Scientist.", "a CS Student.", "Jack Chan."];
  let currentPhrase = 0;
  let currentIndex = 0;
  const typewriterElement = document.getElementsByClassName("typewriter")[0];
  
  function type() {
    if (currentPhrase < phrases.length) {
      if (currentIndex < phrases[currentPhrase].length) {
        typewriterElement.textContent += phrases[currentPhrase][currentIndex];
        currentIndex++;
        setTimeout(type, 100);
      } else {
        if (currentPhrase < phrases.length - 1) {
          setTimeout(deleteWord, 500);
        } else {
          setTimeout(() => {
            typewriterElement.classList.add("hide-cursor");
          }, 2000);
        }
      }
    }
  }
  
  function deleteWord() {
    if (currentIndex > 0) {
      typewriterElement.textContent = phrases[currentPhrase].slice(0, currentIndex - 1);
      currentIndex--;
      setTimeout(deleteWord, 100);
    } else {
      currentPhrase++;
      currentIndex = 0;
      if (currentPhrase < phrases.length) {
        type();
      }
    }
  }
  
  type();
});
