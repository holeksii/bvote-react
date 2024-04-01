import { useState } from "react";

import { useTonClient } from "../../hooks/useTonClient";
import { Metadata, Voting } from "../../sdk/wrappers/Voting";
import { Address, beginCell, fromNano, toNano } from "@ton/core";

import { useNavigate } from "react-router-dom";
import { Organization } from "../../sdk/wrappers/Organization";

export default () => {
  const tonClient = useTonClient();

  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);

  async function findContract(address: string) {
    if (!tonClient) return;

    let addressParsed = null as Address | null;
    try {
      addressParsed = Address.parse(address);
    } catch (e) {
      return;
    }

    setIsUpdating(true);

    // check if voted
    try {
      const voting = Voting.fromAddress(addressParsed);
      await voting.getTimeToLive(tonClient.provider(voting.address));
      setIsUpdating(false);
      return navigate(`/voting?a=${voting.address.toString()}`);
    } catch (e) {}

    // check if organization
    try {
      const org = Organization.fromAddress(addressParsed);
      await org.getOrganizationId(tonClient.provider(org.address));
      setIsUpdating(false);
      return navigate(`/organization?a=${org.address.toString()}`);
    } catch (e) {}

    setIsUpdating(false);
  }

  return (
    <div className="relative rounded-md bg-slate-800 pr-6 max-w-96 w-full">
      <input
        type="text"
        className={"bg-transparent text-gray-200 p-2 w-full pr-10"}
        placeholder="Enter contract address"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            findContract(e.currentTarget.value);
          }
        }}
      />
      {isUpdating && (
        <div className="top-3 right-2 w-4 h-4 animate-spin absolute">
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray="251"
              strokeDashoffset="50"
            ></circle>
          </svg>
        </div>
      )}
    </div>
  );
};
