import "./metadata.tact";

message DeployOrganization {
    hidden: Bool;
}

message DeployOrganizationWithMetadata {
    hidden: Bool;
    metadata: Metadata;
}

message SetDeployOrgFee {
    newFee: Int as uint64;
}
