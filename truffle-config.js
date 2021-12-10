require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const privateKeys = [
  "475d83549d2e0a88afc763cc1801eb5ae455fd5368f05c9ee82fe66b8b53fa20",
];
const tokenKey = "a7dfaf2d0b0c40528fc74fc023533618";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys,
          "https://rinkeby.infura.io/v3/" + tokenKey
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./abis/",

  compilers: {
    solc: {
      version: "^0.8.10",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
