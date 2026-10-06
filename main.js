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

//#region 3. ŰRLAP VALIDÁCIÓK (Telefonszám és Dátum)

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        // Ez a sor megkeres minden karaktert, ami NEM szám (0-9), és azonnal törli (üres stringre cseréli)
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

const dateInput = document.getElementById("date");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayFormatted = `${year}-${month}-${day}`;

    dateInput.min = todayFormatted;

}


const quoteForm = document.getElementById('quoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');

if (quoteForm && quoteSuccess) {
    quoteForm.addEventListener('submit', function(e) {
        // 1. Megakadályozzuk, hogy az oldal frissüljön és elugorjon a tetejére
        e.preventDefault(); 
        
        // 2. Eltüntetjük a kitöltött űrlapot
        quoteForm.style.display = 'none';
        
        // 3. Finoman megjelenítjük a köszönő kártyát
        quoteSuccess.style.display = 'block';

        quoteSuccess.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    });
}


//#endregion

//#region 4. GYAKORI KÉRDÉSEK (FAQ) MŰKÖDÉSE

// 1. Fő kategóriák (Témák) lenyitása
const faqCategories = document.querySelectorAll(".faq__category-btn");

faqCategories.forEach(btn => {
    btn.addEventListener("click", () => {
        // Hozzáadja vagy leveszi az 'active' osztályt a szülő elemről
        btn.parentElement.classList.toggle("active");
    });
});

// 2. Belső kérdések lenyitása és a válaszok megjelenítése
const faqQuestions = document.querySelectorAll(".faq__question");

faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
        // Hozzáadja vagy leveszi az 'active' osztályt a szülő elemről
        btn.parentElement.classList.toggle("active");
    });
});
//#endregion

//#region 5. VÉLEMÉNYEK LAPOZÓ (TESTIMONIALS SLIDER)
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