import "@stdlib/deploy";
import "@stdlib/ownable";
import "./util/repository_messages.tact";
import "./organization.tact";

contract Repository with Deployable, Ownable {

    owner: Address;
    repositoryId: Int as uint64;
    numOfOrganizations: Int as uint64;
    deployOrganizationFee: Int as uint64;

    init(repositoryId: Int) {
        self.owner = sender();
        self.repositoryId = repositoryId;
        self.numOfOrganizations = 0;  
        self.deployOrganizationFee = ton("0");
    }

    receive() {}

    receive(msg: DeployOrganization) {
        require(context().value >= self.deployOrganizationFee, "Insufficient funds to deploy organization");

        let init: StateInit = initOf Organization(myAddress(), self.numOfOrganizations);
        let organization: Address = contractAddress(init);

        send(SendParameters{
            to: organization, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: InitOrganization{owner: sender(), hidden: msg.hidden}.toCell(),
            code: init.code,
            data: init.data
        });

        self.numOfOrganizations += 1;
    }

    receive(msg: DeployOrganizationWithMetadata) {
        require(context().value >= self.deployOrganizationFee, "Insufficient funds to deploy organization");

        let init: StateInit = initOf Organization(myAddress(), self.numOfOrganizations);
        let organization: Address = contractAddress(init);

        send(SendParameters{
            to: organization, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: InitOrganizationWithMetadata{owner: sender(), hidden: msg.hidden, metadata: msg.metadata}.toCell(),
            code: init.code,
            data: init.data
        });

        self.numOfOrganizations += 1;
    }

    receive(msg: SetDeployOrgFee) {
        self.requireOwner();
        self.deployOrganizationFee = msg.newFee;
    }

    receive("withdraw all"){
        self.requireOwner();
        send(SendParameters{to: sender(), bounce: true, value: 0, mode: (SendRemainingBalance + SendIgnoreErrors)});
    }

    get fun numOfOrganizations(): Int {
        return self.numOfOrganizations;
    }

    get fun deployOrganizationFee(): Int {
        return self.deployOrganizationFee;
    }

    get fun organizationAddress(organizationId: Int): Address {
        let init: StateInit = initOf Organization(myAddress(), organizationId);
        return contractAddress(init);
    }
}
