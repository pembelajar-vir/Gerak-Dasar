'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroHome from '@/components/HeroHome';
import ModalObjectives from '@/components/ModalObjectives';
import LearningMaterial from '@/components/LearningMaterial';
import CameraMotionGame from '@/components/CameraMotionGame';
import QuizSection from '@/components/QuizSection';
import ScoreReport from '@/components/ScoreReport';
import TeacherProfile from '@/components/TeacherProfile';

export default function Page() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [gameMode, setGameMode] = useState<'camera' | 'touch'>('camera');
  const [isCPOpen, setIsCPOpen] = useState<boolean>(false);

  // Score states
  const [finalScore, setFinalScore] = useState<number>(0);
  const [finalStars, setFinalStars] = useState<number>(3);
  const [totalMissions, setTotalMissions] = useState<number>(4);

  const handleStartGame = (mode: 'camera' | 'touch') => {
    setGameMode(mode);
    setCurrentView('game');
  };

  const handleFinishGame = (score: number, stars: number, missions: number) => {
    setFinalScore(score);
    setFinalStars(stars);
    setTotalMissions(missions);
    setCurrentView('score');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Top Bar Contract adhering Navigation */}
      <Navbar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onOpenCP={() => setIsCPOpen(true)}
      />

      {/* Main Responsive View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {currentView === 'home' && (
          <HeroHome
            onStartGame={handleStartGame}
            onOpenMaterial={() => setCurrentView('material')}
            onOpenObjectives={() => setIsCPOpen(true)}
          />
        )}

        {currentView === 'material' && (
          <LearningMaterial
            onStartActivity={() => handleStartGame('camera')}
          />
        )}

        {currentView === 'game' && (
          <CameraMotionGame
            initialMode={gameMode}
            onFinishGame={handleFinishGame}
            onOpenMaterial={() => setCurrentView('material')}
          />
        )}

        {currentView === 'quiz' && (
          <QuizSection
            onStartActivity={() => handleStartGame('camera')}
          />
        )}

        {currentView === 'score' && (
          <ScoreReport
            score={finalScore}
            stars={finalStars}
            totalMissions={totalMissions}
            onPlayAgain={() => handleStartGame(gameMode)}
            onReviewMaterial={() => setCurrentView('material')}
          />
        )}

        {currentView === 'profile' && (
          <TeacherProfile
            onStartActivity={() => handleStartGame('camera')}
            onOpenMaterial={() => setCurrentView('material')}
          />
        )}
      </main>

      {/* Modal Capaian & Tujuan Pembelajaran (CP & TP) */}
      <ModalObjectives
        isOpen={isCPOpen}
        onClose={() => setIsCPOpen(false)}
        onStartActivity={() => {
          setIsCPOpen(false);
          handleStartGame('camera');
        }}
      />

      {/* Quiet Footer with attribution */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">GerakCerdas PID</span> · Pembelajaran PJOK Variasi & Kombinasi Gerak Dasar SD
          </div>
          <div>
            Pengembang: <span className="font-medium text-slate-800">Robiyanto, S.Pd.</span> (SD Negeri 2 Kebondalem, Banjarnegara)
          </div>
        </div>
      </footer>
    </div>
  );
}
