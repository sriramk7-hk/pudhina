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
    string _tokenURI;
    string[] internal _nftTokenURIs;
    bool private _initialized;
    

    constructor(uint256 mintFee, string[] memory __tokenURIs) ERC721("Test_Emboss", "TEB") {
        _tokenId = 0;
        i_mintFee = mintFee;
        _initializeContract(__tokenURIs);
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

    function _initializeContract(string[] memory nftTokenURIs) private {
        if(_initialized){
            revert Pudhina__AlreadyInitialized();
        }

        _nftTokenURIs = nftTokenURIs;
        _initialized = true;
    }

    function returnTokenURI(uint256 index) public view returns(string memory){
        return _nftTokenURIs[index];
    }

}