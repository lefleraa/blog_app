import { useEffect, useState } from 'react';

export const useCursorPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseover, setMouseover] = useState(true);
  useEffect(() => {
    const setMoveFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    const setFromLeaveEvent = e => {
      setPosition({ x: undefined, y: undefined });
      setMouseover(false);
    };
    const setFromEnterEvent = e => setMouseover(true);
    window.addEventListener('mousemove', setMoveFromEvent);
    document.addEventListener('mouseleave', setFromLeaveEvent);
    document.addEventListener('mouseenter', setFromEnterEvent);
    return () => {
      window.removeEventListener('mousemove', setMoveFromEvent);
      document.addEventListener('mouseleave', setFromLeaveEvent);
      document.addEventListener('mouseenter', setFromEnterEvent);
    };
  }, []);
  return {
    ...position,
    mouseover,
  };
};
