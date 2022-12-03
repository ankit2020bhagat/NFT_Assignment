// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./libraries/Base64.sol";
//import "./libraries/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public imageUri;

    uint256 public maxSupply;
    uint256 public curator_fee;

    event CharacterNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721() {}

    ///you cannot mint more than maximium supply
    error maxlimit();

    ///not having enough ether
    error insufficient_funds();

    function setNFTAttribute(
        string memory nftName,
        string memory nftSymbol,
        string  memory  nftImageUri,
        uint256  _maxSupply,
        uint256 _fee
    ) external {
        setNameSymbol(nftName, nftSymbol);
        imageUri = nftImageUri;
        maxSupply = _maxSupply;
        curator_fee = _fee * 1 ether;

        _tokenIds.increment();
    }

    function mintCharacterNFT( ) external payable {
        uint256 newItemId = _tokenIds.current();
        if (maxSupply<newItemId){
            revert maxlimit();
        }
        if(msg.value < curator_fee){
            revert insufficient_funds(); 
        }
        
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri());

        console.log(
            "Minted NFT w/ tokenId %s to address %s",
            newItemId,
            msg.sender
        );

        _tokenIds.increment();

        emit CharacterNFTMinted(msg.sender, newItemId);
    }

    function tokenUri() public view returns (string memory) {
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                name(),
                '", "description": "Natures Wonder", "image": "https://cloudflare-ipfs.com/ipfs/',
                imageUri,
                '"}'
            )
        );
        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
    }
}
