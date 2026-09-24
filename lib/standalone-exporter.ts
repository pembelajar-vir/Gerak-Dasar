// Single-File HTML Standalone Generator for Papan Interaktif Digital (PID) Offline Execution

export function generateStandaloneHTML(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GerakCerdas PID - Pembelajaran PJOK Variasi & Kombinasi Gerak Dasar SD</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Quicksand:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #e0f2fe;
      --secondary: #059669;
      --accent: #f59e0b;
      --danger: #ef4444;
      --bg-page: #f8fafc;
      --surface: #ffffff;
      --text-main: #0f172a;
      --text-muted: #475569;
      --border-subtle: #e2e8f0;
      --radius-lg: 20px;
      --radius-md: 14px;
      --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: var(--bg-page);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 0.75rem 1.5rem;
    }
    .header-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.5rem 0.85rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .nav-btn:hover, .nav-btn.active {
      color: var(--primary);
      background: var(--primary-light);
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
      background: var(--surface);
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .icon-btn:hover {
      background: #f1f5f9;
    }
    main {
      flex: 1;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .view-section {
      display: none;
      animation: fadeIn 0.25s ease-out forwards;
    }
    .view-section.active {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 700;
      border-radius: var(--radius-md);
      cursor: pointer;
      border: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: #f1f5f9;
      color: var(--text-main);
      border: 1px solid var(--border-subtle);
    }
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    .btn-accent {
      background: var(--accent);
      color: #78350f;
    }
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 16px;
    }
    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-card);
    }
    /* Hero */
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 2rem;
      align-items: center;
      margin-top: 1rem;
    }
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr; text-align: center; }
      .nav-links { display: none; }
    }
    .badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.825rem;
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h1.hero-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      color: var(--text-main);
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
    }
    p.hero-desc {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.75rem;
      max-width: 580px;
    }
    /* Materials Grid */
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;
    }
    .mat-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 1.25rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .mat-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 12px 20px -8px rgba(2, 132, 199, 0.15);
    }
    /* Camera Stage */
    .pid-stage-container {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 1.5rem;
      align-items: start;
    }
    @media (max-width: 1024px) {
      .pid-stage-container { grid-template-columns: 1fr; }
    }
    .video-viewport {
      position: relative;
      background: #090d16;
      border-radius: var(--radius-lg);
      overflow: hidden;
      aspect-ratio: 4 / 3;
      border: 2px solid #1e293b;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    video#webcam {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scaleX(-1);
    }
    canvas#motionCanvas {
      display: none;
    }
    .motion-zones-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .zone-box {
      position: absolute;
      border: 2px dashed rgba(255, 255, 255, 0.4);
      background: rgba(2, 132, 199, 0.15);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.85rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      transition: all 0.15s ease;
    }
    .zone-box.active {
      background: rgba(16, 185, 129, 0.55);
      border-color: #10b981;
      transform: scale(1.04);
      box-shadow: 0 0 20px #10b981;
    }
    /* Zones Layout */
    .zone-top { top: 6%; left: 25%; width: 50%; height: 24%; }
    .zone-left { top: 35%; left: 4%; width: 22%; height: 35%; }
    .zone-right { top: 35%; right: 4%; width: 22%; height: 35%; }
    .zone-bottom { bottom: 6%; left: 30%; width: 40%; height: 22%; }
    .zone-center { top: 35%; left: 32%; width: 36%; height: 35%; }

    /* Falling Ball Animation */
    .virtual-ball {
      position: absolute;
      width: 48px;
      height: 48px;
      background: radial-gradient(circle at 30% 30%, #facc15, #ea580c);
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
      color: white;
      cursor: pointer;
    }

    /* Score Modal & Profile */
    .developer-card {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 1.25rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-top: 1.5rem;
    }
    .dev-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--primary);
    }
    /* Confetti Canvas */
    #confettiCanvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
  </style>
