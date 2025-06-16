// Implement a useCycle hook that cycles through a sequence of values each time its function is called.
//
// export default function Component() {
//   const [mode, cycle] = useCycle('low', 'medium', 'high');
//   return (
//     <div>
//       <p>State: {mode}</p>
//       <button onClick={cycle}>Cycle</button>
//     </div>
//   );
// }
//
// Arguments
// The useCycle hook should accept an indefinite number of arguments, each representing a value in the sequence to cycle through.
//
// Returns
// A tuple containing the following elements:
//
// 1. value: The current value
// 2. cycle: A function that changes the current value to the next one in the sequence, or the first one if the current value is the last in the sequence

import { useState } from 'react';

export default function Component() {
  const [mode, cycle] = useCycle<string | boolean>('low', false, 'high');

  return (
    <div>
      <p>State: {mode}</p>
      <button onClick={cycle}>Cycle</button>
    </div>
  );
}

function useCycle<T>(...args: T[]): [T, () => void] {
  if (!args.length) {
    throw new Error('Missing arguments');
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const cycle = () => {
    setCurrentIndex((p) => (p + 1) % args.length);
  };

  const safeIndex = currentIndex >= args.length ? 0 : currentIndex;
  return [args[safeIndex], cycle];
}
