import React, {Component} from 'react';

export default class Share extends Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(name){
        console.log(this.event.target);
    }
    
    render(){
        
        return (
            <div className='popup'>
                <div className='popup_content'>
                    <span className='close_button' name='close' onClick={this.handleClick}>x</span>
                    <div className='share'>
                        <h3>Share Your File!</h3>
                        <div className='share'>
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

