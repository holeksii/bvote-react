import { CandidateArray, VoteArray } from './Organization';
import { Dictionary } from '@ton/core';

export function NewCandidateArray(candidates: string[][]): CandidateArray {
    let candidateArray: CandidateArray = {
        $$type: 'CandidateArray',
        size: BigInt(candidates.length),
        candidates: Dictionary.empty(),
    };

    for (let i = 0; i < candidates.length; i++) {
        candidateArray.candidates = candidateArray.candidates.set(BigInt(i), {
            $$type: 'Candidate',
            name: candidates[i][0],
            info: candidates[i][1],
            votes: 0n,
        });
    }

    return candidateArray;
}

export function NewVoteArray(votes: bigint[][]): VoteArray {
    let voteArray: VoteArray = {
        $$type: 'VoteArray',
        size: BigInt(votes.length),
        votesMap: Dictionary.empty(),
    };

    for (let i = 0; i < votes.length; i++) {
        voteArray.votesMap = voteArray.votesMap.set(votes[i][0], votes[i][1]);
    }

    return voteArray;
}
