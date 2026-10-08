// Data awal mahasiswa
let dataMahasiswa = [
  { nim: "124140100", nama: "Nafisya Ghalia", jurusan: "Teknik Informatika", nilai: 85 },
  { nim: "124140106", nama: "Frichintia Niken", jurusan: "Sistem Informasi", nilai: 95 },
  { nim: "124140103", nama: "Olivia", jurusan: "Teknik Informatika", nilai: 88 },
  { nim: "124140104", nama: "Dewi Lestari", jurusan: "Teknik Informatika", nilai: 78 },
  { nim: "124140105", nama: "Fadilla Andia", jurusan: "Sistem Informasi", nilai: 90 }
];

const tabelBody = document.getElementById("tabelBody");
const formMahasiswa = document.getElementById("formMahasiswa");
const editIndexInput = document.getElementById("editIndex");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const infoBox = document.getElementById("infoBox");

// Menampilkan data mahasiswa ke tabel
function renderTabel(list = dataMahasiswa) {
  tabelBody.innerHTML = "";

  if (list.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "Data tidak ditemukan.";
    row.appendChild(cell);
    tabelBody.appendChild(row);
    return;
  }

  list.forEach((mhs, index) => {
    const row = document.createElement("tr");
    const data = [index + 1, mhs.nim, mhs.nama, mhs.jurusan, mhs.nilai];

    data.forEach((isi) => {
      const cell = document.createElement("td");
      cell.textContent = isi;
      row.appendChild(cell);
    });

    const aksiCell = document.createElement("td");
    const originalIndex = dataMahasiswa.indexOf(mhs);
    const btnEdit = document.createElement("button");
    btnEdit.type = "button";
    btnEdit.textContent = "Edit";
    btnEdit.dataset.aksi = "edit";
    btnEdit.dataset.index = originalIndex;

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.textContent = "Hapus";
    btnDelete.dataset.aksi = "hapus";
    btnDelete.dataset.index = originalIndex;

    aksiCell.append(btnEdit, " ", btnDelete);
    row.appendChild(aksiCell);
    tabelBody.appendChild(row);
  });
}

// Menambah atau menyimpan perubahan data
formMahasiswa.addEventListener("submit", function(event) {
  event.preventDefault();

  const editIndex = Number.parseInt(editIndexInput.value, 10);
  const mahasiswa = {
    nim: document.getElementById("nim").value.trim(),
    nama: document.getElementById("nama").value.trim(),
    jurusan: document.getElementById("jurusan").value.trim(),
    nilai: Number.parseFloat(document.getElementById("nilai").value)
  };

  if (editIndex === -1) {
    dataMahasiswa.push(mahasiswa);
  } else {
    dataMahasiswa[editIndex] = mahasiswa;
  }

  resetForm();
  hideInfoBox();
  renderTabel();
});

// Mengisi form dengan data yang dipilih
function editMahasiswa(index) {
  const mahasiswa = dataMahasiswa[index];
  document.getElementById("nim").value = mahasiswa.nim;
  document.getElementById("nama").value = mahasiswa.nama;
  document.getElementById("jurusan").value = mahasiswa.jurusan;
  document.getElementById("nilai").value = mahasiswa.nilai;

  editIndexInput.value = index;
  btnSubmit.textContent = "Simpan Perubahan";
  btnCancel.hidden = false;
}

// Menghapus data yang dipilih
function hapusMahasiswa(index) {
  if (confirm(`Yakin ingin menghapus data ${dataMahasiswa[index].nama}?`)) {
    dataMahasiswa.splice(index, 1);
    hideInfoBox();
    renderTabel();
  }
}

tabelBody.addEventListener("click", function(event) {
  const tombol = event.target.closest("button");
  if (!tombol) return;

  const index = Number.parseInt(tombol.dataset.index, 10);
  if (tombol.dataset.aksi === "edit") {
    editMahasiswa(index);
  } else if (tombol.dataset.aksi === "hapus") {
    hapusMahasiswa(index);
  }
});

// Mengembalikan form ke kondisi awal
function resetForm() {
  formMahasiswa.reset();
  editIndexInput.value = "-1";
  btnSubmit.textContent = "Tambah Mahasiswa";
  btnCancel.hidden = true;
}

btnCancel.addEventListener("click", resetForm);

// Menampilkan mahasiswa dengan nilai tertinggi
document.getElementById("btnTertinggi").addEventListener("click", function() {
  if (dataMahasiswa.length === 0) {
    showInfoBox("Belum ada data mahasiswa.");
    return;
  }

  const tertinggi = dataMahasiswa.reduce((maksimal, mahasiswa) =>
    mahasiswa.nilai > maksimal.nilai ? mahasiswa : maksimal
  );

  showInfoBox(
    `Mahasiswa nilai tertinggi: ${tertinggi.nama} (${tertinggi.nim}), ` +
    `${tertinggi.jurusan}, nilai ${tertinggi.nilai}.`
  );
  renderTabel([tertinggi]);
});

// Menampilkan mahasiswa dengan nilai di atas rata-rata
document.getElementById("btnDiatasRata").addEventListener("click", function() {
  if (dataMahasiswa.length === 0) {
    showInfoBox("Belum ada data mahasiswa.");
    return;
  }

  const totalNilai = dataMahasiswa.reduce((total, mahasiswa) => total + mahasiswa.nilai, 0);
  const rataRata = totalNilai / dataMahasiswa.length;
  const diatasRata = dataMahasiswa.filter((mahasiswa) => mahasiswa.nilai > rataRata);

  showInfoBox(
    `Nilai rata-rata kelas: ${rataRata.toFixed(2)}. ` +
    `Ada ${diatasRata.length} mahasiswa dengan nilai di atas rata-rata.`
  );
  renderTabel(diatasRata);
});

// Mengurutkan data berdasarkan nama
document.getElementById("btnSortAsc").addEventListener("click", () => sortNama(true));
document.getElementById("btnSortDesc").addEventListener("click", () => sortNama(false));

function sortNama(ascending) {
  dataMahasiswa.sort((a, b) => {
    const perbandingan = a.nama.localeCompare(b.nama);
    return ascending ? perbandingan : -perbandingan;
  });

  showInfoBox(`Data diurutkan berdasarkan nama ${ascending ? "A-Z" : "Z-A"}.`);
  renderTabel();
}

// Menampilkan kembali semua data
document.getElementById("btnReset").addEventListener("click", function() {
  hideInfoBox();
  renderTabel();
});

function showInfoBox(pesan) {
  infoBox.textContent = pesan;
  infoBox.hidden = false;
}

function hideInfoBox() {
  infoBox.textContent = "";
  infoBox.hidden = true;
}

renderTabel();
