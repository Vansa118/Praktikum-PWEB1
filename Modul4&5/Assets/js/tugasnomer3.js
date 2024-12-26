function simpanPemesanan() {
    // Ambil data dari form
    const namaPemesan = document.getElementById("namaPemesan").value;
    const jenisKelamin = document.getElementById("jenisKelamin").value;
    const nomorIdentitas = document.getElementById("nomorIdentitas").value;
    const hargaManual = parseInt(document.getElementById("harga").value, 10);
    const durasi = parseInt(document.getElementById("durasiMenginap").value, 10);
    const breakfast = document.getElementById("breakfast").checked;
    const tanggalPesan = document.getElementById("tanggalPesan").value;
  
    // Validasi input data
    if (nomorIdentitas.length !== 16 || isNaN(nomorIdentitas)) {
      alert("Isian salah, nomor identitas harus 16 digit!");
      return;
    }
    if (!durasi || durasi <= 0 || isNaN(durasi)) {
      alert("Durasi menginap harus diisi dengan angka yang valid!");
      return;
    }
  
    // Hitung harga total
    let totalHarga = hargaManual * durasi;
    let diskon = 0;
    if (durasi > 3) {
      diskon = totalHarga * 0.1; // Diskon 10%
      totalHarga *= 0.9; // Terapkan diskon
    }
  
    if (breakfast) {
      totalHarga += 80000 * durasi; // Biaya breakfast Rp 80.000 per hari
    }
  
    // Kirim data ke halaman nota dengan query string
    const queryString = `?namaPemesan=${encodeURIComponent(namaPemesan)}&jenisKelamin=${encodeURIComponent(jenisKelamin)}&nomorIdentitas=${encodeURIComponent(nomorIdentitas)}&tanggalPesan=${encodeURIComponent(tanggalPesan)}&durasi=${durasi}&diskon=${diskon}&totalHarga=${totalHarga}`;
    
    // Arahkan ke halaman nota dan kirim data
    window.location.href = "nota.html" + queryString;
  }
  