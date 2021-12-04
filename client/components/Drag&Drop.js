import { filter } from "compression";
import React, { useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  maxWidth: "300px",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
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
  border: "1px solid #eaeaea",
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

const img = {
  display: "block",
  width: "auto",
  height: "100%",
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

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const [buff, setBuffer] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState("N/A");

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
    setDescription('')
  };

  const uploadFile = async () => {
    //Add optional encryption here? Or higher in file.

    //Add file to IPFS and receive CID
    console.log("Submitting file to IPFS");
    const res = await props.ipfS.add(buff);

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

    // const user1 = await props.blocks.methods.getUser(1).call();
    // const user2 = await props.blocks.methods.getUser(2).call();
    // const userFile = await props.blocks.methods.getUserFile(3, 1).call();
    // console.log("USER:", user1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop files here</p>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
        <input
          type="text"
          onChange={handleChange}
          value={description === 'N/A' ? '' : description}
          placeholder="Description"
        />
        <aside>
          <h4>Files</h4>
          <ul>{filepath}</ul>
        </aside>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <input
          type="submit"
          value="Submit"
          onClick={() => {
            setFiles([]);
          }}
        />
      </div>
    </form>
  );
}

export default StyledDropzone;
