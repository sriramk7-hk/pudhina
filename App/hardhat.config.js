require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MANTLE_TESTNET_RPC_URL = process.env.MANTLE_TESTNET_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },

  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
      //gasPrice: 000000000000000001
    },
    "mantle-testnet": {
      url: MANTLE_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5001,
      blockConfirmations: 1
    }
  },

  namedAccounts: {
    deployer: {
      default: 0,
      "mantle-testnet": 0,
      goerli: 0
    },
  },
};
