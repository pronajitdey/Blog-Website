const menuBtn = document.querySelector("#menu-btn");
const navLinks = document.querySelectorAll(".navbar-nav  li a");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    Array.from(navLinks).forEach((link) => {
        link.classList.toggle("active");
    });
    
    if (menuBtn.classList.contains("open")) {
        menuBtn.innerHTML = `<i class="fi fi-ss-cross-small"></i>`;
    } else {
        menuBtn.innerHTML = `<i class="fi fi-ss-menu-burger"></i>`;
    }
});
