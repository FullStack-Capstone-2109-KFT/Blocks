require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const privateKeys = [
  "475d83549d2e0a88afc763cc1801eb5ae455fd5368f05c9ee82fe66b8b53fa20",
];
const tokenKey = "a7dfaf2d0b0c40528fc74fc023533618";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
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
