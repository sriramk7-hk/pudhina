const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecret = process.env.PINATA_API_SECRET;
const pinata = new pinataSDK(pinataApiKey, pinataSecret);
async function storeImages(imagesFilePath) {
  const imagePath = path.resolve(imagesFilePath);

  const files = fs
    .readdirSync(imagePath)
    .filter((file) => file.includes(".png"));
  let responses = [];
  for (const i in files) {
    const readableStreamForFile = fs.createReadStream(
      `${imagePath}/${files[i]}`
    );
    const options = {
        pinataMetaData:{
        name: files[i].toLowerCase(),
      }
    }

    await pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result) => {
          responses.push(result);
          //console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    
  }

  return { responses, files };
}

async function storeTokenURI(metaData) {
  const options = {
    pinataMetaData: {
      name: metaData.name,
    },
  };
  let response;
  await pinata
      .pinJSONToIPFS(metaData, options)
      .then((result) => {
        response = result;
      })
      .catch((error) => {
        console.log(error);
      });
  return response;
}


module.exports = { storeImages, storeTokenURI };
