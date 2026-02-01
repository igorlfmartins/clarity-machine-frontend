import { useEffect, useRef, memo } from 'react';

interface LiveVisualizerProps {
  isSpeaking: boolean;
  volume: number;
}

export const LiveVisualizer = memo(function LiveVisualizer({ isSpeaking, volume }: LiveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const stateRef = useRef({ isSpeaking, volume });
  const particles = useRef<{ baseSize: number; angle: number; distance: number }[]>([]);

  // Update refs without re-rendering
  useEffect(() => {
    stateRef.current = { isSpeaking, volume };
  }, [isSpeaking, volume]);

  // Initialize particles once
  useEffect(() => {
    const particleCount = 100;
    const p = [];
    for (let i = 0; i < particleCount; i++) {
      p.push({
        baseSize: Math.random() * 2 + 1,
        angle: (i / particleCount) * Math.PI * 2,
        distance: 100 + Math.random() * 20,
      });
    }
    particles.current = p;
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { isSpeaking: speaking, volume: vol } = stateRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const pulse = speaking ? Math.sin(time / 200) * 10 + vol * 50 : Math.sin(time / 1000) * 5;

      particles.current.forEach((p, i) => {
        const dynamicDistance = p.distance + pulse + (speaking ? Math.sin(time / 100 + i) * 5 : 0);
        const x = centerX + Math.cos(p.angle) * dynamicDistance;
        const y = centerY + Math.sin(p.angle) * dynamicDistance;

        ctx.beginPath();
        ctx.arc(x, y, p.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = speaking ? '#00D68F' : '#D4FF33';
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-[400px] h-auto"
      />
      <div className="text-center">
        <p className="text-bio-teal font-bold tracking-widest uppercase text-xs font-mono">
          {isSpeaking ? 'IA está falando...' : 'Ouvindo você...'}
        </p>
        <p className="text-bio-white/50 text-[10px] mt-2 font-mono">
          Modo Live Ativado • Conversa por Voz
        </p>
      </div>
    </div>
  );
});
