// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "dependencies/forge-std-1.9.5/src/Script.sol";
import "../contracts/evm/UniversityCertificate.sol";

contract InteractWithUniCert is Script {
    UniversityCertificate uniCert;

    address constant STUDENT = 0x44a3D4b120F7D4f403e99062934A788C61F1AEC6; // Replace with actual student address
    string constant IPFS_HASH = "QmTzWkA5Rzq3YfPZ5V5S2y6QGxDFq2D7m9XHbYsG1XhPTg"; // Replace with actual IPFS hash

    function run() external {
        uint256 privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(privateKey);

        vm.startBroadcast(privateKey);

        // **Replace with your deployed UniversityCertificate contract address**
        uniCert = UniversityCertificate(payable(0x2Df67d2696572e4248b507a12cC323E02E3e7D89));

        // Issue a certificate
        uniCert.issueCertificate(STUDENT, IPFS_HASH);

        // Fetch certificate data
        UniversityCertificate.Certificate memory cert = uniCert.getCertificate(0);

        console.log("Issued Certificate:");
        console.log("Student Name:", cert.studentName);
        console.log("University Name:", cert.universityName);
        console.log("IPFS Hash:", cert.ipfsHash);

        vm.stopBroadcast();
    }
}