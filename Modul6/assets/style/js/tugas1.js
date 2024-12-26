$(document).ready(function () {
  // Harga berdasarkan tipe kamar
  const hargaKamar = {
    "Standar": 500000,
    "Deluxe": 750000,
    "Family": 1000000
  };

  // Update harga berdasarkan tipe kamar
  $('#tipe_kamar').change(function() {
    const tipeKamar = $(this).val();
    if (tipeKamar) {
      $('#harga').val(hargaKamar[tipeKamar]);
    } else {
      $('#harga').val('');
    }
  });

  // Validasi nomor identitas harus 16 digit
  $('#no_identitas').on('input', function() {
    const noIdentitas = $(this).val();
    if (noIdentitas.length !== 16) {
      $('#no_identitas_error').show();
    } else {
      $('#no_identitas_error').hide();
    }
  });

  // Validasi durasi menginap
  $('#durasi_menginap').on('input', function() {
    const durasi = $(this).val();
    if (isNaN(durasi)) {
      $('#durasi_error').show();
    } else {
      $('#durasi_error').hide();
    }
  });

  // Hitung total bayar dan diskon
  $('#pemesananForm').submit(function(event) {
    event.preventDefault();

    const namaPemesan = $('#nama_pemesan').val();
    const jenisKelamin = $('#jenisKelamin').val();
    const noIdentitas = $('#no_identitas').val();
    const tipeKamar = $('#tipe_kamar').val();
    const harga = parseInt($('#harga').val());
    const tglPesan = $('#tgl_pesan').val();  // Tanggal Pesan
    const durasiMenginap = parseInt($('#durasi_menginap').val());
    const breakfast = $('#breakfast').is(':checked');
    let diskon = 0;
    let totalBayar = harga * durasiMenginap;
    // Diskon 10% jika durasi menginap lebih dari 3 hari
    if (durasiMenginap > 3) {
      diskon = 0.1 * totalBayar;
      totalBayar -= diskon;
    }
    // Tambahan harga jika breakfast dipilih
    if (breakfast) {
      totalBayar += 80000;
    }
    // Menampilkan hasil di Total Bayar input field
    $('#total_bayar').val(totalBayar);
    // Resume data pemesanan
    $('#resume_nama').text(namaPemesan);
    $('#resume_identitas').text(noIdentitas);
    $('#resume_jenisKelamin').text(jenisKelamin);
    $('#resume_tipeKamar').text(tipeKamar);
    $('#resume_durasi').text(durasiMenginap);
    $('#resume_tanggalPesan').text(tglPesan);  // Menampilkan Tanggal Pesan
    $('#resume_diskon').text(diskon ? 'Rp. ' + diskon.toLocaleString() : 'Tidak ada diskon');
    $('#resume_totalBayar').text('Rp. ' + totalBayar.toLocaleString());

    // Menampilkan resume pemesanan
    $('#resume').show();
  });
});