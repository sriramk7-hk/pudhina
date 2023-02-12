// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

error Pudhina__MintFeeNotEnough();
error Pudhina__TransferFailed();
error Pudhina__AlreadyInitialized();

contract Pudhina is ERC721URIStorage, Ownable{
    uint256 private immutable i_mintFee;
    uint256 internal _tokenId;
    string public __name;
    string public __symbol;
    string _tokenURI;
    string[] internal _nftTokenURIs;
    bool private _initialized;
    

    constructor(uint256 mintFee, string[1] memory __tokenURIs, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        _tokenId = 0;
        i_mintFee = mintFee;
        __name = _name;
        __symbol = _symbol;
        _initializeContract(__tokenURIs);
    }

    function returnNameAndSymbol() public view returns(string memory, string memory) {
        return (__name, __symbol);
    }

    function mintNft() payable public {
        if(msg.value < i_mintFee){
            revert Pudhina__MintFeeNotEnough();
        }
        uint256 newId = _tokenId;
        _tokenId = _tokenId + _tokenId;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, _nftTokenURIs[newId]);
        
    }

    function getTokenURI(uint256 tokenId) public view returns(string memory){
        return _nftTokenURIs[tokenId];
    }

    function getMintFee() public view returns(uint256){
        return i_mintFee;
    }

    function withdraw() public onlyOwner{
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if(!success){
            revert Pudhina__TransferFailed();
        }
    }

    function _initializeContract(string[1] memory nftTokenURIs) private {
        if(_initialized){
            revert Pudhina__AlreadyInitialized();
        }

        _nftTokenURIs = nftTokenURIs;
        _initialized = true;
    }

}