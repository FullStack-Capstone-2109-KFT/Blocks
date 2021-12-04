import React, { Component, useCallback } from "react";
import Blocks from "../../abis/Blocks.json";
import StyledDropzone from "./Drag&Drop";
import { loadWeb3, loadBlockchainData } from "../store/blockchain";
const Web3 = require("web3");
const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class FileView extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      blocks: null,
      fileCount: 0,
      userFiles: [],
    };
  }

  async componentDidMount() {
    await loadWeb3();
    let bcData = await loadBlockchainData();
    let userId = this.props.userId;
    this.setState({ id: userId, blocks: bcData.contract });
    await this.getUserData(userId);
    await this.getUserFiles(userId);
  }

  getUserData = async (userId) => {
    console.log("Retrieving user information from Blockchain");

    let user = await this.state.blocks.methods.getUser(userId).call();

    if (parseInt(user.fileCount) > 0) {
      this.setState({ fileCount: parseInt(user.fileCount) });
    }
  };

  getUserFiles = async (userId) => {
    let files = [];

    console.log("Retrieving user files from Blockchain");

    for (let i = 1; i <= this.state.fileCount; i++) {
      let file = await this.state.blocks.methods.getUserFile(userId, i).call();
      if (file.fileHash.length > 0) {
        files.push(file);
      }
    }

    this.setState({ userFiles: files });
  };

  render() {
    return (
      <div className="fileView-flex">
        <h3 id="heading">Uploaded Files</h3>
        <table className="fileTable">
          <thead>
            <tr>
              <th>File</th>
              <th>CID</th>
              <th>Type</th>
              <th>Encryption Key</th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userFiles.map((file) => (
              <tr key={file.fileNumber}>
                <td>{file.description}</td>
                <td><a href={"https://ipfs.io/ipfs/" + `${file.fileHash}`} target="_blank">{file.fileHash}</a></td>
                <td>{file.type}</td>
                <td>File Encryption</td>
                <td>
                  <button className="share">Share</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
