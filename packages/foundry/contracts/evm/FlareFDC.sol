// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import {ContractRegistry} from "../../dependencies/flare-periphery-0.0.20/src/coston2/ContractRegistry.sol";
import "dependencies/flare-periphery-0.0.20/src/coston2/FtsoV2Interface.sol";
import {IFdcHub} from "../../dependencies/flare-periphery-0.0.20/src/coston2/IFdcHub.sol";
import {IJsonApiVerification} from "../../dependencies/flare-periphery-0.0.20/src/coston2/IJsonApiVerification.sol";
import {IJsonApi} from "../../dependencies/flare-periphery-0.0.20/src/coston2/IJsonApi.sol";


contract FlareFDC {
    // Certificate data structure
    struct CertificateData {
        string studentName;
        string universityName;
        string courseName;
        string degree;
        uint256 graduationDate;
        string ipfsHash;
    }

    // Storage
    mapping(string => CertificateData) public certificates;
    string[] public certificateHashes;

    event CertificateVerified(string ipfsHash, CertificateData data);

    // Verify JSON API proof
    function isJsonApiProofValid(
        IJsonApi.Proof calldata _proof
    ) public view returns (bool) {
        return ContractRegistry.auxiliaryGetIJsonApiVerification().verifyJsonApi(_proof);
    }

    // Main function to fetch and verify certificate from IPFS
    function verifyCertificateFromIPFS(IJsonApi.Proof calldata data) public {
        require(isJsonApiProofValid(data), "Invalid IPFS proof");

        // Decode IPFS JSON data
        CertificateData memory certData = abi.decode(
            data.data.responseBody.abi_encoded_data,
            (CertificateData)
        );

        // Verify certificate doesn't exist
        require(bytes(certificates[certData.ipfsHash].studentName).length == 0, 
            "Certificate already verified");

        // Store certificate data
        certificates[certData.ipfsHash] = certData;
        certificateHashes.push(certData.ipfsHash);

        emit CertificateVerified(certData.ipfsHash, certData);
    }

    // Get all verified certificates
    function getAllCertificates() public view returns (CertificateData[] memory) {
        CertificateData[] memory result = new CertificateData[](certificateHashes.length);
        
        for (uint256 i = 0; i < certificateHashes.length; i++) {
            result[i] = certificates[certificateHashes[i]];
        }
        
        return result;
    }

    // Helper functions for FDC integration
    function getFdcHub() external view returns (IFdcHub) {
        return ContractRegistry.getFdcHub();
    }

    // Get certificate by IPFS hash
    function getCertificate(string memory ipfsHash) 
        external 
        view 
        returns (CertificateData memory) 
    {
        require(bytes(certificates[ipfsHash].studentName).length > 0, 
            "Certificate not found");
        return certificates[ipfsHash];
    }
}

