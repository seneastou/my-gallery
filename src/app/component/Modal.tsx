import React from 'react';

interface ModalProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}

export default function Modal({ imageUrl, title, onClose, onNext, onPrev, isNextDisabled, isPrevDisabled }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto animate-fadeIn">
        {/* Bouton pour fermer la modale */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
        >
          &times;
        </button>
        
        {/* Image affichée dans la modale */}
        <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
        
        {/* Titre de l'image */}
        <div className="text-center mt-4 text-lg font-bold text-gray-600">{title}</div>
        
        {/* Boutons de navigation */}
        <div className="flex justify-between mt-4">
          <button 
            onClick={onPrev} 
            className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isPrevDisabled} // Désactive le bouton "Précédent" si isPrevDisabled est true
          >
            Précédent
          </button>
          <button 
            onClick={onNext} 
            className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isNextDisabled} // Désactive le bouton "Suivant" si isNextDisabled est true
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

