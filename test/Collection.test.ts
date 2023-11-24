import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Collection } from '../typechain';
import { holders } from '../helper/airdrop-calc';

const TOKEN_CONTRACT_NAME = 'Collection';

describe('Wasteland Sirens test', function () {
  let collection: Collection;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  const price = 1074n * 10n ** 18n;

  before(async function () {
    [owner, user] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const tokenFactory = await ethers.getContractFactory(TOKEN_CONTRACT_NAME);
    collection = await tokenFactory.deploy();
  });

  describe('#mint', function () {
    beforeEach(async function () {
      await collection.airdrop(holders);
    });

    it('Should mint nft', async function () {
      await collection.connect(user).mint({ value: price });

      expect(await collection.balanceOf(user.address)).to.eq(1);
      expect(await collection.ownerOf(295)).to.eq(user.address);
      expect(await collection.balance()).to.eq(price);

      const baseURI = await collection.baseURI();
      const baseExtension = await collection.baseExtension();
      expect(await collection.tokenURI(295)).to.eq(`${baseURI}295${baseExtension}`)
      expect(await collection.tokenURI(296)).to.eq(`${baseURI}296${baseExtension}`)

      await collection.connect(user).mint({ value: price });

      expect(await collection.balanceOf(user.address)).to.eq(2);
      expect(await collection.ownerOf(296)).to.eq(user.address);
      expect(await collection.balance()).to.eq(price * 2n);
    });

    it('Should revert if supply is over', async function () {
      const supply = await collection.TOTAL_SUPPLY();

      for (let i = 0; i < Number(supply) - holders.length; i++) {
        await collection.connect(user).mint({ value: price });
      }

      await expect(collection.mint({ value: price })).to.be.revertedWithCustomError(collection, 'MintIsOver');
    });

    it('Should revert if send invalid price', async function () {
      await expect(collection.mint({ value: 0 })).to.be.revertedWithCustomError(collection, 'InvalidPrice');
      await expect(collection.mint({ value: price - 1n })).to.be.revertedWithCustomError(collection, 'InvalidPrice');
      await expect(collection.mint({ value: price + 1n })).to.be.revertedWithCustomError(collection, 'InvalidPrice');
      await expect(collection.mint({ value: price * 2n })).to.be.revertedWithCustomError(collection, 'InvalidPrice');
    });

    it('Should withdraw all ether', async function () {
      expect(await collection.balance()).to.eq(0);

      for (let i = 0; i < 10; i++) {
        await collection.connect(user).mint({ value: price });
      }

      expect(await collection.balance()).to.eq(price * 10n);
      await expect(collection.withdraw()).to.changeEtherBalance(owner, price * 10n);
      expect(await collection.balance()).to.eq(0);

      await expect(collection.connect(user).withdraw()).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('#airdrop', function () {
    it('Airdrop should gone without problems', async function () {
      await collection.airdrop(holders);

      expect(await collection.balanceOf('0x06a800401195ff844485782ddfbc6faa3f697615')).to.eq(5);
      expect(await collection.balanceOf('0x081ad9f0491da1845b4b5e43340ffebd9ef5307f')).to.eq(1);
      expect(await collection.balanceOf('0x09ba138fdf94b6b8252dfb9413da7865515663a9')).to.eq(1);
      expect(await collection.balanceOf('0x0a8edbbd6d5f8a07f89befe6b724a85834151790')).to.eq(4);
      expect(await collection.balanceOf('0x0efd53b8b5aa0b66d38fabd1e2f6daf0065c12c6')).to.eq(3);
    });

    it('Only owner can start airdrop', async function () {
      await expect(collection.connect(user).airdrop(holders)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});
