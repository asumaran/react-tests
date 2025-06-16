// Implement a useClickAnywhere hook that handles click events anywhere on the document.
//
// export default function Component() {
//   const [count, setCount] = useState(0);
//   useClickAnyWhere(() => {
//     setCount((prev) => prev + 1);
//   });
//   return <p>Click count: {count}</p>;
// }
//
// Arguments
// handler: () => void: The function to be called when a click event is detected anywhere on the document
//
// Returns
// Nothing.

import { useEffect, useRef, useState } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);

  useClickAnyWhere(() => {
    setCount((prev) => prev + 1);
  });

  return <p>Click count: {count}</p>;
}

function useClickAnyWhere(handler: () => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    // Make sure to update the reference everytime.
    handlerRef.current = handler;
  });

  useEffect(() => {
    // Create event listener that calls handler function stored in ref
    const handleClick = () => {
      handlerRef.current();
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);
}
