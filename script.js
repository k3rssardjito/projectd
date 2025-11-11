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

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkForm")) {
    tampilkanInfoApar();
  }
});
