"use client"
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

const MouseTracker = ({ offset = { x: -15, y: -15 } }: any) => {
    const element = useRef<HTMLDivElement>(null);
    const timeoutIdRef = useRef<any | null>(null);

    const delayedHandler = useMemo(() => {

        return function handler(ev: any) {
            if (element.current) {
                const e = ev.touches ? ev.touches[0] : ev;
                const x = e.clientX + offset.x,
                    y = e.clientY + offset.y;

                // Check if the mouse is over an element with MuiPaper-root class
                const isOverTarget =
                    e.target instanceof Element &&
                    (e.target.tagName === "IMG" ||
                        e.target.tagName === "A" ||
                        e.target.tagName === "BUTTON" ||
                        e.target.classList.contains("MuiPaper-root"));

                // Adjust the size based on whether the mouse is over the target
                const size = isOverTarget ? 40 : 20;

                element.current.style.transform = `translate(${x}px, ${y}px)`;
                element.current.style.width = `${size}px`;
                element.current.style.height = `${size}px`;
                element.current.style.visibility = "visible";
            }
        };
    }, [offset.x, offset.y]);

    useEffect(() => {
        function handleWithDelay(ev: any) {
            // Introduce un retraso de 100 milisegundos
            timeoutIdRef.current = setTimeout(() => {
                delayedHandler(ev);
            }, 100);
        }

        function clearDelay() {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        }

        // Check if document is available before attaching event listeners
        if (typeof window !== "undefined") {
            document.addEventListener("mousemove", handleWithDelay);
            document.addEventListener("touchmove", handleWithDelay);

            return () => {
                document.removeEventListener("mousemove", handleWithDelay);
                document.removeEventListener("touchmove", handleWithDelay);
                clearDelay();
            };
        }
    }, [delayedHandler]);

    return createPortal(
        <div className='mouse-tracker border-2 border-gray-950 dark:border-white contrast-50' ref={element}>
        </div>,
        document.body
    );
};

export default MouseTracker;
