import React, {Component} from 'react';

export default class Share extends Component {
    constructor(){
        super();
        this.state = {
            seen: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const name = event.target.name;
        if (name === 'close'){
            this.props.toggle();
        }
    }
    
    render(){
        
        return (
            <div className='popup display-block'>
                <div className='popup-main'>
                    <div>
                        <button className='close_button' name='close' onClick={this.handleClick}>x</button>
                        <div>
                            <h3 className='popup_head'>Sharing CID:</h3>
                            <p className='popup_head'>file description</p>
                        </div>
                        <div className='share_buttons'>
                            <button>QR Code</button>
                            <button>Copy to Clipboard</button>
                            <button>Email</button>
                            <button>Social Media</button>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

