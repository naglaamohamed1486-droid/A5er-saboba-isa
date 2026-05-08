const burger = document.getElementById("burger");
const div = document.getElementById("menue");

burger.addEventListener('click', () => {
    if (div.style.display === "block") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        div.style.display = "none";
    }
});