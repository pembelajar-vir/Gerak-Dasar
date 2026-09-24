'use client';

import React, { useState } from 'react';
import { soundEffects } from '@/lib/audio';
import { MATERIAL_TOPICS, MaterialTopic } from '@/lib/data';
import {
  ArrowRight,
  Shield,
  Lightbulb,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface LearningMaterialProps {
  onStartActivity: () => void;
}

export default function LearningMaterial({ onStartActivity }: LearningMaterialProps) {
  const [activeTab, setActiveTab] = useState<string>(MATERIAL_TOPICS[0].id);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<{ [key: string]: number | null }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});

  const currentTopic = MATERIAL_TOPICS.find((t) => t.id === activeTab) || MATERIAL_TOPICS[0];

  const handleSelectQuiz = (topicId: string, optionIdx: number, correctIdx: number) => {
    setSelectedQuizAnswer((prev) => ({ ...prev, [topicId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [topicId]: true }));

    if (optionIdx === correctIdx) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  const handleResetQuiz = (topicId: string) => {
    soundEffects.playClick();
    setSelectedQuizAnswer((prev) => ({ ...prev, [topicId]: null }));
    setShowExplanation((prev) => ({ ...prev, [topicId]: false }));
  };

  return (
    <section className="py-6 space-y-6">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Modul Teori Gerak Cerdas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Ringkasan Materi Variasi & Kombinasi Gerak Dasar
        </h2>
        <p className="text-sm text-slate-600">
          Pahami konsep dasar gerak sebelum menguji ketangkasanmu di depan kamera sensor Papan Interaktif Digital!
        </p>
      </div>

      {/* Segmented Control / Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl max-w-2xl mx-auto flex-wrap sm:flex-nowrap border border-slate-200/80">
        {MATERIAL_TOPICS.map((topic) => {
          const isActive = topic.id === activeTab;
          return (
            <button
              key={topic.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveTab(topic.id);
              }}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center whitespace-nowrap ${
                isActive
                  ? 'bg-white text-sky-700 shadow-sm shadow-slate-300/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>

      {/* Main Material Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        {/* Header of Active Topic */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              {currentTopic.subtitle}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {currentTopic.title}
            </h3>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onStartActivity();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all self-stretch sm:self-auto justify-center"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Praktikkan di PID</span>
          </button>
        </div>

        {/* Definition and Graphic Visual */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {currentTopic.definition}
            </p>

            {/* Key Examples List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Contoh Pola Gerak dalam Aktivitas:
              </h4>
              <ul className="space-y-1.5">
                {currentTopic.keyExamples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Movement Illustration SVG Box */}
          <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
            {currentTopic.category === 'lokomotor' && (
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <circle cx="80" cy="80" r="70" fill="#E0F2FE" />
                {/* Arrow of displacement */}
                <path d="M30 135 H130" stroke="#0284C7" strokeWidth="4" strokeDasharray="6 4" />
                <polygon points="135,135 125,128 125,142" fill="#0284C7" />
                {/* Running figure */}
                <circle cx="95" cy="40" r="14" fill="#0284C7" />
                <path d="M90 54 L75 85 L95 110" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M75 85 L50 95 L35 80" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M95 110 L125 130" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M80 65 L115 58 L128 75" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}

            {currentTopic.category === 'non-lokomotor' && (
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <circle cx="80" cy="80" r="70" fill="#DCFCE7" />
                {/* Fixed base marker */}
                <ellipse cx="80" cy="135" rx="35" ry="8" fill="#86EFAC" />
                {/* Bending torso */}
                <circle cx="80" cy="42" r="14" fill="#059669" />
                <path d="M80 56 Q115 85 80 115" stroke="#059669" strokeWidth="8" strokeLinecap="round" fill="none" />
                {/* Outstretched swinging arms */}
                <path d="M40 70 Q80 50 120 70" stroke="#10B981" strokeWidth="7" strokeLinecap="round" fill="none" />
                {/* Legs planted firmly */}
                <path d="M72 115 L60 135" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
                <path d="M88 115 L100 135" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
              </svg>
            )}

            {currentTopic.category === 'manipulatif' && (
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <circle cx="80" cy="80" r="70" fill="#FEF3C7" />
                {/* Player catching ball */}
                <circle cx="55" cy="50" r="14" fill="#D97706" />
                <path d="M55 64 L55 105" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
                <path d="M55 75 L85 68 L105 70" stroke="#D97706" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M55 105 L45 135" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
                <path d="M55 105 L70 135" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
                {/* Flying Ball */}
                <circle cx="118" cy="70" r="14" fill="#EF4444" />
                <path d="M110 65 Q118 70 126 75" stroke="#FFFFFF" strokeWidth="3" fill="none" />
              </svg>
            )}

            {currentTopic.category === 'kombinasi' && (
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <circle cx="80" cy="80" r="70" fill="#F3E8FF" />
                {/* Running + Jump + Catch combo cycle */}
                <path d="M40 120 Q80 30 120 120" stroke="#9333EA" strokeWidth="4" strokeDasharray="5 5" fill="none" />
                <polygon points="123,122 110,118 120,108" fill="#9333EA" />
                <circle cx="80" cy="50" r="13" fill="#7E22CE" />
                <path d="M80 63 L80 90 L100 108" stroke="#7E22CE" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M80 72 L105 55" stroke="#A855F7" strokeWidth="6" strokeLinecap="round" />
                <circle cx="115" cy="48" r="8" fill="#F59E0B" />
              </svg>
            )}

            <div className="mt-2 text-[11px] font-bold text-slate-700">
              Pola Visual Biomekanika
            </div>
          </div>
        </div>

        {/* Biomechanics and Safety Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Tips Keselamatan & Sikap Tubuh</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              {currentTopic.tipsAman}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-sky-600" />
              <span>Prinsip Biomekanika</span>
            </div>
            <p className="text-xs text-sky-900 leading-relaxed font-medium">
              {currentTopic.biomekanika}
            </p>
          </div>
        </div>

        {/* Quick Micro Quiz on this card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Uji Pemahaman Cepat</span>
            </h4>
            {showExplanation[currentTopic.id] && (
              <button
                onClick={() => handleResetQuiz(currentTopic.id)}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Coba Lagi</span>
              </button>
            )}
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {currentTopic.quizQuick.question}
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {currentTopic.quizQuick.options.map((opt, idx) => {
              const isSelected = selectedQuizAnswer[currentTopic.id] === idx;
              const isCorrect = idx === currentTopic.quizQuick.correctIndex;
              const hasAnswered = selectedQuizAnswer[currentTopic.id] !== undefined && selectedQuizAnswer[currentTopic.id] !== null;

              let btnStyle = 'bg-white border-slate-200 hover:border-sky-300 text-slate-700';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-50 border-red-300 text-red-900';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectQuiz(currentTopic.id, idx, currentTopic.quizQuick.correctIndex)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                </button>
              );
            })}
          </div>

          {showExplanation[currentTopic.id] && (
            <div className="pt-2 text-xs leading-relaxed text-slate-700 border-t border-slate-200">
              <span className="font-bold">Penjelasan: </span>
              {currentTopic.quizQuick.explanation}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
