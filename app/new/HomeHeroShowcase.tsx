"use client";

import { Homepage, Image as ImageType } from "@/types/cms";
import PeelButton from "@/components/PeelButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HomeHeroShowcase({
  showcase,
}: {
  showcase: Homepage["hero"]["showcase"];
}) {
  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = (showcase as ImageType).mimeType?.includes("video");
  const url = (showcase as ImageType)?.imagekit?.url!;

  useEffect(() => {
    isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause();
  }, [isPlaying]);

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="w-full h-[100svh] min-h-[500px]">
        {isVideo ? (
          <video controls={false} className="w-full h-full">
            <source src={url} />
            <p className="w-full flex justify-center items-center text-center text-base">
              Your browser doesn&apos;t support HTML video. Here is a
              <a href={url}>link to the video</a> instead.
            </p>
          </video>
        ) : (
          <Image
            src={url}
            alt={(showcase as ImageType)?.altText ?? "Showcase"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {isVideo && (
        <PeelButton
          className="left-4 sm:left-10 bottom-8"
          onClick={() => setPlaying((prev) => !prev)}
        >
          {isPlaying ? "PAUSE" : "PLAY"} VIDEO
        </PeelButton>
      )}
    </div>
  );
}
