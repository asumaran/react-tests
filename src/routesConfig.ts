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

const routesConfig = [
  { path: '/', label: 'Home', component: Index },
  { path: '/counter', label: 'Counter', component: Counter },
  { path: '/ci', label: 'Controlled Input', component: ControlledInput },
  { path: '/filteredList', label: 'Filtered List', component: FilteredList },
  { path: '/themeToggle', label: 'Theme Toggle', component: ThemeToggle },
  { path: '/fetch', label: 'Fetch', component: Fetch },
  { path: '/tabs', label: 'Tabs', component: Tabs },
  { path: '/accordion', label: 'Accordion', component: Accordion },
  { path: '/progressbar', label: 'Progress Bar', component: ProgressBar },
  { path: '/clickAnywhere', label: 'Click Anywhere', component: ClickAnywhere },
  { path: '/useCounter2', label: 'useCounter2', component: UseCounter2 },
  { path: '/useCycle', label: 'useCycle', component: UseCycle },
  {
    path: '/mortgageCalculator',
    label: 'Mortgage Calculator',
    component: MortgageCalculator,
  },
  { path: '/suspense', label: 'Suspense', component: SuspensePage },
] as const;
// "as const" is used here to preserve exact string literals (e.g., "/counter") instead of widening to generic 'string' type.
// This enables TypeScript to extract specific paths for type-safe routing and Link components.

export default routesConfig;
