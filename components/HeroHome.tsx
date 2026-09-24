'use client';

import React from 'react';
import { soundEffects } from '@/lib/audio';
import { Play, BookOpen, Target, Camera, Touchpad, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroHomeProps {
  onStartGame: (mode: 'camera' | 'touch') => void;
  onOpenMaterial: () => void;
  onOpenObjectives: () => void;
}

export default function HeroHome({
  onStartGame,
  onOpenMaterial,
  onOpenObjectives,
}: HeroHomeProps) {
  return (
    <section className="py-6 sm:py-10">
      {/* Hero Headline & Mascot Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline and Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/90 border border-sky-200/80 text-sky-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>PJOK SD KURIKULUM MERDEKA · FASE B & C</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Variasi & Kombinasi <span className="text-sky-600">Gerak Dasar</span> Berbasis Kamera PID
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Aplikasi pembelajaran interaktif jasmani untuk Papan Interaktif Digital (PID).
            Siswa bergerak aktif di depan sensor kamera—melompat, meliuk, melempar bola virtual,
            dan merangkai kombinasi gerak dasar dengan audio ceria dan umpan balik seketika!
          </p>

          {/* Quick Choice: Camera or Touch */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                onStartGame('camera');
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-lg shadow-sky-600/30 transition-all active:scale-95 group"
            >
              <Camera className="w-5 h-5 text-sky-200 group-hover:scale-110 transition-transform" />
              <span>Mulai Mode Kamera PID</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onStartGame('touch');
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all active:scale-95 group"
            >
              <Touchpad className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Mode Layar Sentuh PID</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenMaterial();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Pelajari Konsep</span>
            </button>
          </div>

          {/* Pedagogic Highlights */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">4 Misi</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Tantangan Gerak Fisik</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">Web Audio</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Audio Efek Mandiri</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-sky-600">Smart PID</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Deteksi Gerak Ruang</div>
            </div>
          </div>
        </div>

        {/* Right Column: Friendly Sports Mascot SVG */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm p-6 rounded-3xl bg-gradient-to-b from-sky-50 via-white to-sky-50/50 border border-sky-100 shadow-xl shadow-sky-900/5 text-center">
            {/* Mascot SVG Artwork */}
            <div className="relative mx-auto w-56 h-56 flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
                {/* Background Ring */}
                <circle cx="120" cy="120" r="105" fill="#E0F2FE" />
                <circle cx="120" cy="120" r="95" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="3" strokeDasharray="6 6" />

                {/* Star accents */}
                <polygon points="40,60 45,72 57,74 48,82 51,94 40,88 29,94 32,82 23,74 35,72" fill="#FBBF24" />
                <polygon points="200,70 204,80 214,81 206,88 208,98 200,93 192,98 194,88 186,81 196,80" fill="#FBBF24" />

                {/* Head */}
                <circle cx="120" cy="85" r="42" fill="#0284C7" />
                {/* Face Mask/Cheeks */}
                <ellipse cx="106" cy="94" rx="7" ry="5" fill="#38BDF8" opacity="0.6" />
                <ellipse cx="134" cy="94" rx="7" ry="5" fill="#38BDF8" opacity="0.6" />

                {/* Cheerful Eyes */}
                <circle cx="106" cy="82" r="5" fill="#FFFFFF" />
                <circle cx="107" cy="82" r="2.5" fill="#0F172A" />
                <circle cx="134" cy="82" r="5" fill="#FFFFFF" />
                <circle cx="135" cy="82" r="2.5" fill="#0F172A" />

                {/* Smile */}
                <path d="M106 95 Q120 110 134 95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {/* Sports Headband */}
                <rect x="76" y="62" width="88" height="13" rx="6.5" fill="#F59E0B" />
                <circle cx="120" cy="68.5" r="5.5" fill="#FFFFFF" />
                <circle cx="120" cy="68.5" r="3" fill="#D97706" />

                {/* Dynamic Torso (Athletic Jersey) */}
                <rect x="94" y="125" width="52" height="55" rx="14" fill="#059669" />
                <text x="120" y="161" fontSize="22" fontWeight="900" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">
                  10
                </text>

                {/* Athletic Arms in Joyful Motion */}
                <path d="M84 135 Q50 95 62 65" stroke="#0284C7" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="62" cy="65" r="10" fill="#38BDF8" />

                <path d="M156 135 Q190 95 178 65" stroke="#0284C7" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="178" cy="65" r="10" fill="#38BDF8" />

                {/* Jumping Legs */}
                <path d="M102 178 L84 212" stroke="#0284C7" strokeWidth="13" strokeLinecap="round" />
                <path d="M138 178 L156 212" stroke="#0284C7" strokeWidth="13" strokeLinecap="round" />

                {/* Running Shoes */}
                <ellipse cx="78" cy="214" rx="14" ry="7" fill="#EF4444" />
                <ellipse cx="162" cy="214" rx="14" ry="7" fill="#EF4444" />
              </svg>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Maskot Sahabat PJOK</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Kiki si Bintang Juara</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                &ldquo;Siapkan ruang gerakmu, hadapi kamera PID, dan mari rasakan asyiknya mengombinasikan gerak!&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenObjectives();
                }}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Lihat Capaian Pembelajaran (CP)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Preview Cards */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lokomotor */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm mb-3">
            01
          </div>
          <h2 className="text-base font-bold text-slate-900">Gerak Lokomotor</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Berpindah tempat dari satu titik ke titik lain: berjalan, berlari, dan melompat tinggi.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-sky-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sensor Zona Atas & Tengah</span>
          </div>
        </div>

        {/* Non-Lokomotor */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm mb-3">
            02
          </div>
          <h2 className="text-base font-bold text-slate-900">Gerak Non-Lokomotor</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Bergerak stabil tanpa berpindah tempat: meliuk, membungkuk, dan mengayunkan kedua lengan.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sensor Zona Kiri & Kanan</span>
          </div>
        </div>

        {/* Manipulatif */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm mb-3">
            03
          </div>
          <h2 className="text-base font-bold text-slate-900">Gerak Manipulatif</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Mengendalikan dan menguasai objek atau alat: menangkap, menepis, dan melempar bola sasaran.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Objek Virtual Interaktif</span>
          </div>
        </div>

        {/* Kombinasi */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-purple-300 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm mb-3">
            04
          </div>
          <h2 className="text-base font-bold text-slate-900">Variasi & Kombinasi</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Merangkaikan beberapa pola gerak menjadi rangkaian utuh terkoordinasi dalam aktivitas olahraga.
          </p>
          <div className="mt-3 text-[11px] font-semibold text-purple-700 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>Tantangan Juara PJOK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
