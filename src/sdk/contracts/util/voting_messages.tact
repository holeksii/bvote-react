import "./metadata.tact";
import "./arrays.tact";

message InitVoting {
    owner: Address;
    candidates: CandidateArray;
    voteFee: Int as uint64;
    votesPerCandidate: Int as uint64;
    startTime: Int as uint64;
    timeToLive: Int as uint64;
}

message InitVotingWithMetadata {
    owner: Address;
    candidates: CandidateArray;
    voteFee: Int as uint64;
    votesPerCandidate: Int as uint64;
    startTime: Int as uint64;
    timeToLive: Int as uint64;
    metadata: Metadata;
}

message DeployAndCastVote {
    candidateInd: Int as uint64;
    numOfVotes: Int as uint64;
}

struct VotingBasicInfo {
    emoji: String;
    name: String;
    startTime: Int as uint64;
    endTime: Int as uint64;
}

struct VotingAllInfo {
    organization: Address;
    emoji: String;
    name: String;
    description: String;
    numOfVotes: Int as uint64;
    voteFee: Int as uint64;
    votesPerCandidate: Int as uint64;
    startTime: Int as uint64;
    endTime: Int as uint64;
}
