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
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [initialFrameReady, setInitialFrameReady] = useState<boolean>(false);

  // Render a specific frame index onto the high-DPI scaled canvas
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Search for the requested frame, or fallback to the closest loaded frame
    let imgToDraw: HTMLImageElement | null = imagesRef.current[frameIdx] || null;
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      // Find nearest loaded frame
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const targetWidth = Math.floor(clientWidth * dpr);
    const targetHeight = Math.floor(clientHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    // Clear background with theme pagani-black
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scale to high-DPI coordinates
    ctx.scale(dpr, dpr);

    // Object-fit: contain logic with responsive vertical offset for luxury aesthetic
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const hRatio = clientWidth / imgWidth;
    const vRatio = clientHeight / imgHeight;
    // Scale slightly larger so the supercar dominates the screen with impact
    const baseRatio = Math.min(hRatio, vRatio);
    const scaleFactor = clientWidth < 768 ? 1.05 : 1.0;
    const ratio = baseRatio * scaleFactor;

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const renderX = (clientWidth - renderWidth) / 2;
    // Position car with perfect visual balance for HUD overlays
    const renderY = (clientHeight - renderHeight) / 2 + (clientWidth < 768 ? 15 : 5);

    // Enable high quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(imgToDraw, renderX, renderY, renderWidth, renderHeight);

    // Subtle atmospheric floor vignette/shadow gradient
    const gradient = ctx.createLinearGradient(0, clientHeight - 80, 0, clientHeight);
    gradient.addColorStop(0, "rgba(26, 26, 26, 0)");
    gradient.addColorStop(1, "rgba(26, 26, 26, 0.8)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, clientHeight - 80, clientWidth, 80);

    ctx.restore();
  }, [totalFrames]);

  // Pre-load all 300 images with progressive strategy
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    let isCancelled = false;
    let loaded = 0;

    // Priority 1: Load frame 1 immediately
    const firstImg = new Image();
    firstImg.src = `${imageFolderPath}/1.jpg`;
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loaded++;
      setLoadedCount(loaded);
      setInitialFrameReady(true);
      renderFrame(0);
    };

    // Priority 2: Staggered batch loading for all remaining frames
    const loadBatch = (startIndex: number, batchSize: number) => {
      if (isCancelled || startIndex >= totalFrames) return;

      const endIndex = Math.min(startIndex + batchSize, totalFrames);
      for (let i = startIndex; i < endIndex; i++) {
        if (i === 0) continue; // Already loaded or in-flight

        const img = new Image();
        // File index is 1-based (1.jpg to 300.jpg)
        img.src = `${imageFolderPath}/${i + 1}.jpg`;
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          loaded++;
          setLoadedCount((prev) => prev + 1);

          // If this is the current active frame, render it
          if (i === currentFrameRef.current) {
            renderFrame(i);
          }
        };
        img.onerror = () => {
          if (isCancelled) return;
          loaded++;
        };
      }

      // Schedule next batch
      if (endIndex < totalFrames) {
        setTimeout(() => {
          loadBatch(endIndex, batchSize);
        }, 30);
      }
    };

    // Start loading in batches of 15
    loadBatch(0, 15);

    return () => {
      isCancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [imageFolderPath, totalFrames, renderFrame]);

  // Handle window resizing with High-DPI recalculation
  useEffect(() => {
    const handleResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  // Master scroll listener bound to scrollYProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map 0 -> 1 to frame 0 -> (totalFrames - 1)
      const clamped = Math.min(1, Math.max(0, latest));
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(clamped * (totalFrames - 1)))
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(targetFrame);
        });
      }
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollYProgress, totalFrames, renderFrame]);

  const loadPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none touch-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Subtle telemetry progress line at bottom of canvas during sequence preload */}
      {loadPercent < 100 && (
        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3 pointer-events-none opacity-70">
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-200"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="font-rajdhani text-[10px] text-[#D4AF37] tracking-widest font-mono">
            BUFFERING 360° TELEMETRY: {loadPercent}%
          </span>
        </div>
      )}

      {/* Initial load fallback cover if frame 1 isn't drawn yet */}
      {!initialFrameReady && (
        <div className="absolute inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center gap-4 z-30">
          <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          <div className="font-orbitron text-xs text-[#D4AF37] tracking-[0.3em] uppercase animate-pulse">
            CALIBRATING LAMBORGHINI HURACÁN
          </div>
        </div>
      )}
    </div>
  );
}
