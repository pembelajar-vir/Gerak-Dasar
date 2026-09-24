'use client';

import React, { useState, useEffect } from 'react';
import { soundEffects } from '@/lib/audio';
import { Volume2, VolumeX, Maximize, Minimize, Download, Activity, BookOpen, Target, User, HelpCircle } from 'lucide-react';
import { generateStandaloneHTML } from '@/lib/standalone-exporter';

interface NavbarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenCP: () => void;
}

export default function Navbar({ currentView, onSelectView, onOpenCP }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEffects.setMuted(nextMuted);
    if (!nextMuted) {
      soundEffects.playClick();
    }
  };

  const handleToggleFullscreen = () => {
    soundEffects.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onSelectView('home');
          }}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              GerakCerdas PID
            </span>
            <span className="hidden sm:block text-[11px] font-semibold text-slate-500 -mt-1">
              PJOK SD · Gerak Dasar
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('home');
            }}
            className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              currentView === 'home'
                ? 'text-sky-700 bg-sky-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Beranda
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCP();
            }}
            className="px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Target className="w-4 h-4 text-emerald-600" />
            Tujuan CP/TP
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('material');
            }}
            className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentView === 'material'
                ? 'text-sky-700 bg-sky-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            Materi Gerak
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('game');
            }}
            className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentView === 'game'
                ? 'text-sky-700 bg-sky-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4 text-sky-600" />
            Aktivitas Kamera PID
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('quiz');
            }}
            className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentView === 'quiz'
                ? 'text-sky-700 bg-sky-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            Kuis Cerdas
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('profile');
            }}
            className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentView === 'profile'
                ? 'text-sky-700 bg-sky-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 text-slate-500" />
            Profil Guru
          </button>
        </nav>

        {/* Zone 3: Primary Action & PID Utilities */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
            title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          {/* Fullscreen toggle for Interactive Board */}
          <button
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh PID'}
            title="Layar Penuh PID"
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>

          {/* Download Standalone HTML Single File */}
          <button
            onClick={handleDownloadStandalone}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-sky-700 bg-sky-100/80 hover:bg-sky-200/80 rounded-xl transition-colors whitespace-nowrap shadow-sm"
            title="Unduh Berkas Single-File HTML Mandiri untuk PID Offline"
          >
            <Download className="w-4 h-4" />
            <span>Unduh HTML Mandiri</span>
          </button>

          {/* Mobile direct play CTA */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectView('game');
            }}
            className="lg:hidden px-3.5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Mulai PID
          </button>
        </div>
      </div>
    </header>
  );
}
