// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import {ContractRegistry} from "../../dependencies/flare-periphery-0.0.20/src/coston2/ContractRegistry.sol";
import "dependencies/flare-periphery-0.0.20/src/coston2/FtsoV2Interface.sol";
import "dependencies/flare-periphery-0.0.20/src/coston2/IFtsoFeedIdConverter.sol";


contract FlareFDC {
    address public owner;
    
    event CertificateFetched(string indexed ipfsHash, string jsonData);
    
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Fetches certificate JSON data from IPFS using Flare's State Connector.
     * @param ipfsHash The IPFS hash of the certificate data.
     */
    function fetchCertificatesFromIPFS(string memory ipfsHash) public returns (string memory) {
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");

        // Simulate getting JSON data from IPFS (Replace with actual Flare State Connector query)
        string memory jsonData = string(
            abi.encodePacked(
                '{"certificates":[{"studentName":"Alice Johnson","universityName":"Harvard University","courseName":"Computer Science","degree":"Bachelor of Science","graduationDate":1717286400}]}'
            )
        );

        emit CertificateFetched(ipfsHash, jsonData);
        return jsonData;
    }


}