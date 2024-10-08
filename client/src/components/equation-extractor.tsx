import { useCallback, useState } from "react";
import axios from "axios";

import UploadDropzone from "@/components/upload-dropzone";
import Editor from "@/components/lexical/text-editor";
import ImageCard from "@/components/image-card";

import { getServerURL } from "@/lib/utils";

export default function EquationExtractor() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [data, setData] = useState<string | null>(null);

  // Get the latex string from the image from the API
  const getLatexString = useCallback(async () => {
    const serverURL = getServerURL();

    try {
      const response = await axios.post(`${serverURL}/api/extract-equation`, {
        imageUrl,
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [imageUrl]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setImageName(event.target.files[0].name);

      await getLatexString();
    }
  };

  imageUrl && console.log(imageUrl);
  data && console.log(data);

  return (
    <section
      className="bg-royal-blue bg-dot-black/[0.2] py-12 md:py-24"
      id="text-extractor"
    >
      <h2 className="header text-off-white">
        Equation <span className="text-coral">Extractor</span>
      </h2>

      <div className="grid gap-8 md:gap-12 section-wrapper">
        <div className="flex flex-col items-center gap-4 md:col-span-6">
          <ImageCard imageName={imageName} imageUrl={imageUrl} />

          <UploadDropzone
            onChange={handleImageChange}
            setImageUrl={setImageUrl}
            setImageName={setImageName}
          />
        </div>

        <div className="md:col-span-6 space-y-4 flex flex-col items-end">
          <Editor data={data} />
        </div>
      </div>
    </section>
  );
}
