import React, { useRef, useState } from "react";
import { FileUp } from "lucide-react";

import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setImageUrl: (value: React.SetStateAction<string>) => void;
  setImageName: (value: React.SetStateAction<string>) => void;
}

export default function UploadDropzone({
  onChange,
  setImageUrl,
  setImageName,
}: Readonly<UploadDropzoneProps>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setImageUrl(URL.createObjectURL(event.dataTransfer.files[0]));
      setImageName(event.dataTransfer.files[0].name);
    }
  };

  return (
    <div
      className={cn(
        `w-full min-h-80 flex flex-col gap-4 rounded-md items-center justify-center bg-off-white hover:bg-sky-blue transition`,
        isDragging
          ? "bg-sky-blue border border-coral"
          : "border border-transparent"
      )}
      onClick={handleDropzoneClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FileUp size={32} className="text-neutral-500" />
      <div className="font-poppins flex flex-col items-center justify-center gap-2">
        <p className="text-neutral-600 font-semibold text-center">
          Drop your files here or click to upload
        </p>
        <p className="text-neutral-500 font-medium text-sm text-center">
          Max up to 10MB
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Button className="capitalize mt-8 max-w-[150px] w-full h-12 bg-coral hover:bg-royal-blue">
        Select file
      </Button>
    </div>
  );
}
