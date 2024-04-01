import { Link } from "react-router-dom";

import { Key, useState } from "react";

import { useEffect } from "react";
import { useTonClient } from "../hooks/useTonClient";
import { useNavigate } from "react-router-dom";
import {
  Metadata,
  Organization,
  OrganizationAllInfo,
  storeDeployVotingWithMetadata,
} from "../sdk/wrappers/Organization";
import { Voting } from "../sdk/wrappers/Voting";
import { Address, beginCell, fromNano, toNano } from "@ton/core";
import Box from "../components/Page/Box";
import InfoTable from "../components/Page/InfoTable";
import {
  SendTransactionRequest,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import FormsCustom from "../components/Forms/Custom";
import Overlay from "../components/Page/Overlay";
import { NewCandidateArray } from "../sdk/wrappers/Arrays";

const pageSize = 4;

/*
    candidates: CandidateArray;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    timeToLive: bigint;
    metadata: Metadata;

    CandidateArray: {
          size: bigint;
    candidates: Dictionary<bigint, Candidate>;
    }
    Candidate: {
          name: string;
    info: string;
    votes: bigint;
    }

    export type Metadata = {
    $$type: 'Metadata';
    name: string;
    description: string;
    emoji: string;
    website: string;
}

*/

const newVotingFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    initialValue: "",
    isRequired: true,
  },
  { name: "emoji", label: "Emoji", type: "emoji", isRequired: true },
  {
    name: "website",
    label: "Website",
    type: "text",
    initialValue: "",
    isRequired: false,
  },

  {
    name: "voteFee",
    label: "Vote Fee (TON)",
    type: "number",
    initialValue: "0",
    min: 0,
    step: 0.001,
    isRequired: true,
  },
  {
    name: "votesPerCandidate",
    label: "Votes Per Candidate",
    type: "number",
    initialValue: 1,
    min: 1,
    isRequired: true,
  },
  {
    name: "startTime",
    label: "Start Time",
    type: "datepicker",
    initialValue: new Date(),
    isRequired: true,
  },
  {
    name: "endTime",
    label: "End Time",
    type: "datepicker",
    initialValue: new Date(),
    isRequired: true,
  },
  {
    name: "candidates",
    label: "Candidates",
    type: "reccuring",
    initialValue: [],
    isRequired: true,
    fields: [
      { name: "name", label: "Name", type: "text", initialValue: "" },
      { name: "info", label: "Info", type: "text", initialValue: "" },
    ],
  },
] as any;

