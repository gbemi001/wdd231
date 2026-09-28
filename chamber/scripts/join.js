
document.addEventListener("DOMContentLoaded", () => {

    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }


    const modalButtons = document.querySelectorAll(".modal-link");
    const closeButtons = document.querySelectorAll(".modal-close");

    modalButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.showModal();
            }

        });

    });


    closeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const modal = button.closest("dialog");

            if (modal) {
                modal.close();
            }

        });

    });


    document.querySelectorAll(".membership-modal").forEach((modal) => {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                modal.close();
            }

        });

    });

});