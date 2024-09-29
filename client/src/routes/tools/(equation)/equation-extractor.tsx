import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, Download } from "lucide-react";
import { useState } from "react";

import BackButton from "@/components/back-button";
import Heading from "@/components/heading";
import UploadDropzone from "@/components/upload-dropzone";
import MathField from "@/components/mathlive/math-field";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/(equation)/equation-extractor")({
  component: EquationExtractor,
});

function EquationExtractor() {
  const [, setImageUrl] = useState("");
  const [, setImageName] = useState("");

  const [mathValue, setMathValue] = useState<string>("E=mc^2");
  const handleChange = (value: string) => {
    setMathValue(value);
  };

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

        <Heading
          title="Equation Extractor"
          className="mt-8 mb-12 text-slate-800"
        />

        <UploadDropzone
          onChange={handleImageChange}
          setImageName={setImageName}
          setImageUrl={setImageUrl}
        />

        <div className="my-8 flex items-center justify-center">
          <ArrowUpDown className="text-dark-gray" size={22} />
        </div>

        <section>
          <MathField value={mathValue} onChange={handleChange} />
          <div className="ml-auto w-max mt-2">
            <Button className="flex items-center gap-2">
              <Download />
              Download
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
