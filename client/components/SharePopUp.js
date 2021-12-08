import React, {Component} from 'react';
const QRCode = require('qrcode.react');

export default class Share extends Component {
    constructor(){
        super();
        this.state={
            copied: false,
            qr: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const name = event.target.name;
        if (name === 'close'){
            this.setState({
                copied: false,
                qr: false
            })
            this.props.toggle();
        }
    }
    
    render(){
        console.log(this.state.copied);
        return (
            <div className='popup display-block'>
                { this.props.seen && (this.props.fileSeen === this.props.fileSelected ) ? 
                    this.state.copied === false && (this.state.qr === false) ? 
                    (<div className='popup-main'>
                        <div>
                            <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                            <div>
                                <h3 className='popup_head'>Sharing CID:</h3>
                                <p className='popup_head'>{this.props.fileDesc ? this.props.fileDesc : 'No Description'}</p>
                            </div>
                            <div className='share_buttons'>
                                <button onClick={() => {
                                    this.setState({qr: true})}}>QR Code</button>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(this.props.fileCID);
                                    this.setState({copied: true})}}>Copy to Clipboard</button>
                            </div>
                        </div> 
                    </div>) : 
                    this.state.qr === true ?
                    (<div className='popup-main'>
                        <div>
                        <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                            <div>
                                <h3 className='popup_head'>Sharing CID:</h3>
                                <p className='popup_head'>{this.props.fileDesc ? this.props.fileDesc : 'No Description'}</p>
                            </div>
                            <div className='share_buttons'>
                                <div style={{alignSelf: 'center'}}>
                                    <QRCode value={this.props.fileCID}/>
                                </div>
                            </div>
                        </div>
                    </div>) :
                    (<div className='popup-main'>
                        <div>
                            <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                            <div>
                                <h3 className='popup_head'>Sharing CID:</h3>
                                <p className='popup_head'>{this.props.fileDesc ? this.props.fileDesc : 'No Description'}</p>
                            </div>
                            <div className='share_buttons'>
                                <h3>Your CID has been copied to your clipobaord.</h3>
                                <h4>Cool beans!!</h4>
                            </div>
                        </div> 
                    </div>) : null
                }
            </div>
        )
    }
}

