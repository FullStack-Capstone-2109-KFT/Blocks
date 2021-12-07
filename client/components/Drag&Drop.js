import { filter } from "compression";
import React, { useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    // //   // console.log("Encrypting File");
    // //   // let encryptedBuff = encryptFile(buff, key);

    // //   // Add optional encryption here? Or higher in file.

    // //   //Add file to IPFS and receive CID
    // console.log("Submitting file to IPFS");
    // console.log(buff);
    // const res = await props.ipfs.add(buff);
    // console.log(res);

    // //identify key variables for contract calls
    // const fileCID = res.path;
    // const userId = props.id;
    // const userName = props.userName;
    // const metaMaskAccount = props.account;

    // //check blockchain for user with user id. If does not exist, create new user through contract
    // let user = await props.blocks.methods.getUser(userId).call();
    // if (user.userName.length < 1) {
    //   await props.blocks.methods
    //     .newUser(userId, userName)
    //     .send({ from: metaMaskAccount });
    // }

    // //get fileKey for next file for the assigned user
    // const fileKey = parseInt(user.fileCount) + 1;

    // //add file to blockchain for the logged in user
    // await props.blocks.methods
    //   .addFile(userId, fileKey, fileCID, description)
    //   .send({ from: metaMaskAccount });

    for await (const chunk of props.ipfs.cat(
      "QmRUCQUtfyMrt8AUcPze6UY383boQ1sWnniZywi8Ruxo9b"
    )) {
      console.log(chunk.length);

      // console.log(chunk);

      let binary = "";
      for (let i = 0; i < chunk.length; i++) {
        binary += String.fromCharCode([chunk[i]]);
      }
      const file = window.btoa(binary);
      const mimType = "application/jpg";
      // console.log(file);
      const url = `data:${mimType};base64,` + file;
      console.log(url);

      // const a = Buffer.from(chunk);
      // console.log(a.length);

      // const base64String = btoa(String.fromCharCode(...new Uint8Array(chunk)));
      // console.log(base64String);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div {...getRootProps({ style })}>
            <input
              {...getInputProps()}
              directory=""
              webkitdirectory=""
              type="file"
            />
            <p style={DragText}>Drag 'n' drop files here</p>

            <img
              style={img}
              src={
                "data:image/png;base64,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"
              }
            />

            <button style={browseFiles} type="button" onClick={open}>
              Browse Files
            </button>
          </div>
          {/* <input
            type='text'
            style={input}
            onChange={handleChange}
            value={description}
            placeholder='Description'
          /> */}
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
