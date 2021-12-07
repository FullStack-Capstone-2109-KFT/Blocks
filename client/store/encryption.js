const aes256 = require("aes256");
// import image from "../../public/headerBackground.png";

// export
export const encryptFile = (file, key) => {
  const cipher = aes256.createCipher(key);
  const encryptedFile = cipher.encrypt(file);
  console.log("ENCRYPTED", encryptedFile);

  return encryptedFile;
};

export const decryptFile = (encryptedFile, key) => {
  console.log("DECRYPTED");
};
