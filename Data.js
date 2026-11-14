/* ===========================================================
   DATA SHOWROOM GARASI RAY — edit file ini saja, tanpa menyentuh kode lain.
   =========================================================== */

const SHOWROOM = {
    nama: "GARASI RAY",
    wa: "62 81548900413",
    alamat: "Jl. Gajah No. 1, Semarang, Jawa Tengah",
    jam: "Senin–Sabtu, 08.00–17.00 WIB",
    peta: "Semarang",
    status: "Dealer Resmi Honda & Yamaha",
    sosial: { instagram: "https://www.instagram.com/raydinata08?srtk=MXR2ZmtpMmoxcHR5Zg%3D%3D&utm_source=qr", tiktok: "https://www.tiktok.com/@raydinata08?_r=1&_t=ZS-9BNVZPIVxvJ", facebook: "" }
};

const BUNGA_FLAT_DEFAULT = 9;

const PRODUCTS = [
    { id: "vario", nama: "Honda Vario 125", merek: "Honda", tipe: "Matic", img: "vario.png", harga: 24400000, mesin: "125 cc", rem: "CBS", desc: "Skutik sporty 125cc.", warna: [], varian: [], fitur: [] },
    { id: "beat", nama: "Honda Beat", merek: "Honda", tipe: "Matic", img: "beat.png", harga: 18980000, mesin: "110 cc eSP", rem: "CBS", desc: "Matic ringan dan gesit.", warna: [], varian: [], fitur: [] },
    { id: "stylo", nama: "Honda Stylo 160", merek: "Honda", tipe: "Matic", img: "stylo.webp", harga: 29170000, mesin: "156,9 cc eSP+", rem: "CBS / ABS", desc: "Skutik retro-modern 160cc.", warna: [], varian: [], fitur: [] },
    { id: "pcx", nama: "Honda PCX 160", merek: "Honda", tipe: "Matic", img: "pcx.webp", harga: 32670000, mesin: "156,9 cc eSP+", rem: "CBS / ABS", desc: "Big skutik mewah.", warna: [], varian: [], fitur: [] },
    { id: "scoopy", nama: "Honda Scoopy", merek: "Honda", tipe: "Matic", img: "scoopy.png", harga: 22680000, mesin: "110 cc eSP", rem: "CBS", desc: "Skutik fashionable.", warna: [], varian: [], fitur: [] },
    { id: "adv", nama: "Honda ADV 160", merek: "Honda", tipe: "Matic", img: "adv.png", harga: 36200000, mesin: "156,9 cc eSP+", rem: "CBS / ABS", desc: "Skutik petualang tangguh.", warna: [], varian: [], fitur: [] },
    { id: "cbr250", nama: "Honda CBR250RR", merek: "Honda", tipe: "Sport", img: "cbr.png", harga: 63000000, mesin: "250 cc", rem: "ABS", desc: "Motor sport berperforma tinggi.", warna: [], varian: [], fitur: [] },
    { id: "xmax", nama: "Yamaha Xmax", merek: "Yamaha", tipe: "Premium", img: "xmax.png", harga: 67960000, mesin: "250 cc Blue Core", rem: "ABS", desc: "Skutik premium 250cc.", warna: [], varian: [], fitur: [] },
    { id: "aerox", nama: "Yamaha Aerox", merek: "Yamaha", tipe: "Matic", img: "aerox.webp", harga: 29900000, mesin: "155 cc Blue Core", rem: "ABS", desc: "Skutik sporty 155cc.", warna: [], varian: [], fitur: [] },
    { id: "nmax", nama: "Yamaha NMAX 155", merek: "Yamaha", tipe: "Matic", img: "nmax.png", harga: 32800000, mesin: "155 cc Blue Core", rem: "ABS", desc: "Skutik maxi nyaman.", warna: [], varian: [], fitur: [] },
    { id: "lexy", nama: "Yamaha Lexi LX 155", merek: "Yamaha", tipe: "Matic", img: "lexy.png", harga: 26800000, mesin: "155 cc Blue Core", rem: "Disc", desc: "Skutik elegan performa maksimal.", warna: [], varian: [], fitur: [] },
    { id: "mxking", nama: "Yamaha MX King 150", merek: "Yamaha", tipe: "Sport", img: "mx-king.png", harga: 25800000, mesin: "150 cc", rem: "Disc", desc: "Motor bebek sport.", warna: [], varian: [], fitur: [] }
];

const PROMOS = [
    { judul: "Diskon DP 2 Juta", ket: "Berlaku untuk semua tipe motor Matic.", motor: "semua" },
    { judul: "Gratis Servis & Oli 3x", ket: "Khusus pembelian di bulan ini.", motor: "semua" }
];

const TESTIMONI = [
    { nama: "Budi, Semarang", motor: "Honda PCX 160", isi: "Proses pembelian sangat cepat, admin ramah." },
    { nama: "Siti, Kendal", motor: "Yamaha NMAX 155", isi: "Pelayanan memuaskan dan motor langsung dikirim." }
];

const TIPS = [
    { judul: "Cara memilih motor matic yang sesuai kebutuhan",
      isi: "Mulai dari pemakaian: untuk jarak dekat dan jalan padat, matic 110–125cc sudah cukup dan irit. Untuk perjalanan jauh atau berboncengan, pertimbangkan 150cc ke atas. Cek juga tinggi jok agar kaki nyaman menapak, kapasitas bagasi, dan fitur keselamatan seperti ABS." },
    { judul: "Tips menghitung cicilan motor agar tidak memberatkan",
      isi: "Jaga total cicilan bulanan di kisaran sepertiga atau kurang dari penghasilan bulanan, dan sisihkan juga biaya BBM, service, dan pajak. DP lebih besar membuat pokok pinjaman dan total bunga lebih kecil. Bandingkan beberapa tenor sebelum memutuskan." },
    { judul: "Perawatan rutin supaya motor awet",
      isi: "Ikuti jadwal service dan jenis oli di buku manual motor Anda. Periksa tekanan ban, rem, dan rantai atau CVT secara berkala, dan lakukan service di bengkel yang menggunakan suku cadang sesuai standar pabrikan." }
];