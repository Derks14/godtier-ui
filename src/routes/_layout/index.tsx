import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { TopicService } from "@/services/api/tier.service.ts";
import { Button } from "@/components/ui/button.tsx";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { useState } from "react";

import TopicsCard from "@/components/blocks/topics-card.tsx";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const page = 0;
  const size = 0;

  const [search, setSearch] = useState("");

  const { data: topicsData } = useQuery({
    queryKey: ["topics", { page, size, search }],
    queryFn: TopicService.fetchTopics,
    placeholderData: (previousData) => previousData,
  });
  const processedDocs = topicsData?.data ?? [];

  return (
    <div className="h-full flex flex-col w-full">
      <div className="h-full flex-col md:p-6 w-full">
        <div className="">
          <div className="md:flex w-full justify-between">
            <div>one </div>

            {/* second side */}
            <div className="md:flex md:gap-3">
              {/*search */}
              <div>
                <InputGroup className="">
                  <InputGroupInput
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputGroupAddon>
                    <MagnifyingGlassIcon size={32} />{" "}
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    {processedDocs.length} results
                  </InputGroupAddon>
                </InputGroup>
              </div>
              {/*button*/}
              <div>
                <Link to="/board" search={{ id: undefined }}>
                  <Button>
                    Create New
                    <PlusIcon size={32} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* featured topics*/}
        {/*<div className="">*/}
        {/*  <div>*/}
        {/*    <h1 className="text-3xl font-medium">Featured Topics</h1>*/}
        {/*  </div>*/}
        {/*  <div className="flex gap-3">*/}
        {/*    {processedDocs.map((entry) => (*/}
        {/*      <div key={entry.id} className="p-4 border-primary-foreground">*/}
        {/*        <div className="">{entry.title}</div>*/}
        {/*        <div className="">{entry.created}</div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Recent topics */}
        <div className="">
          <div>
            <h1 className="text-4xl py-3.5">Recent Topics</h1>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
            <div className="p-2 rounded-lg  md:min-w-72 border">
              <div className="flex h-full w-full items-center justify-center">
                Add new topic
              </div>
            </div>
            {processedDocs.map((entry) => (
              <TopicsCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
