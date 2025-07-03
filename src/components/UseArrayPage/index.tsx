import { useState, type Dispatch, type SetStateAction } from 'react';
import './style.css';

const defaultValue = ['apple', 'banana'];

interface UseArrayReturn<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function UseArrayPage() {
  const { array, push, update, remove, filter, set, clear } =
    useArray(defaultValue);

  return (
    <div>
      <p>Fruits: {array.join(', ')}</p>
      <button onClick={() => push('orange')}>Add orange</button>
      <button onClick={() => update(1, 'grape')}>
        Change second item to grape
      </button>
      <button onClick={() => remove(0)}>Remove first</button>
      <button onClick={() => filter((fruit) => fruit.includes('a'))}>
        Keep fruits containing 'a'
      </button>
      <button onClick={() => set(defaultValue)}>Reset</button>
      <button onClick={clear}>Clear list</button>
    </div>
  );
}

function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
  const [array, setArray] = useState<T[]>(defaultValue);

  const push: (element: T) => void = (item) => {
    setArray((p) => {
      return [...p, item];
    });
  };

  const update: (index: number, newElement: T) => void = (
    index,
    newElement,
  ) => {
    setArray((prevArray) => {
      // Use >= because length it's not zero-based.
      if (index < 0 || index >= prevArray.length) {
        console.error(
          `Index ${index} is out of bounds for array of length ${prevArray.length}`,
        );
        return prevArray;
      }

      const newArray = [...prevArray];
      newArray[index] = newElement;
      return newArray;
    });
  };

  const remove: (index: number) => void = (index) => {
    setArray((prevArray) => {
      if (index < 0 || index >= prevArray.length) {
        console.error(
          `Index ${index} is out of bounds for array of length ${prevArray.length}`,
        );
        return prevArray;
      }

      const newArray = prevArray.filter(
        (_, arrayIndex) => arrayIndex !== index,
      );
      return newArray;
    });
  };

  const filter: (
    callback: (value: T, index: number, array: T[]) => boolean,
  ) => void = (cb) => {
    setArray((prevArray) => {
      return prevArray.filter(cb);
    });
  };

  const set: Dispatch<SetStateAction<T[]>> = (items) => {
    setArray(items);
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    push,
    update,
    remove,
    filter,
    set,
    clear,
  };
}
