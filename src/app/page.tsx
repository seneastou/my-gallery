'use client';
import React from 'react';
import GalleryPage from './gallery/page'; // Importation de la page gallery

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur ma galerie d'images</h1>
      
      <GalleryPage />
    </div>
  );
}

