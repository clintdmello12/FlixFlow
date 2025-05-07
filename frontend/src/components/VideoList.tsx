// src/components/VideoList.tsx
import React from 'react';

export type Movie = {
  id: number;
  title: string;
  poster: string;
  src: string;        // video file URL
};

type VideoListProps = {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
};

export const VideoList: React.FC<VideoListProps> = ({ movies, onSelect }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {movies.map(movie => (
      <div
        key={movie.id}
        className="cursor-pointer overflow-hidden rounded-lg shadow-lg h-48"
        onClick={() => onSelect(movie)}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
        <p className="mt-2 text-center text-white">{movie.title}</p>
      </div>
    ))}
  </div>
);
