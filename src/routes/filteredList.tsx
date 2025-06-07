import FilteredList from "@/components/filteredList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/filteredList")({
  component: FilteredList,
});
