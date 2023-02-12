const {network, ethers} = require("hardhat");

const {storeImages, storeTokenURI} = require("../utils/UploadToPinata");

let mintFee = ethers.utils.parseEther("1");
let tokenURI = [];
const imagePath = "./NFTImages/";
const tokenURITemplate = {
    name:"",
    description: "",
    image: "",
}

module.exports = async({ getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();

  if(process.env.UPLOAD_TO_IPFS == true){
    handleTokenURI();
  }


  log("Deploying...");
  arguments = [mintFee, tokenURI];
  const Pudhina = await deploy("Pudhina", {
    from: deployer,
    args: arguments,
    logs: true
  })

  const updateValue = await Pudhina.getNameAndSymbol("Dog", "DG");
  await updateValue.wait(1);

  const [_name, _symbol] = await Pudhina.returnNameAndSymbol();
  console.log(`Updated Value ${_name}, ${_symbol}`);

  const mintNFT = await Pudhina.mintNft({value: mintFee.toString()});
  await mintNFT.wait(1);
}


async function handleTokenURI() {

  tokenURI = [];
  const {fileResponse, files} = await storeImages(imagePath);
  let i = 1
  for (const i in fileResponse){
      let tokenURIMetaData = {...tokenURITemplate};
      tokenURIMetaData.name = files[i].replace(".png", "");
      tokenURIMetaData.description = `Token number: ${i}`;
      tokenURIMetaData.image = `ipfs://${fileResponse[i].IpfsHash}`;
      console.log(`Token Number: ${i}`);
      const uriResponse = await storeTokenURI(tokenURIMetaData);
      tokenURI.push(`ipfs://${uriResponse.IpfsHash}`);
      i++;
  }
  console.log("Uploaded URIs");
  console.log(tokenURI);
  return tokenURITemplate
}
