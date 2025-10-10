import { useState, useEffect } from "react";
import type { Round } from "../models/round";
import type { Character } from "../models/character";
import { roundApi } from "../api/roundApi";
import { voteApi } from "../api/voteApi";

export default function RoundPage() {
    type VotedCharacter = Character & { totalVotes: number };

    const [round, setRound] = useState<Round | null>(null);
    const [contestants, setContestants] = useState<Character[] | null>(null);
    const [selected, setSelected] = useState<Character | null>(null);
    const [isVoting, setIsVoting] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState<number | null>(null);
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [votedCharacter, setVotedCharacter] = useState<VotedCharacter | null>(null);

    useEffect(() => {
        const fetchRound = async () => {
          try {
            const result = await roundApi.getRoundById(1);
            setRound(result);
    
            if (result.contestants) {
              setContestants(result.contestants);
            }
          } catch (error) {
            console.error("Error fetching round:", error);
          }
        };
    
        fetchRound();
      }, []);

    const handleVote = async (contestantId: number) => {
        if (!round || !contestants) return;
        setIsVoting(contestantId);

        try {
            const data = await voteApi.createVote({
                userId: 1, // replace with logged-in user’s ID from context later
                characterVote: contestantId,
              });

            console.log(data);

            const votedChar = contestants.find((c) => c.id === contestantId);
                if (votedChar) {
                    setVotedCharacter({
                        ...votedChar,         
                        totalVotes: data.totalVotes, 
                    });
            }
            setHasVoted(contestantId);
            setShowVoteModal(true);
        } catch (err) {
            console.error("Error voting:", err);
            alert("Failed to vote. Please try again.");
        } finally {
            setIsVoting(null);
        }
    };

    return (
        <div className="flex flex-col items-center relative w-full min-h-screen  p-8 text-white bg-black">
            <h1 className="text-4xl font-bold mb-4">{round?.name}</h1>
            <p className="text-3xl mb-8">{round?.description}</p>

            <div className="flex w-full justify-around">
                {contestants?.map((c) => (
                    <div
                        key={c.id}
                        className={`p-12 h-[calc(100vh-250px)] w-1/3 flex flex-col justify-center items-center relative cursor-pointer transition-transform transform hover:scale-105 border-2 border-white rounded-lg${
                            selected ? "hidden" : "block"
                        }`}
                        onClick={() => setSelected(c)}
                    >
                    <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="w-4/5 h-96 object-cover rounded-lg"
                    />
                    <p className="text-lg font-bold mt-2">{c.name}</p>
                    <p className="text-sm">{c.series}</p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleVote(c.id);
                          }}
                        disabled={isVoting === c.id || hasVoted === c.id}
                        className={`mt-6 px-6 py-3 rounded-lg text-lg font-bold transition-all w-2/3 
                            ${
                            hasVoted === c.id
                                ? "bg-green-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                        {isVoting === c.id
                            ? "Submitting..."
                            : hasVoted === c.id
                            ? "Voted!"
                            : "Vote"}
                    </button>
                    </div>
                ))}
            </div>

            {showVoteModal && votedCharacter && (
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
                        <p className="text-lg">
                            Total votes: {votedCharacter.totalVotes}
                        </p>
                        <p className="text-lg mb-6 text-gray-700">{votedCharacter.series}</p>
                        <button
                            onClick={() => setShowVoteModal(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {selected && (
                <div
                className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-8 text-white"
                onClick={() => setSelected(null)}
                >
                <img
                    src={selected.imageUrl}
                    alt={selected.name}
                    className="w-96 h-96 object-cover rounded-lg mb-4"
                />
                <h2 className="text-4xl font-bold mb-2">{selected.name}</h2>
                <p className="text-xl mb-2">{selected.series}</p>
                <p className="max-w-xl text-center">{selected.biography}</p>
                <p className="mt-4 text-sm opacity-70">Click anywhere to close</p>
                </div>
            )}
        </div>
    );
}