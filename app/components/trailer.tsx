'use client'
import React, {useEffect, useRef, useState} from "react";

interface MousePosition {
    x: number;
    y: number;
}

export const Trailer = () =>{
    const trailer = useRef<HTMLDivElement | null>(null);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0});


    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
            const target = event.target as HTMLElement
            if (target && target.tagName.toLowerCase() === 'a') {
                if ("style" in trailer.current) {
                    trailer.current.style.width = 30;
                    trailer.current.style.height = 30;
                }
            } else{
                if ("style" in trailer.current) {
                    trailer.current.style.width = 20;
                    trailer.current.style.height = 20;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const keyframes = {
            transform: `translate(${mousePosition['x']}px, ${mousePosition['y']}px)`
        }

        if ("animate" in trailer.current) {
            trailer.current.animate(keyframes, {
                duration: 800,
                fill: "forwards"
            });
        }


        // Cleanup on unmounting
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition]); // run once on mount


    return <div ref={trailer} style={{
        backgroundColor: "#333",
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 10000000,
        pointerEvents: "none",
        opacity: 1,
        transition: "opacity 500ms ease",
    }} id={"trailer"}>
        <div style={{
            position: "absolute",
            top: "50%",
            left: "-2vh",       /* extend left */
            width: "4vh",    /* extend across */
            height: "1px",
            backgroundColor: "#afafaf",
            transform: "translateY(-50%)",
            zIndex: 100
        }}></div>
        <div  style={{
            position: "absolute",
            top: "0",
            left: "0",       /* extend left */
            width: "1px",    /* extend across */
            height: "4vh",
            backgroundColor: "#afafaf",
            transform: "translateY(-50%)",
            zIndex: 100
        }}></div>

        <div style={{
            position: "absolute",
            top: "50%",
            left: "-250vw",       /* extend left */
            width: "500vw",    /* extend across */
            height: "1px",
            backgroundColor: "#333",
            transform: "translateY(-50%)"
        }}></div>
        <div style={{
            position: "absolute",
            top: "-150vh",
            left: "0",       /* extend left */
            width: "1px",    /* extend across */
            height: "500vh",
            backgroundColor: "#333",
            transform: "translateX(-50%)"
        }}></div>
    </div>
}