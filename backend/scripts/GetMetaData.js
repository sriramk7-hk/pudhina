const { ethers } = require("hardhat");

require("hardhat");

async function getMetaData() {

  const pudhina = await ethers.getContractFactory("Pudhina");
  const Pudhina = await pudhina.deploy();
  await Pudhina.deployed();

  const updateValue = await Pudhina.getNameAndSymbol("Dog", "DG");
  await updateValue.wait(1);

  const [_name, _symbol] = await Pudhina.returnNameAndSymbol();
  console.log(`Updated Value ${_name}, ${_symbol}`);

}

getMetaData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
