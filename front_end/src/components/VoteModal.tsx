import type { Character } from "../models/character";

type VotedCharacter = Character & { totalVotes: number };

interface VoteModalProps {
  votedCharacter: VotedCharacter;
  onClose: () => void;
}

export default function VoteModal({ votedCharacter, onClose }: VoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-2xl text-center shadow-lg max-w-md w-full relative">
        <h2 className="text-3xl font-bold mb-4">Vote Recorded!</h2>
        <img
          src={votedCharacter.imageUrl}
          alt={votedCharacter.name}
          className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
        />
        <p className="text-2xl font-semibold mb-2">
          You voted for <span className="text-blue-700">{votedCharacter.name}</span>!
        </p>
        <p className="text-lg">Total votes: {votedCharacter.totalVotes}</p>
        <p className="text-lg mb-6 text-gray-700">{votedCharacter.series}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}