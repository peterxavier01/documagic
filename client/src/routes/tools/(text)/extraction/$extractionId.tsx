import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import ExtractionEditForm from "@/components/extraction-edit-form";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/(text)/extraction/$extractionId")({
  component: EditExtractionPage,
});

function EditExtractionPage() {
  const navigate = useNavigate();
  const conversionId = Route.useParams().extractionId as Id<"conversions">;
  const conversion = useQuery(api.files.getConversion, { conversionId });
  const saveChanges = useMutation(api.files.updateConversion);
  const deleteConversion = useMutation(api.files.deleteConversion);

  const [documentName, setDocumentName] = useState("");
  const [extractedText, setExtractedText] = useState("");

  // Update state only when conversion data changes
  useEffect(() => {
    if (conversion) {
      setDocumentName(conversion.documentName || "");
      setExtractedText(conversion.extractedText || "");
    }
  }, [conversion]);

  async function saveExtractionChanges() {
    try {
      await saveChanges({ conversionId, documentName, extractedText });
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
    }
  }

  async function deleteExtractionDocument() {
    try {
      // deletes both conversion document and image from convex storage
      await deleteConversion({
        conversionId,
        storageId: conversion?.documentId as Id<"_storage">,
      });
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error("Failed to delete document");
    }
  }

  return (
    <main className="py-12 font-poppins bg-white min-h-[calc(100dvh-60px)]">
      <div className="section-wrapper">
        <section className="flex flex-wrap gap-8 items-center justify-between mb-12">
          <div>
            <BackButton title="Text Extractor" href="/tools/text-extractor" />

            <Heading title="Edit Extraction" className="mt-4 text-slate-800" />
          </div>

          <div className="space-x-4">
            <Button className="gap-2" onClick={saveExtractionChanges}>
              <Save />
              <span>Save changes</span>
            </Button>

            <Button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this document?"
                  )
                ) {
                  deleteExtractionDocument();
                  navigate({ to: "/tools/text-extractor" });
                }
              }}
              className="bg-red-500 hover:bg-red-400"
            >
              <Trash2 />
            </Button>
          </div>
        </section>

        <ExtractionEditForm
          conversion={conversion}
          documentName={documentName}
          extractedText={extractedText}
          setDocumentName={setDocumentName}
          setExtractedText={setExtractedText}
        />
      </div>
    </main>
  );
}
