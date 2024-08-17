import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UploadDropzone from "@/components/upload-dropzone";
import ImageCard from "@/components/image-card";

import { saveTextAsDocx } from "@/lib/text-to-docx";

export default function TextExtractor() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [recognizedText, setRecognizedText] = useState("");
  const [progress, setProgress] = useState(0);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);
    }
  };

  const convertImageToText = useCallback(async () => {
    try {
      if (!imageUrl) return;

      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          setProgress(m.progress * 100);
        },
      });

      const {
        data: { text },
      } = await worker.recognize(imageUrl);

      setRecognizedText(text);

      await worker.terminate();
    } catch (error) {
      toast("Something went wrong");
    }
  }, [imageUrl]);

  useEffect(() => {
    convertImageToText();
  }, [convertImageToText]);

  return (
    <section
      className="bg-dark-gray bg-dot-white/[0.2] py-12 md:py-24"
      id="text-extractor"
    >
      <h2 className="header text-off-white">
        Text <span className="text-coral">Extractor</span>
      </h2>

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 section-wrapper">
        <div className="flex flex-col items-center gap-4 md:col-span-6">
          <ImageCard imageName={imageName} imageUrl={imageUrl} />

          {progress < 100 && progress > 0 && (
            <Progress value={progress} className="w-full" />
          )}

          <UploadDropzone
            onChange={handleImageChange}
            setImageUrl={setImageUrl}
            setImageName={setImageName}
          />
        </div>

        <div className="md:col-span-6 space-y-4 flex flex-col items-end">
          <Textarea
            placeholder="Recognized Text here..."
            value={recognizedText}
            onChange={(event) => setRecognizedText(event.target.value)}
            className="w-full h-auto min-h-80 bg-off-white p-4 md:p-8 font-poppins"
          />

          <Button
            onClick={() => saveTextAsDocx(recognizedText)}
            disabled={!recognizedText}
          >
            Download (.docx)
          </Button>
        </div>
      </div>
    </section>
  );
}
