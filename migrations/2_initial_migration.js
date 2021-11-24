const Blocks = artifacts.require("Blocks");

module.exports = function (deployer) {
  deployer.deploy(Blocks);
};
