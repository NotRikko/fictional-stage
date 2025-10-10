import type { Character } from "../models/character";

interface CharacterCardProps {
  character: Character;
  isVoting: boolean;
  hasVoted: boolean;
  onVote: (id: number) => void;
  onSelect: (character: Character) => void;
}

export default function CharacterCard({
  character,
  isVoting,
  hasVoted,
  onVote,
  onSelect,
}: CharacterCardProps) {
  return (
    <div
      key={character.id}
      className={`p-12 h-[calc(100vh-250px)] w-1/3 flex flex-col justify-center items-center relative cursor-pointer transition-transform transform hover:scale-105 border-2 border-white rounded-lg`}
      onClick={() => onSelect(character)}
    >
      <img
        src={character.imageUrl}
        alt={character.name}
        className="w-4/5 h-96 object-cover rounded-lg"
      />
      <p className="text-lg font-bold mt-2">{character.name}</p>
      <p className="text-sm">{character.series}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote(character.id);
        }}
        disabled={isVoting || hasVoted}
        className={`mt-6 px-6 py-3 rounded-lg text-lg font-bold transition-all w-2/3 
          ${hasVoted ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {isVoting ? "Submitting..." : hasVoted ? "Voted!" : "Vote"}
      </button>
    </div>
  );
}