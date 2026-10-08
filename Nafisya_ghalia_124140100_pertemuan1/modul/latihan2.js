// 1. Tampilkan perkalian angka 5 dari 1 sampai 10
const angka = 5;
const hasilPerkalian = [];
for (let i = 1; i <= 10; i++) {
  hasilPerkalian.push(`${angka} x ${i} = ${angka * i}`);
}
document.getElementById("hasilPerkalian").textContent = hasilPerkalian.join("\n");

// 2. Hitung faktorial dari sebuah angka
function faktorial(n) {
  if (n < 0) {
    return "Faktorial harus bernilai positif";
  }
  if (n === 0) {
    return 1;
  }
  let hasil = 1;
  for (let i = 1; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}
document.getElementById("hasilFaktorial").textContent = `5! = ${faktorial(5)}`;

// 3. Periksa apakah sebuah angka adalah bilangan prima
function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  if (n <= 3) {
    return true;
  }
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

document.getElementById("hasilPrima").textContent =
  `7: ${isPrime(7) ? "bilangan prima" : "bukan bilangan prima"}\n` +
  `10: ${isPrime(10) ? "bilangan prima" : "bukan bilangan prima"}`;

// 4. Kalkulator BMI
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);

  let kategori = "";
  if (bmi < 18.5) {
    kategori = "Kekurangan berat badan";
  } else if (bmi < 24.9) {
    kategori = "Normal (Ideal)";
  } else if (bmi < 29.9) {
    kategori = "Kelebihan berat badan";
  } else {
    kategori = "Obesitas";
  }

  return { bmi: bmi.toFixed(1), kategori };
}

document.getElementById("btnBmi").addEventListener("click", function() {
  const berat = Number.parseFloat(document.getElementById("berat").value);
  const tinggi = Number.parseFloat(document.getElementById("tinggi").value);
  const areaHasil = document.getElementById("hasilBmi");

  if (!Number.isFinite(berat) || !Number.isFinite(tinggi) || berat <= 0 || tinggi <= 0) {
    areaHasil.textContent = "Masukkan nilai berat dan tinggi yang valid!";
    return;
  }

  const hasil = hitungBMI(berat, tinggi);
  areaHasil.textContent = `BMI: ${hasil.bmi}\nKategori: ${hasil.kategori}`;
});

// 5. Tampilkan FizzBuzz dari 1 sampai 100
const hasilFizzBuzz = [];
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    hasilFizzBuzz.push("FizzBuzz");
  } else if (i % 3 === 0) {
    hasilFizzBuzz.push("Fizz");
  } else if (i % 5 === 0) {
    hasilFizzBuzz.push("Buzz");
  } else {
    hasilFizzBuzz.push(i);
  }
}
document.getElementById("hasilFizzBuzz").textContent = hasilFizzBuzz.join(", ");
