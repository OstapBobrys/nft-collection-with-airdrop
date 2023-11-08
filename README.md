# not-collection-with-airdrop

## Installation
Install dependencies

    npm i

Create .env file or rename env.example to .env 

    PRIVATE_KEY=

## Usage

### Deploy

For classic hardhat deploy use command

    npx hardhat deploy --network shimmer

### Airdrop

Before starting the airdrop, you need to add all address holders to the array in:
    helper/holders.ts

The script automatically sorts all the addresses and returns the ones we need (every 3 identical addresses are changed to 1)
    helper/airdrop-calc.ts

Example:
    Snapshot:
    [
        '0x03d6df1d65b654879456d84f070ae4c128d54d85', 
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x081ad9f0491da1845b4b5e43340ffebd9ef5307f',
        '0x081ad9f0491da1845b4b5e43340ffebd9ef5307f',
        '0x081ad9f0491da1845b4b5e43340ffebd9ef5307f',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0ad835795b1c593ec22f7a3e35697db6a940f680',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x157f655f2f59c0ce5436461d9546d60394c50aa5',
        '0x5B1D72Dce914FC4fB24d2BfBa4DdBdd05625152D',
        '0x5B1D72Dce914FC4fB24d2BfBa4DdBdd05625152D',
        '0x5B1D72Dce914FC4fB24d2BfBa4DdBdd05625152D'
    ];

    Result:
    [
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x06a800401195ff844485782ddfbc6faa3f697615',
        '0x081ad9f0491da1845b4b5e43340ffebd9ef5307f',
        '0x09ba138fdf94b6b8252dfb9413da7865515663a9',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0a8edbbd6d5f8a07f89befe6b724a85834151790',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6',
        '0x5B1D72Dce914FC4fB24d2BfBa4DdBdd05625152D'
    ]

    npx hardhat airdrop -- network shimmer

### Withdraw

    npx hardhat withdraw --network shimmer

### Change state:

    File: contracts/Collection.sol

    Rename file with your collection name
    field 8: rename contract name with your collection name
    field 14: change TOTAL_SUPPLY
    field 15: change price like this - price * 10 ** 18, (10 ** 18 - decimals)
    field 18: for ipfs, if metadata in .json format, don't change
    field 24: name and symbol
    filed 25: ipfs
