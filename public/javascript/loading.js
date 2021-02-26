function setLoading(element, color) {
  if (element.tagName === "BUTTON") {
    element.disabled = true;
  }
  element.classList.add("loading", color);
  element.innerHTML = `
    <span><i class="fas fa-circle dot"></i></span>
    <span><i class="fas fa-circle dot"></i></span>
    <span><i class="fas fa-circle dot"></i></span>
  `;
}

function stopLoading(element, text) {
  if (element.tagName === "BUTTON") {
    element.disabled = false;
  }
  element.classList.remove("loading", "white", "red");
  element.innerHTML = text;
}
