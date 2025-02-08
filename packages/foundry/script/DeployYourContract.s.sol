// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/evm/UniversityCertificate.sol";


/**
 * @notice Deploy script for UniversityCertificate contract
 * @dev Inherits ScaffoldETHDeploy, which:
 *      - Includes forge-std/Script.sol for deployment
 *      - Provides `deployer` variable
 *
 * Example:
 * yarn deploy --file DeployYourContract.s.sol  # local anvil chain
 * yarn deploy --file DeployYourContract.s.sol --network optimism # live network (requires keystore)
 */
contract DeployYourContract is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        new UniversityCertificate();
    }
}