'use client';

import React from 'react';
import { soundEffects } from '@/lib/audio';
import { CP_TP_DATA } from '@/lib/data';
import { X, Target, CheckCircle2, ShieldCheck, MonitorCheck, Play } from 'lucide-react';

interface ModalObjectivesProps {
  isOpen: boolean;
  onClose: () => void;
  onStartActivity: () => void;
}

export default function ModalObjectives({
  isOpen,
  onClose,
  onStartActivity,
}: ModalObjectivesProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Kurikulum Merdeka PJOK SD
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Capaian & Tujuan Pembelajaran (CP & TP)
              </h2>
              <div className="text-xs text-slate-500 font-medium">
                {CP_TP_DATA.fase} · {CP_TP_DATA.elemen}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capaian Pembelajaran Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Capaian Pembelajaran (CP) Elemen Gerak</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-emerald-900">
            &ldquo;{CP_TP_DATA.capaianPembelajaran}&rdquo;
          </p>
        </div>

        {/* Tujuan Pembelajaran List */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">
            Tujuan Pembelajaran (TP) & Indikator Ketercapaian
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CP_TP_DATA.tujuanPembelajaran.map((tp) => (
              <div
                key={tp.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                    {tp.code}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{tp.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tp.description}
                </p>
                <div className="pt-1.5 border-t border-slate-200/60 flex items-start gap-1.5 text-[11px] font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Indikator: {tp.indicator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panduan PID bagi Guru */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <MonitorCheck className="w-4 h-4" />
            <span>Petunjuk Teknis Guru pada Papan Interaktif Digital (PID)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900">
            {CP_TP_DATA.pidTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
              onStartActivity();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Mulai Praktik di PID</span>
          </button>
        </div>
      </div>
    </div>
  );
}
