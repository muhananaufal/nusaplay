# 🗺️ NusaPlay — Jelajahi Warisan Budaya Nusantara

NusaPlay adalah sebuah platform eksplorasi interaktif budaya Indonesia berbasis web 3D. Dibangun untuk menyajikan kekayaan warisan Nusantara — mulai dari tari tradisional, musik daerah, pakaian adat, cerita rakyat, kuliner khas, hingga bangunan bersejarah — melalui pengalaman digital modern, edukatif, dan menyenangkan (*gamified*).

Project ini dirancang untuk mendukung **Sustainable Development Goals (SDGs) 11 Poin 11.4** dalam memperkuat upaya perlindungan dan pelestarian warisan budaya dunia.

---

## ✨ Fitur Utama

NusaPlay dilengkapi dengan berbagai fitur interaktif premium untuk menjamin pengalaman pengguna (UX) yang imersif:

1. **🛫 Animasi Pengantar 3D (Interactive Flight Journey)**
   Penerbangan simulasi pesawat 3D melintasi awan-awan tematik Nusantara sebelum mendarat di peta interaktif. Dibangun dengan *React Three Fiber (Three.js)* dan *GSAP Timeline*.
2. **🗺️ Peta Interaktif 38 Provinsi (Interactive Map Hub)**
   Peta geografis interaktif Indonesia menggunakan *Leaflet.js* untuk menjelajahi berbagai wilayah. Saat ini memiliki 4 provinsi aktif siap eksplorasi: **D.I. Yogyakarta, Jawa Tengah, Kalimantan Barat, dan Papua**.
3. **🎙️ Audio Storytelling & Real-Time Subtitles**
   Setiap kebudayaan dilengkapi dengan narasi suara (.mp3) dan teks subtitle (.vtt) yang tersinkronisasi secara langsung saat audio diputar. Lengkap dengan efek *Dynamic Volume Ducking* (suara backsound mengecil otomatis saat narasi dimulai).
4. **📝 Kuis Interaktif Nusantara**
   Menguji wawasan pengguna melalui 5 pertanyaan acak per provinsi (*Dynamic Question Engine*) dengan penilaian instan, efek suara (*Web Audio API*), dan ekspresi reaktif dari maskot.
5. **🏅 Lencana Pencapaian & Paspor (Achievement System)**
   Sistem gamifikasi dengan **14 lencana unik** (seperti *Ksatria Nusantara*, *Kolektor Suara*, *Cendekia Sempurna*) lengkap dengan layar perayaan modal (*celebration overlay*) saat lencana berhasil didapatkan.
6. **🤖 Asisten Maskot Reaktif (Mascot Assistant)**
   Maskot interaktif NusaPlay yang melayang, dapat digeser (*draggable*), dan menunjukkan ekspresi senang/sedih secara responsif berdasarkan performa kuis pengguna.
7. **🎭 Wayang Loader & Custom Cursor**
   Indikator pemuatan kustom bertema gunungan wayang tradisional dan kursor visual terintegrasi untuk memperkuat identitas visual premium NusaPlay.

---

## 🛠️ Spesifikasi Teknologi

* **Core**: [Next.js v16.2.9](https://nextjs.org/) (App Router) + [React v19.2.4](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Vanilla (Design Tokens)
* **3D & Rendering**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Drei](https://github.com/pmndrs/drei) + [Lamina Shaders](https://github.com/pmndrs/lamina)
* **Animasi**: [GSAP (GreenSock)](https://greensock.com/) + [Framer Motion v11](https://www.framer.com/motion/)
* **Peta**: [Leaflet.js](https://leafletjs.org/) + [React Leaflet](https://react-leaflet.js.org/)
* **Utilitas**: [Jimp](https://github.com/jimp-dev/jimp) (Image processing)

---

## 🚀 Panduan Setup di Local

Ikuti langkah-langkah berikut untuk menjalankan project NusaPlay di komputer lokal Anda:

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (Direkomendasikan Node.js versi 18 ke atas)
* npm (biasanya otomatis terinstal bersama Node.js)

### 2. Kloning Repositori (Clone Repository)
Buka terminal/command prompt, lalu jalankan perintah:
```bash
git clone https://github.com/muhananaufal/nusaplay.git
cd nusaplay
```

### 3. Instal Dependensi (Install Dependencies)
Instal semua package yang diperlukan menggunakan npm:
```bash
npm install
```

### 4. Jalankan Development Server (Run Dev)
Jalankan server lokal untuk proses pengembangan:
```bash
npm run dev
```

### 5. Akses di Browser
Buka browser Anda dan akses alamat berikut:
```text
http://localhost:3000
```

---

## 📦 Build untuk Produksi (Production Build)

Jika Anda ingin membuat bundle produksi yang optimal dan menjalankannya:

1. **Build Proyek**:
   ```bash
   npm run build
   ```
2. **Jalankan Hasil Build**:
   ```bash
   npm run start
   ```

---

## 📂 Struktur Folder Utama

```text
nusaplay/
├── public/                 # File aset statis (3D models, video, music, images)
└── src/
    ├── app/                # Route halaman Next.js (Splash, Map, Province, Quiz, Achievement)
    ├── components/
    │   ├── 3d/             # Komponen 3D Canvas, Airplane, Cloud, HUD
    │   └── ui/             # Komponen UI utama (Mascot, Navigation, Quiz, Detail, Spotlight)
    ├── contexts/           # State Management global (AppFlow, Passport, Progress, Transition)
    ├── data/               # Sumber data budaya & kuis (provinces.ts, cultures.ts)
    └── utils/              # Helper, custom hook, dan fungsi utilitas
```

---

## 🌟 Easter Egg
Di halaman utama (*Splash Screen*), cobalah mengeklik logo **NusaPlay** sebanyak **5 kali** secara berturut-turut untuk membuka jendela tersembunyi **Haiku Nusantara**.
