import { useEffect, useState } from 'react';

export function UseDebouncePage() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 1000);

  return (
    <div>
      <input
        className='border'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <p>Debounced keyword: {debouncedKeyword}</p>
    </div>
  );
}

function useDebounce<T>(value: T, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => {
      console.log('elimina timeou');
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return delayedValue;
}
