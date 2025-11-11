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

  if (!form) {
    console.warn("Form tidak ditemukan:", formSelector);
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.aparId = aparId;

    status.textContent = "⏳ Mengirim data...";
    status.style.color = "black";

    try {
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      status.textContent = text.includes("✅")
        ? text
        : "✅ Pemeriksaan berhasil disimpan.";
      status.style.color = "green";
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = "❌ Gagal mengirim data, periksa koneksi.";
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
      "https://script.google.com/macros/s/AKfycbxnUqARLvwLPQgLRxAIQ9fzVolZKcZlxC2lqaMrUrv5ha5mjKhjqW2vrCYVAHPTxuZA/exec" // ganti URL Apps Script kamu di sini
    );
  }
});
