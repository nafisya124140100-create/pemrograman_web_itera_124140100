import TaskItem from './daftarTugas.js';

export default class dashboard {
    constructor(storageKey = 'dasbor_tugas_v5') {
        this.storageKey = storageKey;
        this.daftarTugas = [];

        this.elForm = document.getElementById('formTambah');
        this.elInput = document.getElementById('inputTugas');
        this.elDaftar = document.getElementById('daftarTugas');
        this.elBtnReset = document.getElementById('btnReset');

        this.init();
    }

    init() {
        this.bindEvents();
        this.muatTugas();
    }

    bindEvents() {
        this.elForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.tambahTugas();
        });

        this.elBtnReset.addEventListener('click', () => this.resetKeDataAwal());

        this.elDaftar.addEventListener('click', (event) => {
            const target = event.target.closest('[data-action]');
            if (!target) return;

            const id = Number(target.dataset.id);
            const aksi = target.dataset.action;

            if (aksi === 'toggle') this.toggleStatus(id);
            if (aksi === 'edit') this.mulaiEdit(id);
            if (aksi === 'hapus') this.hapusTugas(id);
        });
    }

    muatTugas() {
        const dataMentah = localStorage.getItem(this.storageKey);

        if (dataMentah) {
            try {
                const dataParse = JSON.parse(dataMentah);
                this.daftarTugas = Array.isArray(dataParse)
                    ? dataParse.map(item => TaskItem.fromJSON(item))
                    : [];
            } catch (error) {
                console.error('Gagal parse data dari localStorage:', error);
                this.daftarTugas = [];
            }
        }

        if (this.daftarTugas.length === 0) {
            this.fetchDataAwal();
        } else {
            this.renderTampilan();
        }
    }

    simpanKeStorage() {
        const dataSiapSimpan = this.daftarTugas.map(tugas => tugas.toJSON());
        localStorage.setItem(this.storageKey, JSON.stringify(dataSiapSimpan));
    }

    async fetchDataAwal() {
        this.elDaftar.innerHTML = `
            <li class="status-loading">
                <div class="spinner"></div>
                <span>Mengambil data dari server...</span>
            </li>`;

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            if (!response.ok) throw new Error('Gagal fetch data');

            const data = await response.json();
            this.daftarTugas = data.map(item => new TaskItem({
                id: item.id,
                judul: item.title,
                selesai: item.completed
            }));

            this.simpanKeStorage();
            this.renderTampilan();
        } catch (error) {
            console.error(error);
            this.elDaftar.innerHTML = `
                <li class="status-error">
                    ⚠️ Gagal memuat tugas awal. Cek koneksi internet kamu.
                </li>`;
        }
    }

    async resetKeDataAwal() {
        const yakin = confirm('Yakin mau hapus semua tugas dan muat ulang dari API?');
        if (!yakin) return;

        localStorage.removeItem(this.storageKey);
        this.daftarTugas = [];
        await this.fetchDataAwal();
    }

    tambahTugas() {
        const judul = this.elInput.value.trim();
        if (!judul) return;

        const tugasBaru = new TaskItem({ id: Date.now(), judul, selesai: false });
        this.daftarTugas = [tugasBaru, ...this.daftarTugas];

        this.elInput.value = '';
        this.simpanKeStorage();
        this.renderTampilan();
        this.elInput.focus();
    }

    toggleStatus(id) {
        this.daftarTugas = this.daftarTugas.map(tugas =>
            tugas.id === id ? tugas.updateData({ selesai: !tugas.selesai }) : tugas
        );
        this.simpanKeStorage();
        this.renderTampilan();
    }

    hapusTugas(id) {
        this.daftarTugas = this.daftarTugas.filter(tugas => tugas.id !== id);
        this.simpanKeStorage();
        this.renderTampilan();
    }

    mulaiEdit(id) {
        const tugas = this.daftarTugas.find(t => t.id === id);
        if (!tugas) return;

        const elItem = this.elDaftar.querySelector(`[data-id="${id}"]`);
        const elContent = elItem.querySelector('.task-content');
        const elAction = elItem.querySelector('.action-group');

        elItem.classList.add('editing');

        elContent.innerHTML = `
            <input type="text" class="edit-input"
                   value="${this.escapeHtml(tugas.judul)}"
                   id="edit-input-${id}" />
        `;

        elAction.innerHTML = `
            <button class="btn-action" style="color: var(--color-success)"
                    data-action="simpan-edit" data-id="${id}">Simpan</button>
            <button class="btn-action" style="color: var(--color-text-muted)"
                    data-action="batal-edit" data-id="${id}">❌ Batal</button>
        `;

        const elEditInput = document.getElementById(`edit-input-${id}`);
        elEditInput.focus();
        elEditInput.select();

        const handleSimpan = () => this.selesaiEdit(id, elEditInput.value);

        elEditInput.addEventListener('blur', handleSimpan);
        elEditInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); elEditInput.blur(); }
            else if (e.key === 'Escape') { this.renderTampilan(); }
        });

        elAction.querySelector('[data-action="simpan-edit"]').addEventListener('click', handleSimpan);
        elAction.querySelector('[data-action="batal-edit"]').addEventListener('click', () => this.renderTampilan());
    }

    selesaiEdit(id, judulBaru) {
        const judulBersih = judulBaru.trim();
        if (!judulBersih) {
            alert('Judul tugas nggak boleh kosong!');
            this.renderTampilan();
            return;
        }

        this.daftarTugas = this.daftarTugas.map(tugas =>
            tugas.id === id ? tugas.updateData({ judul: judulBersih }) : tugas
        );

        this.simpanKeStorage();
        this.renderTampilan();
    }

    renderTampilan() {
        if (this.daftarTugas.length === 0) {
            this.elDaftar.innerHTML = `<li class="status-empty">Belum ada tugas nih!</li>`;
            return;
        }

        this.elDaftar.innerHTML = this.daftarTugas.map(tugas => `
            <li class="task-item ${tugas.selesai ? 'completed' : ''}" data-id="${tugas.id}">
                <div class="task-content">
                    <input type="checkbox" class="checkbox-custom"
                           ${tugas.selesai ? 'checked' : ''}
                           data-action="toggle" data-id="${tugas.id}" />
                    <span class="task-title">${this.escapeHtml(tugas.judul)}</span>
                </div>
                <div class="action-group">
                    <button class="btn-action btn-edit" data-action="edit" data-id="${tugas.id}">Edit</button>
                    <button class="btn-action btn-delete" data-action="hapus" data-id="${tugas.id}">Hapus</button>
                </div>
            </li>
        `).join('');
    }

    escapeHtml(teks) {
        const span = document.createElement('span');
        span.textContent = teks;
        return span.innerHTML;
    }
}