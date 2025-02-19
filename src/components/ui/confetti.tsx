'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface ConfettiProps {
  className?: string;
  duration?: number;
  particleCount?: number;
  colors?: string[];
  onComplete?: () => void;
}

export const Confetti = ({
  className,
  duration = 2000,
  particleCount = 50,
  colors = ['#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'],
  onComplete
}: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8 - 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 4 + 2,
    life: 1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Create initial particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width / 2, canvas.height / 2)
    );

    startTimeRef.current = Date.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - (startTimeRef.current || 0);
      if (elapsed >= duration) {
        if (onComplete) onComplete();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.life -= 0.01;

        if (particle.life <= 0) {
          particlesRef.current[i] = createParticle(canvas.width / 2, canvas.height / 2);
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [colors, duration, particleCount, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none fixed inset-0 z-50',
        className
      )}
    />
  );
}; 