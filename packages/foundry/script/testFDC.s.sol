// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import "../contracts/evm/FlareFDC.sol"; // Update with the actual contract path

contract TestFlareFDC is Script {
    function run() external {
        vm.startBroadcast();  

        // Set your deployed contract address
        address flareFDCAddress = 0x2Df67d2696572e4248b507a12cC323E02E3e7D89;  

        // Load the contract
        FlareFDC flareFDC = FlareFDC(flareFDCAddress);

        // Example: Fetch data from Flare's State Connector
        string memory ipfsHash = "Qm...";  // Replace with an actual IPFS hash
        string memory response = flareFDC.getCertificateData(ipfsHash);

        console.log("Response from FlareFDC:", response);

        vm.stopBroadcast();
    }
}