'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ZebraCrossSequenceProps {
    /**
     * Animation mode:
     * - 'scroll': Animate based on scroll position
     * - 'autoplay': Auto-play animation in loop
     */
    mode?: 'scroll' | 'autoplay';

    /**
     * Frames per second for autoplay mode (default: 30)
     */
    fps?: number;

    /**
     * Whether to loop the animation in autoplay mode (default: true)
     */
    loop?: boolean;

    /**
     * Custom className for the container
     */
    className?: string;
}

export default function ZebraCrossSequence({
    mode = 'scroll',
    fps = 30,
    loop = true,
    className = '',
}: ZebraCrossSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount = 300;

    // Preload all images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new window.Image();
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `/assets/zebracrossseq/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };

            loadedImages[i - 1] = img;
        }
    }, []);

    // Render current frame to canvas
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[currentFrame - 1];
        if (!img || !img.complete) return;

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image
        ctx.drawImage(img, 0, 0);
    }, [currentFrame, images]);

    // Scroll-based animation
    useEffect(() => {
        if (mode !== 'scroll' || !containerRef.current) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const scrollProgress = Math.max(0, Math.min(1,
                (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
            ));

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollProgress * frameCount)
            );

            setCurrentFrame(frameIndex + 1);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [mode]);

    // Autoplay animation
    useEffect(() => {
        if (mode !== 'autoplay') return;

        const interval = setInterval(() => {
            setCurrentFrame((prev) => {
                if (prev >= frameCount) {
                    return loop ? 1 : frameCount;
                }
                return prev + 1;
            });
        }, 1000 / fps);

        return () => clearInterval(interval);
    }, [mode, fps, loop]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
        >
            <div className="w-full flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
