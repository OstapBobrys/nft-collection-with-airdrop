import { task } from 'hardhat/config';
import { Contract } from 'ethers';
import { airdropCalculation } from '../helper/airdrop-calc';
import { holderAddresses } from '../helper/holders';

const CONTRACT_NAME = 'Collection';

// npx hardhat airdrop  --network shimmer_testnet

task('airdrop', 'Airdrop').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  console.log('Current block number:', await ethers.provider.getBlockNumber());

  const signer = ethers.provider.getSigner();

  const contractArtifacts = await hre.deployments.get(CONTRACT_NAME);
  console.log(`${CONTRACT_NAME} deployed at: ${contractArtifacts.address}`);

  const contract = new Contract(contractArtifacts.address, contractArtifacts.abi, signer);

  const holders = airdropCalculation(holderAddresses);

  const tx = await contract.airdrop(holders);

  console.log('------------------------------------------');

  for (let i = 0; i < holders.length; i++) {
    console.log(`Successfully send NFT to: ${holders[i]}`);
  }

  console.log('------------------------------------------');
  console.log('Tx hash:', tx.hash);
});
