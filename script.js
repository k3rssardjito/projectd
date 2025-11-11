/* ==========================================================
   Script Umum Sistem Pemeriksaan APAR
   ========================================================== */

// Ambil parameter dari URL (misal ?id=APAR-001)
function getAparId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "TANPA_ID";
}

// Tampilkan ID APAR di halaman check.html
function tampilkanInfoApar() {
  const aparId = getAparId();
  const infoEl = document.getElementById("apar-info");
  if (infoEl) {
    infoEl.innerHTML = `<b>ID APAR:</b> ${aparId}`;
  }
}

// Kirim data form ke Google Apps Script
async function kirimDataPemeriksaan(formSelector, statusSelector, scriptUrl) {
  const form = document.querySelector(formSelector);
  const status = document.querySelector(statusSelector);
  const aparId = getAparId();

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.aparId = aparId;

    status.textContent = "⏳ Mengirim data...";
    status.style.color = "black";

    try {
      await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
                  mode: "no-cors"   // <-- ini untuk bypass CORS saat testing localhost
      });

      status.textContent = "✅ Data berhasil dikirim (cek Google Sheet)";
      status.style.color = "green";
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = "❌ Gagal mengirim data.";
      status.style.color = "red";
    }
  });
}

// Jalankan otomatis saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkForm")) {
    tampilkanInfoApar();
    kirimDataPemeriksaan(
      "#checkForm",
      "#status",
      "https://script.google.com/macros/s/AKfycbz2cTJl_jXyTgnNcUbG129fX5r9H7ehSt-sSC4kRKX4JMqsL84Ck-wsGqbkXRB8NCZq/exec" // ganti URL Apps Script kamu di sini
    );
  }
});
