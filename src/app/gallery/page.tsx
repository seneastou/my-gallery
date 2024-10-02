"use client";
import React, { useState } from "react";
import ImageCard from "../component/ImageCard";
import Modal from "../component/Modal";

const images = [
  { url: "/image/img1.jpg", title: "La belle rose" },
  { url: "/image/img2.jpg", title: "Le château enchanté" },
  { url: "/image/img3.jpg", title: "Les aurores boréales" },
  { url: "/image/img4.jpg", title: "La plage de Malibu" },
  { url: "/image/img5.jpg", title: "L'oiseau des neiges" },
  { url: "/image/img6.jpg", title: "Le mont enneigé " },
  { url: "/image/img7.jpg", title: "La rose sauvage" },
  { url: "/image/img8.jpg", title: "Le lac miroir" },
  { url: "/image/img9.jpg", title: "La plage du bonheur" },
];

export default function GalleryPage() {
  const [CurrentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    if (CurrentImageIndex !== null && CurrentImageIndex < images.length - 1) {
      setCurrentImageIndex(CurrentImageIndex + 1);
    }
  };
  
  const prevImage = () => {
    if (CurrentImageIndex !== null && CurrentImageIndex > 0) {
      setCurrentImageIndex(CurrentImageIndex - 1);
    }
  };

  const isNextDisabled = CurrentImageIndex === images.length - 1; // Désactive "Suivant" à la dernière image
  const isPrevDisabled = CurrentImageIndex === 0; // Désactive "Précédent" à la première image

  return (
    <div className="container mx-auto p-4">
      {/* Grille d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            imageUrl={image.url}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Affichage de la modale si une image est sélectionnée */}
      {CurrentImageIndex !== null && (
        <Modal
          imageUrl={images[CurrentImageIndex].url}
          title={images[CurrentImageIndex].title}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          isNextDisabled={isNextDisabled} 
          isPrevDisabled={isPrevDisabled} 
        />
      )}
    </div>
  );
}
