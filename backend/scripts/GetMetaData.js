const { ethers } = require("hardhat");

require("hardhat");

async function getMetaData() {
  const pudhina = await ethers.getContractFactory("Pudhina");
  const Pudhina = await pudhina.deploy();
  await Pudhina.deployed();

  const updateValue = await Pudhina.getNameAndSymbol("Dog", "DG");
  await updateValue.wait(1);

  const [_name, _symbol]= await Pudhina.returnNameAndSymbol();
  console.log(`Updated Value ${_name}, ${_symbol}`);

  const mintNft = await Pudhina.mintNft("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
  await mintNft.wait(1);

  const tokenURI = await Pudhina.returnTokenURI();
  console.log(`Token URI: ${tokenURI}`);
}

getMetaData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
