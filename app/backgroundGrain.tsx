'use client'

import React, { useEffect } from "react";

export const Grain = () => {
    useEffect(() => {
        const canvas = document.getElementById("grainy-canvas") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resizeCanvas() {
            canvas.width = window.innerWidth * 1.2;
            canvas.height = window.innerHeight * 1.2;
        }

        // Create a small reusable grain tile
        const grainTile = document.createElement("canvas");
        grainTile.width = 256;
        grainTile.height = 256;
        const gctx = grainTile.getContext("2d")!;
        const imageData = gctx.createImageData(grainTile.width, grainTile.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = data[i + 1] = data[i + 2] = noise;
            data[i + 3] = 255;
        }
        gctx.putImageData(imageData, 0, 0);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // jitter offsets for movement
            const offsetX = Math.random() * 256;
            const offsetY = Math.random() * 256;

            // fill the screen with repeated grainTile
            const pattern = ctx.createPattern(grainTile, "repeat");
            if (pattern) {
                ctx.save();
                ctx.translate(-offsetX, -offsetY);
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width + 256, canvas.height + 256);
                ctx.restore();
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            id="grainy-canvas"
            style={{
                position: "fixed",
                top: "-10%",
                left: "-10%",
                width: "120vw",
                height: "120vh",
                zIndex: -5,
                opacity: 0.35,
                pointerEvents: "none",
                mixBlendMode: "multiply",
            }}
        ></canvas>
    );
};
