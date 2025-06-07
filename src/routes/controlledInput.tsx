import ControlledInput from "@/components/controlledInput";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/controlledInput")({
  component: ControlledInput,
});
