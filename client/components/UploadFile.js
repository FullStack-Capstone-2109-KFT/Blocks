import React, { Component, useCallback } from "react";
import Blocks from "../../abis/Blocks";
import StyledDropzone from "./Drag&Drop";
import { loadWeb3, loadBlockchainData } from "../store/blockchain";
const Web3 = require("web3");
const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class UploadFile extends Component {
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
      id: 0,
      userName: "",
    };
  }

  async componentDidMount() {
    await loadWeb3();
    let bcData = await loadBlockchainData();
    this.setState({
      id: this.props.userId,
      userName: this.props.userName,
      account: bcData.account,
      blocks: bcData.contract,
    });
  }

  togglePop() {
    this.setState({
      seen: !this.state.seen
    })
  }

  render() {
    return (
      <div className="nav-margin">
        <StyledDropzone
          ipfs={ipfs}
          blocks={this.state.blocks}
          account={this.state.account}
          id={this.state.id}
          userName={this.state.userName}
        />
      </div>
    );
  }
}
