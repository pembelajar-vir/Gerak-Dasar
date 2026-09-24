'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { soundEffects } from '@/lib/audio';
import { triggerCanvasConfetti } from '@/lib/confetti';
import { DEVELOPER_INFO } from '@/lib/data';
import { generateStandaloneHTML } from '@/lib/standalone-exporter';
import {
  Trophy,
  Star,
  Award,
  RotateCcw,
  BookOpen,
  Download,
  Mail,
  Building2,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

interface ScoreReportProps {
  score: number;
  stars: number;
  totalMissions: number;
  onPlayAgain: () => void;
  onReviewMaterial: () => void;
}

export default function ScoreReport({
  score,
  stars,
  totalMissions,
  onPlayAgain,
  onReviewMaterial,
}: ScoreReportProps) {
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    soundEffects.playFanfare();
    if (confettiCanvasRef.current) {
      triggerCanvasConfetti(confettiCanvasRef.current, 3500);
    }
  }, []);

  const badgeTitle =
    score >= 350
      ? 'Master Kombinasi Gerak PJOK'
      : score >= 200
      ? 'Jagoan Tangkas Lokomotor'
      : 'Penjelajah Gerak Cerdas';

  const badgeDesc =
    score >= 350
      ? 'Memiliki ketangkasan istimewa dalam mengombinasikan gerak lokomotor, non-lokomotor, dan manipulatif!'
      : 'Berhasil melakukan gerak dasar dengan koordinasi tubuh yang baik dan antusiasme tinggi!';

  const handleDownloadStandalone = () => {
    soundEffects.playClick();
    const htmlContent = generateStandaloneHTML();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GerakCerdas_PID_PJOK_SD_Robiyanto.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-6 sm:py-10 max-w-3xl mx-auto space-y-8 relative">
      {/* Fullscreen canvas confetti for celebration */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      {/* Main Score Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-10 text-center space-y-6">
        {/* Trophy Visual */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Trophy className="w-12 h-12" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400 animate-spin" />
          </div>
        </div>

        {/* Headline */}
        <div>
          <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
            Tantangan Gerak Selesai
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Selamat, Sang Juara!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
            Kamu telah menyelesaikan 4 tantangan variasi & kombinasi gerak dasar PJOK pada Papan Interaktif Digital!
          </p>
        </div>

        {/* Stars Indicator */}
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-9 h-9 ${
                starIdx <= stars
                  ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow'
                  : 'text-slate-200'
              } transition-transform`}
            />
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Skor Total</div>
            <div className="text-2xl sm:text-3xl font-black text-sky-700 mt-0.5 tabular-nums">
              {score}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Misi Tuntas</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5 tabular-nums">
              4 / {totalMissions}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Peringkat</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-0.5">
              {stars === 3 ? 'A+' : stars === 2 ? 'A' : 'B+'}
            </div>
          </div>
        </div>

        {/* Achievement Badge Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-100 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-white text-sky-600 flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-sky-800 uppercase tracking-wide">
              Lencana Prestasi Siswa
            </div>
            <h4 className="text-lg font-black text-slate-900 mt-0.5">
              {badgeTitle}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {badgeDesc}
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onPlayAgain();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi (Ulangi Petualangan)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onReviewMaterial();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ulas Materi Konsep</span>
          </button>

          <button
            onClick={handleDownloadStandalone}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 transition-colors"
            title="Unduh Berkas Single File HTML untuk Papan Interaktif Digital Offline"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas HTML Mandiri (Offline PID)</span>
          </button>
        </div>
      </div>

      {/* Developer Profile Card (Mandatory Requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
          <BadgeCheck className="w-4 h-4" />
          <span>Informasi Pengembang & Unit Kerja</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Developer Photo with specified link and img */}
          <a
            href={DEVELOPER_INFO.photoPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 group block"
            title="Lihat foto profil pengembang"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-600 shadow-md group-hover:scale-105 transition-transform bg-slate-100">
              <Image
                src={DEVELOPER_INFO.avatarUrl}
                alt={DEVELOPER_INFO.name}
                fill
                sizes="96px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Profile Details */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {DEVELOPER_INFO.name}
              </h3>
              <p className="text-xs font-semibold text-sky-700">
                {DEVELOPER_INFO.title}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
              <div>
                <span className="font-bold text-slate-800">NIP: </span>
                <span className="font-mono">{DEVELOPER_INFO.nip}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{DEVELOPER_INFO.unitKerja}</span>
              </div>

              <div className="sm:col-span-2 flex items-center justify-center sm:justify-start gap-1 text-sky-700 font-medium">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  className="hover:underline"
                >
                  {DEVELOPER_INFO.email}
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              Dikembangkan sebagai inovasi media pembelajaran berbasis teknologi Papan Interaktif Digital (PID)
              untuk meningkatkan keaktifan gerak jasmani, literasi fisik, dan kegembiraan belajar peserta didik Sekolah Dasar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
