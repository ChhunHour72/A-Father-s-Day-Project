import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Custom hook for animating a number count-up effect when it comes into view.
 * @param {number} end - The final number to count up to.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @returns {[React.Ref, number]} - A ref to attach to the element and the current animated number.
 */
export const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,   // Trigger when 10% of the element is visible
  });
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    if (inView) {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        // Using an ease-out function for a smoother animation
        const progress = 1 - Math.pow(1 - (frame / totalFrames), 3);
        setCount(Math.floor(end * progress));

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end); // Ensure it ends on the exact number
        }
      }, frameRate);

      return () => clearInterval(counter);
    }
  }, [inView, end, duration, totalFrames, frameRate]);

  return [ref, count];
};
