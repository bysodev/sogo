"use client"
import { useEffect, useState } from 'react';

// Define your breakpoints here
const breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

function useScreenSize(breakpoint: string) {
    const [isScreenSize, setIsScreenSize] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSize(window.innerWidth >= breakpoints[breakpoint]);
        };

        // Set initial value
        handleResize();

        // Update value when the window is resized
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isScreenSize;
}

export default useScreenSize;