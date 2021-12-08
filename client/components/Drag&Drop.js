import { filter } from 'compression';
import React, { useMemo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { encryptFile } from '../store/encryption';
import { Popup } from 'semantic-ui-react'

const encryptionInfo = {
  name: <h5 className="encryptName">Why Encryption?</h5>,
  bio: <p className="encryptBio">It helps protect your file, and can enhance security.</p>
}

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const [buff, setBuffer] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [isChecked, setIsCheck] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept:
      'image/*, .pdf, .doc, .js, .txt, .xls, .mp4, .move, .jpeg, .ppt, .key, .mp3',
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const theFile = acceptedFiles[0];
      console.log(theFile);
      const reader = new window.FileReader();

      reader.readAsArrayBuffer(theFile);
      reader.onloadend = () => {
        setBuffer(Buffer.from(reader.result));
        setName(theFile.name);
        setType(theFile.type);
      };
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? activeStyle : {}),
      ...(isDragReject ? activeStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  let thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {file.type === 'image/png' ? (
          <img src={file.preview} style={img} />
        ) : (
          <div>
            <iframe
              className={file.type}
              width='100%'
              height='600'
              frameBorder='0'
              src={file.preview}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  let filepath = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    // console.log(buff, name, type);
  }, [name, type]);

  const handleChange = (evt) => {
    let target = evt.target.value;
    setDescription(target);
  };

  const handleKeyChange = (evt) => {
    let target = evt.target.value;
    setEncryptionKey(target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadFile();
    setDescription('');
    setEncryptionKey('');
  };
  const handleChecked = () => {
    setIsCheck(!isChecked);
  };

  const uploadFile = async () => {
    let encryptedBuff = buff;

    //If a key has been provided, encrypt the file with it
    if (encryptionKey.length > 0) {
      console.log('Encrypting File');
      encryptedBuff = await encryptFile(buff, encryptionKey);
    }

    //Add file to IPFS and receive CID
    console.log('Submitting file to IPFS');
    const res = await props.ipfs.add(encryptedBuff);
    console.log(res);

    //identify key variables for contract calls
    const fileCID = res.path;
    const userId = props.id;
    const userName = props.userName;
    const metaMaskAccount = props.account;
    const fileType = type;

    //check blockchain for user with user id. If does not exist, create new user through contract
    let user = await props.blocks.methods.getUser(userId).call();
    if (user.userName.length < 1) {
      await props.blocks.methods
        .newUser(userId, userName)
        .send({ from: metaMaskAccount });
    }

    //get fileKey for next file for the assigned user
    const fileKey = parseInt(user.fileCount) + 1;

    //add file to blockchain for the logged in user
    await props.blocks.methods
      .addFile(userId, fileKey, fileCID, fileType, description)
      .send({ from: metaMaskAccount });
  };
  return (
    <div style={blocksImg}>
      <form onSubmit={handleSubmit}>
        <div>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} type='file' />

            <p style={DragText}>Drag 'n' drop files here</p>

            <img
              style={img}
              src={
                'https://upload.wikimedia.org/wikipedia/commons/8/81/Portfolio_.gif'
              }
            />

            <button style={browseFiles} type='button' onClick={open}>
              Browse Files
            </button>
            <div className='inputContainer'>
              <input
                className='input'
                type='text'
                onChange={handleChange}
                value={description}
                placeholder='Title / Description (max 20 chars)'
                maxLength='20'
              />
                {/* <h3 className="checbox-text">
                  Do you want to encrypt your file?
                  <Popup
                  className="popUp"
                  content={encryptionInfo.bio}
                  trigger={<FontAwesomeIcon className="fas fa-info-circle" icon={["fas", "info-circle"]}/>}
                  key={encryptionInfo.name}
                  header={encryptionInfo.name}
                  />
                  <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
                </h3> */}

              <h3 className='checkbox-text'>
                Do you want to encrypt your file?
                <Popup className="popUp" content={encryptionInfo.bio}
                trigger={<FontAwesomeIcon className="fas fa-info-circle" icon={["fas", "info-circle"]}/>}
                key={encryptionInfo.name}
                header={encryptionInfo.name}
                />
                
                <input
                  className='encryptCheckbox'
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleChecked}
                />
              </h3>
              {isChecked ? (
                <input
                  type='text'
                  className='input'
                  onChange={handleKeyChange}
                  value={encryptionKey}
                  placeholder='Encryption Key (up to 20 chars) - keys are NOT SAVED.'
                  maxLength='20'
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <div style={fileContainer}>
            <div className='fileUploadContainer'>
              <h4 style={file}>File to Upload</h4>
              <ul>{filepath}</ul>

              <aside style={thumbsContainer}>{thumbs}</aside>

              <input
                style={submit}
                type='submit'
                value='Submit'
                onClick={() => {
                  setFiles([]);
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StyledDropzone;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  borderWidth: '4px',
  borderRadius: 2,
  borderColor: '#009688',
  borderStyle: 'dashed',
  backgroundColor: '#green',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '100%',
  height: '400px',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  backgroundColor: 'green',
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #17c387',
  marginBottom: 8,
  marginRight: 8,
  width: 'auto',
  height: 200,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const browseFiles = {
  backgroundColor: '#14b185',
  marginTop: '50px',
  padding: '5px',
  color: 'white',
  borderRadius: '3px',
  fontSize: '12px',
  letterSpacing: '1px',
  width: '150px',
  height: '34px',
  border: '1px solid #03a9f4',
};

const img = {
  display: 'block',
  width: '175px',
  height: '175px',
  marginTop: '35px',
};

const doc = {
  width: '100%',
  height: '800px',
  backgroundColor: 'red',
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const input = {
  width: '150px',
  marginBottom: '33px',
  marginTop: '76px',
  height: '34px',
  padding: '7px',
};

const submit = {
  backgroundColor: '#14b185',
  marginTop: '22px',
  padding: '5px',
  color: 'white',
  borderRadius: '3px',
  fontSize: '12px',
  letterSpacing: '1px',
  width: '70%',
  height: '34px',
  border: '1px solid #03a9f4',
  justifyContent: 'center',
  alignItems: 'center',
};

const uploadImg = {
  width: '30px',
  height: '30px',
};

const DragText = {
  fontSize: '20px',
  letterSpacing: '1px',
  color: '#black',
  fontWeight: 'bold',
  marginTop: '20px',
};

const file = {
  fontSize: '24px',
  letterSpacing: '2px',
  marginTop: '74px',
  fontWeight: '400',
};

const fileContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '21x',
  width: '400px',
  alignContent: 'space-between',
};

const blocksImg = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

