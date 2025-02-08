// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";
import "@flarenetwork/flare-periphery-contracts/coston2/IFtsoFeedIdConverter.sol";

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

    /**
     * @dev Gets the FTSO price feed for a given asset.
     * @param feedName The asset name (e.g., "FLR/USD").
     */
    function getCurrentTokenPriceWithDecimals(string memory feedName) public view returns (uint256 _price, int8 _decimals) {
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getTestFtsoV2();
        bytes21 feedId = ContractRegistry.getFtsoFeedIdConverter().getFeedId(1, feedName);
        (_price, _decimals, ) = ftsoV2.getFeedById(feedId);
    }
}