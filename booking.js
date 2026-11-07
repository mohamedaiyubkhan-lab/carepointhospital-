
document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");

    const doctorSelect = document.getElementById("doctor");
    const dateInput = document.getElementById("bookingDate");
    const timeSelect = document.getElementById("bookingTime");

    const summaryDepartment = document.getElementById("summaryDepartment");
    const summaryDoctor = document.getElementById("summaryDoctor");
    const summaryDate = document.getElementById("summaryDate");
    const summaryTime = document.getElementById("summaryTime");

    const bookingMessage = document.getElementById("bookingMessage");

    // Doctor details and departments

    const doctors = {
        "General Medicine": ["Dr. Priya Kumar"],
        "Cardiology": ["Dr. Arun Raj"],
        "Pediatrics": ["Dr. Meena Devi"],
        "Health Checkup": [
            "Dr. Priya Kumar",
            "Dr. Arun Raj",
            "Dr. Meena Devi"
        ]
    };

    // Set today's date as minimum date

    const today = new Date();

    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localDate;

    // Update doctor list

    function updateDoctors() {

        const selectedDepartment =
            document.querySelector('input[name="department"]:checked');

        doctorSelect.innerHTML =
            '<option value="">Select Doctor</option>';

        if (!selectedDepartment) return;

        const availableDoctors = doctors[selectedDepartment.value] || [];

        availableDoctors.forEach(doctor => {

            const option = document.createElement("option");

            option.value = doctor;
            option.textContent = doctor;

            doctorSelect.appendChild(option);

        });

        summaryDepartment.textContent = selectedDepartment.value;

        summaryDoctor.textContent = "Not selected";

    }

    // Department selection

    document.querySelectorAll('input[name="department"]')
        .forEach(input => {

            input.addEventListener("change", function () {

                updateDoctors();

            });

        });

    // Doctor selection

    doctorSelect.addEventListener("change", function () {

        summaryDoctor.textContent =
            doctorSelect.value || "Not selected";

    });

    // Date selection

    dateInput.addEventListener("change", function () {

        if (dateInput.value) {

            const date = new Date(dateInput.value + "T00:00:00");

            summaryDate.textContent =
                date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });

        } else {

            summaryDate.textContent = "Not selected";

        }

    });

    // Time selection

    timeSelect.addEventListener("change", function () {

        summaryTime.textContent =
            timeSelect.value || "Not selected";

    });

    // Booking form submission

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!bookingForm.reportValidity()) return;

        const department =
            document.querySelector('input[name="department"]:checked');

        if (!department) {
            bookingMessage.textContent =
                "Please select a department.";
            return;
        }

        const bookingData = {

            department: department.value,
            doctor: doctorSelect.value,
            date: dateInput.value,
            time: timeSelect.value,

            name: document.getElementById("patientName").value.trim(),

            phone: document.getElementById("patientPhone").value.trim()

        };

        // Save booking details for the next page

        sessionStorage.setItem(
            "carepointBooking",
            JSON.stringify(bookingData)
        );

        // Open appointment page

        window.location.href =
            "appointment.html?service=" +
            encodeURIComponent(bookingData.department) +
            "&doctor=" +
            encodeURIComponent(bookingData.doctor);

    });

});
