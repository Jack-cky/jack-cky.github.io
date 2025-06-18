fetch("/pages/splash-page.html").then(response => response.text()).then(data => {
  document.getElementById("splash-page").innerHTML = data;

  const phrases = ["poor.", "broke.", "This is Jack Chan."];
  const typewriterElement = document.getElementsByClassName("typewriter")[0];
  const prefixElement = document.getElementsByClassName("prefix")[0];
  let currentPhrase = 0;
  let currentIndex = 0;

  function type() {
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
        setTimeout(type, 120);
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
      setTimeout(deleteWord, 130);
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
