// ============================================
// UrbanNest — shared site behaviour
// Mobile nav, active link, back-to-top,
// simple search/filter, form validation
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    /* ---- Mobile hamburger menu ---- */
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            toggle.classList.toggle("active");
            menu.classList.toggle("show");
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                toggle.classList.remove("active");
                menu.classList.remove("show");
            });
        });
    }

    /* ---- Highlight active nav link ---- */
    const currentPage = window.location.pathname.split("/").pop() || "home.html";
    document.querySelectorAll("nav ul li a").forEach(function (link) {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });

    /* ---- Back to top button ---- */
    const backBtn = document.createElement("button");
    backBtn.className = "back-to-top";
    backBtn.setAttribute("aria-label", "Back to top");
    backBtn.innerHTML = "&#8593;";
    document.body.appendChild(backBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            backBtn.classList.add("show");
        } else {
            backBtn.classList.remove("show");
        }
    });

    backBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---- Newsletter form: basic validation + feedback ---- */
    document.querySelectorAll(".newsletter").forEach(function (box) {
        const emailInput = box.querySelector('input[type="email"]');
        const btn = box.querySelector("button");
        if (!emailInput || !btn) return;

        let msg = box.querySelector(".form-msg");
        if (!msg) {
            msg = document.createElement("p");
            msg.className = "form-msg";
            box.querySelector("div:last-child").appendChild(msg);
        }

        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const val = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(val)) {
                msg.textContent = "Please enter a valid email address.";
            } else {
                msg.textContent = "Thanks for subscribing to UrbanNest!";
                emailInput.value = "";
            }
            msg.classList.add("show");
        });
    });

    /* ---- Contact form: basic validation ---- */
    const sendBtn = document.querySelector(".send-btn");
    if (sendBtn) {
        const formBox = sendBtn.closest(".form-box");
        let msg = formBox.querySelector(".form-msg");
        if (!msg) {
            msg = document.createElement("p");
            msg.className = "form-msg";
            formBox.appendChild(msg);
        }

        sendBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const inputs = formBox.querySelectorAll("input, textarea");
            let valid = true;
            inputs.forEach(function (inp) {
                if (inp.hasAttribute("required") || inp.type === "email" || inp === inputs[0] || inp === inputs[1]) {
                    if (!inp.value.trim()) valid = false;
                }
            });

            if (!inputs[0].value.trim() || !inputs[1].value.trim()) {
                msg.textContent = "Please fill in your name and email.";
            } else {
                msg.textContent = "Message sent! Our team will contact you soon.";
                inputs.forEach(function (inp) { inp.value = ""; });
            }
            msg.classList.add("show");
        });
    }

    /* ---- Simple client-side property search/filter ---- */
    const searchBtns = document.querySelectorAll(".search-btn, .filter-btn");
    searchBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const container = document.querySelector(".properties");
            if (!container) return;

            const scope = btn.closest(".search-bar") || btn.closest(".sidebar") || document;
            const locationInput = scope.querySelector('input[type="text"]');
            const query = locationInput ? locationInput.value.trim().toLowerCase() : "";

            const cards = container.querySelectorAll(".card");
            let anyMatch = false;

            cards.forEach(function (card) {
                const text = card.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    card.style.display = "";
                    anyMatch = true;
                } else {
                    card.style.display = "none";
                }
            });

            let noResult = container.parentElement.querySelector(".no-results");
            if (!anyMatch) {
                if (!noResult) {
                    noResult = document.createElement("p");
                    noResult.className = "no-results";
                    noResult.style.color = "#aaa";
                    noResult.style.textAlign = "center";
                    noResult.style.gridColumn = "1/-1";
                    noResult.textContent = "No properties matched your search.";
                    container.after(noResult);
                }
            } else if (noResult) {
                noResult.remove();
            }
        });
    });

});
