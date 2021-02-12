import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.clientWidth || 0,
    height: document.documentElement.clientHeight || 0,
  });
  useLayoutEffect(() => {
    const setFromEvent = e =>
      setDimensions({
        width: !!e.target ? e.target.innerWidth : undefined,
        height: !!e.target ? e.target.innerHeight : undefined,
        y: e.clientY,
      });
    window.addEventListener('resize', setFromEvent);
    return () => {
      window.removeEventListener('resize', setFromEvent);
    };
  }, []);
  return {
    ...dimensions,
  };
};
