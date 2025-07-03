import { useEffect, useRef, useState } from 'react';

export default function UseWindowSizePage() {
  const screen = useWindowSize();

  return (
    <div>
      <p>The current window dimensions are:</p>
      <code>{JSON.stringify(screen, null, 2)}</code>
    </div>
  );
}

interface WindowSize {
  height: number;
  width: number;
}

function useWindowSize(): WindowSize {
  const [screen, setScreen] = useState<WindowSize>({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  const timeoutIdRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    function handleResize() {
      clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = setTimeout(() => {
        setScreen({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }, 150);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return screen;
}
