"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  imageFolderPath?: string;
  className?: string;
}

export default function ZondaScrollCanvas({
  scrollYProgress,
  totalFrames = 300,
  imageFolderPath = "/images/zonda-sequence",
  className = "",
}: ZondaScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  
  // High-performance smooth frame interpolation
  const targetFrameRef = useRef<number>(0);
  const currentInterpolatedFrameRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [initialReady, setInitialReady] = useState<boolean>(false);

  // High-DPI draw routine with object-fit contain logic
  const drawImageOnCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve requested image or find the closest available loaded frame
    let imgToDraw = imagesRef.current[frameIdx];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      let minDistance = Infinity;
      let closestIdx = -1;
      for (let i = 0; i < totalFrames; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIdx);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
          }
        }
      }
      if (closestIdx !== -1) {
        imgToDraw = imagesRef.current[closestIdx];
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;
    if (clientWidth === 0 || clientHeight === 0) return;

    // 4K / Retina sharpness: clamp DPR between 1.5 and 2.5 for optimal performance & clarity
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const targetW = Math.floor(clientWidth * dpr);
    const targetH = Math.floor(clientHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    // Pagani / Lamborghini luxury obsidian backdrop
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.scale(dpr, dpr);

    // Object-fit: contain calculation
    const imgW = imgToDraw.naturalWidth;
    const imgH = imgToDraw.naturalHeight;
    const hRatio = clientWidth / imgW;
    const vRatio = clientHeight / imgH;
    const ratio = Math.min(hRatio, vRatio);

    const renderW = imgW * ratio;
    const renderH = imgH * ratio;
    const renderX = (clientWidth - renderW) / 2;
    // Optical center slightly adjusted for HUD visibility
    const renderY = (clientHeight - renderH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(imgToDraw, renderX, renderY, renderW, renderH);

    // Subtle atmospheric bottom vignette
    const bottomGrad = ctx.createLinearGradient(0, clientHeight - 120, 0, clientHeight);
    bottomGrad.addColorStop(0, "rgba(26, 26, 26, 0)");
    bottomGrad.addColorStop(1, "rgba(26, 26, 26, 0.9)");
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, clientHeight - 120, clientWidth, 120);

    ctx.restore();
    lastRenderedIndexRef.current = frameIdx;
  }, [totalFrames]);

  // Pre-load all 300 sequential frames with prioritized pipeline
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    let cancelled = false;
    let count = 0;

    // Stage 1: Load First Frame immediately
    const firstImg = new Image();
    firstImg.src = `${imageFolderPath}/1.jpg`;
    firstImg.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = firstImg;
      count++;
      setLoadedCount(count);
      setInitialReady(true);
      drawImageOnCanvas(0);
    };

    // Stage 2: Staggered batch loading
    const loadBatch = (start: number, batchSize: number) => {
      if (cancelled || start >= totalFrames) return;
      const end = Math.min(start + batchSize, totalFrames);

      for (let i = start; i < end; i++) {
        if (i === 0) continue;
        const img = new Image();
        img.src = `${imageFolderPath}/${i + 1}.jpg`;
        img.onload = () => {
          if (cancelled) return;
          imagesRef.current[i] = img;
          count++;
          setLoadedCount((prev) => prev + 1);
        };
        img.onerror = () => {
          if (cancelled) return;
          count++;
        };
      }

      if (end < totalFrames) {
        setTimeout(() => loadBatch(end, batchSize), 25);
      }
    };

    loadBatch(0, 16);

    return () => {
      cancelled = true;
    };
  }, [imageFolderPath, totalFrames, drawImageOnCanvas]);

  // Continuous physics-based RAF animation loop:
  // Smoothly interpolates (LERP) current frame towards target frame
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentInterpolatedFrameRef.current;
      const diff = target - current;

      // Exponential smoothing factor for luxury inertial glide
      if (Math.abs(diff) > 0.01) {
        currentInterpolatedFrameRef.current += diff * 0.16;
        const roundedFrame = Math.round(currentInterpolatedFrameRef.current);
        const clampedFrame = Math.min(totalFrames - 1, Math.max(0, roundedFrame));

        if (clampedFrame !== lastRenderedIndexRef.current) {
          drawImageOnCanvas(clampedFrame);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, drawImageOnCanvas]);

  // Synchronize target frame from scroll progress
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const clamped = Math.min(1, Math.max(0, latest));
      targetFrameRef.current = clamped * (totalFrames - 1);
    });

    return () => unsub();
  }, [scrollYProgress, totalFrames]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const current = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentInterpolatedFrameRef.current))
      );
      drawImageOnCanvas(current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawImageOnCanvas, totalFrames]);

  const loadPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Subtle bottom buffer indicator */}
      {loadPercent < 100 && (
        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 pointer-events-none opacity-60">
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-200"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest">
            {loadPercent}%
          </span>
        </div>
      )}

      {/* Initial load fallback */}
      {!initialReady && (
        <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-10 h-10 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          <div className="font-orbitron text-xs text-[#D4AF37] tracking-[0.25em] uppercase">
            SYNCHRONIZING LAMBORGHINI HURACÁN
          </div>
        </div>
      )}
    </div>
  );
}
