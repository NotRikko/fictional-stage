import { useState } from "react";
import { useRound } from "../hooks/useRound";
import type { Character } from "../models/character";
import CharacterCard from "../components/CharacterCard";
import VoteModal from "../components/VoteModal";
import CharacterDetailModal from "../components/CharacterDetailModal";

export default function RoundPage() {
  const {
    round,
    contestants,
    vote,
    isVoting,
    hasVoted,
    votedCharacter,
    setVotedCharacter,
  } = useRound(1);

  const [selected, setSelected] = useState<Character | null>(null);
  const [showVoteModal, setShowVoteModal] = useState(false);

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-8 text-white bg-black">
      <h1 className="text-4xl font-bold mb-4">{round?.name}</h1>
      <p className="text-3xl mb-8">{round?.description}</p>

      <div className="flex w-full justify-around">
        {contestants?.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            isVoting={isVoting === c.id}
            hasVoted={hasVoted === c.id}
            onVote={async (id) => {
              await vote(id);
              setShowVoteModal(true);
            }}
            onSelect={(character) => setSelected(character)}
          />
        ))}
      </div>

      {showVoteModal && votedCharacter && (
        <VoteModal
          votedCharacter={votedCharacter}
          onClose={() => {
            setShowVoteModal(false);
            setVotedCharacter(null);
          }}
        />
      )}

      {selected && (
        <CharacterDetailModal
          character={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}