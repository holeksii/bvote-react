import "./arrays.tact";

message CastVote {
    owner: Address;
    candidateInd: Int as uint64;
    numOfVotes: Int as uint64;
}
