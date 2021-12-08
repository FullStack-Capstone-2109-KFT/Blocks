import React, {Component} from 'react';

export default class Share extends Component {
    constructor(){
        super();

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
                { this.props.seen && (this.props.fileSeen === this.props.fileSelected ) ? 
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
                            </div>
                        </div> 
                    </div> : null
                }
            </div>
        )
    }
}

