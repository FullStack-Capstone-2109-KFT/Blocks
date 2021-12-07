import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Features extends React.Component {
  render() {
    const { props } = this;

    return (
      <div id='features' className='text-center'>
        <div className='container'>
          <div className='col-md-10 col-md-offset-1 section-title'>
            <h2>Do more with your files</h2>
          </div>
          <div className='row'>
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                    {' '}
                    <FontAwesomeIcon
                      className={'fa fa-' + d.icon}
                      icon={d.icon}
                    />
                    <h3 className='featureIcon'>{d.title}</h3>
                    <p className='pText'>{d.text}</p>
                  </div>
                ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    );
  }
}
