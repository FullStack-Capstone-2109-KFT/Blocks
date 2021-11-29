import React, { Component } from 'react';
import Blocks from '../../abis/Blocks';
const Web3 = require('web3');
const { create } = require('ipfs-http-client');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      blocks: null,
      files: [],
      loading: false,
      type: null,
      name: null,
    };
    //this.uploadFile
    this.captureFile = this.captureFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // const description = this.fileDescription.value;
    // this.uploadFile(description);
    console.log(this);
  };

  async componentWillMount() {
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
      window.alert('Non-Ethereum browser detected');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const networkData = Blocks.networks[networkId];
    console.log(networkData);
    if (networkData) {
      const blocks = new web3.eth.Contract(Blocks.abi, networkData.address);
      this.setState({ blocks });
      const filesCount = await blocks.methods.fileCount().call();
      this.setState({ filesCount });
      for (let i = filesCount; i >= 1; i--) {
        const file = await blocks.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      window.alert('Blocks contract not deployed to detected network');
    }
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log('buffer', this.state.buffer);
    };
    console.log(event);
  };

  uploadFile = (description) => {
    console.log('Submitting file to IPFS...');

    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result.size);
      if (error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });
      if (this.state.type === '') {
        this.setState({ type: 'none' });
      }

      this.state.blocks.methods
        .uploadFile(
          result[0].hash,
          result[0].size,
          this.state.type,
          this.state.name,
          description
        )
        .send({ from: this.state.account })
        .on('transactionHash', (hash) => {
          this.setState({
            loading: false,
            type: null,
            name: null,
          });

          window.location.reload();
        })
        .on('error', (e) => {
          window.alert('Error');
          this.setState({ loading: false });
        });
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.handleSubmit();
          }}
        >
          <label>
            Name:
            <input type='file' onChange={this.captureFile} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
