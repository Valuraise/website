"use client";

import { useEffect, useRef } from "react";

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const gridSize = 80;
    const dotRadius = 1.5;
    const animationDuration = 3000;

    // Animation loop
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      // Clear canvas
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      ctx.strokeStyle = "rgba(229, 229, 229, 0.5)";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated dots at intersections
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Add some wave animation
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
            Math.pow(y - canvas.height / 2, 2)
          );
          const frequency = distance / 200;
          const scale =
            0.5 +
            0.5 *
            Math.sin((progress * Math.PI * 2 - frequency) * Math.PI);

          ctx.beginPath();
          ctx.arc(x, y, dotRadius * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Add fade gradient at top
      const gradient = ctx.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 150);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-white"
      style={{ pointerEvents: "none" }}
    />
  );
}
