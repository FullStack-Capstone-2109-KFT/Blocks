import React, { useState, useEffect } from 'react';

function CidReader() {
  const [cidValue, setValue] = useState('');

  const handleOnChange = (e) => {
    let targeValue = e.target.value;
    setValue(targeValue);
  };

  return (
    <div className='outerCID'>
      <div className='cid-container'>
        <p className='CIDText'>
          Hello, you can retrieve your file just by pasting the CID into the
          field!
        </p>
        <input
          className='inputCID'
          type='text'
          placeholder='Paste your CID...'
          value={cidValue}
          onChange={handleOnChange}
        />
        <button className='buttonCID' type='submit'>
          {' '}
          <a
            className='ipfs-a'
            href={'https://ipfs.io/ipfs/' + `${cidValue}`}
            target={'_blank'}
          >
            Find it!
          </a>{' '}
        </button>
        <button className='buttonCID' onClick={() => setValue('')}>
          Clear Field
        </button>
      </div>
    </div>
  );
}

export default CidReader;
