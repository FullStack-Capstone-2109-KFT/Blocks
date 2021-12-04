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
      files: [
        //temp hardcode for render
        {
          description: "file1",
          type: ".jpg",
          cid: "soifnaopehfasoifhposehf",
          id: 1,
        },
        {
          description: "file2",
          type: ".jpg",
          cid: "sdoifnasdokfnjpowaiehjs",
          id: 2,
        },
        {
          description: "file3",
          type: ".pdf",
          cid: "aisfnoisnadfoiaskhjgoas",
          id: 3,
        },
        {
          description: "file4",
          type: ".txt",
          cid: "skaldjfoigakiwfjoijaosi",
          id: 4,
        },
      ],
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
    // console.log(this.state.userFiles);
    // console.log(this.state.userFiles[0].fileHash);
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
          {/* <tbody>
            {this.state.files.map((file) => (
              <tr>
                <td>{file.description}</td>
                <td>{file.cid}</td>
                <td>{file.type}</td>
                <td>File Encryption</td>
                <td>
                  <button className="share">Share</button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    );
  }
}
