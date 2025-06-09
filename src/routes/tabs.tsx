import Tabs from '@/components/tabs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tabs')({
  component: Tabs,
});
