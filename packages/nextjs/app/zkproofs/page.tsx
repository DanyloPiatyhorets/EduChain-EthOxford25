"use client";

import { NextPage } from "next";
import ZkAppComponent from "~~/components/ByAisari/zkappproofs";

const Home: NextPage = () => {
  return (
    <>
      <div className={"text-center"}>check zk-app deployed contract address through MINA: B62qj7bcdKCK9YkthAt1nB4VwRSKutpZWiZCdT9t5u3ewisidSdzjuB</div>
      <div className={"text-center"}>check on minascan.io</div>
      <div className={"text-center"}>Transaction hash: 5JuhttjB41WYpnSG9qWAz4yiWAvSecMPThg3FdMkempwn7FUp8pv</div>
    <ZkAppComponent />
    </>
  );
};

export default Home;
