'use client'
import React, { useState, useEffect } from 'react';
import {Major_Mono_Display, Geist_Mono} from "next/font/google";

const majorMonoDisplay = Major_Mono_Display({weight: '400', subsets: ['latin']});
const geistMono = Geist_Mono();

function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timerId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // Format the time for display
    const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={geistMono.className}>
            <h1 style={{
                color: "#fff",
                display: "flex",
                zIndex: -1,
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                marginTop: "-15vh",
                fontSize: 64,
                justifyContent: "center",
                fontWeight: 200
            }}>{formattedTime}</h1>
        </div>
    );
}

export default DigitalClock;