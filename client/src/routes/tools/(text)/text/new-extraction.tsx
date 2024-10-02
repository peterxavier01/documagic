import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, useMutation } from "convex/react";
import { ArrowUpDown, Save } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";

import UploadDropzone from "@/components/upload-dropzone";
import Editor from "@/components/lexical/text-editor";
import RecentUpload from "@/components/recent-upload";
import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";

import { getTextString } from "@/lib/api";
import ImageCard from "@/components/image-card";
import { Progress } from "@/components/ui/progress";
import { useAPIProgressStore } from "@/hooks/use-api-progress";

export const Route = createFileRoute("/tools/(text)/text/new-extraction")({
  component: NewExtractionPage,
});

function NewExtractionPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [, setFileURL] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const progress = useAPIProgressStore((state) => state.progress);
  const progressText = useAPIProgressStore((state) => state.progressText);
  const setProgressText = useAPIProgressStore((state) => state.setProgressText);

  const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

  // Convex mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const { type, name, size } = file;

    // Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    setProgressText("Generating image URL...");

    // Post the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": type },
      body: file,
    });

    const { storageId } = await result.json();

    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setImageName(event.target.files[0].name);

    // Retrieve the file URL of the uploaded file
    const getImageUrl = new URL(`${convexSiteUrl}/getFileURL`);
    getImageUrl.searchParams.set("storageId", storageId);
    setFileURL(getImageUrl.href);

    // Extract text from image
    const extractedText = await getTextString(getImageUrl.href);
    setExtractedText(extractedText);

    // Save the newly allocated storage id to the database
    await sendImage({
      storageId,
      documentName: name,
      documentSize: size,
      toolUsed: "text extractor",
      extractedText,
    });
    setProgressText("Uploading image...");
  };

  return (
    <main className="py-12 font-poppins bg-white min-h-[calc(100dvh-60px)]">
      <div className="section-wrapper">
        <div className="flex flex-wrap gap-8 items-center justify-between mb-12">
          <div>
            <BackButton title="Text Extractor" href="/tools/text-extractor" />

            <Heading title="New Extraction" className="mt-4 text-slate-800" />
          </div>

          <div>
            <Button className="gap-2">
              <Save />
              <span>Save changes</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:col-span-6">
          <ImageCard imageName={imageName} imageUrl={imageUrl} />

          {progress < 100 && progress > 0 && (
            <>
              <Progress value={progress} className="w-full" />
              <p className="font-medium text-sm">{progressText}</p>
            </>
          )}

          <UploadDropzone
            onChange={handleImageChange}
            setImageUrl={setImageUrl}
            setImageName={setImageName}
          />
        </div>

        <div className="my-8 flex items-center justify-center">
          <ArrowUpDown className="text-dark-gray" size={22} />
        </div>

        <Editor data={extractedText} />

        <Authenticated>
          <RecentUpload toolUsed="text extractor" />
        </Authenticated>
      </div>
    </main>
  );
}
