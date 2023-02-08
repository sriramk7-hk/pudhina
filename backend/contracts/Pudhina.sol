// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pudhina is ERC721{
    string public __name;
    string public __symbol;

    function getNameAndSymbol(string memory _name, string memory _symbol) external {
        __name = _name;
        __symbol = _symbol;
    }

    constructor() ERC721(__name, __symbol) {
        __name;
        __symbol;
    }

    


}