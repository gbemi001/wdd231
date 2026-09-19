const membersContainer = document.querySelector("#member-cards");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const themeButton = document.querySelector("#theme-button");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

function getMembershipLevel(level) {
    switch (level) {
        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        default:
            return "Member";
    }
}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <div class="member-card-header">
                <h2>${member.name}</h2>
                <p class="member-tagline">${member.tagline}</p>
            </div>

            <div class="member-card-body">

                <img
                    class="member-image"
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="90"
                    height="90"
                >

                <div class="member-details">

                    <p>
                        <strong>Address:</strong>
                        ${member.address}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${member.phone}
                    </p>

                    <p>
                        <strong>URL:</strong>
                        <a
                            href="${member.website}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website
                        </a>
                    </p>

                    <span class="membership-level">
                        ${getMembershipLevel(member.membershipLevel)}
                    </span>

                </div>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error(
            "Unable to load chamber members:",
            error
        );

        membersContainer.innerHTML = `
            <p class="error-message">
                Sorry, the member directory could not be loaded.
                Please try again later.
            </p>
        `;
    }
}

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("member-list");
    membersContainer.classList.add("member-grid");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {

    membersContainer.classList.remove("member-grid");
    membersContainer.classList.add("member-list");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    themeButton.setAttribute(
        "aria-label",
        darkModeEnabled
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    themeButton.textContent =
        darkModeEnabled ? "☀" : "◐";
});

currentYear.textContent = new Date().getFullYear();

lastModified.textContent =
    document.lastModified;

getMembers();