import { createFileRoute } from "@tanstack/react-router";
import Counter from "../components/counter";

export const Route = createFileRoute("/counter")({
  component: Counter,
});
