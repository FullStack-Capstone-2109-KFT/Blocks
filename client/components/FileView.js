import React, { Component, useCallback } from "react";
// import Blocks from "../../abis/Blocks.json"; //remove?
// import StyledDropzone from "./Drag&Drop"; // remove?
import { loadWeb3, loadBlockchainData } from "../store/blockchain";
import Share from "./SharePopUp";
// const Web3 = require("web3");
const { create } = require("ipfs-http-client");
import { decryptFile } from "../store/encryption";

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
      seen: false,
      selected: null,
      decryptionKey: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getFileFromIPFS = this.getFileFromIPFS.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
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
    // console.log("Retrieving user information from Blockchain");

    let userFileCount = await this.state.blocks.methods.getUser(userId).call();

    if (parseInt(userFileCount) > 0) {
      this.setState({ fileCount: parseInt(userFileCount) });
    }
  };

  getUserFiles = async (userId) => {
    let files = [];

    // console.log("Retrieving user files from Blockchain");

    for (let i = 1; i <= this.state.fileCount; i++) {
      let file = await this.state.blocks.methods.getUserFile(userId, i).call();
      if (file.fileHash.length > 0) {
        files.push(file);
      }
    }

    this.setState({ userFiles: files });
  };

  async getFileFromIPFS(cid, fileType, description) {
    let bufferArray = [];

    for await (const chunk of ipfs.cat(cid)) {
      bufferArray = bufferArray.concat(chunk);
    }

    let length = bufferArray.reduce((acc, value) => acc + value.length, 0);

    let result = new Uint8Array(length);
    let l = 0;
    for (let array of bufferArray) {
      result.set(array, l);
      l += array.length;
    }

    if (this.state.decryptionKey.length > 0) {
      // console.log("Attempting file decryption with provided key");
      result = await decryptFile(result, this.state.decryptionKey);
    }

    let blob = new Blob([result], { type: fileType });
    let typeSuffix = fileType.split("/")[1];

    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${description}.${typeSuffix}`;
    link.click();
  }

  handleKeyChange = (evt) => {
    let target = evt.target.value;
    this.setState({ decryptionKey: target });
  };

  handleClick(event, num) {
    const name = event.target.name;
    if (name === "share") {
      this.setState({
        selected: num,
      });
      this.togglePopup();
    }
  }

  togglePopup() {
    this.setState({
      seen: !this.state.seen,
    });
  }

  render() {
    const seen = false;

    return (
      <div className="fileView-flex">
        {this.state.seen ? (
          <div id="opaque" style={{ display: "block" }}></div>
        ) : (
          <div id="opaque" style={{ display: "none" }}></div>
        )}
        <h3 id="heading">Uploaded Files</h3>
        <div className="decryptContainer">
          <input
            className="decrypt"
            type="text"
            onChange={this.handleKeyChange}
            placeholder="Decryption Key - (applied to all attempted downloads)"
          />
        </div>
        <table className="fileTable">
          <thead>
            <tr>
              <th>Description</th>
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
                <td>
                  <a
                    onClick={() =>
                      this.getFileFromIPFS(
                        file.fileHash,
                        file.fileType,
                        file.description
                      )
                    }
                  >
                    {file.fileHash}
                  </a>
                </td>
                <td>{file.fileType}</td>
                <td>File Encryption</td>
                <td>
                  <button
                    className="share_button"
                    name="share"
                    onClick={(event, num = file.fileNumber) =>
                      this.handleClick(event, num)
                    }
                  >
                    Share
                  </button>
                  <Share
                    seen={this.state.seen}
                    fileSeen={file.fileNumber}
                    fileCID={file.fileHash}
                    fileDesc={file.description}
                    fileSelected={this.state.selected}
                    toggle={this.togglePopup}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
