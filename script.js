document.querySelectorAll(".menu-toggle").forEach(button => {

  button.addEventListener("click", () => {

    const nav = button.parentElement.querySelector(".main-nav");

    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));

  });

});