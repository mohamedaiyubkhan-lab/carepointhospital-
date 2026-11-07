const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const messageData = Object.fromEntries(
      new FormData(contactForm).entries()
    );

    const messages = JSON.parse(
      localStorage.getItem("carepointMessages") || "[]"
    );

    messages.push({
      ...messageData,
      submittedAt: new Date().toISOString()
    });

    localStorage.setItem(
      "carepointMessages",
      JSON.stringify(messages)
    );

    document.getElementById("contactMessage").textContent =
      "Thank you! Your demo message has been saved.";

    contactForm.reset();

  });

}