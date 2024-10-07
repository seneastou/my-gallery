import React, { useEffect, useState } from "react";

interface ModalProps {
  imageUrl: string;
  title: string;
  imageId: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}

export default function Modal({
  imageUrl,
  title,
  imageId,
  onClose,
  onNext,
  onPrev,
  isNextDisabled,
  isPrevDisabled,
}: ModalProps) {
  const localStorageKey = `comments-${imageId}`; 
  
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const savedComments = localStorage.getItem(localStorageKey);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [imageId]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedComments = [...comments, newComment]; // Fusionne les anciens commentaires avec le nouveau
      setComments(updatedComments);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedComments)); // Met à jour localStorage
      setNewComment(""); // Réinitialiser le champ de saisie
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedComments)); // Mettre à jour localStorage après suppression
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto animate-fadeIn">
        {/* Bouton pour fermer la modale */}
        <button
          onClick={onClose}
          className="absolute top-0.5 right-1 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 w-6 h-6 flex items-center justify-center text-lg leading-none"
        >
          &times;
        </button>

        {/* Image affichée dans la modale */}
        <img src={imageUrl} alt={title} className="w-full max-h-96 object-cover rounded-lg" />

        {/* Titre de l'image */}
        <div className="text-center mt-4 text-lg font-bold text-gray-600">
          {title}
        </div>

        {/* Section des commentaires */}
        <div className="mt-4">
            <h3 className="font-bold mb-2">Commentaires :</h3>
            {comments.length > 0 ? (
              <ul className="mb-4">
                {comments.map((comment, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{comment}</span>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => handleDeleteComment(index)}
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun commentaire pour le moment.</p>
            )}

            {/* Champ d'ajout de commentaire */}
            <div className="flex space-x-2">
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 flex-grow"
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Ajouter
              </button>
            </div>
          </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onPrev}
            className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ${
              isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPrevDisabled} // Désactive le bouton "Précédent" si isPrevDisabled est true
          >
            Précédent
          </button>
          <button
            onClick={onNext}
            className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isNextDisabled} // Désactive le bouton "Suivant" si isNextDisabled est true
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
