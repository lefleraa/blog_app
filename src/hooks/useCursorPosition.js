import { useLayoutEffect, useState } from 'react';

export const useCursorPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseover, setMouseover] = useState(true);

  const mouseMoveHandler = e => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  const mouseLeaveHandler = e => {
    setPosition({ x: undefined, y: undefined });
    setMouseover(false);
  };
  const mouseEnterHandler = e => {
    setMouseover(true);
  };

  const mountEvents = () => {
    document.addEventListener('mouseenter', mouseEnterHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);
    return () => {
      document.addEventListener('mouseenter', mouseEnterHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseleave', mouseLeaveHandler);
    };
  };

  useLayoutEffect(mountEvents, []);

  return {
    ...position,
    mouseover,
  };
};
