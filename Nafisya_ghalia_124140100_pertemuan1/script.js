(function () {
  "use strict";

  var KEY_CART = "minipos:cart";
  var KEY_HIST = "minipos:riwayat";
  var MAX_QTY = 99, MAX_PRICE = 10000000, MIN_PRICE = 500, MAX_HISTORY = 50;

  function $(id) { return document.getElementById(id); }
  function rp(n) { return "Rp" + Math.round(n).toLocaleString("id-ID"); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtTime(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) + " " +
           d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* abaikan */ }
  }

  function sanitizeCart(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter(function (i) {
      return i && typeof i.nama === "string" && Number.isInteger(i.harga) && Number.isInteger(i.qty) &&
             i.harga > 0 && i.qty > 0 && i.qty <= MAX_QTY;
    });
  }

  var cart = sanitizeCart(load(KEY_CART, []));
  var history = Array.isArray(load(KEY_HIST, [])) ? load(KEY_HIST, []) : [];

  var validators = {
    nama: function (v) {
      v = v.trim().replace(/\s+/g, " ");
      if (!v) return "Nama barang wajib diisi.";
      if (v.length < 3) return "Nama barang minimal 3 karakter.";
      if (v.length > 40) return "Nama barang maksimal 40 karakter.";
      return "";
    },
    harga: function (v) {
      v = v.trim();
      if (!v) return "Harga wajib diisi.";
      if (!/^\d+$/.test(v)) return "Harga hanya boleh berisi angka.";
      var n = parseInt(v, 10);
      if (n < MIN_PRICE) return "Harga minimal " + rp(MIN_PRICE) + ".";
      if (n > MAX_PRICE) return "Harga maksimal " + rp(MAX_PRICE) + ".";
      return "";
    },
    qty: function (v) {
      v = v.trim();
      if (!v) return "Jumlah wajib diisi.";
      if (!/^\d+$/.test(v)) return "Jumlah harus berupa bilangan bulat.";
      var n = parseInt(v, 10);
      if (n < 1) return "Jumlah minimal 1.";
      if (n > MAX_QTY) return "Jumlah maksimal " + MAX_QTY + ".";
      return "";
    }
  };

  function showError(id, msg) {
    var input = $(id), err = $("err-" + id);
    err.textContent = msg;
    input.classList.toggle("invalid", !!msg);
    input.classList.toggle("valid", !msg && input.value.trim() !== "" && input.dataset.touched === "1");
    if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
  }

  var formFields = ["nama", "harga", "qty"];
  formFields.forEach(function (id) {
    var el = $(id);
    el.addEventListener("blur", function () { el.dataset.touched = "1"; showError(id, validators[id](el.value)); });
    el.addEventListener("input", function () { if (el.dataset.touched === "1") showError(id, validators[id](el.value)); });
  });

  $("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true, firstBad = null;
    formFields.forEach(function (id) {
      var el = $(id); el.dataset.touched = "1";
      var msg = validators[id](el.value);
      showError(id, msg);
      if (msg) { ok = false; if (!firstBad) firstBad = el; }
    });
    if (!ok) { firstBad.focus(); return; }

    var nama = $("nama").value.trim().replace(/\s+/g, " ");
    var harga = parseInt($("harga").value, 10);
    var qty = parseInt($("qty").value, 10);

    var existing = cart.find(function (i) { return i.nama.toLowerCase() === nama.toLowerCase() && i.harga === harga; });
    if (existing) {
      if (existing.qty + qty > MAX_QTY) {
        showError("qty", "Total \"" + existing.nama + "\" di keranjang sudah " + existing.qty + ". Maksimal " + MAX_QTY + ".");
        $("qty").focus();
        return;
      }
      existing.qty += qty;
    } else {
      cart.push({ id: Date.now() + Math.random(), nama: nama, harga: harga, qty: qty });
    }
    persistCart();
    toast(nama + " ×" + qty + " ditambahkan");
    clearForm();
    $("nama").focus();
    render();
  });

  function clearForm() {
    formFields.forEach(function (id) {
      var el = $(id);
      el.value = id === "qty" ? "1" : "";
      el.dataset.touched = "";
      el.classList.remove("valid", "invalid");
      el.removeAttribute("aria-invalid");
      $("err-" + id).textContent = "";
    });
  }
  $("resetForm").addEventListener("click", function () { clearForm(); $("nama").focus(); });

  function persistCart() { save(KEY_CART, cart); }

  $("cart").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]");
    if (!btn) return;
    var idx = cart.findIndex(function (i) { return String(i.id) === btn.dataset.id; });
    if (idx < 0) return;
    var act = btn.dataset.act;
    if (act === "inc" && cart[idx].qty < MAX_QTY) cart[idx].qty++;
    if (act === "dec" && cart[idx].qty > 1) cart[idx].qty--;
    if (act === "rm") { toast(cart[idx].nama + " dihapus"); cart.splice(idx, 1); }
    persistCart();
    render();
  });

  function armed(btn, label, action) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("armed")) {
        clearTimeout(btn._t); btn.classList.remove("armed"); btn.textContent = btn._orig; action();
      } else {
        btn._orig = btn.textContent; btn.textContent = label; btn.classList.add("armed");
        btn._t = setTimeout(function () { btn.classList.remove("armed"); btn.textContent = btn._orig; }, 3000);
      }
    });
  }
  armed($("clearCart"), "Yakin?", function () { cart = []; persistCart(); toast("Keranjang dikosongkan"); render(); });
  armed($("clearHistory"), "Yakin hapus?", function () { history = []; save(KEY_HIST, history); toast("Riwayat dihapus"); render(); });

  function calc() {
    var subtotal = cart.reduce(function (s, i) { return s + i.harga * i.qty; }, 0);
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    
    var pct = subtotal >= 50000 ? 10 : 0;
    var diskonRp = Math.round(subtotal * pct / 100);
    var total = subtotal - diskonRp;

    return { subtotal: subtotal, count: count, pct: pct, diskonRp: diskonRp, total: total };
  }

  $("cash").addEventListener("input", function () { $("cash").dataset.touched = "1"; render(); });

  function cashState(c) {
    var raw = $("cash").value.trim();
    if (cart.length === 0) return { err: "", change: 0, ok: false };
    if (raw === "") return { err: "", change: 0, ok: false, empty: true };
    if (!/^\d+$/.test(raw)) return { err: "Uang diterima hanya boleh berisi angka.", change: 0, ok: false };
    var n = parseInt(raw, 10);
    if (n > 1000000000) return { err: "Nominal terlalu besar.", change: 0, ok: false };
    if (n < c.total) return { err: "", short: c.total - n, change: 0, ok: false };
    return { err: "", change: n - c.total, ok: true, paid: n };
  }

  function render() {
    var list = $("cart");
    if (cart.length === 0) {
      list.innerHTML = '<li class="empty"><b>Keranjang masih kosong</b>Isi form di samping untuk menambah barang.</li>';
    } else {
      list.innerHTML = cart.map(function (i) {
        return '<li>' +
          '<div class="row"><span class="item-name">' + esc(i.nama) + '</span><span class="item-total">' + rp(i.harga * i.qty) + '</span></div>' +
          '<div class="item-sub">' + i.qty + ' × ' + rp(i.harga) + '</div>' +
          '<div class="item-tools">' +
            '<button class="icon-btn" data-act="dec" data-id="' + i.id + '" aria-label="Kurangi ' + esc(i.nama) + '"' + (i.qty <= 1 ? " disabled" : "") + '>−</button>' +
            '<span class="qty" aria-label="Jumlah">' + i.qty + '</span>' +
            '<button class="icon-btn" data-act="inc" data-id="' + i.id + '" aria-label="Tambah ' + esc(i.nama) + '"' + (i.qty >= MAX_QTY ? " disabled" : "") + '>+</button>' +
            '<button class="icon-btn rm" data-act="rm" data-id="' + i.id + '" aria-label="Hapus ' + esc(i.nama) + '">✕</button>' +
          '</div></li>';
      }).join("");
    }

    var c = calc();
    $("itemCount").textContent = c.count;
    $("subtotal").textContent = rp(c.subtotal);
    $("diskonLabel").textContent = c.pct > 0 ? "(10% aktif)" : "(diskon 10% jika subtotal > 50rb)";
    $("diskonRp").textContent = "−" + rp(c.diskonRp);
    $("total").textContent = rp(c.total);

    var cs = cashState(c);
    $("err-cash").textContent = cs.err;
    $("cash").classList.toggle("invalid", !!cs.err);
    var ch = $("change");
    ch.className = "change";
    if (cs.short) { ch.textContent = "Kurang " + rp(cs.short); ch.classList.add("bad"); }
    else if (cs.ok) { ch.textContent = rp(cs.change); ch.classList.add("good"); }
    else { ch.textContent = "Rp0"; }
    $("payBtn").disabled = !(cart.length > 0 && cs.ok);
    $("clearCart").disabled = cart.length === 0;

    var denoms = [];
    if (c.total > 0) {
      denoms.push({ label: "Uang pas", v: c.total });
      [5000, 10000, 20000, 50000, 100000].forEach(function (d) { if (d >= c.total || d === 100000) denoms.push({ label: rp(d), v: d }); });
      denoms = denoms.filter(function (d, i, a) { return a.findIndex(function (x) { return x.v === d.v; }) === i; }).slice(0, 4);
    }
    $("cashQuick").innerHTML = denoms.map(function (d) {
      return '<button type="button" class="btn ghost small" data-v="' + d.v + '">' + d.label + '</button>';
    }).join("");

    renderHistory();
  }

  $("cashQuick").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-v]");
    if (!b) return;
    $("cash").value = b.dataset.v;
    $("cash").dataset.touched = "1";
    render();
  });

  function renderHistory() {
    var today = new Date().toDateString();
    var omzet = 0, n = 0;
    history.forEach(function (h) { if (new Date(h.ts).toDateString() === today) { omzet += h.total; n++; } });
    $("omzet").textContent = rp(omzet);
    $("trxCount").textContent = n;
    $("clearHistory").disabled = history.length === 0;

    var ul = $("history");
    if (history.length === 0) {
      ul.innerHTML = '<li class="empty"><b>Belum ada transaksi</b>Transaksi yang sudah dibayar akan muncul di sini.</li>';
      return;
    }
    ul.innerHTML = history.slice(0, 8).map(function (h) {
      var names = h.items.map(function (i) { return esc(i.nama) + " ×" + i.qty; }).join(", ");
      return '<li><div class="row"><b style="font-family:var(--f-mono)">' + rp(h.total) + '</b><span class="meta">' + fmtTime(h.ts) + '</span></div>' +
             '<div class="items">' + names + '</div></li>';
    }).join("");
  }

  $("payBtn").addEventListener("click", function () {
    var c = calc(), cs = cashState(c);
    if (!cart.length || !cs.ok) return;

    var trx = {
      ts: Date.now(),
      items: cart.map(function (i) { return { nama: i.nama, harga: i.harga, qty: i.qty }; }),
      subtotal: c.subtotal, pct: c.pct, diskon: c.diskonRp, total: c.total, bayar: cs.paid, kembali: cs.change
    };
    history.unshift(trx);
    history = history.slice(0, MAX_HISTORY);
    save(KEY_HIST, history);

    showReceipt(trx);

    cart = []; persistCart();
    $("cash").value = ""; $("cash").dataset.touched = "";
    render();
  });

  var lastFocus = null;
  function showReceipt(t) {
    $("rc-meta").textContent = fmtTime(t.ts);
    $("rc-lines").innerHTML = t.items.map(function (i) {
      return '<div class="row"><span>' + esc(i.nama) + '<br><small style="font-family:var(--f-mono);color:var(--muted)">' + i.qty + ' × ' + rp(i.harga) + '</small></span><span style="font-family:var(--f-mono)">' + rp(i.qty * i.harga) + '</span></div>';
    }).join("");
    var rows = [["Subtotal", rp(t.subtotal)]];
    if (t.pct > 0) rows.push(["Diskon " + t.pct + "%", "−" + rp(t.diskon)]);
    rows.push(["Total", rp(t.total)], ["Tunai", rp(t.bayar)], ["Kembalian", rp(t.kembali)]);
    $("rc-sum").innerHTML = rows.map(function (r, i) {
      var big = r[0] === "Total" ? " big" : "";
      return '<div class="row' + big + '"><span>' + r[0] + '</span><span>' + r[1] + '</span></div>';
    }).join("");
    lastFocus = document.activeElement;
    $("overlay").classList.add("open");
    $("rc-close").focus();
  }
  function closeReceipt() {
    $("overlay").classList.remove("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    $("nama").focus();
  }
  $("rc-close").addEventListener("click", closeReceipt);
  $("overlay").addEventListener("click", function (e) { if (e.target === $("overlay")) closeReceipt(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("overlay").classList.contains("open")) closeReceipt(); });

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function tick() { $("nowText").textContent = fmtTime(Date.now()); }
  tick(); setInterval(tick, 30000);

  render();
})();