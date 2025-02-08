// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import {ContractRegistry} from "../../dependencies/flare-periphery-0.0.20/src/coston2/ContractRegistry.sol";
import "dependencies/flare-periphery-0.0.20/src/coston2/FtsoV2Interface.sol";
import {IJsonApiVerification} from "../../dependencies/flare-periphery-0.0.20/src/coston2/IJsonApiVerification.sol";
import {IJsonApi} from "../../dependencies/flare-periphery-0.0.20/src/coston2/IJsonApi.sol";


contract FlareFDC {
    address public owner;
    IFtsoRegistry public ftsoRegistry;
    
    struct CertificateJSON {
        string studentName;
        string universityName;
        string courseName;
        string degree;
        uint256 graduationDate;
    }
    
    // Mapping to store IPFS data
    mapping(string => CertificateJSON) public certificateData;
    
    event DataFetched(string ipfsHash, CertificateJSON data);
    event DataStored(string ipfsHash);

    constructor(address _flareContractRegistry) {
        owner = msg.sender;
        FlareContractRegistry fcr = FlareContractRegistry(_flareContractRegistry);
        ftsoRegistry = IFtsoRegistry(fcr.getContractAddressByName("FtsoRegistry"));
    }

    // Function to store certificate data (simulating IPFS storage)
    function storeCertificateData(
        string memory ipfsHash,
        string memory studentName,
        string memory universityName,
        string memory courseName,
        string memory degree,
        uint256 graduationDate
    ) external {
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");
        
        certificateData[ipfsHash] = CertificateJSON({
            studentName: studentName,
            universityName: universityName,
            courseName: courseName,
            degree: degree,
            graduationDate: graduationDate
        });

        emit DataStored(ipfsHash);
    }

    // Function to fetch certificate data
    function fetchCertificateJSON(string memory ipfsHash) 
        external 
        view
        returns (CertificateJSON memory) 
    {
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");
        CertificateJSON memory data = certificateData[ipfsHash];
        require(bytes(data.studentName).length > 0, "Data not found");
        
        return data;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
}