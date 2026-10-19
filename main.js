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

//#region 3. ŰRLAP VALIDÁCIÓK (Telefonszám és Dátum és Beküldés)

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
        // 1. Megakadályozzuk, hogy az oldal frissüljön
        e.preventDefault(); 
        
        // Gomb állapotának megváltoztatása küldés közben
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Küldés folyamatban...';

        // 2. Az űrlap adatainak összegyűjtése
        const formData = new FormData(quoteForm);

        // 3. --- IDE MÁSOLD BE A SAJÁT FORMSPREE LINKEDET! ---
        const formspreeEndpoint = "https://formspree.io/f/moejjdnv"; 

        // 4. Az adatok elküldése a háttérben
        fetch(formspreeEndpoint, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // SIKERES KÜLDÉS esetén: űrlap eltüntetése, kártya megjelenítése
                quoteForm.style.display = 'none';
                quoteSuccess.style.display = 'block';

                quoteSuccess.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                alert("Hiba történt a küldés során. Kérlek, próbáld újra!");
                submitBtn.innerText = originalBtnText;
            }
        })
        .catch(error => {
            alert("Hálózati hiba történt. Kérlek, ellenőrizd az internetkapcsolatot!");
            submitBtn.innerText = originalBtnText;
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

//#region 6. PORTFÓLIÓ GALÉRIA ÉS LIGHTBOX VEZÉRLÉS

// 1. Lenyíló galéria kezelése
// 1. Lenyíló galéria kezelése
function toggleGallery(galleryId) {
    const allGalleries = document.querySelectorAll('.gallery__container');
    const selectedGallery = document.getElementById(galleryId);
    
    // Ha a galéria éppen nyitva van, akkor most BEZÁRJUK
    if (selectedGallery.style.display === 'block') {
        selectedGallery.style.display = 'none';
        
        // Visszagörgetés a Portfolio szekcióhoz finom animációval
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: "smooth" });
        }
        return;
    }

    // Ha a galéria eddig rejtve volt, akkor KINYITJUK
    // Előbb bezárjuk az összes többit
    allGalleries.forEach(gallery => {
        gallery.style.display = 'none';
    });

    // Kinyitjuk a kiválasztottat
    selectedGallery.style.display = 'block';

    // Finom görgetés magához a kinyitott galériához (a címmel együtt)
    setTimeout(() => {
        selectedGallery.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// 2. Lightbox (Képnagyító) logika
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox__close');
    const prevBtn = document.querySelector('.lightbox__prev');
    const nextBtn = document.querySelector('.lightbox__next');

    let currentImages = [];
    let currentIndex = 0;

    // Képekre kattintás figyelése a galériákban
    document.querySelectorAll('.gallery__thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            // Megkeressük az adott galérián belüli összes képet a lapozáshoz
            const activeGalleryContainer = thumb.closest('.gallery__container');
            currentImages = Array.from(activeGalleryContainer.querySelectorAll('.gallery__thumb'));
            currentIndex = currentImages.indexOf(e.target);

            // Megnyitjuk a Lightboxot a kiválasztott képpel
            lightboxImg.src = e.target.src;
            lightbox.style.display = 'flex';
        });
    });

    // Bezárás X-re kattintva
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Bezárás, ha a sötét háttérre kattintanak (de magára a képre nem)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Következő kép lapozás
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex].src;
    });

    // Előző kép lapozás
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex].src;
    });

    // Billentyűzet támogatás (ESC-re bezárás, bal/jobb nyíllal lapozás)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        }
    });
});
//#endregion