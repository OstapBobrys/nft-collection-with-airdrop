import 'hardhat-deploy';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import '@nomiclabs/hardhat-etherscan';

import { ethers } from 'ethers';
import { HardhatUserConfig } from 'hardhat/types';
import { HardhatNetworkForkingUserConfig } from 'hardhat/src/types/config';

import './tasks/';
import './helper/airdrop-calc';

const { PRIVATE_KEY, FORKING_BLOCK, FORKING_ENV } = process.env;

const privateKey = PRIVATE_KEY || ethers.Wallet.createRandom().privateKey;

const accounts = [];
accounts.push({
  balance: '1'.padEnd(30, '0'),
  privateKey: '0x4aa5c38059cacf37597c2ba756a1eb21d5850ada843590eaedfc6b717022597b',
});

accounts.push({
  balance: '1'.padEnd(30, '0'),
  privateKey: '0xb71dd31c59a12c59d696474980d4352c97d77d0ab8bb198edddb1bc0abe684a1',
});

accounts.push({
  balance: '1'.padEnd(30, '0'),
  privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
});

let forkingConfig: {
  forking: HardhatNetworkForkingUserConfig;
  deploy: string[];
};

switch (FORKING_ENV) {
  case 'ethereum':
    forkingConfig = {
      forking: {
        enabled: true,
        url: '',
        blockNumber: FORKING_BLOCK ? parseInt(FORKING_BLOCK || '15976035', 10) : 15976035,
      },
      deploy: ['deploy/ethereum'],
    };
    break;
  case 'polygon':
    forkingConfig = {
      forking: {
        enabled: true,
        url: '',
        blockNumber: FORKING_BLOCK ? parseInt(FORKING_BLOCK || '35641062', 10) : 35641062,
      },
      deploy: ['deploy/polygon'],
    };
    break;
  case '':
  case undefined:
    forkingConfig = { forking: { enabled: false, url: '', blockNumber: undefined }, deploy: [] };
    break;
  default:
    throw new Error(`Forking for '${FORKING_ENV}' unsupported.`);
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: FORKING_ENV ? { ...forkingConfig.forking } : undefined,
      deploy: FORKING_ENV ? forkingConfig.deploy : undefined,
      accounts: accounts,
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
      chainId: 8545,
    },
    localhost: {
      url: ' http://127.0.0.1:8545/',
      deploy: FORKING_ENV ? forkingConfig.deploy : undefined,
      accounts: accounts.map((a) => a.privateKey),
      chainId: 8545,
    },
    shimmer: {
      url: 'https://json-rpc.evm.shimmer.network',
      accounts: [privateKey],
      chainId: 148,
      live: true,
      saveDeployments: true,
      tags: ['shimmer', 'mainnet'],
      gasMultiplier: 2,
    },
    shimmer_testnet: {
      url: 'https://json-rpc.evm.testnet.shimmer.network',
      accounts: [privateKey],
      chainId: 1073,
      live: true,
      saveDeployments: true,
      tags: ['shimmer', 'testnet'],
      gasMultiplier: 2,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.23',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy/shimmer',
    deployments: 'deployments',
    sources: 'contracts',
    tests: 'test',
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
  },
  mocha: {
    timeout: 80000,
    grep: `@${FORKING_ENV || ''}`,
    invert: !FORKING_ENV,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;
