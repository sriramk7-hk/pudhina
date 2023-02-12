const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecret = process.env.PINATA_API_SECRET;
const pinata = new pinataSDK(pinataApiKey, pinataSecret);

module.export = async function storeIamges(imagesFilePath) {
  const imagePath = path.resolve(imagesFilePath);

  const files = fs
    .readdirSync(imagePath)
    .filter((file) => file.includes(".png"));
  let respones = [];
  for (const i in files) {
    const readableStreamForFile = fs.createReadStream(
      `${imagePath}/${files[i]}`
    );
    const options = {
      pinataMetaData: {
        name: files[i],
      },
    };

    try {
      await pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result) => {
          respones.push(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { respones, files };
};

module.exports = async function storeTokenURI(metaData) {
  const options = {
    pinataMetaData: {
      name: metaData.name,
    },
  };

  try {
    await pinata
      .pinJSONToIPFS(metaData, options)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
  return null;
};
