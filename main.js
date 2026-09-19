const menuBtn=document.getElementById("menu-btn")
const navLinks=document.getElementById("nav-links")
const menuBtnIcon=menuBtn.querySelector("i")

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("nav--scrolled");
    } else {
        nav.classList.remove("nav--scrolled");
    }
});

menuBtn.addEventListener("click", (e)=>{
    navLinks.classList.toggle("open")

    const isOpen=navLinks.classList.contains("open")
    menuBtnIcon.setAttribute("class" , isOpen ? "ri-close-line" : "ri-menu-line")
});


navLinks.addEventListener("click",(e)=>{
    navLinks.classList.remove("open")
    menuBtnIcon.setAttribute("class", "ri-menu-line")
});



const scrollRevealOption={
    distance:"50px",
    origin:"bottom",
    duration:1000,

};

ScrollReveal().reveal(".about__container .section__header", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".about__container .section__description", {
    ...scrollRevealOption,
    delay:500,
    interval:500
});

ScrollReveal().reveal(".about__container img", {
    ...scrollRevealOption,
    delay:1500,
});

ScrollReveal().reveal(".service__container .section__header", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".service__container .section__descripiton", {
    ...scrollRevealOption,
    delay:500,
});





ScrollReveal().reveal(".blog__content .blog__header", {
    ...scrollRevealOption
});

ScrollReveal().reveal(".blog__content h4", {
    ...scrollRevealOption,
    delay:500,
});

ScrollReveal().reveal(".blog__content p", {
    ...scrollRevealOption,
    delay:1000,
});
ScrollReveal().reveal(".blog__content .blog__btn", {
    ...scrollRevealOption,
    delay:1500,
});

// Vélemények lapozása gombokkal
const clientSlider = document.getElementById("clientSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (clientSlider && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
        clientSlider.scrollBy({
            left: -clientSlider.clientWidth,
            behavior: "smooth"
        });
    });

    nextBtn.addEventListener("click", () => {
        clientSlider.scrollBy({
            left: clientSlider.clientWidth,
            behavior: "smooth"
        });
    });
}