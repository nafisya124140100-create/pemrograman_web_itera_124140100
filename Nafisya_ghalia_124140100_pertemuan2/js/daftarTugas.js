export default class TaskItem {
    constructor({ id, judul, selesai = false }) {
        this.id = id;
        this.judul = judul;
        this.selesai = selesai;
    }

    updateData(dataBaru = {}) {
        return new TaskItem({ ...this, ...dataBaru });
    }

    toJSON() {
        return { id: this.id, judul: this.judul, selesai: this.selesai };
    }

    static fromJSON(data) {
        return new TaskItem(data);
    }
}