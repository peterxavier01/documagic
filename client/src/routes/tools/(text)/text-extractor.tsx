import { Plus } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePaginatedQuery, useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import ExtractionCard from "@/components/extraction-card";

import Empty from "../../../assets/empty.jpg";

export const Route = createFileRoute("/tools/(text)/text-extractor")({
  component: TextExtractor,
});

function TextExtractor() {
  const currentUser = useQuery(api.users.current);
  const userId = currentUser?._id as Id<"users">;

  // Don't run the query if userId is undefined
  const { results, status, loadMore } = usePaginatedQuery(
    api.files.getConversions,
    userId ? { userId } : "skip",
    { initialNumItems: 10 }
  );

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-white">
        <div className="size-8 rounded-full border-4 border-slate-800 border-t-transparent animate-spin " />
        <p className="text-primary font-medium text-lg">
          Docu<span className="text-coral">Magic</span>
        </p>
      </div>
    );
  }

  return (
    <main className="py-12 font-poppins bg-white min-h-[calc(100dvh-60px)]">
      <div className="section-wrapper">
        <section className="flex flex-wrap gap-8 items-center justify-between mb-12">
          <div>
            <BackButton title="Tools" href="/tools" />

            <Heading title="Text Extractor" className="mt-4 text-slate-800" />
          </div>
          <div>
            <Link to="/tools/new-extraction">
              <Button className="gap-2">
                <Plus />
                <span>New Extraction</span>
              </Button>
            </Link>
          </div>
        </section>

        {!results.length ? (
          <div className="flex flex-col items-center">
            <div className="max-w-[500px] h-auto">
              <img
                src={Empty}
                alt="illustration with a screen showing 'no data'"
                className="w-full block"
              />
            </div>
            <p className="font-medium text-base md:text-lg">
              No extractions yet.
            </p>
          </div>
        ) : (
          <section>
            <div className="space-y-4">
              {results?.map((item) => (
                <ExtractionCard key={item._id} item={item} />
              ))}
            </div>

            <Button
              onClick={() => loadMore(5)}
              disabled={status !== "CanLoadMore"}
              className="flex mt-4 ml-auto bg-dark-gray text-white hover:bg-dark-gray/80"
            >
              Load More
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
