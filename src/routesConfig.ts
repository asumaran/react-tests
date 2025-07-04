import ControlledInput from '@/components/controlledInput';
import Counter from '@/components/counter';
import Fetch from '@/components/fetch';
import FilteredList from '@/components/filteredList';
import Tabs from '@/components/tabs';
import ThemeToggle from '@/components/themeToggle';
import Index from './components/index';
import Accordion from './components/Accordion';
import ProgressBar from './components/ProgressBar';
import ClickAnywhere from './components/ClickAnywhere';
import UseCounter2 from './components/UseCounter2';
import UseCycle from './components/UseCycle';
import MortgageCalculator from './components/MortgageCalculator';
import SuspensePage from './components/Suspense';
import { createRoutesWithPaths } from './lib/createRoutesWithPaths';
import UseArrayPage from './components/UseArrayPage';
import { UseDebouncePage } from './components/UseDebouncePage';
import { UseSetPage } from './components/UseSetPage';
import UseTimeoutPage from './components/UseTimeoutPage';
import UseWindowSizePage from './components/UseWindowSizePage';
import UseDataTablePage from './components/UseDataTablePage';

const routesConfig = [
  { label: 'Counter', component: Counter },
  { label: 'Controlled Input', component: ControlledInput },
  { label: 'Filtered List', component: FilteredList },
  { label: 'Theme Toggle', component: ThemeToggle },
  { label: 'Fetch', component: Fetch },
  { label: 'Tabs', component: Tabs },
  { label: 'Accordion', component: Accordion },
  { label: 'Progress Bar', component: ProgressBar },
  { label: 'Click Anywhere', component: ClickAnywhere },
  { label: 'useCounter2', component: UseCounter2 },
  { label: 'useCycle', component: UseCycle },
  { label: 'Mortgage Calculator', component: MortgageCalculator },
  { label: 'Suspense', component: SuspensePage },
  { label: 'useArray', component: UseArrayPage },
  { label: 'useDebounce', component: UseDebouncePage },
  { label: 'useSet', component: UseSetPage },
  { label: 'useTimeout', component: UseTimeoutPage },
  { label: 'useWindowSize', component: UseWindowSizePage },
  { label: 'dataTable', component: UseDataTablePage },
];

// Aplicar la transformación
const routesWithPaths = createRoutesWithPaths(routesConfig);

export default [
  { path: '/', label: 'Home', component: Index },
  ...routesWithPaths,
] as const;
// "as const" is used here to preserve exact string literals (e.g., "/counter") instead of widening to generic 'string' type.
// This enables TypeScript to extract specific paths for type-safe routing and Link components.
