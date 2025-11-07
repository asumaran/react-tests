import { useState } from 'react';

export default function UseBooleanPage() {
  const { value, setTrue, setFalse } = useBoolean();

  function toggle() {
    return value ? setFalse() : setTrue();
  }
  console.log('value', value);
  return (
    <div>
      <p>{value ? 'enabled' : 'disabled'}</p>
      <button onClick={toggle}>Toggle {JSON.stringify(value)}</button>
    </div>
  );
}

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

function useBoolean(initialValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(initialValue ?? false);

  function setTrue() {
    setValue(true);
  }

  function setFalse() {
    setValue(false);
  }

  return {
    value,
    setTrue,
    setFalse,
  };
}
