import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const CONTRACT_NAME = 'Collection';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  await deployments.deploy(CONTRACT_NAME, {
    from: deployer,
    args: [],
    log: true,
  });
};

func.tags = [CONTRACT_NAME];

export default func;
