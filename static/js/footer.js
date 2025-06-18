fetch("/template/footer.html").then(response => response.text()).then(data => {
  document.getElementById("footer").innerHTML = data;
  document.getElementById("thisYear").textContent = new Date().getFullYear();

  document.querySelectorAll("#emailAddress").forEach(icon => {
    icon.addEventListener("click", () => {
      const email = icon.getAttribute("data");

      navigator.clipboard.writeText(email).then(() => {
        showNotification("Copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    });
  });
});
