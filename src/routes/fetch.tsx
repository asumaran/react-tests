import Fetch from '@/components/fetch';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/fetch')({
  component: Fetch,
});
