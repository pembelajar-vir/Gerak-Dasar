'use client';

import React from 'react';
import Image from 'next/image';
import { DEVELOPER_INFO } from '@/lib/data';
import { generateStandaloneHTML } from '@/lib/standalone-exporter';
import { soundEffects } from '@/lib/audio';
import {
  BadgeCheck,
  Building2,
  Mail,
  Download,
  BookOpen,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface TeacherProfileProps {
  onStartActivity: () => void;
  onOpenMaterial: () => void;
}

export default function TeacherProfile({
  onStartActivity,
  onOpenMaterial,
}: TeacherProfileProps) {
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
    <section className="py-6 sm:py-10 max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
          <BadgeCheck className="w-4 h-4" />
          <span>Profil Pengembang Media Pembelajaran</span>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <a
            href={DEVELOPER_INFO.photoPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block shrink-0"
            title="Buka foto profil pengembang"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-sky-600 shadow-xl group-hover:scale-105 transition-transform bg-slate-100">
              <Image
                src={DEVELOPER_INFO.avatarUrl}
                alt={DEVELOPER_INFO.name}
                fill
                sizes="128px"
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-sky-600 mt-2">
              <span>Buka Foto</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {DEVELOPER_INFO.name}
              </h2>
              <p className="text-sm font-bold text-sky-700 mt-0.5">
                {DEVELOPER_INFO.title}
              </p>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              <div>
                <span className="font-bold text-slate-900">NIP: </span>
                <span className="font-mono text-slate-800">{DEVELOPER_INFO.nip}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{DEVELOPER_INFO.unitKerja}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sky-700 font-medium">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  className="hover:underline font-semibold"
                >
                  {DEVELOPER_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="pt-6 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dedikasi Pembelajaran PJOK Era Digital</span>
          </h3>
          <p>
            Aplikasi ini lahir dari kebutuhan nyata di ruang kelas Sekolah Dasar untuk memanfaatkan sarana
            <strong> Papan Interaktif Digital (PID)</strong> secara optimal. Melalui pendekatan gamifikasi motorik
            dan sensor kamera interaktif, materi <em>Variasi dan Kombinasi Gerak Dasar</em> ditransformasikan menjadi
            pengalaman belajar jasmani yang memicu antusiasme, keceriaan, dan pencapaian kompetensi motorik anak secara terukur.
          </p>
          <p>
            Dirancang sepenuhnya dengan standar Kurikulum Merdeka (Fase B & C) guna mendukung profil Pelajar Pancasila:
            beriman & berakhlak mulia (menjaga raga sehat), mandiri, gotong royong, dan bernalar kritis.
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onStartActivity();
            }}
            className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            Mulai Aktivitas PID
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenMaterial();
            }}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>Buka Ringkasan Teori</span>
          </button>

          <button
            onClick={handleDownloadStandalone}
            className="px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas HTML Mandiri</span>
          </button>
        </div>
      </div>
    </section>
  );
}