</head>
<body>
  <canvas id="confettiCanvas"></canvas>

  <header>
    <div class="header-inner">
      <a href="#" class="brand" onclick="switchView('view-home'); return false;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="3"></circle>
          <path d="m9 20 3-6 3 6"></path>
          <path d="m6 8 6 2 6-2"></path>
          <path d="M12 10v4"></path>
        </svg>
        <span>GerakCerdas PID</span>
      </a>

      <nav class="nav-links">
        <button class="nav-btn active" id="nav-home" onclick="switchView('view-home')">Beranda</button>
        <button class="nav-btn" id="nav-cp" onclick="switchView('view-cp')">Tujuan CP & TP</button>
        <button class="nav-btn" id="nav-material" onclick="switchView('view-material')">Materi Gerak</button>
        <button class="nav-btn" id="nav-activity" onclick="startActivityGame()">Aktivitas PID</button>
        <button class="nav-btn" id="nav-profile" onclick="switchView('view-profile')">Profil Guru</button>
      </nav>

      <div class="controls">
        <button class="icon-btn" id="muteBtn" onclick="toggleAudio()" title="Suara Efek (Web Audio)">
          <svg id="soundIconOn" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
          <svg id="soundIconOff" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        </button>

        <button class="icon-btn" onclick="toggleFullscreen()" title="Layar Penuh PID">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- 1. BERANDA / PENGENALAN -->
    <section id="view-home" class="view-section active">
      <div class="hero-grid">
        <div>
          <div class="badge-tag">PJOK SD Kurikulum Merdeka · Fase B & C</div>
          <h1 class="hero-title">Variasi & Kombinasi Gerak Dasar Interaktif</h1>
          <p class="hero-desc">
            Aplikasi pembelajaran gerak fisik cerdas berbasis kamera Papan Interaktif Digital (PID).
            Ajak siswa melompat, meliuk, melempar, dan mengombinasikan gerak lokomotor, non-lokomotor, serta manipulatif dengan gembira!
          </p>

          <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" onclick="startActivityGame()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Mulai Petualangan PID
            </button>
            <button class="btn btn-secondary btn-lg" onclick="switchView('view-material')">
              Pelajari Materi
            </button>
            <button class="btn btn-secondary btn-lg" onclick="switchView('view-cp')">
              Tujuan & CP
            </button>
          </div>

          <div style="display: flex; gap: 2rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">4 Misi</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Sensor Gerak Aktif</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--secondary);">Web Audio</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Gamifikasi Ceria</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">PID Ready</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Kamera & Touchscreen</div>
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <div class="card" style="padding: 2rem; background: linear-gradient(145deg, #ffffff, #f0f9ff); border: 2px solid #bae6fd;">
            <!-- Friendly Mascot SVG -->
            <svg viewBox="0 0 240 240" width="220" height="220" style="margin: 0 auto;">
              <circle cx="120" cy="120" r="100" fill="#e0f2fe" />
              <!-- Body -->
              <circle cx="120" cy="80" r="42" fill="#0284c7" />
              <!-- Face smile -->
              <circle cx="106" cy="74" r="5" fill="#ffffff" />
              <circle cx="134" cy="74" r="5" fill="#ffffff" />
              <path d="M106 88 Q120 102 134 88" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
              <!-- Sport Headband -->
              <rect x="76" y="58" width="88" height="12" rx="6" fill="#f59e0b" />
              <circle cx="120" cy="64" r="5" fill="#ffffff" />
              <!-- Dynamic Arms in motion -->
              <path d="M80 130 Q50 90 60 60" stroke="#0284c7" stroke-width="14" stroke-linecap="round" fill="none" />
              <path d="M160 130 Q190 90 180 60" stroke="#0284c7" stroke-width="14" stroke-linecap="round" fill="none" />
              <!-- Torso -->
              <rect x="92" y="120" width="56" height="60" rx="14" fill="#059669" />
              <!-- Number 10 badge -->
              <text x="120" y="158" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">10</text>
              <!-- Legs Jumping -->
              <path d="M100 178 L80 216" stroke="#0284c7" stroke-width="12" stroke-linecap="round" />
              <path d="M140 178 L160 216" stroke="#0284c7" stroke-width="12" stroke-linecap="round" />
              <!-- Shoes -->
              <ellipse cx="74" cy="216" rx="14" ry="7" fill="#ef4444" />
              <ellipse cx="166" cy="216" rx="14" ry="7" fill="#ef4444" />
            </svg>
            <h3 style="font-weight: 800; font-size: 1.25rem; margin-top: 0.5rem; color: var(--primary);">Kiki Si Bintang PJOK</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">
              "Ayo bergerak aktif di depan kamera PID! Jaga tubuh tetap bugar, sehat, dan bersemangat!"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. CAPAIAN & TUJUAN PEMBELAJARAN (CP / TP) -->
    <section id="view-cp" class="view-section">
      <div class="card" style="max-width: 900px; margin: 0 auto;">
        <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary);">
          Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP)
        </h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
          Kurikulum Merdeka PJOK SD · Fase B (Kelas 3-4) & Fase C (Kelas 5-6)
        </p>

        <div style="background: #f0fdf4; border-left: 4px solid var(--secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <h4 style="font-weight: 700; color: #166534; margin-bottom: 0.25rem;">Capaian Pembelajaran Elemen Keterampilan & Pengetahuan Gerak:</h4>
          <p style="font-size: 0.925rem; color: #14532d; line-height: 1.5;">
            "Peserta didik dapat menunjukkan kemampuan dalam mempraktikkan variasi dan kombinasi pola gerak dasar lokomotor, non-lokomotor, dan manipulatif secara mandiri, berkoordinasi, berirama, dan bersemangat dalam berbagai bentuk aktivitas jasmani dan permainan sederhana."
          </p>
        </div>

        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">Tujuan Pembelajaran (TP):</h3>
        <div style="display: grid; gap: 0.75rem; margin-bottom: 1.5rem;">
          <div style="padding: 0.85rem; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px;">
            <strong style="color: var(--primary);">TP 1.1 - Identifikasi Pola Gerak Dasar:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Siswa mampu membedakan dengan tepat ciri gerak lokomotor (berpindah tempat), non-lokomotor (di tempat), dan manipulatif (menggunakan objek).</p>
          </div>
          <div style="padding: 0.85rem; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px;">
            <strong style="color: var(--primary);">TP 1.2 - Praktik Variasi Gerak:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Siswa mempraktikkan variasi tempo (cepat-lambat) dan variasi arah (atas, samping, bawah) melalui pantauan sensor kamera PID.</p>
          </div>
          <div style="padding: 0.85rem; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px;">
            <strong style="color: var(--primary);">TP 1.3 - Kombinasi Gerak Terpadu:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Siswa melakukan rangkaian gabungan gerak (misal: lari di tempat lalu melompat menangkap sasaran bola) secara lancar.</p>
          </div>
          <div style="padding: 0.85rem; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px;">
            <strong style="color: var(--primary);">TP 1.4 - Keselamatan & Sportivitas:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Siswa mematuhi ruang gerak aman, mendarat dengan mengeper, dan menghargai giliran bermain di depan PID.</p>
          </div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 1rem;">
          <h4 style="color: #92400e; font-weight: 700; margin-bottom: 0.25rem;">Tips Operasional Guru pada Papan Interaktif Digital (PID):</h4>
          <ul style="padding-left: 1.2rem; font-size: 0.875rem; color: #78350f; line-height: 1.5;">
            <li>Pastikan pencahayaan kelas terang merata agar webcam PID menangkap gerak tubuh siswa secara optimal.</li>
            <li>Beri batas garis lakban di lantai berjarak 1,5 - 2,5 meter dari layar PID.</li>
            <li>Guru dapat mengaktifkan Mode Sentuh jika ada siswa yang memiliki kebutuhan gerak khusus.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 3. RINGKASAN MATERI INTERAKTIF -->
    <section id="view-material" class="view-section">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 1.5rem auto;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">Ringkasan Konsep Gerak Dasar PJOK</h2>
        <p style="color: var(--text-muted);">Pahami 3 pilar gerak dasar dan bagaimana menggabungkannya dalam olahraga</p>
      </div>

      <div class="materials-grid">
        <div class="mat-card" onclick="alertMaterial('lokomotor')">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: var(--primary); margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m19 12-7-7-7 7"></path><path d="M12 19V5"></path></svg>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.35rem;">1. Gerak Lokomotor</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
            Gerakan yang menyebabkan <strong>seluruh tubuh berpindah tempat</strong> dari satu posisi ke posisi lain.
          </p>
          <div style="margin-top: 0.75rem; font-size: 0.825rem; color: var(--primary); font-weight: 700;">
            Contoh: Berjalan, Berlari, Melompat, Meloncat.
          </div>
        </div>

        <div class="mat-card" onclick="alertMaterial('non-lokomotor')">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: #dcfce7; display: flex; align-items: center; justify-content: center; color: var(--secondary); margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.35rem;">2. Gerak Non-Lokomotor</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
            Gerakan yang dilakukan oleh anggota tubuh <strong>tanpa berpindah posisi</strong> dari tempat semula.
          </p>
          <div style="margin-top: 0.75rem; font-size: 0.825rem; color: var(--secondary); font-weight: 700;">
            Contoh: Meliuk, Membungkuk, Mengayun lengan, Memutar pinggang.
          </div>
        </div>

        <div class="mat-card" onclick="alertMaterial('manipulatif')">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: #fef3c7; display: flex; align-items: center; justify-content: center; color: #b45309; margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="8"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path></svg>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.35rem;">3. Gerak Manipulatif</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
            Keterampilan gerak yang melibatkan <strong>penguasaan suatu alat atau objek</strong> (bola, raket, tongkat).
          </p>
          <div style="margin-top: 0.75rem; font-size: 0.825rem; color: #b45309; font-weight: 700;">
            Contoh: Melempar, Menangkap, Menendang, Memukul bola.
          </div>
        </div>

        <div class="mat-card" onclick="alertMaterial('kombinasi')">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: #fae8ff; display: flex; align-items: center; justify-content: center; color: #86198f; margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.35rem;">4. Variasi & Kombinasi</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
            <strong>Variasi:</strong> 1 gerak dilakukan beda cara.<br>
            <strong>Kombinasi:</strong> Merangkai 2 atau lebih jenis gerak secara mengalir.
          </p>
          <div style="margin-top: 0.75rem; font-size: 0.825rem; color: #86198f; font-weight: 700;">
            Contoh: Lari cepat lalu melompat meraih bola (Kombinasi Lokomotor + Manipulatif).
          </div>
        </div>
      </div>
    </section>

    <!-- 4. AKTIVITAS / PERMAINAN INTERAKTIF DENGAN KAMERA PID -->
    <section id="view-activity" class="view-section">
      <!-- Game Top Header Status -->
      <div class="card" style="margin-bottom: 1.25rem; padding: 1rem 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary);" id="missionStageTitle">Misi 1 dari 4: Aksi Lokomotor</span>
            <h3 style="font-weight: 800; font-size: 1.2rem;" id="missionName">Lari di Tempat & Lompat Tinggi</h3>
          </div>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">SKOR</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: var(--primary);" id="gameScore">0</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">TARGET</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: var(--secondary);" id="gameTarget">0 / 5</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">WAKTU</div>
              <div style="font-size: 1.4rem; font-weight: 900; color: var(--accent);" id="gameTimer">25s</div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 9999px; margin-top: 0.75rem; overflow: hidden;">
          <div id="gameProgressBar" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- Main Stage -->
      <div class="pid-stage-container">
        <!-- Video Viewport / Motion Stage -->
        <div class="video-viewport" id="viewport">
          <video id="webcam" autoplay playsinline muted></video>
          <canvas id="motionCanvas"></canvas>

          <!-- Overlay Motion Zones -->
          <div class="motion-zones-overlay" id="zonesOverlay">
            <div class="zone-box zone-top" id="zoneTop" onclick="triggerZoneManually('top')">
              <span>▲ ZONA ATAS (Lompat / Ayun Tinggi)</span>
            </div>
            <div class="zone-box zone-left" id="zoneLeft" onclick="triggerZoneManually('left')">
              <span>◄ ZONA KIRI (Meliuk / Geser)</span>
            </div>
            <div class="zone-box zone-right" id="zoneRight" onclick="triggerZoneManually('right')">
              <span>ZONA KANAN (Meliuk / Geser) ►</span>
            </div>
            <div class="zone-box zone-bottom" id="zoneBottom" onclick="triggerZoneManually('bottom')">
              <span>▼ ZONA BAWAH (Bungkuk / Squat)</span>
            </div>
            <div class="zone-box zone-center" id="zoneCenter" onclick="triggerZoneManually('center')">
              <span>● ZONA TENGAH (Lari di Tempat)</span>
            </div>
          </div>

          <!-- Camera status / fallback overlay -->
          <div id="cameraStatusOverlay" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; color: white;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; color: #38bdf8;">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">Aktifkan Kamera PID</h3>
            <p style="font-size: 0.9rem; color: #cbd5e1; max-width: 400px; margin-bottom: 1.25rem;">
              Izinkan akses webcam agar gerakan tubuh Anda di depan Papan Interaktif Digital dapat dideteksi secara otomatis!
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <button class="btn btn-primary" onclick="initCamera()">
                Buka Kamera PID
              </button>
              <button class="btn btn-secondary" onclick="enableTouchMode()">
                Gunakan Mode Layar Sentuh
              </button>
            </div>
          </div>
        </div>

        <!-- Instructions & Feedback Deck -->
        <div>
          <div class="card" style="margin-bottom: 1rem;">
            <h4 style="font-weight: 800; font-size: 1.1rem; color: var(--primary); margin-bottom: 0.5rem;">Petunjuk Gerakan Siswa:</h4>
            <p id="activityInstruction" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 1rem;">
              Berdirilah di depan kamera PID! Lakukan lari cepat di tempat lalu melompat tinggi untuk menyentuh ZONA ATAS di layar!
            </p>

            <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 0.85rem; font-size: 0.85rem; color: var(--text-muted);">
              <strong>Saran Biomekanika:</strong>
              <div id="conceptReinforce" style="margin-top: 0.25rem;">
                Melompat melibatkan tolakan satu atau dua kaki dan melayang di udara, memindahkan tubuh ke atas.
              </div>
            </div>
          </div>

          <!-- Instant Feedback Pop-up card -->
          <div class="card" id="feedbackCard" style="display: none; border-left: 4px solid var(--secondary); background: #f0fdf4;">
            <div style="font-weight: 800; font-size: 1rem; color: #166534;" id="feedbackTitle">Umpan Balik Gerakan</div>
            <p style="font-size: 0.9rem; color: #14532d; margin-top: 0.25rem;" id="feedbackBody">
              Luar biasa! Koordinasi gerak lokomotormu sempurna!
            </p>
          </div>

          <!-- Action buttons -->
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="btn btn-secondary" style="flex: 1;" onclick="restartCurrentMission()">Ulangi Misi</button>
            <button class="btn btn-primary" style="flex: 1;" onclick="nextMission()">Misi Berikutnya</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. SKOR AKHIR & PENUTUP -->
    <section id="view-score" class="view-section">
      <div class="card" style="max-width: 800px; margin: 0 auto; text-align: center; padding: 2.5rem 1.5rem;">
        <div style="display: inline-flex; padding: 1rem; border-radius: 50%; background: #fef3c7; color: #d97706; margin-bottom: 1rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>

        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-main);">Selamat! Misi Selesai!</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Kamu telah menuntaskan seluruh tantangan Variasi & Kombinasi Gerak Dasar PJOK</p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 500px; margin: 0 auto 2rem auto;">
          <div style="background: #f8fafc; padding: 1rem; border-radius: 14px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">SKOR AKHIR</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--primary);" id="finalScoreVal">480</div>
          </div>
          <div style="background: #f8fafc; padding: 1rem; border-radius: 14px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">BINTANG</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #f59e0b;" id="finalStars">★★★</div>
          </div>
          <div style="background: #f8fafc; padding: 1rem; border-radius: 14px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">LENCANA</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--secondary);" id="finalBadge">Master PJOK</div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-lg" onclick="startActivityGame()">
            Main Lagi (Reset)
          </button>
          <button class="btn btn-secondary btn-lg" onclick="switchView('view-material')">
            Ulas Materi
          </button>
        </div>

        <!-- PROFIL PENGEMBANG SESUAI INSTRUKSI -->
        <div class="developer-card" style="text-align: left;">
          <a href="https://ibb.co.com/ynYY4X34" target="_blank" rel="noopener noreferrer">
            <img src="https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png" alt="Robiyanto, S.Pd." class="dev-avatar" referrerpolicy="no-referrer">
          </a>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.05em;">Pengembang Media Pembelajaran</div>
            <h4 style="font-weight: 800; font-size: 1.1rem; margin-top: 0.1rem;">Robiyanto, S.Pd.</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              NIP: 199307202019021005 · SD Negeri 2 Kebondalem, Banjarnegara
            </div>
            <div style="font-size: 0.825rem; color: var(--primary); margin-top: 0.2rem;">
              robiyantospd07@guru.sd.belajar.id
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PROFIL GURU & PENGEMBANG (DEDICATED VIEW) -->
    <section id="view-profile" class="view-section">
      <div class="card" style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: var(--primary);">Profil Pengembang Aplikasi</h2>
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <a href="https://ibb.co.com/ynYY4X34" target="_blank" rel="noopener noreferrer">
            <img src="https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png" alt="Robiyanto, S.Pd." style="width: 110px; height: 110px; border-radius: 20px; object-fit: cover; border: 3px solid var(--primary); box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);" referrerpolicy="no-referrer">
          </a>
          <div style="flex: 1; min-width: 250px;">
            <h3 style="font-size: 1.35rem; font-weight: 800;">Robiyanto, S.Pd.</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">Guru PJOK & Pengembang Inovasi Pembelajaran Digital</p>
            <div style="font-size: 0.875rem; line-height: 1.7;">
              <div><strong>NIP:</strong> 199307202019021005</div>
              <div><strong>Unit Kerja:</strong> SD Negeri 2 Kebondalem, Banjarnegara</div>
              <div><strong>Email:</strong> <a href="mailto:robiyantospd07@guru.sd.belajar.id" style="color: var(--primary); font-weight: 600;">robiyantospd07@guru.sd.belajar.id</a></div>
            </div>
          </div>
        </div>

        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
          Aplikasi ini dirancang khusus untuk mengoptimalkan pemanfaatan Papan Interaktif Digital (PID) di lingkungan Sekolah Dasar. Mengintegrasikan teknologi pendeteksi gerak kamera (motion tracking) dan interaktivitas layar sentuh dengan kurikulum PJOK, guna mewujudkan pembelajaran jasmani yang bermakna, aktif, dan menyenangkan bagi anak.
        </div>
      </div>
    </section>
  </main>

  <script>
    // --- 1. WEB AUDIO API SYNTHESIZER ---
    let audioCtx = null;
    let isMuted = false;

    function initAudio() {
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function toggleAudio() {
      isMuted = !isMuted;
      document.getElementById('soundIconOn').style.display = isMuted ? 'none' : 'block';
      document.getElementById('soundIconOff').style.display = isMuted ? 'block' : 'none';
      if (!isMuted) playSound('click');
    }

    function playSound(type) {
      if (isMuted) return;
      initAudio();
      if (!audioCtx) return;

      try {
        const now = audioCtx.currentTime;
        if (type === 'click') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (type === 'correct') {
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0.15, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.2);
          });
        } else if (type === 'wrong') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.linearRampToValueAtTime(160, now + 0.22);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.22);
        } else if (type === 'fanfare') {
          [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(f, now + idx * 0.12);
            gain.gain.setValueAtTime(0.18, now + idx * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.35);
          });
        }
      } catch(e) {}
    }

    // --- 2. PURE CANVAS CONFETTI ---
    function launchConfetti() {
      const canvas = document.getElementById('confettiCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ['#0284c7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
      const particles = [];
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 200,
          y: canvas.height / 3 + (Math.random() - 0.5) * 100,
          w: Math.random() * 8 + 6,
          h: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * -10 - 3,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
          opacity: 1
        });
      }

      const duration = 2800;
      let start = null;
      function render(time) {
        if (!start) start = time;
        const progress = (time - start) / duration;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3;
          p.rot += p.vRot;
          p.opacity = Math.max(0, 1 - progress);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });

        if (progress < 1) {
          requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      requestAnimationFrame(render);
    }

    // --- 3. NAVIGATION VIEW SWITCHER ---
    function switchView(viewId) {
      playSound('click');
      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      const target = document.getElementById(viewId);
      if (target) target.classList.add('active');

      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      if (viewId === 'view-home') document.getElementById('nav-home')?.classList.add('active');
      if (viewId === 'view-cp') document.getElementById('nav-cp')?.classList.add('active');
      if (viewId === 'view-material') document.getElementById('nav-material')?.classList.add('active');
      if (viewId === 'view-activity') document.getElementById('nav-activity')?.classList.add('active');
      if (viewId === 'view-profile') document.getElementById('nav-profile')?.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleFullscreen() {
      playSound('click');
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }

    function alertMaterial(type) {
      playSound('click');
      const info = {
        'lokomotor': 'Gerak Lokomotor memindahkan tubuh: Kaki menolak dan mendorong tubuh berpindah posisi (Jalan, Lari, Lompat).',
        'non-lokomotor': 'Gerak Non-Lokomotor stabil di tempat: Melatih kelenturan sendi dan otot inti tubuh (Meliuk, Bungkuk, Ayun).',
        'manipulatif': 'Gerak Manipulatif dengan alat: Memadukan ketepatan mata dan tangan/kaki (Lempar, Tangkap, Tendang).',
        'kombinasi': 'Kombinasi Gerak: Menggabungkan 2 atau lebih gerak secara berurutan dan mengalir dalam permainan olahraga!'
      };
      alert(info[type] || 'Pelajari gerak dasar ini bersama teman-teman!');
    }

    // --- 4. GAME STATE & CAMERA ENGINE ---
    const missions = [
      {
        id: 1,
        title: 'Misi 1 dari 4: Aksi Lokomotor',
        name: 'Lari Cepat di Tempat & Lompat Tinggi',
        instruction: 'Berdirilah di depan kamera PID! Lakukan lari cepat di tempat lalu melompat tinggi menyentuh ZONA ATAS di layar!',
        targetZone: 'top',
        targetCount: 5,
        timeLimit: 25,
        concept: 'Melompat melibatkan tolakan satu atau dua kaki dan melayang di udara, memindahkan tubuh ke atas.'
      },
      {
        id: 2,
        title: 'Misi 2 dari 4: Aksi Non-Lokomotor',
        name: 'Kelenturan Meliuk & Ayun Samping',
        instruction: 'Kaki tetap menapak di tempat! Rentangkan tangan dan liukkan badan ke ZONA KIRI dan KANAN!',
        targetZone: 'sides',
        targetCount: 6,
        timeLimit: 30,
        concept: 'Meliuk dan mengayun tanpa berpindah tempat melatih fleksibilitas dan stabilitas inti tubuh.'
      },
      {
        id: 3,
        title: 'Misi 3 dari 4: Aksi Manipulatif Virtual',
        name: 'Menepis & Menangkap Bola Virtual',
        instruction: 'Tepis bola-bola virtual yang jatuh atau sentuh zona tengah dengan tanganmu!',
        targetZone: 'center',
        targetCount: 6,
        timeLimit: 30,
        concept: 'Menangkap dan menepis melatih koordinasi mata-tangan serta estimasi kecepatan gerak objek.'
      },
      {
        id: 4,
        title: 'Misi 4 dari 4: Tantangan Kombinasi Juara',
        name: 'Rangkaian Lari - Bungkuk - Lompat',
        instruction: 'Lakukan urutan gerak: Lari di tempat (Tengah) -> Bungkuk (Bawah) -> Lompat tinggi (Atas)!',
        targetZone: 'top',
        targetCount: 4,
        timeLimit: 35,
        concept: 'Kombinasi gerak menggabungkan beberapa pola gerak menjadi keterampilan bermain olahraga yang efektif.'
      }
    ];

    let currentMissionIdx = 0;
    let score = 0;
    let currentCount = 0;
    let timerVal = 25;
    let timerInterval = null;
    let isTouchOnly = false;
    let videoStream = null;
    let motionInterval = null;

    function startActivityGame() {
      switchView('view-activity');
      currentMissionIdx = 0;
      score = 0;
      loadMission(0);
    }

    function loadMission(idx) {
      currentMissionIdx = idx;
      const m = missions[idx];
      currentCount = 0;
      timerVal = m.timeLimit;

      document.getElementById('missionStageTitle').innerText = m.title;
      document.getElementById('missionName').innerText = m.name;
      document.getElementById('activityInstruction').innerText = m.instruction;
      document.getElementById('conceptReinforce').innerText = m.concept;
      document.getElementById('gameScore').innerText = score;
      document.getElementById('gameTarget').innerText = currentCount + ' / ' + m.targetCount;
      document.getElementById('gameTimer').innerText = timerVal + 's';
      document.getElementById('gameProgressBar').style.width = '0%';
      document.getElementById('feedbackCard').style.display = 'none';

      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timerVal--;
        document.getElementById('gameTimer').innerText = timerVal + 's';
        if (timerVal <= 0) {
          clearInterval(timerInterval);
          onMissionTimeOut();
        }
      }, 1000);
    }

    function triggerZoneManually(zoneKey) {
      playSound('click');
      const box = document.getElementById(
        zoneKey === 'top' ? 'zoneTop' :
        zoneKey === 'left' ? 'zoneLeft' :
        zoneKey === 'right' ? 'zoneRight' :
        zoneKey === 'bottom' ? 'zoneBottom' : 'zoneCenter'
      );
      if (box) {
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 250);
      }
      registerMotionPoint();
    }

    function registerMotionPoint() {
      const m = missions[currentMissionIdx];
      currentCount++;
      score += 20;
      playSound('correct');

      document.getElementById('gameScore').innerText = score;
      document.getElementById('gameTarget').innerText = currentCount + ' / ' + m.targetCount;
      const pct = Math.min(100, Math.round((currentCount / m.targetCount) * 100));
      document.getElementById('gameProgressBar').style.width = pct + '%';

      if (currentCount >= m.targetCount) {
        clearInterval(timerInterval);
        onMissionSuccess();
      }
    }

    function onMissionSuccess() {
      playSound('fanfare');
      launchConfetti();
      const fb = document.getElementById('feedbackCard');
      fb.style.display = 'block';
      fb.style.borderLeftColor = 'var(--secondary)';
      fb.style.background = '#f0fdf4';
      document.getElementById('feedbackTitle').innerText = 'Luar Biasa! Misi Selesai!';
      document.getElementById('feedbackBody').innerText = 'Kamu berhasil menyelesaikan gerakan dengan pola biomekanika yang sangat baik!';

      setTimeout(() => {
        nextMission();
      }, 2200);
    }

    function onMissionTimeOut() {
      playSound('wrong');
      const fb = document.getElementById('feedbackCard');
      fb.style.display = 'block';
      fb.style.borderLeftColor = 'var(--accent)';
      fb.style.background = '#fffbeb';
      document.getElementById('feedbackTitle').innerText = 'Waktu Habis! Ayo Coba Lagi!';
      document.getElementById('feedbackBody').innerText = 'Lakukan gerakan dengan lebih bersemangat dan perhatikan posisi di depan kamera!';
    }

    function nextMission() {
      if (currentMissionIdx < missions.length - 1) {
        loadMission(currentMissionIdx + 1);
      } else {
        finishGame();
      }
    }

    function restartCurrentMission() {
      loadMission(currentMissionIdx);
    }

    function finishGame() {
      clearInterval(timerInterval);
      playSound('fanfare');
      launchConfetti();
      switchView('view-score');
      document.getElementById('finalScoreVal').innerText = score;
      document.getElementById('finalStars').innerText = score >= 300 ? '★★★' : '★★☆';
      document.getElementById('finalBadge').innerText = score >= 300 ? 'Master PJOK SD' : 'Pendekar Gerak';
    }

    // --- 5. CAMERA INIT & MOTION DIFFERENCING ---
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
        });
        videoStream = stream;
        const video = document.getElementById('webcam');
        video.srcObject = stream;
        video.play();
        document.getElementById('cameraStatusOverlay').style.display = 'none';
        startMotionTracking();
      } catch (err) {
        alert('Kamera tidak dapat diakses atau izin ditolak. Mengaktifkan Mode Layar Sentuh PID!');
        enableTouchMode();
      }
    }

    function enableTouchMode() {
      isTouchOnly = true;
      document.getElementById('cameraStatusOverlay').style.display = 'none';
      document.querySelectorAll('.zone-box').forEach(z => {
        z.style.pointerEvents = 'auto';
        z.style.cursor = 'pointer';
      });
    }

    function startMotionTracking() {
      const video = document.getElementById('webcam');
      const canvas = document.getElementById('motionCanvas');
      if (!canvas || !video) return;
      const ctx = canvas.getContext('2d');
      canvas.width = 160;
      canvas.height = 120;

      let prevFrame = null;
      let lastTriggerTime = 0;

      motionInterval = setInterval(() => {
        if (video.readyState >= 2) {
          ctx.drawImage(video, 0, 0, 160, 120);
          const currentFrame = ctx.getImageData(0, 0, 160, 120);

          if (prevFrame) {
            let diffTop = 0;
            let diffSides = 0;
            let diffCenter = 0;
            const data1 = prevFrame.data;
            const data2 = currentFrame.data;

            for (let i = 0; i < data1.length; i += 16) {
              const delta = Math.abs(data1[i] - data2[i]);
              if (delta > 35) {
                const pixelIdx = i / 4;
                const y = Math.floor(pixelIdx / 160);
                const x = pixelIdx % 160;

                if (y < 40) diffTop++;
                else if (x < 40 || x > 120) diffSides++;
                else diffCenter++;
              }
            }

            const now = Date.now();
            if (now - lastTriggerTime > 1200) {
              const currentM = missions[currentMissionIdx];
              if (currentM.targetZone === 'top' && diffTop > 45) {
                lastTriggerTime = now;
                triggerZoneManually('top');
              } else if (currentM.targetZone === 'sides' && diffSides > 50) {
                lastTriggerTime = now;
                triggerZoneManually('left');
              } else if (currentM.targetZone === 'center' && diffCenter > 55) {
                lastTriggerTime = now;
                triggerZoneManually('center');
              }
            }
          }
          prevFrame = currentFrame;
        }
      }, 100);
    }
  </script>
</body>
</html>`;
}
