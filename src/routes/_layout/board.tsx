import { createFileRoute } from "@tanstack/react-router";
import type { Topic } from "@/services/models.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddTopic from "@/components/forms/add-topic.tsx";
import { TierService, TopicService } from "@/services/api/tier.service.ts";
import type { ApiResponse } from "@/services/models/general.model.ts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddTier from "@/components/forms/add-tier.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import TierCard from "@/components/blocks/tier-card.tsx";

export const Route = createFileRoute("/_layout/board")({
  validateSearch: (search) => ({
    id: typeof search.id === "string" && search.id !== "undefined" ? search.id : undefined,
  }),
  loaderDeps: ({ search }) => ({
    id: search.id,
  }),
  loader: async ({ deps, context }): Promise<ApiResponse<Topic> | null> => {
    if (!deps.id) return null;

    return await context.queryClient.query<ApiResponse<Topic>>({
      queryKey: ["topic", deps.id],
      queryFn: () => TopicService.getTopic(deps.id!),
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData() ?? { data: null };
  const { id } = Route.useSearch();
  const page = 0;
  const size = 0;

  const [search, setSearch] = useState("");

  const { data: tiersData, isPending } = useQuery({
    queryKey: ["tiers", { page, size, search, topicId: id }],
    queryFn: TierService.fetchTiers,
  });

  const processedTiers = tiersData?.data ?? [];

  return (
    <>
      <AddTopic open={!data} />
      <div className="h-full flex flex-col border-2 rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 shrink-0">{data?.title}</div>
        <div className="shrink-0">
          <hr className="h-1.5" />
        </div>

        <div className="flex flex-col w-full p-6 h-full min-h-0">
          {/* Scrollable tiers area */}
          <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
            {processedTiers.map((entry) => (
              <TierCard entry={entry} key={entry.id} />
            ))}
          </div>

          {/* Add tier button - stays at bottom */}
          <div className="shrink-0 pt-4">{id && <AddTier topicId={id} />}</div>
        </div>
      </div>
    </>
  );
}
