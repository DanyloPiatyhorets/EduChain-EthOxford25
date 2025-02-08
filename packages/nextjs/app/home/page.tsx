"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

import SectionOneMointains from "~~/components/ByAisari/SectionOneMointains";
import PdfUploader from "~~/components/ByDanylo/PDFUpload";
import CardsExplanation from "~~/components/ByAisari/CardsExplanation";
import IPFSCheck from "~~/components/ByAisari/IPFSCheck";

const fakeJsonData = {
  message: "Hello, IPFS!",
};

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <SectionOneMointains />
      <CardsExplanation />
      <PdfUploader />
      <IPFSCheck jsonData={fakeJsonData} />

<<<<<<< Updated upstream
    {/*<SectionOneMointains />*/}
    {/*<CardsExplanation />*/}
    <PdfUploader />

    
    <div className="flex items-center flex-col flex-grow pt-10">
=======
      <div className="flex items-center flex-col flex-grow pt-10">
>>>>>>> Stashed changes
        {/* If you still want to show landingVideo, just keep it here or remove it */}
        {/* <landingVideo /> */}
        {/* The rest of your page content */}
      </div>
    </>
  );
};

export default Home;

