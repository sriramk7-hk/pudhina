const { ethers, network } = require("hardhat");
require("dotenv").config();



module.exports = async ({ getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();

  const pudhina = await ethers.getContract("Pudhina", deployer);
  
  console.log("Minting Token");
  const mintNFT = await pudhina.mintNft({
    value: ethers.utils.parseEther("0.000012"),
  });
  await mintNFT.wait(network.config.blockConfirmations);
  console.log("Token Minted");
};

