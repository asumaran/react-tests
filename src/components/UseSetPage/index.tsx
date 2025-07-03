import { useCallback, useRef, useState } from 'react';

export function UseSetPage() {
  const { set, add, remove, toggle, reset, clear, has } = useSet(
    new Set(['hello']),
  );

  return (
    <div>
      <button onClick={() => add(Date.now().toString())}>Add</button>
      <button onClick={() => remove('hello')} disabled={!has('hello')}>
        Remove 'hello'
      </button>
      <button onClick={() => toggle('hello')}>Toggle hello</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => clear()}>Clear</button>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </div>
  );
}

export interface UseSetReturn<T> {
  set: Readonly<Set<T>>;
  add: (key: T) => void;
  remove: (key: T) => void;
  toggle: (key: T) => void;
  reset: () => void;
  clear: () => void;
  has: (key: T) => boolean;
}

function useSet<T>(initialState = new Set<T>()): UseSetReturn<T> {
  const initialRef = useRef(initialState);

  const [set, setSet] = useState(initialState);

  const add: UseSetReturn<T>['add'] = useCallback((key) => {
    setSet((prev) => {
      if (prev.has(key)) {
        return prev;
      }
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });
  }, []);

  const remove: UseSetReturn<T>['remove'] = useCallback((key) => {
    setSet((prev) => {
      if (!prev.has(key)) {
        return prev;
      }
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  const toggle: UseSetReturn<T>['toggle'] = useCallback((key) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  const reset: UseSetReturn<T>['reset'] = useCallback(() => {
    setSet(initialRef.current);
  }, []);

  const clear: UseSetReturn<T>['clear'] = useCallback(() => {
    setSet(new Set());
  }, []);

  // Hack: To get real current value of set
  // Create a ref for set
  const setRef = useRef<Set<T> | undefined>(undefined);

  // but then given that set changes on every render assign set manually to the current prop of the reference
  // this will allow setRef to always have the current state of set but it will not cause useCallback to update
  // the reference of the funcion it holds.
  setRef.current = set;
  const has: UseSetReturn<T>['has'] = useCallback((key) => {
    return setRef.current!.has(key);
  }, []);

  return {
    set,
    add,
    remove,
    toggle,
    reset,
    clear,
    has,
  };
}
