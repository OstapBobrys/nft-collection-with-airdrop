import { task } from 'hardhat/config';
import { Contract } from 'ethers';

const CONTRACT_NAME = 'Collection';

// npx hardhat mint  --network shimmer_testnet

task('mint', 'mint nft').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  console.log('Current block number:', await ethers.provider.getBlockNumber());

  const signer = ethers.provider.getSigner();

  const contractArtifacts = await hre.deployments.get(CONTRACT_NAME);
  console.log(`${CONTRACT_NAME} deployed at: ${contractArtifacts.address}`);

  const contract = new Contract(contractArtifacts.address, contractArtifacts.abi, signer);

  const tx = await contract.mint({value: await contract.PRICE()});
  console.log('Tx hash:', tx.hash);
});
