//#region 1. NAVIGÁCIÓ ÉS MOBIL MENÜ KEZELÉSE
const nav = document.querySelector("nav");
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Fejléc hátterének változtatása görgetéskor
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("nav--scrolled");
    } else {
        nav.classList.remove("nav--scrolled");
    }
});

// Mobil menü nyitása és csukása gombnyomásra
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Menüpontra kattintáskor a menü automatikus bezárása
navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});
//#endregion

//#region 2. GÖRGETÉSI ANIMÁCIÓK (SCROLLREVEAL)
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

// Rólunk (About) szekció animációi
ScrollReveal().reveal(".about__container .section__header", {
    ...scrollRevealOption,
}); // 1. Cím beúszik azonnal (0 késleltetés)

ScrollReveal().reveal(".about__image", {
    ...scrollRevealOption,
    delay: 400,
}); // 2. Kép beúszik 400ms múlva

ScrollReveal().reveal(".about__content .section__description", {
    ...scrollRevealOption,
    delay: 800,
    interval: 300,
}); // 3. Szövegek beúsznak 800ms múlva (az interval miatt a két bekezdés szépen egymás után)

ScrollReveal().reveal(".about__logo", {
    ...scrollRevealOption,
    delay: 1400,
});
//#endregion

//#region 3. VÉLEMÉNYEK LAPOZÓ (TESTIMONIALS SLIDER)
const clientSlider = document.getElementById("clientSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (clientSlider && prevBtn && nextBtn) {
    // Következő kártyára ugrás (vagy vissza az elejére)
    nextBtn.addEventListener("click", () => {
        const maxScrollLeft = clientSlider.scrollWidth - clientSlider.clientWidth;
        
        if (clientSlider.scrollLeft >= maxScrollLeft - 5) {
            clientSlider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            clientSlider.scrollBy({ left: clientSlider.clientWidth, behavior: "smooth" });
        }
    });

    // Előző kártyára ugrás (vagy körbe a végére)
    prevBtn.addEventListener("click", () => {
        if (clientSlider.scrollLeft <= 5) {
            clientSlider.scrollTo({ left: clientSlider.scrollWidth, behavior: "smooth" });
        } else {
            clientSlider.scrollBy({ left: -clientSlider.clientWidth, behavior: "smooth" });
        }
    });
}
//#endregion