import React, { Component, useCallback } from "react";
import Blocks from "../../abis/Blocks.json";
import StyledDropzone from "./Drag&Drop";
const Web3 = require("web3");
const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      blocks: null,
      files: [],
      loading: false,
      type: null,
      name: null,
      description: "",
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Blocks.networks[networkId];
    if (networkData) {
      const blocks = new web3.eth.Contract(Blocks.abi, networkData.address);
      this.setState({ blocks });
    } else {
      window.alert("Blocks contract not deployed to detected network");
    }
  }

  // handleChange = (evt) => {
  //   const target = evt.target.value;
  //   this.setState({ description: target });
  // };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const description = this.state.description;
  //   this.uploadFile(description);
  // };

  // captureFile = (event) => {
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   const reader = new window.FileReader();

  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => {
  //     this.setState({
  //       buffer: Buffer(reader.result),
  //       type: file.type,
  //       name: file.name,
  //     });
  //   };
  // };

  // uploadFile = async (description) => {
  //   // console.log("Submitting file to IPFS...");
  //   // const result = await ipfs.add(this.state.buffer);
  //   // const fileCID = result.path;
  //   // const userID = ???this.state.userID???

  //   // await this.state.blocks.methods
  //   //   .addFile(1, 2, result.path)
  //   //   .send({ from: this.state.account });

  //   const user = await this.state.blocks.methods.getUser(1).call();
  //   const userFile = await this.state.blocks.methods.getUserFile(1, 1).call();
  //   console.log("USER:", user);
  //   console.log("FILE", userFile);
  // };

  render() {
    return (
      <div className="nav-margin">
        <StyledDropzone
          ipfS={ipfs}
          blocks={this.state.blocks}
          account={this.state.account}
        />
        {/* <label>
            Name:
            <input type="file" onChange={this.captureFile} />
          </label>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" value="Submit" /> */}
      </div>
    );
  }
}
