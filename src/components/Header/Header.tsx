import { TonConnectButton } from "@tonconnect/ui-react";
import "./header.scss";
import Search from "./Search";
import { Link } from "react-router-dom";
import LanguageChooser from "./LanguageChooser";

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between gap-4 md:gap-4 items-center px-2 py-4 "
    >
      <div className="w-32 text-blue-500 text-3xl font-semibold">
        <Link to="/"> BVote </Link>
      </div>
      <Search />
      <div className="flex flex-row justify-between gap-2 md:w-64">
      <LanguageChooser />
      <TonConnectButton />
      </div>
    </header>
  );
};
