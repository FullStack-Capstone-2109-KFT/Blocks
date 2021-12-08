import React, { Component, useCallback } from "react";
import Blocks from "../../abis/Blocks.json"; //remove?
import StyledDropzone from "./Drag&Drop"; // remove?
import { loadWeb3, loadBlockchainData } from "../store/blockchain";
import Share from "./SharePopUp";
const Web3 = require("web3");
const { create } = require("ipfs-http-client");
// import { fileTypeFromFile } from "file-type";
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
    };

    this.handleClick = this.handleClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getFileFromIPFS = this.getFileFromIPFS.bind(this);
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

    let user = await this.state.blocks.methods.getUser(userId).call();

    if (parseInt(user.fileCount) > 0) {
      this.setState({ fileCount: parseInt(user.fileCount) });
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

  async getFileFromIPFS(cid) {
    let key = "123";
    // key = ""; //comment for encrypted
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

    let decryptedBuffer = await decryptFile(result, key);

    console.log([decryptedBuffer]);

    let blob = new Blob([decryptedBuffer], { type: "application/jpg" });

    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "test";
    link.click();

    // ;
    // let url = window.URL.createObjectURL(blob);
    // console.log(url);

    // let a = document.createElement("a");
    // a.href = decryptedBuffer;
    // a.download = "testFile";
    // document.body.appendChild(a);
    // a.style = "display: none";

    // a.click();
    // a.remove();

    // console.log(blob);

    // let a = document.createElement("a");
    // a.style.display = "none";
    // let url = window.URL.createObjectURL(
    //   new Blob(decryptedBuffer, { type: "application/jpg" })
    // );
    // a.setAttribute("href", url);
    // document.body.appendChild(a);
    // a.click();

    // let key = "123";
    // let decryptedChunk = await decryptFile(chunk, key);
    // let binary = "";
    // for (let i = 0; i < decryptedChunk.length; i++) {
    //   binary += String.fromCharCode([decryptedChunk[i]]);
    // }
    // const file = window.btoa(binary);
    // let fileType = "jpg";
    // let mimType = "application/" + fileType;
    // const url = `data:${mimType};base64,` + file;
    // window.location.replace(url);
    // console.log(url);
    // }
    // console.log(bufferArray);
  }

  handleClick() {
    const name = event.target.name;
    console.log(this.state.seen);
    if (name === "share") {
      this.togglePopup();
    }
  }

  togglePopup() {
    this.setState({
      seen: !this.state.seen,
    });
  }

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
                <td>
                  {/* <a
                    href={"https://ipfs.io/ipfs/" + `${file.fileHash}`}
                    target="_blank"
                  > */}
                  <a onClick={() => this.getFileFromIPFS(file.fileHash)}>
                    {file.fileHash}
                  </a>

                  {/* <a
                    href={`${this.getFileFromIPFS(file.fileHash)}`}
                    target="_blank"
                  >
                    {file.fileHash}
                  </a> */}
                </td>
                <td>{file.type}</td>
                <td>File Encryption</td>
                <td>
                  <button
                    className="share_button"
                    name="share"
                    onClick={this.handleClick}
                  >
                    Share
                  </button>
                  {this.state.seen ? <Share toggle={this.togglePopup} /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
