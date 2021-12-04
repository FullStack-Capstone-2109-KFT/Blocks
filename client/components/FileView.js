import React, { Component, useCallback } from "react";
import Blocks from "../../abis/Blocks.json";
import StyledDropzone from "./Drag&Drop";
const Web3 = require("web3");
const { create } = require("ipfs-http-client");

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
})

export default class FileView extends Component {
    constructor(){
        super();
        this.state = {
            files: [
                {description: 'file1', type: '.jpg', cid: 'soifnaopehfasoifhposehf', id: 1},
                {description: 'file2', type: '.jpg', cid: 'sdoifnasdokfnjpowaiehjs', id: 2},
                {description: 'file3', type: '.pdf', cid: 'aisfnoisnadfoiaskhjgoas', id: 3},
                {description: 'file4', type: '.txt', cid: 'skaldjfoigakiwfjoijaosi', id: 4}
            ]
        }
    }

    render(){
        return (
          <div className="fileView-flex">
            <h3 id='heading'>Uploaded Files</h3>
            <table className='fileTable'>
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
                    {this.state.files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.description}</td>
                            <td>{file.cid}</td>
                            <td>{file.type}</td>
                            <td>File Encryption</td>
                            <td><button className='share'>Share</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        );
    }
}
