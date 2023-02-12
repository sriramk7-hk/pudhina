const {ethers, network} = require("hardhat");
const {storeImages, storeTokenURI} =  require("../utils/UploadToPinata");
require("dotenv").config()

let mintFee = ethers.utils.parseEther("0.00001");
let tokenURI = [];
const imagePath = "./NFTImages/";
let _name = "Emboss";
let _symbol = "Eb";
const tokenURITemplate = {
    name:"",
    description: "",
    image: "",
}

module.exports = async({ getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();

  // if(process.env.UPLOAD_TO_IPFS == true){
    
  // }
  tokenURI = await handleTokenURI();


  log("Deploying...");
  arguments = [mintFee, tokenURI, _name, _symbol];
  const Pudhina = await deploy("Pudhina", {
    from: deployer,
    args: arguments,
    logs: true,
    waitConfirmations: network.config.blockConfirmations
  })

  
  const pudhina = await ethers.getContractAt("Pudhina", Pudhina.address)
  console.log("Deployed!")

  // const updateValue = await pudhina.getNameAndSymbol("Cat", "CT");
  // await updateValue.wait(network.config.blockConfirmations);
  

  // const [_name, _symbol] = await pudhina.returnNameAndSymbol();
  // console.log(`Updated Value ${_name}, ${_symbol}`);

  const mintNFT = await pudhina.mintNft({value: ethers.utils.parseEther("0.000012")});
  await mintNFT.wait(network.config.blockConfirmations);

  await pudhina.withdraw();
  await mintNFT.wait(network.config.blockConfirmations);

  console.log(pudhina);

  
}


async function handleTokenURI() {

  const  tokenURIs = [];
  const {responses: fileResponse, files} = await storeImages(imagePath);
  let t = 1
  for (i in fileResponse){
      let tokenURIMetaData = {...tokenURITemplate};
      tokenURIMetaData.name = files[i].replace(".png", "");
      tokenURIMetaData.description = `Token number: ${t}`;
      tokenURIMetaData.image = `ipfs://${fileResponse[i].IpfsHash}`;
      console.log(`Uploading Token Number: ${t}`);
      const uriResponse = await storeTokenURI(tokenURIMetaData);
      console.log(uriResponse)
      tokenURIs.push(`ipfs://${uriResponse.IpfsHash}`);
      t++;
  }
  console.log("Uploaded URIs");
  console.log(tokenURIs);
  return tokenURIs;
}
