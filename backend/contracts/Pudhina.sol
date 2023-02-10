// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Pudhina is ERC721 {
    string public __name;
    string public __symbol;
    uint256 private _tokenId;
    string _tokenURI;

    constructor() ERC721(__name, __symbol) {
        _tokenId = 0;
    }

    function getNameAndSymbol(string memory _name, string memory _symbol) public {
        __name = _name;
        __symbol = _symbol;
    
    }

    function returnNameAndSymbol() public view returns(string memory, string memory) {
        return (__name, __symbol);
    }

    function mintNft(address to) public returns(uint256){
        _mint(to, _tokenId);
        _tokenId++;
        return _tokenId;
    }

    function returnTokenURI() public returns(string memory){
        _tokenURI = tokenURI(_tokenId);
        return _tokenURI;
    }
}