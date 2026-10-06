"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const img = (s: string, w = 900, h = 900) => `https://picsum.photos/seed/${s}/${w}/${h}`;
const D = "font-[family-name:var(--font-display)]";
const focus = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f2a33a]";
const btn = `inline-block rounded-full border-2 border-[#f2a33a] bg-[#f2a33a] px-6 py-3 text-center font-bold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(242,163,58,.6)] ${focus}`;
const ghost = `inline-block rounded-full border-2 border-current px-6 py-3 text-center font-bold transition hover:-translate-y-0.5 ${focus}`;
const sec = "px-5 py-16 md:px-12 md:py-28 lg:px-24";

const nav = [["Fotografer", "#fotografer"], ["Karya", "#karya"], ["Fitur", "#fitur"], ["Paket", "#paket"], ["FAQ", "#faq"]];
const ticker = ["Wedding", "Prewedding", "Portrait", "Landscape", "Street", "Produk", "Event", "Arsitektur"];
const stats = [["24 rb+", "fotografer bergabung"], ["1,2 jt", "foto dibagikan"], ["86 rb", "aset foto terjual"], ["4,8/5", "rating rata-rata jasa"]];

type P = { name: string; handle: string; cat: string; city: string; fol: string; assets: number; rating: string; price: string; ph: string[] };
const people: P[] = [
  { name: "Raka Pratama", handle: "@rakashoots", cat: "Wedding", city: "Bandung", fol: "12,4 rb", assets: 148, rating: "4,9", price: "2.500.000", ph: ["lp-w1", "lp-w2", "lp-w3"] },
  { name: "Dinda Maharani", handle: "@dindalens", cat: "Portrait", city: "Yogyakarta", fol: "8,9 rb", assets: 92, rating: "4,8", price: "750.000", ph: ["lp-p1", "lp-p2", "lp-p3"] },
  { name: "Bayu Wicaksono", handle: "@bayuwild", cat: "Landscape", city: "Malang", fol: "21 rb", assets: 310, rating: "4,9", price: "1.200.000", ph: ["lp-l1", "lp-l2", "lp-l3"] },
  { name: "Salsa Nurhaliza", handle: "@salsaframe", cat: "Produk", city: "Jakarta", fol: "5,2 rb", assets: 76, rating: "4,7", price: "900.000", ph: ["lp-d1", "lp-d2", "lp-d3"] },
  { name: "Tio Anggara", handle: "@tiostreet", cat: "Street", city: "Surabaya", fol: "15,8 rb", assets: 203, rating: "4,8", price: "500.000", ph: ["lp-s1", "lp-s2", "lp-s3"] },
  { name: "Maya Kusuma", handle: "@mayakusuma", cat: "Wedding", city: "Bali", fol: "18,3 rb", assets: 164, rating: "5,0", price: "4.000.000", ph: ["lp-w4", "lp-w5", "lp-w6"] },
];
const filters = ["Semua", "Wedding", "Portrait", "Landscape", "Produk", "Street"];

const works = [
  { id: 1, t: "Hujan di Braga", by: "Tio Anggara", cat: "Street", s: "lw1", c: "col-span-2 row-span-2" },
  { id: 2, t: "Lereng Ijen", by: "Bayu Wicaksono", cat: "Landscape", s: "lw2", c: "row-span-2" },
  { id: 3, t: "Seri kopi lokal", by: "Salsa Nurhaliza", cat: "Produk", s: "lw3", c: "" },
  { id: 4, t: "Akad di Lembang", by: "Raka Pratama", cat: "Wedding", s: "lw4", c: "col-span-2" },
  { id: 5, t: "Penari muda", by: "Dinda Maharani", cat: "Portrait", s: "lw5", c: "row-span-2" },
  { id: 6, t: "Dermaga subuh", by: "Maya Kusuma", cat: "Wedding", s: "lw6", c: "" },
  { id: 7, t: "Gurun pasir", by: "Bayu Wicaksono", cat: "Landscape", s: "lw7", c: "" },
  { id: 8, t: "Warung 24 jam", by: "Tio Anggara", cat: "Street", s: "lw8", c: "col-span-2" },
];

