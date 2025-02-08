"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

import LandingVideo from "~~/components/ByAisari/LandingVideo";


const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>

    <LandingVideo />
    
    <div className="flex items-center flex-col flex-grow pt-10">
        {/* If you still want to show landingVideo, just keep it here or remove it */}
        {/* <landingVideo /> */}
        {/* The rest of your page content */}
      </div>
    </>
  );
};

export default Home;

