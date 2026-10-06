import { discoverItems } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector("#discover-cards");
    const visitorMessage = document.querySelector("#visitor-message");
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#primary-navigation");
    const themeButton = document.querySelector("#theme-button");
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#last-modified");

    if (cardsContainer) {
        discoverItems.forEach((item, index) => {
            const card = document.createElement("article");
            card.className = "discover-card";
            card.style.gridArea = `item${index + 1}`;

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
                    <figcaption>${item.name}</figcaption>
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button class="learn-more" type="button">Learn More</button>
            `;

            const button = card.querySelector(".learn-more");
            button.addEventListener("click", () => {
                window.open(item.link, "_blank", "noopener,noreferrer");
            });

            cardsContainer.appendChild(card);
        });
    }

    if (visitorMessage) {
        const storageKey = "kaduna-chamber-last-visit";
        const currentVisit = Date.now();
        const previousVisit = localStorage.getItem(storageKey);

        if (!previousVisit) {
            visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const elapsed = currentVisit - Number(previousVisit);
            const day = 1000 * 60 * 60 * 24;

            if (elapsed < day) {
                visitorMessage.textContent = "Back so soon! Awesome!";
            } else {
                const days = Math.floor(elapsed / day);
                const unit = days === 1 ? "day" : "days";
                visitorMessage.textContent = `You last visited ${days} ${unit} ago.`;
            }
        }

        localStorage.setItem(storageKey, currentVisit.toString());
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });
    }

    const savedTheme = localStorage.getItem("kaduna-chamber-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem(
                "kaduna-chamber-theme",
                document.body.classList.contains("dark-mode") ? "dark" : "light"
            );
        });
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
});
