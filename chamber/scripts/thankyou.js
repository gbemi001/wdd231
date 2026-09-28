
document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);


    const firstName = params.get("first-name") || "";
    const lastName = params.get("last-name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const organization = params.get("organization") || "";
    const timestamp = params.get("timestamp") || "";



    document.querySelector("#display-first-name").textContent = firstName;

    document.querySelector("#display-last-name").textContent = lastName;

    document.querySelector("#display-email").textContent = email;

    document.querySelector("#display-phone").textContent = phone;

    document.querySelector("#display-organization").textContent =
        organization;

    const timestampElement =
        document.querySelector("#display-timestamp");

    if (timestamp) {

        const date = new Date(timestamp);

        if (!Number.isNaN(date.getTime())) {

            timestampElement.textContent =
                date.toLocaleString();

        } else {

            timestampElement.textContent = timestamp;

        }

    } else {

        timestampElement.textContent = "Not available";

    }

});