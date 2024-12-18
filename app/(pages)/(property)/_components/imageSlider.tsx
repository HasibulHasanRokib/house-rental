"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function ImageSlider({ images }: { images: string[] }) {
  const [image, setImage] = useState<string>(images[0]);
  const handleImage = (url: string) => {
    setImage(url);
  };

  return (
    <Card className="space-y-2 bg-white p-4">
      <Image
        src={image}
        alt="images"
        width={800}
        height={400}
        className="object-cover rounded-md max-h-[400px]"
      />
      <div className="flex gap-2">
        {images.map((image) => {
          return (
            <Image
              src={image}
              alt="image"
              key={image}
              width={100}
              height={100}
              className="rounded-sm object-cover border cursor-pointer"
              onClick={() => handleImage(image)}
            />
          );
        })}
      </div>
    </Card>
  );
}
