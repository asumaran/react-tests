import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1 className="text-black  text-xl mb-5">React tests</h1>
      <p>
        Here's I'll be implementing the most common react-related interview
        tests. Stay tuned.
      </p>
    </div>
  );
}
