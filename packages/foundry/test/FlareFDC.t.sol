// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "dependencies/forge-std-1.9.5/src/Test.sol";
import "../contracts/evm/FlareFDC.sol";

contract FlareFDCTest is Test {
    FlareFDC public flareFDC;
    string public sampleIPFSHash = "QmTestHash123";

    function setUp() public {
        flareFDC = new FlareFDC();
    }

    function testFetchCertificateData() public {
        // Simulate fetching certificate from IPFS
        string memory data = flareFDC.fetchCertificatesFromIPFS(sampleIPFSHash);

        // Print output for debugging
        emit log(data);

        // Ensure the function runs without errors
        assert(bytes(data).length > 0);
    }
}