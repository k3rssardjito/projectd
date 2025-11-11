/* ==========================================================
   Script Umum Sistem Pemeriksaan APAR
   ========================================================== */

function getAparId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "TANPA_ID";
}

function tampilkanInfoApar() {
  const aparId = getAparId();
  const infoEl = document.getElementById("apar-info");
  const hiddenInput = document.getElementById("aparId");
  if (infoEl) infoEl.innerHTML = `<b>ID APAR:</b> ${aparId}`;
  if (hiddenInput) hiddenInput.value = aparId;
}

// Fungsi untuk menampilkan status submit
function formSubmitted() {
  const status = document.getElementById("status");
  status.textContent = "⏳ Mengirim data...";
  status.style.color = "black";

  // Tunggu ±1 detik agar iframe submit berhasil
  setTimeout(() => {
    status.textContent = "✅ Data berhasil disimpan!";
    status.style.color = "green";

    // Reset form
    document.getElementById("checkForm").reset();
    tampilkanInfoApar(); // Kembalikan ID APAR
  }, 1000);

  return true; // Lanjutkan submit ke iframe
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkForm")) {
    tampilkanInfoApar();
  }
});
