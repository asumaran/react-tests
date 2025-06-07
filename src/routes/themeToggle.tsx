import ThemeToggle from '@/components/themeToggle';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/themeToggle')({
  component: ThemeToggle,
});
