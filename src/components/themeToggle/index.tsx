// 4. Toggle de tema claro/oscuro
// Objetivo: Manejo de clases, useState, y persistencia opcional.
// Agrega un botón para cambiar entre tema claro y oscuro. Opcional: guarda la preferencia en localStorage.
import { createContext, useContext, useState } from 'react';
import './styles.scss';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'light';
  });
  function handleToggleClick() {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <p>
          <Button onClick={handleToggleClick}>Toggle Theme</Button>
        </p>
        <label htmlFor="simpleinput">Simple input</label>
        <input id="simpleinput" className="border" />
        <MyInput />
      </div>
    </ThemeContext.Provider>
  );
}

// I wanted to try this but the way is implemented context is useless here
// if the input has shadow root maybe it would be benefitial otherwise with CSS and a top level class
// would be enough to apply the dark theme.
const MyInput = () => {
  const { theme } = useThemeContext();

  return (
    <p className={theme}>
      <label htmlFor="input">My Input</label>
      <input id="input" className="border" />
    </p>
  );
};

const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('No context');
  }

  return ctx;
};

interface ThemeContextInterface {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined,
);
