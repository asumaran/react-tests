// 2. Input controlado con validación simple
// Objetivo: Manejo de formularios y eventos.
// Crea un campo de email que se valide al escribir (@ obligatorio). Muestra un mensaje si es inválido.

import { useState } from "react";

const ControlledInput = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    // we are just checking for @
    if (newValue.includes("@")) {
      setError(null);
    } else {
      setError("Invalid email");
    }
  }

  return (
    <div>
      <div className="space-x-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="border rounded px-2 py-1"
          onChange={handleChange}
          value={value}
        />
      </div>
      {error && <span className="text-red-700">{error}</span>}
    </div>
  );
};

export default ControlledInput;
