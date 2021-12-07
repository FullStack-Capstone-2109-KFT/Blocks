import { filter } from "compression";
import React, { useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { encryptFile } from "../store/encryption";

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const [buff, setBuffer] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState("");

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
      "image/*, .pdf, .doc, .js, .txt, .xls, .mp4, .move, .jpeg, .ppt, .key, .mp3",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const theFile = acceptedFiles[0];
      console.log(theFile);
      const reader = new window.FileReader();

      reader.readAsArrayBuffer(theFile);
      reader.onloadend = () => {
        setBuffer(Buffer(reader.result));
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
        {file.type === "image/png" ? (
          <img src={file.preview} style={img} />
        ) : (
          <div>
            <iframe
              className={file.type}
              width="100%"
              height="600"
              frameBorder="0"
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadFile();
    setDescription("");
  };

  const uploadFile = async () => {
    //if encryption is desired. Get key from user input
    // console.log("Encrypting File");
    // let key = "123";
    // let encryptedBuff = encryptFile(buff, key);

    //   //Add file to IPFS and receive CID
    console.log("Submitting file to IPFS");
    // const res = await props.ipfs.add(encryptedBuff);
    const res = await props.ipfs.add(buff);
    console.log(res);

    //identify key variables for contract calls
    const fileCID = res.path;
    const userId = props.id;
    const userName = props.userName;
    const metaMaskAccount = props.account;

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
      .addFile(userId, fileKey, fileCID, description)
      .send({ from: metaMaskAccount });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} type="file" />
            <p style={DragText}>Drag 'n' drop files here</p>

            <FontAwesomeIcon style={img} icon={"key"} />

            <button style={browseFiles} type="button" onClick={open}>
              Browse Files
            </button>
          </div>
          <input
            type="text"
            style={input}
            onChange={handleChange}
            value={description}
            placeholder="Description"
          />
          <div style={fileContainer}>
            <aside>
              <h4 style={file}>Your Files</h4>
              <ul>{filepath}</ul>
            </aside>
            <aside style={thumbsContainer}>{thumbs}</aside>
            <input
              style={submit}
              type="submit"
              value="Submit"
              onClick={() => {
                setFiles([]);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default StyledDropzone;

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#009688",
  borderStyle: "dashed",
  backgroundColor: "#green",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  maxWidth: "45%",
  height: "391px",
  marginLeft: "98px",
  marginTop: "-42px",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  backgroundColor: "green",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #17c387",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const browseFiles = {
  backgroundColor: "#17c387",
  marginTop: "54px",
  padding: "3px",
  color: "white",
  borderRadius: "4px",
  fontSize: "11px",
  letterSpacing: "1px",
  width: "130px",
  height: "36px",
  border: "1px solid #03a9f4",
};

const img = {
  display: "block",
  width: "140px",
  height: "140px",
  marginTop: "35px",
};

const doc = {
  width: "100%",
  height: "800px",
  backgroundColor: "red",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const input = {
  width: "100%",
};

const submit = {
  backgroundColor: "#17c387",
  padding: "3px",
  color: "white",
  borderRadius: "4px",
  fontSize: "11px",
  letterSpacing: "1px",
  width: "130px",
  height: "36px",
  border: "1px solid #03a9f4",
  marginTop: "15px",
  marginLeft: "7px",
};

const uploadImg = {
  width: "30px",
  height: "30px",
};

const DragText = {
  fontSize: "20px",
  letterSpacing: "1px",
  color: "#black",
  fontWeight: "bold",
  marginTop: "20px",
};

const file = {
  fontSize: "24px",
  letterSpacing: "2px",
  marginTop: "-25px",
};

const fileContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "21x",
  width: "400px",
  alignContent: "space-between",
  marginLeft: "724px",
  marginTop: "-333px",
};
