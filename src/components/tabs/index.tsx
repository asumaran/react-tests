// 6. Componente de Tabs
// Objetivo: Renderizado condicional, manejo de estado por índice.
// Crea un componente que muestre 2 o 3 pestañas. Al hacer clic, cambia el contenido mostrado.
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Children, useCallback, useState } from 'react';
import { Button } from '../ui/button';

const App = () => {
  return (
    <div>
      <Tabs>
        <TabPane label="First">Contenido 11</TabPane>
        <TabPane label="Second">Contenido 22</TabPane>
      </Tabs>
    </div>
  );
};

function Tabs({
  children,
  defaultActive = 0,
}: {
  // It's better if we specify the type of children we expect instead of using PropsWithChildren or React.FC
  children: ReactElement<ComponentProps<typeof TabPane>>[];
  defaultActive?: number;
}) {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleButtonClick = useCallback((idx: number) => {
    return () => {
      setActiveTab(idx);
    };
  }, []);

  return (
    <div>
      <div className="space-x-2 mb-5">
        {Children.map(children, (child, i) => {
          return (
            <Button
              variant={activeTab === i ? 'default' : 'secondary'}
              onClick={handleButtonClick(i)}
              key={i}
            >
              {child.props.label}
            </Button>
          );
        })}
      </div>
      <div>
        {Children.map(children, (child, i) => {
          return (
            <div key={i} className={activeTab === i ? 'block' : 'hidden'}>
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TabPane = ({ children }: { children: ReactNode; label: string }) => {
  return <div>{children}</div>;
};

export default App;
