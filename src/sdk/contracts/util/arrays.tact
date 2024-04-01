struct Candidate {
    name: String;
    info: String;
    votes: Int as uint64;
}

struct CandidateArray {
    size: Int as uint64;
    candidates: map<Int as uint64, Candidate>; // candidateId -> candidate
}

struct VoteArray {
    size: Int as uint64;
    votesMap: map<Int as uint64, Int as uint64>; // candidateId -> voteCount
}
