'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEffects } from '@/lib/audio';
import { MOTION_MISSIONS, MissionActivity } from '@/lib/data';
import {
  Camera,
  Touchpad,
  RotateCcw,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Timer,
  ChevronRight,
  Sliders,
  Volume2,
} from 'lucide-react';

interface FallingBall {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'basket' | 'kasti' | 'bintang';
  caught: boolean;
}

interface CameraMotionGameProps {
  initialMode: 'camera' | 'touch';
  onFinishGame: (finalScore: number, stars: number, totalMissions: number) => void;
  onOpenMaterial: () => void;
}

export default function CameraMotionGame({
  initialMode,
  onFinishGame,
  onOpenMaterial,
}: CameraMotionGameProps) {
  const [mode, setMode] = useState<'camera' | 'touch'>(initialMode);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [progressCount, setProgressCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Active Zone Feedback Glow
  const [activeZoneVisual, setActiveZoneVisual] = useState<string | null>(null);

  // Instant Pedagogical Feedback
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isSuccess: boolean;
    title: string;
    message: string;
    concept: string;
  } | null>(null);

  // Falling Balls for Mission 3 (Manipulative)
  const [fallingBalls, setFallingBalls] = useState<FallingBall[]>([]);

  // Motion Sensitivity
  const [sensitivity, setSensitivity] = useState<number>(40); // 20 to 70
  const [motionLevel, setMotionLevel] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const motionLoopRef = useRef<number | null>(null);
  const prevFrameRef = useRef<ImageData | null>(null);
  const lastTriggerTimeRef = useRef<number>(0);

  const currentMission: MissionActivity = MOTION_MISSIONS[currentMissionIdx];

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (motionLoopRef.current) {
      cancelAnimationFrame(motionLoopRef.current);
      motionLoopRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Start Camera
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setMode('camera');
    } catch {
      setCameraError('Kamera tidak dapat diakses atau diblokir peramban. Mengaktifkan Mode Layar Sentuh PID.');
      setMode('touch');
      setCameraActive(false);
    }
  }, []);

  // Trigger motion point
  const handleTriggerMotion = useCallback(
    (zone: 'top' | 'bottom' | 'left' | 'right' | 'center') => {
      if (feedback?.show) return;

      setActiveZoneVisual(zone);
      setTimeout(() => setActiveZoneVisual(null), 300);

      soundEffects.playMotionTrigger();

      setProgressCount((prev) => {
        const next = prev + 1;
        const streakBonus = Math.min(streak * 5, 20);
        const addedScore = 25 + streakBonus;
        setScore((s) => s + addedScore);
        setStreak((str) => str + 1);

        if (next >= currentMission.targetCount) {
          // Mission completed
          soundEffects.playCorrect();
          setFeedback({
            show: true,
            isSuccess: true,
            title: 'Luar Biasa! Misi Selesai!',
            message: currentMission.pedagogicalFeedbackCorrect,
            concept: currentMission.conceptReinforcement,
          });
        }
        return next;
      });
    },
    [currentMission, feedback?.show, streak]
  );

  // Catch Falling Ball
  const handleCatchBall = (ballId: number) => {
    soundEffects.playCorrect();
    setFallingBalls((prev) =>
      prev.map((b) => (b.id === ballId ? { ...b, caught: true } : b))
    );
    handleTriggerMotion('center');
  };

  // Computer Vision Motion Differencing Loop
  useEffect(() => {
    if (mode !== 'camera' || !cameraActive) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 160;
    canvas.height = 120;

    let animId: number;

    const checkMotion = () => {
      if (video.readyState >= 2 && !feedback?.show && !isPaused) {
        ctx.drawImage(video, 0, 0, 160, 120);
        const currentFrame = ctx.getImageData(0, 0, 160, 120);

        if (prevFrameRef.current) {
          let diffTop = 0;
          let diffBottom = 0;
          let diffLeft = 0;
          let diffRight = 0;
          let diffCenter = 0;
          let totalDiff = 0;

          const d1 = prevFrameRef.current.data;
          const d2 = currentFrame.data;
          const step = 16; // sample every 4th pixel

          for (let i = 0; i < d1.length; i += step) {
            // fast grayscale difference
            const delta = Math.abs(d1[i] - d2[i]);
            if (delta > sensitivity) {
              totalDiff++;
              const pixelIdx = i / 4;
              const y = Math.floor(pixelIdx / 160);
              const x = pixelIdx % 160;

              if (y < 35) {
                diffTop++;
              } else if (y > 85) {
                diffBottom++;
              } else if (x < 45) {
                diffLeft++;
              } else if (x > 115) {
                diffRight++;
              } else {
                diffCenter++;
              }
            }
          }

          setMotionLevel(Math.min(100, Math.round((totalDiff / 250) * 100)));

          const now = Date.now();
          if (now - lastTriggerTimeRef.current > 900) {
            // Check triggers based on current mission requirement
            const targetM = currentMission.targetMotion;

            if (targetM === 'jump' && diffTop > 30) {
              lastTriggerTimeRef.current = now;
              handleTriggerMotion('top');
            } else if (targetM === 'left' && (diffLeft > 32 || diffRight > 32)) {
              lastTriggerTimeRef.current = now;
              handleTriggerMotion(diffLeft > diffRight ? 'left' : 'right');
            } else if (targetM === 'squat' && diffBottom > 35) {
              lastTriggerTimeRef.current = now;
              handleTriggerMotion('bottom');
            } else if (targetM === 'run' && diffCenter > 40) {
              lastTriggerTimeRef.current = now;
              handleTriggerMotion('center');
            } else if (targetM === 'catch' && (diffTop > 25 || diffCenter > 35)) {
              lastTriggerTimeRef.current = now;
              handleTriggerMotion('center');
            }
          }
        }
        prevFrameRef.current = currentFrame;
      }
      animId = requestAnimationFrame(checkMotion);
    };

    animId = requestAnimationFrame(checkMotion);
    motionLoopRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mode, cameraActive, sensitivity, currentMission, feedback?.show, isPaused, handleTriggerMotion]);

  // Falling Balls Generator for Mission 3
  useEffect(() => {
    if (currentMission.targetMotion !== 'catch') {
      return;
    }

    const interval = setInterval(() => {
      if (feedback?.show || isPaused) return;

      setFallingBalls((prev) => {
        const activeBalls = prev
          .map((b) => ({ ...b, y: b.y + b.speed }))
          .filter((b) => b.y < 95 && !b.caught);

        if (activeBalls.length < 3 && Math.random() > 0.4) {
          const ballTypes: ('basket' | 'kasti' | 'bintang')[] = ['basket', 'kasti', 'bintang'];
          activeBalls.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 70 + 15,
            y: 5,
            speed: Math.random() * 1.5 + 1.2,
            type: ballTypes[Math.floor(Math.random() * ballTypes.length)],
            caught: false,
          });
        }
        return activeBalls;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [currentMission, feedback?.show, isPaused]);

  // Countdown Timer
  useEffect(() => {
    if (feedback?.show || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          soundEffects.playWrong();
          setStreak(0);
          setFeedback({
            show: true,
            isSuccess: false,
            title: 'Waktu Habis! Ayo Coba Lagi!',
            message: currentMission.pedagogicalFeedbackIncorrect,
            concept: currentMission.conceptReinforcement,
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentMission, feedback?.show, isPaused]);

  // Load new mission
  const loadMission = (idx: number) => {
    setCurrentMissionIdx(idx);
    setProgressCount(0);
    setFallingBalls([]);
    setTimeLeft(MOTION_MISSIONS[idx].timeLimitSec);
    setFeedback(null);
  };

  const handleNextMission = () => {
    soundEffects.playClick();
    if (currentMissionIdx < MOTION_MISSIONS.length - 1) {
      loadMission(currentMissionIdx + 1);
    } else {
      // Game Completed
      const stars = score >= 350 ? 3 : score >= 200 ? 2 : 1;
      stopCamera();
      onFinishGame(score, stars, MOTION_MISSIONS.length);
    }
  };

  const handleRetryMission = () => {
    soundEffects.playClick();
    loadMission(currentMissionIdx);
  };

  // Init camera on mount asynchronously if requested
  useEffect(() => {
    let active = true;
    if (initialMode === 'camera') {
      const timer = setTimeout(() => {
        if (active) {
          startCamera();
        }
      }, 50);
      return () => {
        active = false;
        clearTimeout(timer);
        stopCamera();
      };
    }
    return () => {
      active = false;
      stopCamera();
    };
  }, [initialMode, startCamera, stopCamera]);

  const progressPercent = Math.min(
    100,
    Math.round((progressCount / currentMission.targetCount) * 100)
  );

  return (
    <div className="py-4 space-y-4">
      {/* Top Header Controls: Mission Stage, Score, Timer */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg shrink-0">
            {currentMission.stageNumber}/4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                {currentMission.type.toUpperCase()}
              </span>
              {streak > 1 && (
                <span className="text-[11px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-500" />
                  <span>Combo x{streak}</span>
                </span>
              )}
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {currentMission.title}
            </h3>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="flex items-center gap-4 sm:gap-6 justify-between w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Target</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
              {progressCount} / {currentMission.targetCount}
            </div>
          </div>

          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Skor</div>
            <div className="text-xl sm:text-2xl font-black text-sky-700 tabular-nums">
              {score}
            </div>
          </div>

          <div className="text-center">
            <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1 justify-center">
              <Timer className="w-3 h-3" />
              <span>Waktu</span>
            </div>
            <div
              className={`text-xl sm:text-2xl font-black tabular-nums ${
                timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-800'
              }`}
            >
              {timeLeft}s
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                soundEffects.playClick();
                if (cameraActive) {
                  setMode('camera');
                } else {
                  startCamera();
                }
              }}
              className={`p-2 rounded-lg transition-colors ${
                mode === 'camera'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Gunakan Kamera PID"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setMode('touch');
              }}
              className={`p-2 rounded-lg transition-colors ${
                mode === 'touch'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Gunakan Layar Sentuh PID"
            >
              <Touchpad className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Interactive Stage & Instruction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video / Motion Viewport */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative aspect-[4/3] flex items-center justify-center select-none">
          {/* Hidden Canvas for Frame Differencing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Video Feed */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 transition-opacity ${
              cameraActive && mode === 'camera' ? 'opacity-90' : 'opacity-10'
            }`}
          />

          {/* Touch Mode Graphic Backdrop if Camera is off */}
          {(!cameraActive || mode === 'touch') && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-b from-slate-900 to-sky-950">
              <Touchpad className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
              <h4 className="text-xl font-black">Mode Layar Sentuh PID Aktif</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Sentuh zona target (Atas, Kiri, Kanan, Bawah, Tengah) pada layar Papan Interaktif Digital secara langsung!
              </p>
              {!cameraActive && (
                <button
                  onClick={startCamera}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Coba Buka Kamera PID</span>
                </button>
              )}
            </div>
          )}

          {/* Interactive Motion Zones Overlay */}
          <div className="absolute inset-0 pointer-events-auto">
            {/* Zone Top: Lompat / Ayun Atas */}
            <div
              onClick={() => handleTriggerMotion('top')}
              className={`absolute top-[5%] left-[20%] w-[60%] h-[26%] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeZoneVisual === 'top' || currentMission.targetMotion === 'jump'
                  ? 'bg-sky-500/30 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.6)]'
                  : 'bg-white/10 border-white/30 hover:bg-white/20'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                ▲ ZONA ATAS (LOMPAT TINGGI)
              </span>
              <span className="text-[10px] text-sky-200 font-semibold">
                Sentuh / Loncat ke atas
              </span>
            </div>

            {/* Zone Left: Meliuk / Geser Kiri */}
            <div
              onClick={() => handleTriggerMotion('left')}
              className={`absolute top-[35%] left-[4%] w-[24%] h-[36%] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeZoneVisual === 'left' || currentMission.targetMotion === 'left'
                  ? 'bg-emerald-500/30 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                  : 'bg-white/10 border-white/30 hover:bg-white/20'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md text-center">
                ◄ ZONA KIRI
              </span>
              <span className="text-[10px] text-emerald-200 font-semibold text-center">
                Meliuk Kiri
              </span>
            </div>

            {/* Zone Right: Meliuk / Geser Kanan */}
            <div
              onClick={() => handleTriggerMotion('right')}
              className={`absolute top-[35%] right-[4%] w-[24%] h-[36%] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeZoneVisual === 'right' || currentMission.targetMotion === 'left'
                  ? 'bg-emerald-500/30 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                  : 'bg-white/10 border-white/30 hover:bg-white/20'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md text-center">
                ZONA KANAN ►
              </span>
              <span className="text-[10px] text-emerald-200 font-semibold text-center">
                Meliuk Kanan
              </span>
            </div>

            {/* Zone Center: Lari di Tempat / Tangkap Bola */}
            <div
              onClick={() => handleTriggerMotion('center')}
              className={`absolute top-[35%] left-[31%] w-[38%] h-[36%] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeZoneVisual === 'center' || currentMission.targetMotion === 'run'
                  ? 'bg-amber-500/30 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                  : 'bg-white/5 border-white/20 hover:bg-white/15'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md text-center">
                ● ZONA TENGAH
              </span>
              <span className="text-[10px] text-amber-200 font-semibold text-center">
                Lari di Tempat / Ayunan
              </span>
            </div>

            {/* Zone Bottom: Membungkuk / Squat */}
            <div
              onClick={() => handleTriggerMotion('bottom')}
              className={`absolute bottom-[5%] left-[25%] w-[50%] h-[24%] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeZoneVisual === 'bottom' || currentMission.targetMotion === 'squat'
                  ? 'bg-purple-500/30 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                  : 'bg-white/10 border-white/30 hover:bg-white/20'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                ▼ ZONA BAWAH (BUNGKUK / SQUAT)
              </span>
              <span className="text-[10px] text-purple-200 font-semibold">
                Tekuk lutut / Rendahkan tubuh
              </span>
            </div>

            {/* Falling Balls for Mission 3 (Manipulatif) */}
            {fallingBalls.map((b) => (
              <div
                key={b.id}
                onClick={() => handleCatchBall(b.id)}
                style={{
                  top: `${b.y}%`,
                  left: `${b.x}%`,
                }}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg transform active:scale-90 transition-transform ${
                  b.type === 'basket'
                    ? 'bg-gradient-to-tr from-amber-600 to-orange-400 text-white border-2 border-orange-200'
                    : b.type === 'bintang'
                    ? 'bg-gradient-to-tr from-yellow-400 to-amber-500 text-white border-2 border-yellow-100 animate-spin'
                    : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white border-2 border-emerald-200'
                }`}
              >
                {b.type === 'basket' ? '🏀' : b.type === 'bintang' ? '⭐' : '⚾'}
              </div>
            ))}
          </div>

          {/* Camera Sensitivity / Motion Gauge */}
          {mode === 'camera' && cameraActive && (
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2 text-white">
              <span className="text-[10px] font-bold text-slate-300">Sensor Gerak:</span>
              <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all"
                  style={{ width: `${motionLevel}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Instructions, Biomechanics Guide, Instant Feedback */}
        <div className="lg:col-span-4 space-y-4">
          {/* Mission Instruction Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Instruksi Guru di PID
              </span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                {isPaused ? 'Lanjutkan' : 'Jeda'}
              </button>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentMission.instruction}
            </p>

            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-sky-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Penguatan Biomekanika</span>
              </div>
              <p className="text-[11px] leading-relaxed text-sky-900 font-medium">
                {currentMission.conceptReinforcement}
              </p>
            </div>
          </div>

          {/* Instant Pedagogical Feedback Modal / Banner */}
          {feedback?.show && (
            <div
              className={`p-5 rounded-3xl border shadow-lg animate-in zoom-in-95 duration-200 ${
                feedback.isSuccess
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {feedback.isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <h4 className="font-extrabold text-sm sm:text-base">
                  {feedback.title}
                </h4>
              </div>

              <p className="text-xs sm:text-sm font-medium leading-relaxed mb-3">
                {feedback.message}
              </p>

              <div className="pt-2 border-t border-slate-200/40 flex items-center gap-2">
                {feedback.isSuccess ? (
                  <button
                    onClick={handleNextMission}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Lanjut ke Misi Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetryMission}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Ulangi Misi Ini</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sensitivity Calibration Controls */}
          {mode === 'camera' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sensitivitas Kamera PID</span>
                </span>
                <span className="tabular-nums font-mono text-sky-700">
                  {sensitivity}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="65"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Lebih Sensitif</span>
                <span>Ruang Sangat Terang</span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleRetryMission}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Misi</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenMaterial();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs transition-colors text-center"
            >
              <span>Ulas Teori</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
