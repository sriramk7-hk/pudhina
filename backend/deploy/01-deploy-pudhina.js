const {network} = require("hardhat");

module.exports = async({ getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();

  log("Deploying...");
  arguments = [];
  const Pudhina = await deploy("Pudhina", {
    from: deployer,
    args: arguments,
    logs: true
  })
}

module.exports.tags = ["all","Pudhina", "main"];