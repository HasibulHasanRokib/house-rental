"use client";

import { useState } from "react";

export default function ImageSection({ images }: { images: string[] }) {
  const [image, setImage] = useState<string>(images[0]);
  const handleImage = (url: string) => {
    setImage(url);
  };

  return (
    <div className="bg-white p-4">
      <div className="w-full mb-4">
        <img
          src={image}
          alt="Selected"
          className="w-full max-h-[500px] object-cover rounded-md"
        />
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
        {images.map((image) => (
          <img
            src={image}
            alt="Thumbnail"
            key={image}
            className="rounded-md w-28 h-28 object-cover border cursor-pointer hover:ring-2 hover:ring-primary"
            onClick={() => handleImage(image)}
          />
        ))}
      </div>
    </div>
  );
}
