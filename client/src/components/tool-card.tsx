import { Link } from "@tanstack/react-router";
import { Folder } from "lucide-react";

import { Card } from "@/components/ui/card";

import { tools } from "@/lib/data";

interface ToolCardProps {
  tool: (typeof tools)[0];
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link to={`/tools${tool.href}`}>
      <Card className="bg-off-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-black/10 size-12 flex flex-shrink-0 items-center justify-center rounded-lg">
            <Folder />
          </div>
          <div>
            <h4 className="text-slate-800 font-medium">{tool.name}</h4>
            <p className="text-dark-gray text-sm">{tool.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
