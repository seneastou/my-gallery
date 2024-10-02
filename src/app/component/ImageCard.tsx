
import React from 'react';

interface ImageCardProps {
  imageUrl: string;
  onClick: () => void;
}

export default function ImageCard({ imageUrl, onClick }: ImageCardProps){
  return (
    <div className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:opacity-75 transition duration-100" onClick={onClick}>
      <img src={imageUrl} alt="Gallery Image" className="w-full h-64 object-cover" />
    </div>
  );
};


