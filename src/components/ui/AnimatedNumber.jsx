import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * A component that displays a number with a count-up animation when it becomes visible.
 * @param {{end: number, duration?: number, className?: string, children?: React.ReactNode}} props
 */
const AnimatedNumber = ({ end, duration, className, children }) => {
  const [ref, count] = useCountUp(end, duration);
  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {children}
    </span>
  );
};

export default AnimatedNumber;
