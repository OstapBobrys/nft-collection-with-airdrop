import { task } from 'hardhat/config';
import { Contract } from 'ethers';

const CONTRACT_NAME = 'Collection';

// npx hardhat withdraw  --network shimmer_testnet

task('withdraw', 'Withdraw funds from contract').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  console.log('Current block number:', await ethers.provider.getBlockNumber());

  const signer = ethers.provider.getSigner();

  const contractArtifacts = await hre.deployments.get(CONTRACT_NAME);
  console.log(`${CONTRACT_NAME} deployed at: ${contractArtifacts.address}`);

  const contract = new Contract(contractArtifacts.address, contractArtifacts.abi, signer);

  const tx = await contract.withdraw();
  console.log('Tx hash:', tx.hash);
});
