interface ImageCardProps {
  imageName: string;
  imageUrl: string;
}

export default function ImageCard({ imageName, imageUrl }: ImageCardProps) {
  return imageName && imageUrl ? (
    <div className="flex items-center gap-8 bg-off-white rounded-lg px-4 py-2 w-full">
      <div className="relative w-[200px] h-[120px] aspect-auto">
        <img
          src={imageUrl}
          alt="upload"
          className="block w-full h-full object-cover"
        />
      </div>
      <p className="text-neutral-600 text-sm font-medium line-clamp-1">
        {imageName}
      </p>
    </div>
  ) : null;
}
