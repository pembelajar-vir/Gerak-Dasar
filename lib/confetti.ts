// Pure HTML5 Canvas Confetti without external dependencies

export interface ConfettiParticle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  opacity: number;
}

export function triggerCanvasConfetti(canvas: HTMLCanvasElement, durationMs: number = 3000) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * (window.devicePixelRatio || 1);
  canvas.height = rect.height * (window.devicePixelRatio || 1);
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
  const particles: ConfettiParticle[] = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: rect.width / 2 + (Math.random() - 0.5) * 150,
      y: rect.height / 3 + (Math.random() - 0.5) * 80,
      w: Math.random() * 9 + 6,
      h: Math.random() * 5 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  let startTime: number | null = null;
  let animId: number;

  const render = (time: number) => {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = elapsed / durationMs;

    ctx.clearRect(0, 0, rect.width, rect.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - progress);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < durationMs) {
      animId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, rect.width, rect.height);
      cancelAnimationFrame(animId);
    }
  };

  animId = requestAnimationFrame(render);
}
