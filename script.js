const rp = n => "Rp " + Math.round(n).toLocaleString("id-ID");
const juta = n => "Rp " + (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " juta";
const waLink = text => `https://wa.me/${SHOWROOM.wa}?text=${encodeURIComponent(text)}`;

// ====== WhatsApp: semua elemen dengan data-wa ======
document.querySelectorAll("[data-wa]").forEach(el => el.href = waLink(el.dataset.wa));
document.getElementById("waText").textContent = "+" + SHOWROOM.wa;

// ====== Isi data showroom ke halaman ======
const fills = { alamat: SHOWROOM.alamat, jam: SHOWROOM.jam, status: SHOWROOM.status };
document.querySelectorAll("[data-fill]").forEach(el => { if (fills[el.dataset.fill]) el.textContent = fills[el.dataset.fill]; });
document.getElementById("mapFrame").src = "https://www.google.com/maps?q=" + encodeURIComponent(SHOWROOM.peta) + "&output=embed";
const iconSosial = { instagram: "bi-instagram", tiktok: "bi-tiktok", facebook: "bi-facebook" };
document.getElementById("sosial").innerHTML = Object.entries(SHOWROOM.sosial).filter(([, u]) => u)
    .map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener"><i class="bi ${iconSosial[k]}"></i> ${k[0].toUpperCase() + k.slice(1)}</a>`).join("");

// ====== Data terstruktur untuk Google (bisnis lokal) ======
const ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "MotorcycleDealer", name: SHOWROOM.nama,
    description: "Showroom motor Honda dan Yamaha di Semarang.", telephone: "+" + SHOWROOM.wa,
    address: { "@type": "PostalAddress", streetAddress: SHOWROOM.alamat, addressLocality: "Semarang", addressRegion: "Jawa Tengah", addressCountry: "ID" },
    openingHours: SHOWROOM.jam
});
document.head.appendChild(ld);

// ====== Promo, testimoni, tips ======
if (PROMOS.length) {
    document.getElementById("promo").classList.remove("d-none");
    document.getElementById("promoGrid").innerHTML = PROMOS.map(p => `
        <div class="col-md-6"><div class="promo-card"><i class="bi bi-tag-fill"></i><div>
            <h3>${p.judul}</h3><p>${p.ket || ""}</p>
            <a target="_blank" rel="noopener" href="${waLink("Halo GARASI RAY, saya tertarik promo: " + p.judul)}">Ambil promo</a>
        </div></div></div>`).join("");
}
if (TESTIMONI.length) {
    document.getElementById("testimoni").classList.remove("d-none");
    document.getElementById("testiGrid").innerHTML = TESTIMONI.map(t => `
        <div class="col-md-4"><figure class="testi"><blockquote>${t.isi}</blockquote>
        <figcaption><strong>${t.nama}</strong><br><small>${t.motor || ""}</small></figcaption></figure></div>`).join("");
}
document.getElementById("tipsAcc").innerHTML = TIPS.map((t, i) => `
    <div class="accordion-item"><h3 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tip${i}">${t.judul}</button></h3>
        <div id="tip${i}" class="accordion-collapse collapse" data-bs-parent="#tipsAcc"><div class="accordion-body">${t.isi}</div></div>
    </div>`).join("");

// ====== Katalog ======
const grid = document.getElementById("productGrid");

// ====== Filter, pencarian, & sorting ======
let activeFilter = "all";
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const emptyMsg = document.getElementById("emptyMsg");

