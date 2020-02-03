import { useReducer } from 'react';

function cursorReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const useCursorPosition = () => {
  const [cursorState, dispatchCursor] = useReducer(cursorReducer, {
    x: 0,
    y: 0,
  });

  document.onmousemove = event => {
    let eventDoc, doc, body;
    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y
    // are, calculate pageX/Y - logic taken from jQuery
    // Calculate pageX/Y if missing and clientX/Y available
    if (event.pageX === null && event.clientX !== null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }

    dispatchCursor({
      type: 'set',
      payload: {
        event,
        target: event.target,
        x: event.pageX,
        y: event.pageY,
      },
    });
  };

  return cursorState;
};
