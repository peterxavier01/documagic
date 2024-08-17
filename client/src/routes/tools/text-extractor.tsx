import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import UploadDropzone from "@/components/upload-dropzone";
import Editor from "@/components/lexical/editor";
import RecentUpload from "@/components/recent-upload";

export const Route = createFileRoute("/tools/text-extractor")({
  component: TextExtractor,
});

function TextExtractor() {
  const [, setImageUrl] = useState("");
  const [, setImageName] = useState("");

  // Convex mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Post the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": event.target.files![0].type },
      body: event.target.files![0],
    });

    const { storageId } = await result.json();

    // Save the newly allocated storage id to the database
    await sendImage({
      storageId,
      documentName: event.target.files![0].name,
      documentSize: event.target.files![0].size,
      toolUsed: "text extractor",
    });

    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);
    }
  };

  return (
    <main className="py-12 font-poppins bg-white min-h-[calc(100dvh-60px)]">
      <div className="section-wrapper">
        <BackButton title="Tools" href="/tools" />

        <Heading title="Text Extractor" className="mt-8 mb-12 text-slate-800" />

        <UploadDropzone
          onChange={handleImageChange}
          setImageName={setImageName}
          setImageUrl={setImageUrl}
        />

        <div className="my-8 flex items-center justify-center">
          <ArrowUpDown className="text-dark-gray" size={22} />
        </div>

        <Editor data="" />

        <RecentUpload />
      </div>
    </main>
  );
}
