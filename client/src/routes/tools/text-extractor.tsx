import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import UploadDropzone from "@/components/upload-dropzone";
import Editor from "@/components/lexical/editor";
import { ArrowUpDown } from "lucide-react";

export const Route = createFileRoute("/tools/text-extractor")({
  component: TextExtractor,
});

function TextExtractor() {
  const [, setImageUrl] = useState("");
  const [, setImageName] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      </div>
    </main>
  );
}
