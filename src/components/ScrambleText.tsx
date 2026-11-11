import React, { useEffect, useState, useRef } from 'react';

const GLYPHS = '01#$*+<>[]{}~%&?@!█▓▒░✦';

interface ScrambleTextProps {
  text: string;
  trigger?: boolean | number;
  className?: string;
  speed?: number;
}

export default function ScrambleText({
  text,
  trigger = true,
  className = '',
  speed = 28,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return <span className={className}>{displayText}</span>;
}
