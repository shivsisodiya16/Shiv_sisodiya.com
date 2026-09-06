document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Menu Handling
    const menuBtn = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
            });
        });
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.10
    });

    revealElements.forEach(el => scrollObserver.observe(el));

    // 4. Navbar Shadow on Scroll
    const navbar = document.getElementById("site-header");

    window.addEventListener("scroll", () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.style.boxShadow = "0 8px 30px rgba(8, 35, 70, 0.08)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // =====================================
    // 5. आ / A LANGUAGE SWITCHER LOGIC
    // =====================================
    const langBtn = document.getElementById("lang-toggle-btn");
    const langBtnText = document.getElementById("lang-btn-text");
    let currentLang = "en"; // Default English

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            // Toggle Language
            currentLang = currentLang === "en" ? "hi" : "en";

            // Visual feedback on button
            if (langBtnText) {
                langBtnText.textContent = currentLang === "en" ? "अ/A" : "A/अ";
            }

            // Translate all elements having data-en & data-hi attributes
            const translatableElements = document.querySelectorAll("[data-en][data-hi]");
            translatableElements.forEach(el => {
                const translatedValue = el.getAttribute(`data-${currentLang}`);
                if (translatedValue) {
                    const icon = el.querySelector("i, svg");
                    if (icon) {
                        el.innerHTML = "";
                        el.appendChild(icon);
                        el.appendChild(document.createTextNode(" " + translatedValue));
                    } else {
                        el.textContent = translatedValue;
                    }
                }
            });

            // Re-render Lucide icons
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    }
});
