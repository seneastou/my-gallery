"use client";
import React, { useState } from "react";
import ImageCard from "../component/ImageCard";
import Modal from "../component/Modal";

const images = [
  { 
    id: 1,
    url: "/image/img1.jpg", 
    title: "La belle rose", 
    categorie: "Nature" 
  },
  { 
    id: 2,
    url: "/image/img2.jpg", 
    title: "Le château enchanté", 
    categorie: "Nature" 
  },
  {
    id: 3,
    url: "/image/img3.jpg",
    title: "Les aurores boréales",
    categorie: "Nature",
  },
  { 
    id: 4,
    url: "/image/img4.jpg", 
    title: "La plage de Malibu", 
    categorie: "Nature" 
  },
  {
    id: 5,
    url: "/image/img5.jpg",
    title: "L'oiseau des neiges",
    categorie: "Animaux",
  },
  { 
    id: 6,
    url: "/image/img6.jpg", 
    title: "Le mont enneigé", 
    categorie: "Nature" 
  },
  {
    id: 7,
    url: "/image/img7.jpg", 
    title: "La rose sauvage", 
    categorie: "Nature" 
  },
  { 
    id: 8,
    url: "/image/img8.jpg", 
    title: "Le lac miroir", 
    categorie: "Nature" 
  },
  { 
    id: 9,
    url: "/image/img9.jpg", 
    title: "La plage du bonheur", 
    categorie: "Nature" 
  },
  {
    id: 10,
    url: "/image/img10.jpg",
    title: "Les zèbres en liberté",
    categorie: "Animaux",
  },
  { 
    id: 11,
    url: "/image/img11.jpg",
    title: "Les lapins mignons", 
    categorie: "Animaux" 
  },
  { 
    id: 12,
    url: "/image/img12.jpg", 
    title: "Le coq roux", 
    categorie: "Animaux" 
  },
  {
    id: 13,
    url: "/image/img13.jpg",
    title: "La photo de la technologie",
    categorie: "Technologie",
  },
  {
    id: 14,
    url: "/image/img14.jpg",
    title: "L'appareil photo",
    categorie: "Technologie",
  },
  {
    id: 15,
    url: "/image/img15.jpg",
    title: "L'échographie du futur",
    categorie: "Technologie",
  },
];

export default function GalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [category, setCategory] = useState<string>("All");

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    if (currentImageIndex !== null && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== null && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };



  // Gestion du filtre
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const filteredImages =
    category === "All"
      ? images
      : images.filter((image) => image.categorie === category);

  const isNextDisabled = currentImageIndex === filteredImages.length - 1; // Désactive "Suivant" à la dernière image
  const isPrevDisabled = currentImageIndex === 0; // Désactive "Précédent" à la première image

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="block text-gray-700 font-bold mb-2"
        >
          Filtrer par catégorie:
        </label>
        {/* Filtre de catégorie */}
        <select
          id="categoryFilter"
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">Toutes les catégories</option>
          <option value="Nature">Nature</option>
          <option value="Animaux">Animaux</option>
          <option value="Technologie">Technologie</option>
        </select>
      </div>
      {/* Grille d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <ImageCard
            key={index}
            imageUrl={image.url}
            category={image.categorie}
            imageId={image.id}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Affichage de la modale si une image est sélectionnée */}
      {currentImageIndex !== null && (
        <Modal
        imageUrl={filteredImages[currentImageIndex].url}
        title={filteredImages[currentImageIndex].title}
        imageId={filteredImages[currentImageIndex].id}
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