export default () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const contractAddress = params.get("a");

  const tonClient = useTonClient();
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);

  const [votings, setVotings] = useState([] as any[]);

  const [metadata, setMetadata] = useState({} as Metadata);
  const [organizationInfo, setOrganizationInfo] = useState(
    {} as OrganizationAllInfo,
  );

  const [contractBalance, setContractBalance] = useState(0n);

  let [total, setTotal] = useState(0n);
  let [totalLoaded, setTotalLoaded] = useState(0n);

  // vote deployment
  const [overlayVisible, setOverlayVisible] = useState(false);

  function allInfo() {
    const fields = {
      Owner: {
        type: "address",
        value: organizationInfo.owner.toString(),
      },
      Contract: {
        type: "address",
        value: contractAddress,
      },
      "Number of Votings": {
        type: "string",
        value: organizationInfo.numOfVotings.toString(),
      },
    } as any;

    if (metadata.website !== "") {
      fields["Website"] = {
        type: "url",
        value: metadata.website,
      };
    }

    // if owner is me add deploy voting fee
    if (isMyOrganization()) {
      fields["Contract Balance"] = {
        type: "string",
        value: fromNano(contractBalance).toString() + " TON",
      };
    }

    return fields;
  }

  function isMyOrganization() {
    if (!wallet) return false;
    if (!organizationInfo.owner) return false;
    return wallet?.account.address === organizationInfo.owner.toRawString();
  }

  async function loadMore() {
    if (tonClient === undefined) return;
    setIsUpdating(true);

    const provider = tonClient.provider(Address.parse(contractAddress!));
    const organization = provider.open(
      Organization.fromAddress(Address.parse(contractAddress!)),
    );

    // calculate based on how many left
    const left = Number(total - totalLoaded);

    let newVotings = await Promise.all(
      Array.from({
        length: Math.min(pageSize, left),
      }).map(async (_, index) => {
        const i = BigInt(index) + totalLoaded;
        const i_reverse = total - i - 1n;
        const vote = await Voting.fromAddress(
          await organization.getVotingAddress(i_reverse),
        );

        try {
          const info = await vote.getAllInfo(tonClient.provider(vote.address));

          return {
            address: vote.address.toString(),
            info,
          };
        } catch (e) {
          return null;
        }
      }),
    );

    // add total loaded
    setTotalLoaded(totalLoaded + BigInt(newVotings.length));

    // remove nulls (not yet deployed votings)
    newVotings = newVotings.filter((org) => org !== null);

    setVotings([...votings, ...newVotings]);
    setIsLoaded(true);
    setIsUpdating(false);
  }

  async function fetchBlockchain() {
    if (tonClient === undefined) return;

    const provider = tonClient.provider(Address.parse(contractAddress!));
    const organization = provider.open(
      Organization.fromAddress(Address.parse(contractAddress!)),
    );

    const numOfVotings = await organization.getNumOfVotings();
    const metadata = await organization.getMetadata();
    const info = await organization.getAllInfo();

    const contractBalance = await tonClient.getBalance(
      Address.parse(contractAddress!),
    );

    setContractBalance(contractBalance);

    // set
    setMetadata(metadata);
    setOrganizationInfo(info);

    setTotal(numOfVotings);
    // force update for quick load
    total = numOfVotings;

    await loadMore();
  }

  async function deployVoting(data: any) {
    if (!tonClient) return;

    setOverlayVisible(false);

    const organization = await Organization.fromAddress(
      Address.parse(contractAddress!),
    );

    const deployFee = await organization.getDeployVotingFeePlusTonToLive(
      tonClient.provider(organization.address),
    );

    const tx: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: organization.address.toRawString(),
          amount: (deployFee + toNano(0.1)).toString(),
          payload: beginCell()
            .store(
              storeDeployVotingWithMetadata({
                $$type: "DeployVotingWithMetadata",
                metadata: {
                  $$type: "Metadata",
                  name: data.name,
                  description: data.description,
                  emoji: data.emoji,
                  website: data.website,
                },
                voteFee: toNano(data.voteFee),
                votesPerCandidate: BigInt(data.votesPerCandidate),
                startTime: BigInt(Math.floor(data.startTime.getTime() / 1000)),
                timeToLive: BigInt(
                  Math.floor(
                    (data.endTime.getTime() - data.startTime.getTime()) / 1000,
                  ),
                ),
                candidates: NewCandidateArray(
                  data.candidates.map((candidate: any) => [
                    candidate.name,
                    candidate.info,
                  ]),
                ),
              }),
            )
            .endCell()
            .toBoc()
            .toString("base64"),
        },
      ],
    };
    await tonConnectUi.sendTransaction(tx);
  }

  async function withdrawFunds() {
    if (!tonClient) return;

    const organization = await Organization.fromAddress(
      Address.parse(contractAddress!),
    );

    const tx: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: organization.address.toRawString(),
          amount: toNano(0.1).toString(),
          payload: beginCell()
            .storeUint(0, 32)
            .storeStringTail("withdrawSafe")
            .endCell()
            .toBoc()
            .toString("base64"),
        },
      ],
    };
    await tonConnectUi.sendTransaction(tx);
  }

  // on mounted
  useEffect(() => {
    fetchBlockchain().catch((error) => {
      fetchBlockchain().catch((error) => {
        navigate("/error");
      });
    });
  }, [tonClient]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-2/5 p-2 sticky">
        <Box name={isLoaded ? metadata.name : "Loading..."}>
          <div className="">
            {isLoaded ? (
              <div>
                <div className="flex w-full items-center justify-center mb-2 select-none">
                  <div className="rounded-full text-3xl bg-gray-300 w-14 h-14 mr-2 flex items-center justify-center">
                    {metadata.emoji}
                  </div>
                </div>

                <div className="font-light mb-2">{metadata.description}</div>

                <InfoTable info={allInfo()} />
              </div>
            ) : (
              <div className="animate-pulse flex flex-col gap-2">
                {Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="h-5 bg-slate-800 w-full"></div>
                  ))}
              </div>
            )}
          </div>
        </Box>
        {isMyOrganization() && (
          <div>
            <div className="flex flex-row w-full justify-between gap-2">
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-xl mt-4"
                onClick={() => {
                  if (!wallet) tonConnectUi.openModal();
                  else setOverlayVisible(true);
                }}
              >
                Create Voting
              </button>
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-xl mt-4"
                onClick={() => {
                  if (!wallet) tonConnectUi.openModal();
                  else withdrawFunds();
                }}
              >
                Withdraw Funds
              </button>
            </div>
            <Overlay
              isOpen={overlayVisible}
              onClose={() => setOverlayVisible(false)}
            >
              <div className="text-xl mb-2">Create Voting</div>
              <FormsCustom
                fields={newVotingFields}
                onFormSubmit={deployVoting}
              />
            </Overlay>
          </div>
        )}
      </div>
      <div className="w-full sm:w-3/5 p-2">
        <div className="grid md:grid-cols-2 gap-4">
          {votings.map((voting) => (
            <Link key={voting.address} to={`/voting?a=${voting.address}`}>
              <Box name={voting.info.name} hover={true}>
                <div className="flex flex-row">
                  <div className="w-2/5">
                    <div className="flex w-full items-center justify-center mb-2 h-full">
                      <div className="rounded-full text-3xl bg-gray-300 w-14 h-14 mr-2 flex items-center justify-center">
                        {voting.info.emoji}
                      </div>
                    </div>
                  </div>
                  <div className="w-3/5 pl-2">
                    <div className="font-light h-24 overflow-y-scroll">
                      {voting.info.description}
                    </div>
                  </div>
                </div>
              </Box>
            </Link>
          ))}
          {!isLoaded &&
            Array(pageSize)
              .fill(0)
              .map((_, index) => (
                <Box
                  hover={false}
                  className="animate-pulse"
                  key={index}
                  name={"Loading..."}
                >
                  <div className="flex flex-row">
                    <div className="w-2/5">
                      <div className="flex w-full items-center justify-center mb-2 h-full">
                        <div className="rounded-full text-3xl bg-gray-300 w-14 h-14 mr-2 flex items-center justify-center"></div>
                      </div>
                    </div>
                    <div className="w-3/5 pl-2">
                      <div className="font-light h-24 overflow-y-scroll">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="h-5 bg-slate-800 mb-2 w-full"
                            ></div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
        </div>

        <div className="flex justify-center mt-4">
          {totalLoaded < total && isLoaded && (
            <button
              className={
                "bg-slate-900 text-white px-4 py-2 rounded-xl animate-" +
                (isUpdating ? "cursor-not-allowed animate-pulse" : "")
              }
              onClick={() => {
                !isUpdating && loadMore();
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
