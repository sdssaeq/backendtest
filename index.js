const express = require("express");
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Fungsi untuk menghitung gaji
function hitungGaji(jamKerja, tarifPerJam) {
  const jamNormal = 40;
  const tarifLembur = 1.5;

  let gajiTotal;

  if (jamKerja > jamNormal) {
    const jamLembur = jamKerja - jamNormal;
    const gajiNormal = jamNormal * tarifPerJam;
    const gajiLembur = jamLembur * tarifPerJam * tarifLembur;
    gajiTotal = gajiNormal + gajiLembur;
  } else {
    gajiTotal = jamKerja * tarifPerJam;
  }

  return gajiTotal;
}

// Endpoint untuk menghitung gaji
app.post("/hitung-gaji", (req, res) => {
  const { jamKerja, tarifPerJam } = req.body;

  // Validasi data
  if (
    typeof jamKerja !== "number" ||
    typeof tarifPerJam !== "number" ||
    jamKerja <= 0 ||
    tarifPerJam <= 0
  ) {
    return res.status(400).json({
      error:
        "Data tidak valid. Pastikan jam kerja dan tarif per jam adalah angka positif.",
    });
  }

  // Hitung gaji
  const gajiTotal = hitungGaji(jamKerja, tarifPerJam);

  // Mengirimkan hasil perhitungan
  return res.status(200).json({ gajiTotal: gajiTotal.toFixed(2) });
});

// Menjalankan server di port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}/hitung-gaji`);
  console.log(`contoh payload 
  {
    "jamKerja": 45,
    "tarifPerJam": 10000
  }
  `);
});
