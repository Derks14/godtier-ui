import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import type { Tier } from "@/services/models.ts";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/board"!</div>;
}
