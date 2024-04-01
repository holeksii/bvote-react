import "@stdlib/deploy";
import "@stdlib/ownable";
import "./util/arrays.tact";
import "./util/vote_messages.tact";

contract Vote with Deployable, Ownable {
    
    owner: Address;
    voting: Address;
    candidateInd: Int as uint64;
    numOfVotes: Int as uint64;

    init(voting: Address, owner: Address) {
        require(sender() == voting, "Only the voting contract can deploy this contract");

        self.owner = owner;
        self.voting = voting;
        self.candidateInd = -1;
        self.numOfVotes = 0;
    }

    receive(msg: CastVote) {
        send(SendParameters{
            to: self.owner,
            value: 0,
            bounce: true,
            mode: SendRemainingValue
        });
        
        require(self.numOfVotes == 0, "Votes already casted");
        require(self.owner == msg.owner, "Only the owner can cast votes");
        self.owner = msg.owner;
        self.candidateInd = msg.candidateInd;
        self.numOfVotes = msg.numOfVotes;
    }

    get fun voting(): Address {
        return self.voting;
    }

    get fun candidateInd(): Int {
        return self.candidateInd;
    }

    get fun numOfVotes(): Int {
        return self.numOfVotes;
    }
}
