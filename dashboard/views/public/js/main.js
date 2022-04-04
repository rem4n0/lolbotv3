function imgError(e) {
  e.src = "https://imgur.com/tiZmKiK.png";
}

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});