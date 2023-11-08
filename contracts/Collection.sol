// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.22;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable2Step.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Collection is ERC721, Ownable2Step { // rename with your Collection name 
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant TOTAL_SUPPLY = 30; // can be change before deploy
    uint256 public constant PRICE = 1074 * 10 ** 18; // can be change before deploy

    string public baseURI;
    string public baseExtension = '.json';

    error MintIsOver();
    error InvalidPrice();
    error NotSuccessWithdraw();

    constructor() ERC721('Name', 'SYMBOL' /* SHOULD BE CHANGE */) {
        setBaseURI( 'ipfs://QmXFdYLQWH7pDdS61k9hSSPYg6BtAf5UGRZhzTTk5JLe33/'); // SHOUD BE CHANGE
    }

    function airdrop(address[] calldata _holders) external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        uint256 length = _holders.length;

        for (uint i = 0; i < length; i++) {
            _tokenIdCounter.increment();

            _safeMint(_holders[i], tokenId + i);
        }
    }

    function mint() external payable {
        uint256 tokenId = _tokenIdCounter.current();

        if (tokenId >= TOTAL_SUPPLY) revert MintIsOver();
        if (msg.value != PRICE) revert InvalidPrice();

        _safeMint(msg.sender, tokenId);

        _tokenIdCounter.increment();
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}('');
        if(!success) revert NotSuccessWithdraw();
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
