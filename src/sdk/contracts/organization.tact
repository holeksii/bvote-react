import "@stdlib/deploy";
import "@stdlib/ownable";
import "./util/organization_messages.tact";
import "./util/metadata.tact";
import "./voting.tact";

contract Organization with Deployable, Ownable {

    repository: Address;
    organizationId: Int as uint64;
    hidden: Bool;
    metadata: Metadata;

    owner: Address;
    numOfVotings: Int as uint64;
    deployVotingFee: Int as uint64;
    lastChanged: Int as uint64;

    init(repository: Address, organizationId: Int) {
        require(sender() == repository, "Only repository can deploy organization");

        self.repository = repository;
        self.organizationId = organizationId;
        self.hidden = true;
        
        self.owner = newAddress(0, 0x0);
        self.numOfVotings = 0;
        self.deployVotingFee = ton("0");
        self.lastChanged = now();

        self.metadata = Metadata{
            name: "",
            description: "",
            emoji: "",
            website: ""
        };
    }

    receive() {}

    receive(msg: InitOrganization) {
        self.owner = msg.owner;
        self.hidden = msg.hidden;
        self.lastChanged = now();
    }

    receive(msg: InitOrganizationWithMetadata) {
        self.owner = msg.owner;
        self.hidden = msg.hidden;
        self.metadata = msg.metadata;
        self.lastChanged = now();
    }

    receive(msg: DeployVoting) {
        require(context().value >= self.deployVotingFee, "Not enough value to deploy voting");

        let stime: Int = msg.startTime;
        if (stime == 0) {
            stime = now();
        } else {
            require(stime > now(), "Start time should be in the future");
        }

        let init: StateInit = initOf Voting(myAddress(), self.numOfVotings);
        let voting: Address = contractAddress(init);

        send(SendParameters{
            to: voting, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: InitVoting{owner: sender(), candidates: msg.candidates, voteFee: msg.voteFee, votesPerCandidate: msg.votesPerCandidate,
                startTime: stime, timeToLive: msg.timeToLive}.toCell(),
            code: init.code,
            data: init.data
        });

        self.numOfVotings += 1;
        self.lastChanged = now();
    }

    receive(msg: DeployVotingWithMetadata) {
        require(context().value >= self.deployVotingFee, "Not enough value to deploy voting");

        let init: StateInit = initOf Voting(myAddress(), self.numOfVotings);
        let voting: Address = contractAddress(init);

        send(SendParameters{
            to: voting, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: InitVotingWithMetadata{owner: sender(), candidates: msg.candidates, voteFee: msg.voteFee, votesPerCandidate: msg.votesPerCandidate,
                startTime: msg.startTime, timeToLive: msg.timeToLive, metadata: msg.metadata}.toCell(),
            code: init.code,
            data: init.data
        });

        self.numOfVotings += 1;
        self.lastChanged = now();
    }

    receive(msg: SetDeployVotingFee) {
        self.requireOwner();
        self.deployVotingFee = msg.newFee;
    }

    receive("withdraw all"){
        self.requireOwner();
        send(SendParameters{to: sender(), bounce: true, value: 0, mode: (SendRemainingBalance + SendIgnoreErrors)});
    }

    get fun numOfVotings(): Int {
        return self.numOfVotings;
    }

    get fun deployVotingFee(): Int {
        return self.deployVotingFee;
    }

    get fun lastChanged(): Int {
        return self.lastChanged;
    }

    get fun hidden(): Bool {
        return self.hidden;
    }

    get fun metadata(): Metadata {
        return self.metadata;
    }

    get fun organizationId(): Int {
        return self.organizationId;
    }

    get fun repository(): Address {
        return self.repository;
    }

    get fun votingAddress(votingId: Int): Address {
        let init: StateInit = initOf Voting(myAddress(), votingId);
        return contractAddress(init);
    }

    get fun basicInfo(): OrganizationBasicInfo {
        return OrganizationBasicInfo{
            hidden: self.hidden,
            emoji: self.metadata.emoji,
            name: self.metadata.name,
            website: self.metadata.website
        };
    }

    get fun allInfo(): OrganizationAllInfo {
        return OrganizationAllInfo{
            owner: self.owner,
            hidden: self.hidden,
            emoji: self.metadata.emoji,
            name: self.metadata.name,
            description: self.metadata.description,
            website: self.metadata.website,
            numOfVotings: self.numOfVotings
        };
    }
}
