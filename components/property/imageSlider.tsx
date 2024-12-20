/* eslint-disable @next/next/no-img-element */
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
    <div className="grid grid-cols-6 space-x-2 bg-white p-4  ">
      <div className="col-span-5">
        <img src={image} alt="image" className="w-full max-h-[500px]" />
      </div>
      <div className="flex flex-col gap-2">
        {images.map((image) => {
          return (
            <Image
              src={image}
              alt="image"
              key={image}
              width={150}
              height={100}
              className="rounded-sm object-cover border cursor-pointer"
              onClick={() => handleImage(image)}
            />
          );
        })}
      </div>
    </div>
  );
}
