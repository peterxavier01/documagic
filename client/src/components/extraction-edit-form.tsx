import { Doc } from "../../convex/_generated/dataModel";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ExtractionEditFormProps {
  conversion: Doc<"conversions"> | undefined | null;
  documentName: string;
  extractedText: string;
  setDocumentName: (documentName: string) => void;
  setExtractedText: (extractedText: string) => void;
}

export default function ExtractionEditForm({
  conversion,
  documentName,
  setDocumentName,
  extractedText,
  setExtractedText,
}: ExtractionEditFormProps) {
  return (
    <form className="space-y-6">
      <div>
        <Label>Document Name</Label>
        <Input
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          defaultValue={conversion?.documentName}
          className="outline-none focus-visible:ring-royal-blue"
        />
      </div>
      <div>
        <Label>Extracted Text</Label>
        <Textarea
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          defaultValue={conversion?.extractedText}
          className="outline-none focus-visible:ring-royal-blue min-h-96 resize-none"
        />
      </div>
    </form>
  );
}
