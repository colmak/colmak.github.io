document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".animated-section");

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add("show");
        }, 500 * index); // Delay each section's animation
    });
});
