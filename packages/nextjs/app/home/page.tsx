"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import PdfUploader from "~~/app/home/components/PdfUpload";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
        <PdfUploader />

    <div className="flex items-center flex-col flex-grow pt-10">
        {/* If you still want to show landingVideo, just keep it here or remove it */}
        {/* <landingVideo /> */}
        {/* The rest of your page content */}
      </div>
    </>
  );
};

export default Home;

