// src/components/CustomCursor.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5, // Adjust duration for smoother movement
        ease: "back.out"
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        height: '8px',
        width: '8px',
        backgroundColor: 'black',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none', // Prevents cursor from blocking other elements
        zIndex: 9999 // Ensures cursor is on top of other elements
      }}
    />
  );
};

export default CustomCursor;
