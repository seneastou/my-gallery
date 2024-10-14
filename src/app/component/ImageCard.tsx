'use client';
import React, { useState, useEffect } from "react";

interface ImageCardProps {
  imageUrl: string;
  onClick: () => void;
  category: string;
  imageId: number; 
}

export default function ImageCard({ imageUrl, onClick, category, imageId }: ImageCardProps) {
  const localStorageKey = `likes-${imageId}`;

  // Utilisation de state pour vérifier si le composant est monté côté client
  const [isClient, setIsClient] = useState(false);

  // Vérifier si on est côté client après le montage du composant
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialisation des likes depuis localStorage ou 0 si non défini 
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    if (isClient) {
      const savedLikes = localStorage.getItem(localStorageKey);
      if (savedLikes) {
        setLikes(parseInt(savedLikes, 10));
      }
    }
  }, [isClient, localStorageKey]);

  // Mettre à jour localStorage lorsque le nombre de likes change (seulement si on est côté client)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(localStorageKey, likes.toString());
    }
  }, [likes, isClient, localStorageKey]);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div
      className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:opacity-75 transition duration-100"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        loading="lazy"
        alt="Gallery Image"
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        {/* Affichage du nombre de likes */}
        <button
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.stopPropagation(); // Empêche le déclenchement du onClick parent
            handleLike();
          }}
        >
          <span role="img" aria-label="like">👍</span> 
          <span>{likes}</span> 
        </button>
      </div>
    </div>
  );
}