const feats = [
  { t: "Portofolio", s: "lf1", d: "Susun karya jadi galeri dan album. Satu link untuk semua hasil terbaikmu, siap dikirim ke klien.", tags: ["Galeri & album", "Link pribadi", "Tanpa watermark Lenspace"] },
  { t: "Media sosial", s: "lf2", d: "Feed, ikuti, suka, dan komentar khusus fotografer. Karyamu dilihat sesama kreator dan calon klien.", tags: ["Feed karya", "Komunitas", "Masukan langsung"] },
  { t: "Toko aset foto", s: "lf3", d: "Tentukan lisensi dan harga tiap foto. Pembayaran masuk otomatis saat ada yang membeli.", tags: ["Lisensi fleksibel", "Harga bebas", "Pencairan ke rekening"] },
  { t: "Jasa & price list", s: "lf4", d: "Buat paket sendiri, atur harganya, dan terima pesanan langsung dari halaman profilmu.", tags: ["Paket sendiri", "Add-on", "Pemesanan online"] },
];
const steps = [
  ["Buat profil", "Daftar, isi bio, dan pilih bidang fotografimu."],
  ["Unggah karya", "Tambahkan foto ke portofolio dan tandai yang ingin dijual."],
  ["Atur harga", "Susun paket jasa dan harga aset sesukamu."],
  ["Terima bayaran", "Pesanan dan penjualan masuk ke satu saldo."],
];
const plans = [
  { n: "Gratis", p: "0", note: "Untuk mulai berkarya", it: ["Profil & portofolio", "20 foto", "Halaman jasa dasar"], f: false },
  { n: "Pro", p: "79.000", note: "per bulan, fotografer aktif", it: ["Foto tanpa batas", "Jual aset foto", "Price list & pemesanan", "Statistik profil"], f: true },
  { n: "Studio", p: "249.000", note: "per bulan, untuk tim", it: ["Hingga 5 anggota", "Domain sendiri", "Dukungan prioritas", "Semua fitur Pro"], f: false },
];
const addons = [["Cetak foto", "Rp 350 rb"], ["Jam tambahan", "Rp 400 rb"], ["Drone", "Rp 500 rb"], ["Makeup artist", "Rp 750 rb"], ["Video reels", "Rp 1,2 jt"]];
const reviews = [
  ["Raka Pratama", "Fotografer pernikahan", "Dulu portofolio, katalog, dan chat klien tersebar di tiga aplikasi. Sekarang semuanya satu link."],
  ["Bayu Wicaksono", "Fotografer lanskap", "Aset lanskapku terjual bahkan saat aku tidak memotret. Pemasukan jadi lebih stabil."],
  ["Salsa Nurhaliza", "Fotografer produk", "Price list sendiri membuat klien langsung paham paketnya. Tanya soal harga jauh berkurang."],
];
const faqs = [
  ["Apakah Lenspace gratis?", "Paket Gratis berlaku tanpa batas waktu. Fitur jual aset dan pemesanan jasa ada di paket Pro."],
  ["Siapa yang menentukan harga?", "Kamu sendiri. Harga jasa dan aset bebas dibuat dan diubah kapan saja."],
  ["Apakah hak cipta tetap milikku?", "Ya. Kamu memilih jenis lisensi untuk setiap aset, dan hak ciptanya tetap pada kamu."],
  ["Bagaimana pembayaran dicairkan?", "Pembayaran masuk lewat Lenspace dan dicairkan ke rekeningmu setelah pesanan selesai."],
  ["Bisakah memakai domain sendiri?", "Bisa, lewat paket Studio. Halaman profil dan toko tampil di domain milikmu."],
];

