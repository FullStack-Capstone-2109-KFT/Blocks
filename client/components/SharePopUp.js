import React, {Component} from 'react';

export default class Share extends Component {
    constructor(){
        super();
        this.state={
            copied: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const name = event.target.name;
        if (name === 'close'){
            this.setState({
                copied: false
            })
            this.props.toggle();
        }
    }
    
    render(){
        console.log(this.state.copied);
        return (
            <div className='popup display-block'>
                { this.props.seen && (this.props.fileSeen === this.props.fileSelected ) ? 
                    this.state.copied === false ? 
                    (<div className='popup-main'>
                        <div>
                            <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                            <div>
                                <h3 className='popup_head'>Sharing CID:</h3>
                                <p className='popup_head'>file description</p>
                            </div>
                            <div className='share_buttons'>
                                <button>QR Code</button>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(this.props.fileCID);
                                    this.setState({copied: true})}}>Copy to Clipboard</button>
                            </div>
                        </div> 
                    </div>) : 
                    (<div className='popup-main'>
                        <div>
                            <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                            <div>
                                <h3 className='popup_head'>Sharing CID:</h3>
                                <p className='popup_head'>file description</p>
                            </div>
                            <div className='share_buttons'>
                                <h3>Your CID has been copied to your clipobaord.</h3>
                                <h4>Cool beans!!</h4>
                            </div>
                        </div> 
                    </div>) :  null
                }
            </div>
        )
    }
}

