// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IERC5192.sol";

/// @title University Certificate SBT Contract with Flare Data Connector
contract UniversityCertificate is ERC721, AccessControl, IERC5192 {
   uint256 private _nextTokenId;
   
   function locked(uint256 tokenId) external view override returns (bool) {
    require(_ownerOf(tokenId) != address(0), "Token does not exist");
    return _locked[tokenId];
}
   // Roles
   bytes32 public constant UNIVERSITY_ROLE = keccak256("UNIVERSITY_ROLE");
   bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

   struct Certificate {
       string ipfsHash;             
       address student;             
       address university;          
       bool isValid;                
       bool isVerified;             
       uint256 issueDate;           
       string universityName;       
       string courseName;          
       string studentName;         
       uint256 graduationDate;     
   }

   mapping(uint256 => Certificate) public certificates;
   mapping(uint256 => bool) private _locked;
   mapping(bytes32 => bool) private _verifiedHashes;  

   event CertificateIssued(uint256 indexed tokenId, address indexed student, address indexed university);
   event CertificateVerified(uint256 indexed tokenId, string universityName, string courseName);
   event VerificationFailed(uint256 indexed tokenId, string reason);

   constructor() ERC721("UniversityCertificate", "UCERT") {
       _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
   }

   function supportsInterface(bytes4 interfaceId)
       public
       view
       override(ERC721, AccessControl)
       returns (bool)
   {
       return 
           interfaceId == type(IERC5192).interfaceId || 
           super.supportsInterface(interfaceId);
   }

   /// @notice Only the university can issue a certificate
   function issueCertificate(address student, string memory ipfsHash) external onlyRole(UNIVERSITY_ROLE) {
       require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");
       require(student != address(0), "Invalid student address");

       uint256 tokenId = _nextTokenId++;

       certificates[tokenId] = Certificate({
           ipfsHash: ipfsHash,
           student: student,
           university: msg.sender, 
           isValid: true,
           isVerified: false,
           issueDate: block.timestamp,
           universityName: "",
           courseName: "",
           studentName: "",
           graduationDate: 0
       });

       _mint(student, tokenId);
       _locked[tokenId] = true;

       emit CertificateIssued(tokenId, student, msg.sender);
   }

   /// @notice Verifier confirms data using Flare State Connector
   function verifyCertificateData(
       uint256 tokenId,
       string memory _universityName,
       string memory _courseName,
       string memory _studentName,
       uint256 _graduationDate,
       bytes32 documentHash
   ) external onlyRole(VERIFIER_ROLE) {
       Certificate storage cert = certificates[tokenId];
       require(cert.isValid, "Certificate not valid");
       require(!cert.isVerified, "Already verified");
       require(!_verifiedHashes[documentHash], "Document already verified");

       cert.universityName = _universityName;
       cert.courseName = _courseName;
       cert.studentName = _studentName;
       cert.graduationDate = _graduationDate;
       cert.isVerified = true;

       _verifiedHashes[documentHash] = true;

       emit CertificateVerified(tokenId, _universityName, _courseName);
   }

   /// @notice Admin adds a university
   function addUniversity(address university) external onlyRole(DEFAULT_ADMIN_ROLE) {
       grantRole(UNIVERSITY_ROLE, university);
   }

   /// @notice Admin adds a verifier
   function addVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
       grantRole(VERIFIER_ROLE, verifier);
   }

   /// @notice Soulbound token restriction: no transfers allowed
   function _update(
       address to, 
       uint256 tokenId, 
       address auth
   ) internal virtual override returns (address) {
       address from = _ownerOf(tokenId);
       require(from == address(0) || to == address(0), "Soulbound: Transfer not allowed");
       return super._update(to, tokenId, auth);
   }

   function getCertificate(uint256 tokenId) external view returns (Certificate memory) {
       require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
       return certificates[tokenId];
   }

   function isVerified(uint256 tokenId) external view returns (bool) {
       require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
       return certificates[tokenId].isVerified;
   }
}