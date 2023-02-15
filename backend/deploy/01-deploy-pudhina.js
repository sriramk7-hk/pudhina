const {ethers, network} = require("hardhat");
const { storeImages, storeTokenURI } = require("../utils/UploadToPinata");
require("dotenv").config()

let mintFee = ethers.utils.parseEther("0.00001");

let tokenURI = [];
const imagePath = "./NFTImages/";

const tokenURITemplate = 
{
  name: "",
  description: "",
  image: "",
};

module.exports = async({ getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();
  
  tokenURI = await handleTokenURI();


  log("Deploying...");
  arguments = [mintFee, tokenURI];
  const Pudhina = await deploy("Pudhina", {
    from: deployer,
    args: arguments,
    logs: true,
    waitConfirmations: network.config.blockConfirmations || 1
  })
  console.log("Deployed!");

  console.log(`Contract Address: ${Pudhina.address}`);

  
}


async function handleTokenURI() {
  const tokenURIs = [];
  const { responses: fileResponse, files } = await storeImages(imagePath);
  let t = 1;
  for (i in fileResponse) {
    let tokenURIMetaData = { ...tokenURITemplate };
    tokenURIMetaData.name = files[i].replace(".png", "");
    tokenURIMetaData.description = `Token number: ${t}`;
    tokenURIMetaData.image = `ipfs://${fileResponse[i].IpfsHash}`;
    console.log(`Uploading Token Number: ${t}`);
    const uriResponse = await storeTokenURI(tokenURIMetaData);
    console.log(uriResponse);
    tokenURIs.push(`ipfs://${uriResponse.IpfsHash}`);
    t++;
  }
  console.log("Uploaded URIs");
  console.log(tokenURIs);
  return tokenURIs;
}


