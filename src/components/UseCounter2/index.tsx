// Implement an optimized version of the useCounter hook. The returned methods should be memoized, the same function instance is returned across re-renders.
//
// export default function Component() {
//   const { count, increment, decrement, reset, setCount } = useCounter();
//   return (
//     <div>
//       <p>Counter: {count}</p>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }
//
// Arguments
// initialValue: number: Initial value of the counter state. If not provided, it should default to 0.
//
// Returns
// The useCounter hook returns an object with the following properties:
//
// count: number: The current counter value
// increment: () => void: A function to increment the counter value
// decrement: () => void: A function to decrement the counter value
// reset: () => void: A function to reset the counter value to initialValue, or 0 if not provided
// setCount: (value: number) => void: A function to set the counter value to value, it has the same signature as setState
//
// increment, decrement, reset, and setCount must be the same function instance across re-renders.

import {
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function UseCounter2() {
  const { count, increment, decrement, reset, setCount } = useCounter();
  console.log('setCount', setCount); // only to silence ESLint
  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function useCounter(initialValue: number = 0): UseCounterReturn {
  const safeInitial = Number.isFinite(initialValue) ? initialValue : 0;
  const [count, setCount] = useState(safeInitial);

  const increment = useCallback(() => {
    setCount((p) => p + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((p) => p - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(safeInitial);
  }, [safeInitial]);

  return { count, increment, decrement, reset, setCount };
}
