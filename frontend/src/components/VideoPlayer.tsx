// src/components/VideoPlayer.tsx
import React from 'react';

type VideoPlayerProps = {
  src: string;
  title: string;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => (
  <div className="mt-6">
    <h3 className="text-xl text-white mb-2">{title}</h3>
    <video
      src={src}
      controls
      autoPlay      // ← start playing immediately
      muted         // ← required by browsers for autoplay
      className="w-full max-h-[500px] rounded-lg shadow-lg bg-black"
    >
      Sorry, your browser doesn’t support embedded videos.
    </video>
  </div>
);
