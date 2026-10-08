
// 1. Variabel Data Diri (const & let)
var nama = "Nafisya";
let usia = 20;
const TAHUN_LAHIR = 2006;

console.log("Nama: " + nama);
console.log("Usia: " + usia);
console.log("Tahun Lahir: " + TAHUN_LAHIR);

document.getElementById("result").innerHTML = `
<hr>
  <p>Nama: <strong>${nama}</strong></p>
  <p>Usia: <strong>${usia}</strong></p>
  <p>Tahun Lahir: <strong>${TAHUN_LAHIR}</strong></p>
`;

// 2. Cek Kelulusan nilai >= 70
let nilai = 70;

if (nilai >= 70) {
  console.log("Selamat anda lulus")
} else {
  console.log("Maaf anda tidak lulus");
}


document.getElementById("result").innerHTML += `
  <hr>
  <p>Nilai: <strong>${nilai}</strong></p>
`;


// 3. Cek umur
let umur = 20;
let kategoriUmur = "";

if (umur < 12) {
  kategoriUmur = "anak-anak";
} else if (umur >= 12 && umur <= 17) {
  kategoriUmur = "remaja";
} else if (umur >= 18 && umur <= 59) {
  kategoriUmur = "dewasa";
} else {
  kategoriUmur = "lansia";
}

console.log(kategoriUmur);

document.getElementById("result").innerHTML += `
  <hr>
  <p>Umur: <strong>${umur}</strong></p>
  <p>Kategori umur: <strong>${kategoriUmur}</strong></p>
`;

// Switch Case angka hari dalam bahasa Inggris


let hari = new Date().getDay();
let namaHari = "";

switch (hari) {
  case 0:
    namaHari = "Sunday";
    break;
  case 1:
    namaHari = "Monday";
    break;
  case 2:
    namaHari = "Tuesday";
    break;
  case 3:
    namaHari = "Wednesday";
    break;
  case 4:
    namaHari = "Thursday";
    break;
  case 5:
    namaHari = "Friday";
    break;
  case 6:
    namaHari = "Saturday  ";
    break;
  default:
    namaHari = "Tidak ada hari dengan nama tersebut";
}

console.log("Hari ini adalah: " + namaHari);

document.getElementById("result").innerHTML += `
<hr>
  <p>Hari ini adalah: <strong>${namaHari}</strong></p>
`;

//5. Menentukan grade berdasarkan nilai ujian

let nilaiUjian = 82;
let grade = nilaiUjian >= 85 ? "A" :
            nilaiUjian >= 75 ? "B" :
            nilaiUjian >= 60 ? "C" :
            nilaiUjian >= 50 ? "D" : "E";

console.log("Grade: " + grade);

document.getElementById("result").innerHTML += `
  <hr>
  <p>Nilai Ujian: <strong>${nilaiUjian}</strong></p>
  <p>Grade: <strong>${grade}</strong></p>
`;