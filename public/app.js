const patients = [];

function showSection(sectionId) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  const section = document.getElementById(sectionId);

  if (section) {
    section.classList.remove("hidden");
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  if (sectionId === "reports") {
    checkHealth();
  }
}

function addPatient(event) {
  event.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();

  if (!name) return;

  patients.push({
    id: patients.length + 1,
    name,
    phone
  });

  document.getElementById("patientName").value = "";
  document.getElementById("patientPhone").value = "";

  renderPatients();
}

function renderPatients() {
  const list = document.getElementById("patientsList");

  if (!patients.length) {
    list.innerHTML = "<p>هنوز بیماری ثبت نشده است.</p>";
    return;
  }

  list.innerHTML = patients.map(patient => `
    <div class="patient">
      <strong>${escapeHtml(patient.name)}</strong>
      <br>
      <small>
        ${patient.phone ? escapeHtml(patient.phone) : "شماره تماس ثبت نشده"}
      </small>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function checkHealth() {
  const status = document.getElementById("healthStatus");

  try {
    const response = await fetch("/api/health");
    const data = await response.json();

    status.innerHTML = `
      <p>✅ سامانه فعال است.</p>
      <p>وضعیت پرداخت بانکی: <strong>غیرفعال و حذف‌شده</strong></p>
    `;
  } catch (error) {
    status.innerHTML = "❌ ارتباط با سرور برقرار نشد.";
  }
}

renderPatients();
