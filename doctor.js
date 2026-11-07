const doctorSearch = document.getElementById("doctorSearch");

const specialtyFilter = document.getElementById("specialtyFilter");

const doctorCards = document.querySelectorAll(".doctor-card");

const noDoctors = document.getElementById("noDoctors");

function filterDoctors() {

  const query = doctorSearch.value.toLowerCase().trim();

  const specialty = specialtyFilter.value;

  let visible = 0;

  doctorCards.forEach(card => {

    const matchesText =
      card.dataset.name.includes(query) ||
      card.dataset.specialty.toLowerCase().includes(query);

    const matchesSpecialty =
      specialty === "all" ||
      card.dataset.specialty === specialty;

    const show = matchesText && matchesSpecialty;

    card.hidden = !show;

    if (show) visible++;

  });

  noDoctors.hidden = visible !== 0;

}

doctorSearch.addEventListener("input", filterDoctors);

specialtyFilter.addEventListener("change", filterDoctors);