function applyFilterAndSort() {
    const q = searchInput.value.trim().toLowerCase();
    const sortVal = sortSelect.value;
    
    let filtered = PRODUCTS.filter(p => {
        const okFilter = activeFilter === "all" || p.merek === activeFilter || p.tipe === activeFilter;
        const okSearch = !q || p.nama.toLowerCase().includes(q);
        return okFilter && okSearch;
    });

    if (sortVal === "price-asc") filtered.sort((a, b) => a.harga - b.harga);
    else if (sortVal === "price-desc") filtered.sort((a, b) => b.harga - a.harga);
    else if (sortVal === "name-asc") filtered.sort((a, b) => a.nama.localeCompare(b.nama));

    grid.innerHTML = filtered.map(p => `
        <div class="col-md-6 col-lg-4 produk-item reveal active" data-id="${p.id}">
            <article class="p-card">
                <div class="p-img">
                    <span class="badge-brand ${p.merek.toLowerCase()}">${p.merek}</span>
                    <img src="${p.img}" alt="${p.nama}" loading="lazy">
                </div>
                <div class="p-body">
                    <h3 class="card-title">${p.nama}</h3>
                    <div class="p-tags">${p.tipe} · ${p.mesin} · ${p.rem}</div>
                    <p class="p-desc">${p.desc}</p>
                    <div class="p-price"><small>Mulai dari (OTR Semarang)</small><strong>${juta(p.harga)}</strong></div>
                    <div class="p-actions">
                        <button class="btn btn-outline-dark btn-detail" data-id="${p.id}">Detail</button>
                        <a class="btn btn-brand" target="_blank" rel="noopener" href="${waLink("Halo GARASI RAY, saya tertarik dengan " + p.nama)}"><i class="bi bi-whatsapp"></i> Tanya Harga</a>
                    </div>
                </div>
            </article>
        </div>`).join("");
    
    emptyMsg.classList.toggle("d-none", filtered.length > 0);
}

applyFilterAndSort();

searchInput.addEventListener("input", applyFilterAndSort);
sortSelect.addEventListener("change", applyFilterAndSort);

document.getElementById("filters").addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    b.classList.add("active");
    activeFilter = b.dataset.filter;
    applyFilterAndSort();
});

// ====== Modal detail ======
const modal = new bootstrap.Modal(document.getElementById("detailModal"));
grid.addEventListener("click", e => {
    const b = e.target.closest(".btn-detail");
    if (!b) return;
    const p = PRODUCTS.find(x => x.id === b.dataset.id);
    document.getElementById("mTitle").textContent = p.nama;
    const img = document.getElementById("mImg"); img.src = p.img; img.alt = p.nama;
    document.getElementById("mDesc").textContent = p.desc;
    document.getElementById("mSpec").innerHTML =
        `<tr><th>Merek</th><td>${p.merek}</td></tr><tr><th>Tipe</th><td>${p.tipe}</td></tr>
         <tr><th>Mesin</th><td>${p.mesin}</td></tr><tr><th>Rem</th><td>${p.rem}</td></tr>`;
    const list = (judul, arr, chip) => arr && arr.length
        ? `<h6 class="mt-3 mb-1">${judul}</h6>` + (chip ? `<div class="color-chips">${arr.map(x => `<span>${x}</span>`).join("")}</div>`
        : `<ul class="small ps-3 mb-0">${arr.map(x => `<li>${x}</li>`).join("")}</ul>`) : "";
    document.getElementById("mExtra").innerHTML = list("Varian dan harga", p.varian) + list("Pilihan warna", p.warna, true) + list("Fitur", p.fitur);
    document.getElementById("mPrice").textContent = "Mulai " + juta(p.harga);
    const wa = document.getElementById("mWa");
    wa.href = waLink("Halo GARASI RAY, saya tertarik dengan " + p.nama + ".");
    wa.target = "_blank";
    modal.show();
});

// ====== Bandingkan ======
const opts = PRODUCTS.map(p => `<option value="${p.id}">${p.nama}</option>`).join("");
const cmpA = document.getElementById("cmpA"), cmpB = document.getElementById("cmpB");
cmpA.innerHTML = cmpB.innerHTML = opts;
cmpB.selectedIndex = 3;
function renderCompare() {
    const a = PRODUCTS.find(p => p.id === cmpA.value), b = PRODUCTS.find(p => p.id === cmpB.value);
    const row = (l, f) => `<tr><th>${l}</th><td>${f(a)}</td><td>${f(b)}</td></tr>`;
    document.getElementById("cmpTable").innerHTML =
        row("Foto", p => `<img src="${p.img}" alt="${p.nama}">`) + row("Merek", p => p.merek) +
        row("Mesin", p => p.mesin) + row("Rem", p => p.rem) + row("Harga mulai", p => juta(p.harga));
}
cmpA.addEventListener("change", renderCompare);
cmpB.addEventListener("change", renderCompare);
renderCompare();

