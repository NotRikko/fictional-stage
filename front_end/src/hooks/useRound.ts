import { useState, useEffect } from "react";
import { roundApi } from "../api/roundApi";
import { voteApi } from "../api/voteApi";
import type { Round } from "../models/round";
import type { Character } from "../models/character";

export function useRound(roundId: number) {
  type VotedCharacter = Character & { totalVotes: number };

  const [round, setRound] = useState<Round | null>(null);
  const [contestants, setContestants] = useState<Character[] | null>(null);
  const [isVoting, setIsVoting] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<number | null>(null);
  const [votedCharacter, setVotedCharacter] = useState<VotedCharacter | null>(null);

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const result = await roundApi.getRoundById(roundId);
        setRound(result);
        if (result.contestants) setContestants(result.contestants);
      } catch (error) {
        console.error("Error fetching round:", error);
      }
    };
    fetchRound();
  }, [roundId]);

  const vote = async (contestantId: number) => {
    if (!round || !contestants) return;
    setIsVoting(contestantId);

    try {
      const data = await voteApi.createVote({
        userId: 1,
        characterVote: contestantId,
      });

      const votedChar = contestants.find((c) => c.id === contestantId);
      if (votedChar) {
        setVotedCharacter({ ...votedChar, totalVotes: data.totalVotes });
      }
      setHasVoted(contestantId);
    } catch (err) {
      console.error("Error voting:", err);
      alert("Failed to vote. Please try again.");
    } finally {
      setIsVoting(null);
    }
  };

  return {
    round,
    contestants,
    vote,
    isVoting,
    hasVoted,
    votedCharacter,
    setVotedCharacter,
  };
}