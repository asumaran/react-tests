// Build an app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.
// Requirements
// - Clicking on the "Add" button adds a progress bar to the page.
// - Each progress bar start filling up smoothly as soon as they're added
// - Each bar takes approximately 2000ms to completely fill up.
//
// const ProgressBar = () => {
//   return (
//     <div>
//       <button>Add</button>
//     </div>
//   );
// };

import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => setCount((p) => p + 1)}
        className='border px-3 rounded-sm'
      >
        Add
      </button>
      {Array.from({ length: count }).map((_, i) => (
        <ProgressBarComponent key={i} />
      ))}
    </div>
  );
};

function ProgressBarComponent() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          return 100;
        }
        return prevValue + 1;
      });
    }, 20); // 100 increments × 20ms = 2000ms

    return () => clearInterval(interval);
  }, []); // Empty deps - run only once on mount

  return (
    <div>
      <progress value={value} max='100'></progress>
    </div>
  );
}

export default ProgressBar;
