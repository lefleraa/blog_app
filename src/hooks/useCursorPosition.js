// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>Example</title>
//   <style>
//     body {
//       height: 3000px;
//     }
//     .dot {
//       width: 2px;
//       height: 2px;
//       background-color: black;
//       position: absolute;
//     }
//   </style>
// </head>
// <body>
// <script>
//   (function() {
//     "use strict";

// document.onmousemove = handleMouseMove;
// function handleMouseMove(event) {
//   var dot, eventDoc, doc, body, pageX, pageY;

//   event = event || window.event; // IE-ism

//   // If pageX/Y aren't available and clientX/Y
//   // are, calculate pageX/Y - logic taken from jQuery
// 	// Calculate pageX/Y if missing and clientX/Y available
//   if (event.pageX == null && event.clientX != null) {
//     eventDoc = (event.target && event.target.ownerDocument) || document;
//     doc = eventDoc.documentElement;
//     body = eventDoc.body;

//     event.pageX = event.clientX +
//       (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
//       (doc && doc.clientLeft || body && body.clientLeft || 0);
//     event.pageY = event.clientY +
//       (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
//       (doc && doc.clientTop  || body && body.clientTop  || 0 );
//   }

//   // Add a dot to follow the cursor
//   dot = document.createElement('div');
//   dot.className = "dot";
//   dot.style.left = event.pageX + "px";
//   dot.style.top = event.pageY + "px";
//   document.body.appendChild(dot);
// }
//   })();
// </script>
// </body>
// </html>

import { useState } from 'react';

export const useCursorPosition = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

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
    setCursorX(event.pageX);
    setCursorY(event.pageY);
  };

  return {
    cursorX,
    cursorY,
  };
};
