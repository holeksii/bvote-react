import { useState } from "react";
import { useEffect } from "react";
import { useTonClient } from "../hooks/useTonClient";
import {
  Metadata,
  Voting,
  VotingAllInfo,
  storeDeployAndCastVote,
} from "../sdk/wrappers/Voting";
import { Address, beginCell, fromNano, toNano } from "@ton/core";
import Box from "../components/Page/Box";
import ProgressBar from "../components/Page/ProgressBar";
import InfoTable from "../components/Page/InfoTable";
import {
  SendTransactionRequest,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import Overlay from "../components/Page/Overlay";
import FormsCustom from "../components/Forms/Custom";

import { useNavigate } from "react-router-dom";

import { Vote } from "../sdk/wrappers/Vote";

export default () => {
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const tonClient = useTonClient();

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const contractAddress = params.get("a");

  const [isLoaded, setIsLoaded] = useState(false);

  const [candidateId, setCandidateId] = useState(null as number | null);

  const [votingInfo, setVotingInfo] = useState({} as VotingAllInfo);

  const [candidates, setCandidates] = useState([] as any[]);
  const [totalVotes, setTotalVotes] = useState(0n);

  // vote casting
  const [overlayVisible, setOverlayVisible] = useState(false);

  function getVoteFormFields() {
    return [
      {
        name: "numOfVotes",
        label: "Number of votes",
        type: "number",
        max: votingInfo.votesPerCandidate ?? 1,
        min: 1,
        initialValue: 1,
      },
    ];
  }

  function getStatus() {
    const timeStart = new Date(
      parseInt(votingInfo.startTime.toString()) * 1000,
    );
    const timeEnd = new Date(parseInt(votingInfo.endTime.toString()) * 1000);
    const timeNow = new Date();

    return timeNow > timeStart && timeNow < timeEnd
      ? "Active"
      : timeNow < timeStart
        ? "Waiting"
        : "Ended";
  }

  function allInfo() {
    const timeStart = new Date(
      parseInt(votingInfo.startTime.toString()) * 1000,
    );
    const timeEnd = new Date(parseInt(votingInfo.endTime.toString()) * 1000);
    const timeNow = new Date();

    const fields = {
      Status: {
        type: "status",
        // check if voting has started or not ended. Active, Ended, Waiting
        value: getStatus(),
      },
      Contract: {
        type: "address",
        value: contractAddress,
      },
      "Start time": {
        type: "string",
        value:
          timeStart.toLocaleTimeString() + " " + timeStart.toLocaleDateString(),
      },
      "End time": {
        type: "string",
        value:
          timeEnd.toLocaleTimeString() + " " + timeEnd.toLocaleDateString(),
      },
      "Vote fee": {
        type: "string",
        value: fromNano(votingInfo.voteFee) + " TON",
      },
      "Total votes": {
        type: "number",
        value: votingInfo.numOfVotes.toString(),
      },
    };

    return fields;
  }

  async function fetchBlockchain() {
    if (tonClient === undefined) {
      return;
    }

    const provider = tonClient.provider(Address.parse(contractAddress!));

    const voting = provider.open(
      Voting.fromAddress(Address.parse(contractAddress!)),
    );

    const candidatesDict = await voting.getCandidates();
    const candidates = candidatesDict.candidates.values();

    const info = await voting.getAllInfo();

    setCandidates(candidates);
    setVotingInfo(info);

    setTotalVotes(
      candidates.reduce((acc, candidate) => acc + candidate.votes, 0n),
    );

    setIsLoaded(true);
  }

  async function castSpell(data: { numOfVotes: number }) {
    if (!tonClient) return;
    setOverlayVisible(false);

    const voting = Voting.fromAddress(Address.parse(contractAddress!));
    // check if voted
    const voteAddress = await voting.getVoteAddress(
      tonClient.provider(voting.address),
      Address.parseRaw(wallet!.account.address),
    );

    const vote = Vote.fromAddress(voteAddress);

    try {
      await vote.getVoting(tonClient.provider(vote.address));
      alert("You have already voted in this voting");
      return;
    } catch (e) {
      // continue
    }

    // calculate the amount of TON to send
    const amount = votingInfo.voteFee * BigInt(data.numOfVotes) + toNano(0.1);

    const tx: SendTransactionRequest = {
      // The transaction is valid for 10 minutes from now, in unix epoch seconds.
      validUntil: Math.floor(Date.now() / 1000) + 600,

      messages: [
        {
          // repo address
          address: voting.address.toRawString(),
          // 0.1 TON to deploy new organization
          amount: amount.toString(),
          payload: beginCell()
            .store(
              storeDeployAndCastVote({
                $$type: "DeployAndCastVote",
                candidateInd: BigInt(candidateId!),
                numOfVotes: BigInt(data.numOfVotes),
              }),
            )
            .endCell()
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    const res = await tonConnectUi.sendTransaction(tx);
  }

  // ping update
  useEffect(() => {
    fetchBlockchain().catch((error) => {
      fetchBlockchain().catch((error) => {
        navigate("/error");
      });
    });

    const interval = setInterval(() => {
      fetchBlockchain();
    }, 8000);

    // clear on unmount
    return () => clearInterval(interval);
  }, [tonClient]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/2 md:w-2/6 p-2">
        <Box name={isLoaded ? votingInfo.name : "Loading..."}>
          <div className="">
            {isLoaded ? (
              <div>
                <div className="flex w-full items-center justify-center mb-2">
                  <div className="rounded-full text-3xl bg-gray-300 w-14 h-14 mr-2 flex items-center justify-center">
                    {votingInfo.emoji}
                  </div>
                </div>

                <div className="font-light">{votingInfo.description}</div>
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
      </div>
      <div className="w-full sm:w-1/2 md:w-2/6 p-2">
        <Box name="Voting Info">
          {isLoaded ? (
            <InfoTable info={allInfo()} />
          ) : (
            <div className="animate-pulse flex flex-col gap-2">
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="h-5 bg-slate-800 w-full"></div>
                ))}
            </div>
          )}
        </Box>
      </div>
      <div className="w-full md:w-2/6 p-2">
        <Box name="Candidates">
          {isLoaded ? (
            candidates.map((candidate, index) => {
              return (
                <ProgressBar
                  name={candidate.name}
                  onClick={() => {
                    // if status not active, do not allow voting
                    if (getStatus() !== "Active") return;
                    if (!wallet) {
                      tonConnectUi.openModal();
                      return;
                    }
                    setCandidateId(index);
                    setOverlayVisible(true);
                  }}
                  className="cursor-pointer hover:bg-slate-800"
                  progress={
                    totalVotes > 0
                      ? Number.parseInt(
                          ((candidate.votes * 100n) / totalVotes).toString(),
                        )
                      : 0
                  }
                  key={index}
                />
              );
            })
          ) : (
            <div className="animate-pulse">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <ProgressBar name="Loading..." progress={0} key={index} />
                ))}
            </div>
          )}
        </Box>
      </div>
      {isLoaded && (
        <Overlay
          isOpen={overlayVisible}
          onClose={() => setOverlayVisible(false)}
        >
          <div className="text-xl mb-2">Cast vote</div>
          <div className="text-base mb-2">
            {candidateId !== null
              ? `You are voting for ${candidates[candidateId ?? 0].name}`
              : ""}
          </div>
          <div className="text-sm mb-2">{`Price: ${fromNano(votingInfo.voteFee)} TON per 1 vote`}</div>
          <div className="text-sm mb-2">{`Max votes per voter: ${votingInfo.votesPerCandidate}`}</div>
          <FormsCustom
            fields={getVoteFormFields() as any}
            onFormSubmit={castSpell}
          />
        </Overlay>
      )}
    </div>
  );
};