function Rv({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={r} style={{ transitionDelay: `${d}ms` }} className={`rv ${className}`}>{children}</div>;
}

function Head({ t, s, light, children }: { t: string; s?: string; light?: boolean; children?: ReactNode }) {
  return (
    <Rv className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className={`${D} text-4xl font-extrabold leading-none tracking-tight md:text-6xl`}>{t}</h2>
        {s && <p className={`mt-3 max-w-lg ${light ? "text-white/70" : "text-[#6b6b6b]"}`}>{s}</p>}
      </div>
      {children}
    </Rv>
  );
}

function Card({ p }: { p: P }) {
  const [f, setF] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#0a0a0a]/15 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgba(10,10,10,.4)]">
      <div className="grid h-56 grid-cols-3 grid-rows-2 gap-0.5 bg-[#ececec]">
        {p.ph.map((s, i) => (
          <div key={s} className={`group overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <img src={img(s, i ? 300 : 600, i ? 225 : 450)} alt={i ? "" : `Foto ${p.cat} oleh ${p.name}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 px-5 pt-5">
        <span className={`${D} grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-lg font-extrabold text-[#f2a33a]`}>{p.name[0]}</span>
        <div className="min-w-0 flex-1">
          <h3 className={`${D} truncate text-xl font-bold leading-tight`}>{p.name}</h3>
          <p className="truncate text-sm text-[#6b6b6b]">{p.handle}, {p.city}</p>
        </div>
        <button onClick={() => setF(!f)} aria-pressed={f} className={`rounded-full border-2 px-4 py-1 text-sm font-bold transition ${focus} ${f ? "border-[#0a0a0a]/20 text-[#6b6b6b]" : "border-[#0a0a0a] bg-[#0a0a0a] text-white hover:bg-transparent hover:text-[#0a0a0a]"}`}>{f ? "Mengikuti" : "Ikuti"}</button>
      </div>
      <dl className="mt-4 grid grid-cols-3 px-5 text-sm">
        {[["Pengikut", p.fol], ["Aset foto", String(p.assets)], ["Rating", `★ ${p.rating}`]].map(([k, v]) => <div key={k}><dt className="text-[#6b6b6b]">{k}</dt><dd className="font-bold">{v}</dd></div>)}
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-[#0a0a0a]/15 px-5 py-4 text-sm">
        <span className="text-[#6b6b6b]">{p.cat}, mulai <b className="text-[#0a0a0a]">Rp {p.price}</b></span>
        <a href="#" className={`font-bold underline decoration-[#f2a33a] decoration-2 underline-offset-4 ${focus}`}>Lihat profil</a>
      </div>
    </article>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = useState("Semua");
  const [svc, setSvc] = useState(0);
  const [cmp, setCmp] = useState(50);
  const [lb, setLb] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const list = cat === "Semua" ? people : people.filter((p) => p.cat === cat);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 40);
      setProgress((scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => ((i as number) + 1) % works.length);
      if (e.key === "ArrowLeft") setLb((i) => ((i as number) - 1 + works.length) % works.length);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [lb]);

  const onMove = (e: React.MouseEvent) => {
    const r = hero.current!.getBoundingClientRect();
    hero.current!.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    hero.current!.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <div className="overflow-x-hidden bg-[#f7f7f7] font-[family-name:var(--font-body)] leading-relaxed text-[#0a0a0a] antialiased [scroll-behavior:smooth]">
      <style>{`
        html{scroll-behavior:smooth}
        .rv{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s cubic-bezier(.2,.7,.2,1)}.rv.in{opacity:1;transform:none}
        .f1{transform:translate(calc(var(--mx,0)*-14px),calc(var(--my,0)*-14px))}
        .f2{transform:translate(calc(var(--mx,0)*22px),calc(var(--my,0)*22px))}
        .f3{transform:translate(calc(var(--mx,0)*30px),calc(var(--my,0)*30px))}
        .lock{animation:lock 1.5s .6s cubic-bezier(.2,.8,.2,1) both}@keyframes lock{0%{transform:scale(3);opacity:0}55%{opacity:1}100%{transform:scale(1)}}
        .ping{animation:ping 2s infinite}@keyframes ping{0%{box-shadow:0 0 0 0 #5ee49a}70%{box-shadow:0 0 0 9px transparent}100%{box-shadow:0 0 0 0 transparent}}
        .mq{animation:mq 28s linear infinite}@keyframes mq{to{transform:translateX(-50%)}}
        .cmp .before{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
        @media (prefers-reduced-motion:reduce){.mq,.lock,.ping{animation:none}.rv{opacity:1;transform:none;transition:none}}
      `}</style>
      <div className="fixed left-0 top-0 z-[80] h-[3px] bg-[#f2a33a]" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <header className={`fixed inset-x-0 top-0 z-[60] text-white transition-all ${scrolled || menu ? "bg-[#0a0a0a]/90 py-2.5 backdrop-blur-md" : "py-4"}`}>
        <div className="flex items-center justify-between px-5 md:px-12 lg:px-24">
          <a href="#top" className={`${D} flex items-center gap-1 text-2xl font-extrabold tracking-tight ${focus}`}>Lenspace<i className="mt-2 h-2 w-2 rounded-full bg-[#f2a33a]" /></a>
          <nav className={`absolute left-0 right-0 top-full flex-col overflow-hidden bg-[#0a0a0a] px-5 transition-all md:static md:flex md:max-h-none md:flex-row md:items-center md:gap-7 md:bg-transparent md:p-0 ${menu ? "flex max-h-[460px] pb-6" : "hidden max-h-0 md:flex"}`}>
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className={`border-b border-white/10 py-3 font-medium opacity-85 hover:opacity-100 md:border-0 md:py-0 ${focus}`}>{l}</a>)}
            <a href="#daftar" onClick={() => setMenu(false)} className={`${btn} mt-3 !px-5 !py-2 text-sm md:mt-0`}>Sign up</a>
          </nav>
          <button onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Buka menu" className={`grid h-11 w-11 place-items-center md:hidden ${focus}`}>
            <span className="block h-0.5 w-5 bg-white shadow-[0_6px_0_#fff,0_-6px_0_#fff]" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" ref={hero} onMouseMove={onMove} className="relative grid min-h-screen items-center gap-12 overflow-hidden bg-[radial-gradient(55%_55%_at_78%_40%,#2e2e2e_0%,transparent_70%),radial-gradient(40%_40%_at_5%_100%,#1f1f1f_0%,transparent_70%)] bg-[#0a0a0a] px-5 pb-16 pt-28 text-white md:px-12 lg:grid-cols-[1.05fr_.95fr] lg:px-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm"><i className="ping h-2 w-2 rounded-full bg-[#5ee49a]" />Platform untuk fotografer Indonesia</p>
          <h1 className={`${D} max-w-[12ch] text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl`}>Karya, toko, dan jasa dalam satu ruang.</h1>
          <p className="my-6 max-w-lg text-lg text-white/85">Lenspace adalah media sosial sekaligus portofolio, toko aset foto, dan halaman jasa dengan price list buatanmu sendiri.</p>
          <div className="flex flex-wrap gap-3"><a href="#daftar" className={btn}>Buat profil gratis</a><a href="#fotografer" className={ghost}>Jelajahi fotografer</a></div>
          <dl className="mt-12 flex gap-7 text-sm">{[["f", "1.8"], ["shutter", "1/250"], ["ISO", "100"]].map(([k, v]) => <div key={k} className="flex gap-2"><dt className="opacity-55">{k}</dt><dd className="font-bold text-[#f2a33a]">{v}</dd></div>)}</dl>
        </div>
        <div aria-hidden className="relative mx-auto aspect-[4/4.6] w-full max-w-[460px]">
          {["-left-3.5 -top-3.5 border-l-2 border-t-2", "-right-3.5 -top-3.5 border-r-2 border-t-2", "-bottom-3.5 -left-3.5 border-b-2 border-l-2", "-bottom-3.5 -right-3.5 border-b-2 border-r-2"].map((c) => <i key={c} className={`absolute z-[3] h-7 w-7 border-white/80 ${c}`} />)}
          <img className="f1 absolute left-[4%] top-[4%] h-[84%] w-[76%] rounded-md object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]" src={img("lp-hero1", 800, 1000)} alt="" />
          <img className="f2 absolute bottom-0 right-0 h-[42%] w-[46%] rounded-md border-[5px] border-[#0a0a0a] object-cover shadow-xl" src={img("lp-hero2", 600, 700)} alt="" />
          <img className="f3 absolute right-[6%] top-0 aspect-square w-[28%] rounded-md border-4 border-[#0a0a0a] object-cover shadow-xl" src={img("lp-hero3", 500, 500)} alt="" />
          <span className="lock absolute left-[30%] top-[34%] z-[3] h-[72px] w-[72px] border-2 border-[#f2a33a]" />
          <span className="absolute bottom-[3%] left-[4%] z-[3] rounded bg-[#0a0a0a]/75 px-3 py-1 text-xs backdrop-blur">Raka Pratama, Lembang</span>
        </div>
      </section>

      <div aria-hidden className="overflow-hidden whitespace-nowrap bg-[#f2a33a] py-3.5 text-[#0a0a0a]">
        <div className="mq inline-flex">{[0, 1, 2, 3].map((k) => <span key={k} className="inline-flex">{ticker.map((t) => <b key={t} className={`${D} inline-flex items-center gap-11 px-5 text-2xl font-bold after:h-2 after:w-2 after:rotate-45 after:bg-[#0a0a0a]`}>{t}</b>)}</span>)}</div>
      </div>

      <ul className="grid grid-cols-2 border-b border-[#0a0a0a]/15 lg:grid-cols-4">
        {stats.map(([n, l]) => <li key={n} className="grid border-r border-[#0a0a0a]/15 px-5 py-8 text-[#6b6b6b] md:px-10"><Rv><b className={`${D} block text-3xl tracking-tight text-[#0a0a0a] md:text-5xl`}>{n}</b>{l}</Rv></li>)}
      </ul>

      {/* Fotografer */}
      <section id="fotografer" className={sec}>
        <Head t="Fotografer di Lenspace" s="Lihat hasil foto mereka, ikuti, atau langsung pesan jasanya.">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori">
            {filters.map((f) => <button key={f} role="tab" aria-selected={cat === f} onClick={() => setCat(f)} className={`rounded-full border-[1.5px] px-4 py-1.5 font-medium transition ${focus} ${cat === f ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-[#0a0a0a]/15 hover:border-[#0a0a0a]"}`}>{f}</button>)}
          </div>
        </Head>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <Card key={p.handle} p={p} />)}</div>
      </section>

      {/* Karya */}
      <section id="karya" className={`${sec} bg-[#ececec]`}>
        <Head t="Sedang ramai di feed" s="Klik foto untuk memperbesar, gunakan panah keyboard untuk berpindah." />
        <div className="grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4">
          {works.map((w, i) => (
            <button key={w.id} onClick={() => setLb(i)} className={`group relative overflow-hidden rounded-md bg-white p-0 ${w.c} ${focus}`}>
              <img src={img(w.s)} alt={`${w.t}, ${w.cat}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]" />
              <span className="absolute inset-x-0 bottom-0 grid bg-gradient-to-t from-[#0a0a0a]/90 to-transparent p-4 pt-12 text-left text-sm text-white opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"><b className={`${D} text-lg`}>{w.t}</b>{w.by}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className={`${sec} bg-[#0a0a0a] text-white`}>
        <Head light t="Satu akun untuk semuanya" s="Empat fungsi besar yang biasanya tersebar di banyak aplikasi." />
        <Rv className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <ul className="border-t border-white/20">
            {feats.map((f, i) => (
              <li key={f.t}><button onMouseEnter={() => setSvc(i)} onFocus={() => setSvc(i)} onClick={() => setSvc(i)} className={`${D} flex w-full items-center justify-between border-b border-white/20 py-5 text-left text-3xl font-bold transition-all md:text-4xl ${focus} ${svc === i ? "pl-4 text-[#f2a33a]" : "opacity-50"}`}>{f.t}<span className={`text-3xl transition ${svc === i ? "rotate-[135deg]" : ""}`}>+</span></button></li>
            ))}
          </ul>
          <div key={svc} className="rv in grid gap-5">
            <img src={img(feats[svc].s, 900, 560)} alt={feats[svc].t} className="aspect-[16/10] w-full rounded-md object-cover" />
            <p className="max-w-xl text-white/80">{feats[svc].d}</p>
            <div>{feats[svc].tags.map((t) => <span key={t} className="mb-2 mr-2 inline-block rounded-full border border-white/30 px-3.5 py-1 text-sm">{t}</span>)}</div>
          </div>
        </Rv>
      </section>

      {/* Editing */}
      <section className={`${sec} grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20`}>
        <Rv>
          <h2 className={`${D} text-4xl font-extrabold leading-none tracking-tight md:text-6xl`}>Karyamu tampil sebagaimana mestinya.</h2>
          <p className="mt-4 max-w-md text-[#6b6b6b]">Foto diunggah dalam kualitas penuh, warnanya terjaga, dan tampil konsisten di profil, toko, maupun halaman jasa. Geser untuk melihat bedanya.</p>
          <ul className="mt-6 grid gap-2 font-medium">{["Resolusi asli tanpa kompresi berlebihan", "Warna konsisten di semua perangkat", "Proteksi watermark untuk aset yang dijual"].map((t) => <li key={t} className="relative pl-7 before:absolute before:left-0 before:top-[.45em] before:h-2 before:w-3.5 before:-rotate-45 before:border-b-[3px] before:border-l-[3px] before:border-[#f2a33a]">{t}</li>)}</ul>
        </Rv>
        <Rv d={100}>
          <div className="cmp relative aspect-[10/7] overflow-hidden rounded-lg shadow-[0_30px_60px_-25px_rgba(10,10,10,.5)]" style={{ "--p": `${cmp}%` } as React.CSSProperties}>
            <img className="absolute inset-0 h-full w-full object-cover [filter:saturate(1.35)_contrast(1.12)]" src={img("lp-cmp", 1000, 700)} alt="Foto dengan kualitas penuh" />
            <img className="before absolute inset-0 h-full w-full object-cover [filter:saturate(.35)_contrast(.72)_brightness(1.12)]" src={img("lp-cmp", 1000, 700)} alt="Foto terkompresi" />
            <i className="pointer-events-none absolute inset-y-0 left-[var(--p)] w-[3px] -translate-x-1/2 bg-white after:absolute after:left-1/2 after:top-1/2 after:grid after:h-10 after:w-10 after:-translate-x-1/2 after:-translate-y-1/2 after:place-items-center after:rounded-full after:bg-[#f2a33a] after:font-bold after:not-italic after:content-['↔']" />
            <span className="absolute bottom-3 left-3 rounded bg-[#0a0a0a]/70 px-3 py-0.5 text-xs text-white">Terkompresi</span>
            <span className="absolute bottom-3 right-3 rounded bg-[#0a0a0a]/70 px-3 py-0.5 text-xs text-white">Kualitas penuh</span>
            <input type="range" min={0} max={100} value={cmp} onChange={(e) => setCmp(+e.target.value)} aria-label="Geser perbandingan" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
          </div>
        </Rv>
      </section>

      {/* Langkah */}
      <section className={`${sec} bg-[#ececec]`}>
        <Head t="Mulai dalam empat langkah" />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t}><Rv d={i * 90} className="relative border-t-2 border-[#0a0a0a] pt-6">
              <span className="absolute -top-4 left-0 grid h-8 w-8 place-items-center rounded-full bg-[#f2a33a] text-sm font-extrabold">{i + 1}</span>
              <h3 className={`${D} mb-1 text-2xl font-bold`}>{t}</h3><p className="text-[#6b6b6b]">{d}</p>
            </Rv></li>
          ))}
        </ol>
      </section>

      {/* Paket */}
      <section id="paket" className={sec}>
        <Head t="Pilih paket yang sesuai" s="Mulai gratis, upgrade saat kamu siap berjualan." />
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Rv key={p.n} d={i * 90} className="h-full">
              <article className={`flex h-full flex-col gap-4 rounded-lg border p-8 transition hover:-translate-y-1.5 ${p.f ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-[#0a0a0a]/15 bg-white"}`}>
                {p.f && <p className="self-start rounded-full bg-[#f2a33a] px-3 py-0.5 text-xs font-bold text-[#0a0a0a]">Paling dipilih</p>}
                <h3 className={`${D} text-3xl font-extrabold`}>{p.n}</h3>
                <p className={`-mt-2 ${p.f ? "text-white/65" : "text-[#6b6b6b]"}`}>{p.note}</p>
                <p className={`${D} text-5xl font-extrabold tracking-tight`}><small className="mr-1 text-base font-medium">Rp</small>{p.p}</p>
                <ul className="mb-3 flex-1 space-y-2">{p.it.map((x) => <li key={x} className="relative pl-6 before:absolute before:left-0 before:top-[.7em] before:h-0.5 before:w-3 before:bg-[#f2a33a]">{x}</li>)}</ul>
                <a href="#daftar" className={p.f ? btn : `${ghost} hover:bg-[#0a0a0a] hover:text-white`}>Pilih {p.n}</a>
              </article>
            </Rv>
          ))}
        </div>
        <Rv className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border-[1.5px] border-dashed border-[#0a0a0a]/20 px-6 py-4 text-sm">
          <b>Contoh add-on di price list fotografer</b>{addons.map(([a, p]) => <span key={a}>{a} <b className="ml-1">{p}</b></span>)}
        </Rv>
      </section>

      {/* Testimoni */}
      <section className={`${sec} bg-[#ececec]`}>
        <Head t="Kata fotografer" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([n, r, t], i) => (
            <Rv key={n} d={i * 90} className="h-full"><figure className="m-0 grid h-full content-between gap-5 rounded-lg bg-white p-8">
              <p className="tracking-[.2em] text-[#f2a33a]" aria-label="5 dari 5 bintang">★★★★★</p>
              <blockquote className={`${D} m-0 text-xl font-medium leading-snug`}>{t}</blockquote>
              <figcaption className="flex items-center gap-3 text-sm text-[#6b6b6b]"><i className={`${D} grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0a] text-lg font-extrabold not-italic text-[#f2a33a]`}>{n[0]}</i><span className="grid"><b className="text-[#0a0a0a]">{n}</b>{r}</span></figcaption>
            </figure></Rv>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={sec}>
        <Head t="Pertanyaan umum" />
        <Rv className="max-w-3xl border-t border-[#0a0a0a]/15">
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-[#0a0a0a]/15">
              <summary className={`${D} relative cursor-pointer list-none py-5 pr-10 text-xl font-bold [&::-webkit-details-marker]:hidden ${focus}`}>{q}<span className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-[#f2a33a] transition group-open:rotate-45">+</span></summary>
              <p className="max-w-2xl pb-5 pr-10 text-[#6b6b6b]">{a}</p>
            </details>
          ))}
        </Rv>
      </section>

      {/* Sign up */}
      <section id="daftar" className={`${sec} bg-[#0a0a0a] text-white`}>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Rv>
            <h2 className={`${D} mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-6xl`}>Mulai tampilkan karyamu.</h2>
            <p className="text-white/70">Buat akun gratis, unggah foto pertamamu, dan buka jasa dalam beberapa menit.</p>
          </Rv>
          <Rv d={100}>
            {done ? (
              <p role="status" className="rounded-lg border border-[#f2a33a] p-6 text-[#f2a33a]">Terima kasih! Kami kirim tautan aktivasi ke emailmu.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="grid gap-4">
                {[["Nama", "text", "name"], ["Email", "email", "email"]].map(([l, t, a]) => <label key={l} className="grid gap-1.5 text-sm font-medium">{l}<input required type={t} autoComplete={a} className="w-full rounded-md border-[1.5px] border-white/20 bg-[#1a1a1a] px-3.5 py-3 text-base text-white focus:border-[#f2a33a] focus:outline-none" /></label>)}
                <label className="grid gap-1.5 text-sm font-medium">Bidang utama
                  <select className="w-full rounded-md border-[1.5px] border-white/20 bg-[#1a1a1a] px-3.5 py-3 text-base text-white focus:border-[#f2a33a] focus:outline-none [color-scheme:dark]">{filters.slice(1).concat("Event", "Lainnya").map((o) => <option key={o}>{o}</option>)}</select>
                </label>
                <button className={`${btn} mt-1`}>Sign up gratis</button>
              </form>
            )}
          </Rv>
        </div>
      </section>

      {/* Footer */}
      <footer className="grid gap-8 bg-[#000000] px-5 pb-8 pt-14 text-sm text-white/60 md:grid-cols-[1.5fr_1fr_1fr] md:px-12 lg:px-24">
        <div><span className={`${D} text-2xl font-extrabold text-white`}>Lenspace</span><p className="mt-2 max-w-xs">Media sosial, portofolio, toko aset, dan jasa untuk fotografer.</p></div>
        <div className="grid content-start gap-2"><b className="text-white">Jelajahi</b>{nav.map(([l, h]) => <a key={h} href={h} className="hover:text-[#f2a33a]">{l}</a>)}</div>
        <div className="grid content-start gap-2"><b className="text-white">Perusahaan</b><a href="#" className="hover:text-[#f2a33a]">Tentang</a><a href="#" className="hover:text-[#f2a33a]">Bantuan</a><a href="#" className="hover:text-[#f2a33a]">Kebijakan privasi</a></div>
        <small className="border-t border-white/10 pt-6 md:col-span-3">© {new Date().getFullYear()} Lenspace. Semua hak dilindungi.</small>
      </footer>

      {/* Lightbox */}
      {lb !== null && (
        <div role="dialog" aria-modal="true" aria-label={works[lb].t} onClick={(e) => e.target === e.currentTarget && setLb(null)} className="fixed inset-0 z-[100] grid place-items-center bg-[#000000]/95 p-6">
          <button aria-label="Tutup" onClick={() => setLb(null)} className={`absolute right-5 top-5 h-12 w-12 rounded-full bg-white/10 text-3xl text-white hover:bg-[#f2a33a] hover:text-[#0a0a0a] ${focus}`}>&times;</button>
          {[[-1, "left-4", "‹", "Foto sebelumnya"], [1, "right-4", "›", "Foto berikutnya"]].map(([d, pos, ic, lbl]) => <button key={lbl as string} aria-label={lbl as string} onClick={() => setLb((lb + (d as number) + works.length) % works.length)} className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-3xl text-white hover:bg-[#f2a33a] hover:text-[#0a0a0a] sm:block ${pos} ${focus}`}>{ic}</button>)}
          <figure className="m-0 max-w-[min(90vw,860px)] text-white">
            <img src={img(works[lb].s, 1200, 1200)} alt={works[lb].t} className="mx-auto block max-h-[78vh] max-w-full rounded" />
            <figcaption className="mt-3 grid text-sm opacity-80"><b className={`${D} text-xl`}>{works[lb].t}</b>{works[lb].by}, {works[lb].cat}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}