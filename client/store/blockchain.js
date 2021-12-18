const Web3 = require("web3");
import Blocks from "./../../abis/Blocks.json";

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      `Hi there - Blocks requires users to have a MetaMask account in order to interact with the blockchain. Do you have MetaMask installed? (https://metamask.io/download.html)` +
        "\n" +
        "\n" +
        "(Error: Non-Ethereum browser detected)"
    );
  }
};

export const loadBlockchainData = async () => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const networkData = Blocks.networks[networkId];
  if (networkData) {
    const blocks = new web3.eth.Contract(Blocks.abi, networkData.address);
    return { account: accounts[0], contract: blocks };
  } else {
    window.alert("Blocks contract not deployed to detected network");
  }
};
