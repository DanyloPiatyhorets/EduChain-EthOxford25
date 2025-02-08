// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import "../contracts/evm/UniversityCertificate.sol";

contract UniversityCertificateTest is Test {
    UniversityCertificate public universityCertificate;
    address university = vm.addr(1);
    address student = vm.addr(2);

    function setUp() public {
        universityCertificate = new UniversityCertificate();
        vm.prank(university);
        universityCertificate.addVerifier(university); // Ensure university is a verifier
    }

    function testContractDeployment() public {
        assert(address(universityCertificate) != address(0));
    }

    function testIssueCertificate() public {
        string memory testIpfsHash = "QmTestHash123";

        // Simulate student submitting certificate
        vm.prank(student);
        universityCertificate.issueCertificate(student, testIpfsHash);

        // Retrieve certificate
        UniversityCertificate.Certificate memory cert = universityCertificate.getCertificate(0);

        assertEq(cert.ipfsHash, testIpfsHash, "IPFS hash mismatch");
        assertEq(cert.student, student, "Student address mismatch");
        assertEq(cert.isValid, true, "Certificate should be valid");
    }

    function testVerifyCertificate() public {
        string memory testIpfsHash = "QmTestHash123";

        // Student submits certificate
        vm.prank(student);
        universityCertificate.issueCertificate(student, testIpfsHash);

        // University verifies certificate
        string memory universityName = "Oxford University";
        string memory courseName = "Computer Science";
        string memory studentName = "John Doe";
        uint256 graduationDate = 1713456000; // Example timestamp
        string memory degree = "BsC";
        bytes32 documentHash = keccak256(abi.encodePacked(testIpfsHash));

        vm.prank(university);
        universityCertificate.verifyCertificateData(0, universityName, courseName, studentName, graduationDate, degree, documentHash);

        // Retrieve certificate
        UniversityCertificate.Certificate memory cert = universityCertificate.getCertificate(0);

        assertEq(cert.isVerified, true, "Certificate should be verified");
        assertEq(cert.universityName, universityName, "University name mismatch");
        assertEq(cert.courseName, courseName, "Course name mismatch");
        assertEq(cert.degree, degree, "Degree name mismatch");
    }
}