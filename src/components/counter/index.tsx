// 1. Contador con estado
// Objetivo: Evaluar comprensión de useState.
// Crea un componente con un número que se pueda incrementar y decrementar usando botones.

import { useState } from "react";
import { Button } from "../ui/button";

const Counter = () => {
  const [count, setCount] = useState(0);

  function createClickHandler(amount: number) {
    return () => {
      setCount((prev) => {
        return prev + amount;
      });
    };
  }

  function handleResetClick() {
    setCount(0);
  }

  return (
    <div>
      <div>contador: {count}</div>
      <div className="space-x-2">
        <Button onClick={createClickHandler(-1)}>-1</Button>
        <Button onClick={createClickHandler(1)}>+1</Button>
        <Button onClick={handleResetClick}>Reset</Button>
      </div>
    </div>
  );
};

export default Counter;
