document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const duration = 1000;
		const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    
    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + window.pageYOffset;
    const distance = end - start;
    const step = Math.PI / (duration / 10);
    let count = 0;
    let curPos = start;
    
    function animateScroll() {
      if (count >= (duration / 10)) return;
      
      count += 1;
      curPos = start + distance * (0.5 - 0.5 * Math.cos(count * step));
      window.scrollTo(0, curPos);
      window.requestAnimationFrame(animateScroll);
    }
    
		window.requestAnimationFrame(animateScroll);
  });
});
