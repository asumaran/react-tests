import { useEffect, useRef, useState } from 'react';

export default function UseTimeoutPage() {
  const [loading, setLoading] = useState(true);

  useTimeout(() => setLoading(false), 1000);

  return (
    <div>
      <p>{loading ? 'Loading' : 'Ready'}</p>
    </div>
  );
}

function useTimeout(callback: () => void, delay: number | null) {
  // save a reference to the original cb in case it changes before times out
  const originalCb = useRef(callback);

  useEffect(() => {
    // This effect updates the ref to the latest callback function
    // whenever the callback prop changes.
    originalCb.current = callback;
  }, [callback]);

  useEffect(() => {
    // When 'delay' changes, React first runs the cleanup function from the previous render,
    // which cancels any scheduled timeout.
    // If the new 'delay' is null or invalid, we simply return without setting a new timeout.
    if (delay === null || delay < 0) {
      return;
    }

    const setTimeoutId = setTimeout(() => {
      originalCb.current();
    }, delay);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [delay]);
}