// ====== Kalkulator kredit (bunga flat, perkiraan) ======
const kMotor = document.getElementById("kMotor"), kDp = document.getElementById("kDp"),
      kTenor = document.getElementById("kTenor"), kRate = document.getElementById("kRate");
kMotor.innerHTML = opts;
kRate.value = BUNGA_FLAT_DEFAULT;
function hitungKredit() {
    const p = PRODUCTS.find(x => x.id === kMotor.value);
    const dpPct = +kDp.value, rate = +kRate.value, bulan = +kTenor.value;
    const dp = p.harga * dpPct / 100, pokok = p.harga - dp;
    const total = pokok * (1 + (rate / 100) * (bulan / 12));
    const cicilan = total / bulan;
    document.getElementById("kDpLabel").textContent = dpPct + "%";
    document.getElementById("kRateLabel").textContent = rate.toLocaleString("id-ID") + "%";
    document.getElementById("kHarga").textContent = rp(p.harga);
    document.getElementById("kDpRp").textContent = rp(dp);
    document.getElementById("kPokok").textContent = rp(pokok);
    document.getElementById("kCicilan").textContent = rp(cicilan);
    const wa = document.getElementById("kWa");
    wa.href = waLink(`Halo GARASI RAY, saya mau ajukan kredit ${p.nama}. DP ${dpPct}% (${rp(dp)}), tenor ${bulan} bulan. Perkiraan angsuran ${rp(cicilan)}/bulan.`);
    wa.target = "_blank";
}
[kMotor, kDp, kTenor, kRate].forEach(el => el.addEventListener("input", hitungKredit));
hitungKredit();

document.getElementById("kCopyBtn").addEventListener("click", () => {
    const p = PRODUCTS.find(x => x.id === kMotor.value);
    const dpPct = kDp.value, tenor = kTenor.value, cicilan = document.getElementById("kCicilan").textContent;
    const txt = `Ringkasan Kredit GARASI RAY\nMotor: ${p.nama}\nDP: ${dpPct}% (${document.getElementById("kDpRp").textContent})\nTenor: ${tenor} bulan\nAngsuran: ${cicilan}/bulan`;
    navigator.clipboard.writeText(txt).then(() => {
        const btn = document.getElementById("kCopyBtn");
        const icon = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i>';
        setTimeout(() => btn.innerHTML = icon, 2000);
    });
});

// ====== Booking service & kontak (dikirim lewat WhatsApp) ======
document.getElementById("sKirim").addEventListener("click", () => {
    const g = id => document.getElementById(id).value.trim();
    if (!g("sNama") || !g("sMotor") || !g("sTgl")) { alert("Isi nama, tipe motor, dan tanggal dulu."); return; }
    window.open(waLink(`Halo GARASI RAY, saya mau booking service.\nNama: ${g("sNama")}\nMotor: ${g("sMotor")}\nTanggal: ${g("sTgl")}\nJenis: ${g("sJenis")}`), "_blank");
});
document.getElementById("cKirim").addEventListener("click", () => {
    const nama = document.getElementById("cNama").value.trim(), pesan = document.getElementById("cPesan").value.trim();
    if (!pesan) { alert("Tulis pesan Anda dulu."); return; }
    window.open(waLink(`Halo GARASI RAY, saya ${nama || "calon pembeli"}. ${pesan}`), "_blank");
});
document.getElementById("sTgl").min = new Date().toISOString().split("T")[0];

// ====== Scroll Reveal Observer & Navbar Shadow ======
const observerOptions = { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

function initReveal() {
    document.querySelectorAll('.section, .quick-grid, .panel, .perk, .about, .promo-card, .testi').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
} else {
    initReveal();
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    const btt = document.getElementById('backToTop');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    if (btt) btt.classList.toggle('show', window.scrollY > 300);
});

if (document.getElementById('backToTop')) {
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Auto-close collapse navbar on link click (mobile)
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        if (menu && menu.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(menu) || new bootstrap.Collapse(menu);
            bsCollapse.hide();
        }
    });
});