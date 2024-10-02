import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "@/components/heading";

import { convertBytes } from "@/lib/utils";

interface RecentUploadProps {
  toolUsed: "text extractor" | "equation extractor";
}

export default function RecentUpload({ toolUsed }: RecentUploadProps) {
  const uploads = useQuery(api.files.getRecentUploads, { toolUsed });

  return (
    <section className="mt-14">
      <Heading title="Recent Uploads" className="md:text-3xl text-slate-800" />

      <Table className="mt-4 text-slate-800">
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Uploaded At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads
            ? uploads.map((upload) => {
                if (upload.toolUsed !== toolUsed) return null;

                return (
                  <TableRow key={upload._id}>
                    <TableCell>{upload.documentName}</TableCell>
                    <TableCell className="truncate">
                      {convertBytes(upload.documentSize, "KB") + " KB"}
                    </TableCell>
                    <TableCell className="text-right truncate">
                      {format(upload._creationTime, "PPpp")}
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </section>
  );
}
