"use client";

import type { NextPage } from "next";
import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import { useAccount } from "wagmi";
import Hero from "~~/app/home/components/Hero";
import PdfUploader from "~~/app/home/components/PdfUpload";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {

  return (
    <Box>
      <Hero />
      <PdfUploader/>
    </Box>
  );
};

export default Home;
