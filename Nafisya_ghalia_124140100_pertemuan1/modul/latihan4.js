// ==========================================
// 1. Dark Mode Toggle
// ==========================================
const btnDarkMode = document.getElementById("btnDarkMode");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

btnDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// ==========================================
// 2. Form Input Mahasiswa + Validasi + LocalStorage
// ==========================================
let dataMhs = JSON.parse(localStorage.getItem("dataMhs")) || [];

const formMhs = document.getElementById("formMhs");
const tabelMhs = document.getElementById("tabelMhs");

function renderMahasiswa() {
  tabelMhs.innerHTML = "";
  dataMhs.forEach((mhs, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${mhs.nim}</td>
      <td>${mhs.nama}</td>
      <td>${mhs.nilai}</td>
      <td><button class="btn-danger" onclick="hapusMhs(${index})">Hapus</button></td>
    `;
    tabelMhs.appendChild(row);
  });
}

function hapusMhs(index) {
  dataMhs.splice(index, 1);
  localStorage.setItem("dataMhs", JSON.stringify(dataMhs));
  renderMahasiswa();
}

formMhs.addEventListener("submit", (e) => {
  e.preventDefault();

  const nim = document.getElementById("nim").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const nilai = document.getElementById("nilai").value.trim();

  let isValid = true;

  // Reset pesan error
  document.getElementById("errNim").textContent = "";
  document.getElementById("errNama").textContent = "";
  document.getElementById("errNilai").textContent = "";

  // Validasi NIM
  if (!nim || nim.length < 8) {
    document.getElementById("errNim").textContent = "NIM minimal 8 karakter angka.";
    isValid = false;
  }

  // Validasi Nama
  if (!nama) {
    document.getElementById("errNama").textContent = "Nama tidak boleh kosong.";
    isValid = false;
  }

  // Validasi Nilai
  const numNilai = Number(nilai);
  if (nilai === "" || isNaN(numNilai) || numNilai < 0 || numNilai > 100) {
    document.getElementById("errNilai").textContent = "Nilai harus berupa angka 0 - 100.";
    isValid = false;
  }

  if (isValid) {
    dataMhs.push({ nim, nama, nilai: numNilai });
    localStorage.setItem("dataMhs", JSON.stringify(dataMhs));
    renderMahasiswa();
    formMhs.reset();
  }
});

renderMahasiswa();


// ==========================================
// 3 & 4. API Posts + Search + Pagination
// ==========================================
let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const itemsPerPage = 5;

const postsContainer = document.getElementById("postsContainer");
const searchPost = document.getElementById("searchPost");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const pageInfo = document.getElementById("pageInfo");

async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    allPosts = await res.json();
    filteredPosts = [...allPosts];
    renderPosts();
  } catch (err) {
    postsContainer.innerHTML = "<p>Gagal memuat data dari API.</p>";
  }
}

function renderPosts() {
  postsContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredPosts.slice(start, start + itemsPerPage);

  if (pageItems.length === 0) {
    postsContainer.innerHTML = "<p>Post tidak ditemukan.</p>";
  } else {
    pageItems.forEach((post) => {
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
      postsContainer.appendChild(div);
    });
  }

  pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage === totalPages || totalPages === 0;
}

searchPost.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  filteredPosts = allPosts.filter((post) => post.title.toLowerCase().includes(keyword));
  currentPage = 1;
  renderPosts();
});

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

btnNext.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  }
});

fetchPosts();


// ==========================================
// 5. Aplikasi Todo List + LocalStorage
// ==========================================
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoInput = document.getElementById("todoInput");
const btnAddTodo = document.getElementById("btnAddTodo");
const todoList = document.getElementById("todoList");

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) span.classList.add("completed");
    span.style.cursor = "pointer";
    span.addEventListener("click", () => toggleTodo(index));

    const btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.classList.add("btn-danger");
    btnHapus.addEventListener("click", () => hapusTodo(index));

    li.append(span, btnHapus);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveAndRenderTodo();
    todoInput.value = "";
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRenderTodo();
}

function hapusTodo(index) {
  todos.splice(index, 1);
  saveAndRenderTodo();
}

function saveAndRenderTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

btnAddTodo.addEventListener("click", addTodo);
renderTodos();