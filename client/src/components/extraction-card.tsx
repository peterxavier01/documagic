import { getImageURL } from "@/lib/utils";
import { Doc, Id } from "../../convex/_generated/dataModel";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ExtractionCardProps {
  item: Doc<"conversions">;
}

export default function ExtractionCard({ item }: ExtractionCardProps) {
  const storageId = item.documentId as Id<"conversions">;
  const imageURL = getImageURL(storageId);

  return (
    <Card key={item._id} className="bg-off-white group rounded-lg">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={imageURL}
            alt={item.documentName}
            className="size-20 object-cover rounded"
          />

          <CardTitle className="text-primary font-medium line-clamp-1 md:text-wrap">
            <Link
              to="/tools/extraction/$extractionId"
              params={{ extractionId: item._id }}
              title={item.documentName}
            >
              {item.documentName}
            </Link>
          </CardTitle>
        </div>

        <Link
          to="/tools/extraction/$extractionId"
          params={{ extractionId: item._id }}
        >
          <Button
            variant="outline"
            className="hidden transition md:group-hover:flex hover:bg-dark-gray hover:text-white"
          >
            <span>View</span>
            <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
