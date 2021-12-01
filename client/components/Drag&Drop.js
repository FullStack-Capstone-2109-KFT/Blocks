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
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  backgroundColor: 'green',
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const doc = {
  width: "100%",
  height: "800px",
  backgroundColor: "red",
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    accept: "image/*, .pdf, .doc, .js, .txt, .xls, .mp4, .move, .jpeg, .ppt, .key, .mp3, ",
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? activeStyle : {}),
      ...(isDragReject ? activeStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {console.log(file.type)}
        {file.type === 'image/png' ? <img src={file.preview} style={img} />
        : <div>
              <iframe className={file.type} width="100%" height="600" frameBorder="0" src={file.preview}></iframe>
          </div>}
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{filepath}</ul>
      </aside>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
}

export default StyledDropzone;

