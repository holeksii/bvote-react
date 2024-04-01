import "./metadata.tact";
import "./arrays.tact";

message InitOrganization {
    owner: Address;
    hidden: Bool;
}

message InitOrganizationWithMetadata {
    owner: Address;
    hidden: Bool;
    metadata: Metadata;
}

message DeployVoting {
    candidates: CandidateArray;
    voteFee: Int as uint64;
    votesPerCandidate: Int as uint64;
    startTime: Int as uint64;
    timeToLive: Int as uint64;
}

message DeployVotingWithMetadata {
    candidates: CandidateArray;
    voteFee: Int as uint64;
    votesPerCandidate: Int as uint64;
    startTime: Int as uint64;
    timeToLive: Int as uint64;
    metadata: Metadata;
}

message SetDeployVotingFee {
    newFee: Int as uint64;
}

struct OrganizationBasicInfo {
    hidden: Bool;
    emoji: String;
    name: String;
    website: String;
}

struct OrganizationAllInfo {
    owner: Address;
    hidden: Bool;
    emoji: String;
    name: String;
    description: String;
    website: String;
    numOfVotings: Int as uint64;
}
