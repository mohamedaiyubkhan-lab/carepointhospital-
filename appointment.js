// Set minimum appointment date as today
const appointmentDate = document.getElementById("appointmentDate");

if (appointmentDate) {
  const now = new Date();

  const localToday = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  appointmentDate.min = localToday;
}

// Get doctor and department from URL
const params = new URLSearchParams(window.location.search);

const doctorParam = params.get("doctor");
const serviceParam = params.get("service");

const doctorField = document.getElementById("doctor");
const departmentField = document.getElementById("department");

if (doctorParam && doctorField) {
  doctorField.value = doctorParam;
}

if (serviceParam && departmentField) {
  departmentField.value = serviceParam;
}

// Appointment form submission
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

  appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!appointmentForm.reportValidity()) return;

    const data = Object.fromEntries(
      new FormData(appointmentForm).entries()
    );

    const requests = JSON.parse(
      localStorage.getItem("carepointAppointments") || "[]"
    );

    requests.push({
      ...data,
      submittedAt: new Date().toISOString()
    });

    localStorage.setItem(
      "carepointAppointments",
      JSON.stringify(requests)
    );

    document.getElementById("appointmentMessage").textContent =
      "Your demo appointment request has been saved successfully!";

    appointmentForm.reset();

  });

}