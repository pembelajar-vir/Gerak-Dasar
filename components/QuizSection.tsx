'use client';

import React, { useState } from 'react';
import { soundEffects } from '@/lib/audio';
import { QUIZ_BANK, QuizItem } from '@/lib/data';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface QuizSectionProps {
  onStartActivity: () => void;
}

export default function QuizSection({ onStartActivity }: QuizSectionProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizItem = QUIZ_BANK[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundEffects.playCorrect();
      setScore((s) => s + 25);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIdx < QUIZ_BANK.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundEffects.playFanfare();
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="py-8 max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Trophy className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
            Evaluasi Pemahaman Selesai
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Nilai Kuis: {score} / 100
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {score >= 75
              ? 'Luar biasa! Pemahamanmu terhadap pola dan variasi gerak dasar sangat mendalam!'
              : 'Teruslah berlatih dan amati kembali perbedaan tiap gerak dasar saat bermain!'}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onStartActivity();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Kembali ke Aktivitas PID</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Kuis Cerdas PJOK SD</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Soal {currentIdx + 1} dari {QUIZ_BANK.length}
          </h2>
        </div>

        <div className="text-right">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Kategori</div>
          <div className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
            {currentQ.category}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle =
              'bg-slate-50 hover:bg-sky-50/70 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle =
                  'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-red-50 border-red-300 text-red-950 font-medium';
              } else {
                btnStyle = 'bg-slate-50/50 border-slate-200/50 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
              selectedIdx === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>
                {selectedIdx === currentQ.correctIndex
                  ? 'Jawabanmu Tepat Sekali!'
                  : 'Catatan Pedagogis:'}
              </span>
            </div>
            <p>
              {selectedIdx === currentQ.correctIndex
                ? currentQ.feedbackCorrect
                : currentQ.feedbackWrong}
            </p>
          </div>
        )}

        {/* Next Question Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all"
            >
              <span>{currentIdx < QUIZ_BANK.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
