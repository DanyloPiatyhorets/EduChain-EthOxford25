"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

import SectionOneMointains from "~~/components/ByAisari/SectionOneMointains";
import IPFSCheck from "~~/components/ByAisari/IPFSCheck";
import CardsExplanation from "~~/components/ByAisari/CardsExplanation";

const fakeJsonData = {
  message: "Hello, IPFS!",
};

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
    <CardsExplanation />
    </>
  );
};

export default Home;