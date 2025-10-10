import type { Character } from "../models/character";

interface CharacterDetailModalProps {
  character: Character;
  onClose: () => void;
}

export default function CharacterDetailModal({ character, onClose }: CharacterDetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-8 text-white"
      onClick={onClose}
    >
      <img
        src={character.imageUrl}
        alt={character.name}
        className="w-96 h-96 object-cover rounded-lg mb-4"
      />
      <h2 className="text-4xl font-bold mb-2">{character.name}</h2>
      <p className="text-xl mb-2">{character.series}</p>
      <p className="max-w-xl text-center">{character.biography}</p>
      <p className="mt-4 text-sm opacity-70">Click anywhere to close</p>
    </div>
  );
}