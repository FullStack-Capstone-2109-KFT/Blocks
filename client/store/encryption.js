const aes256 = require("aes256");

export const encryptFile = (file, key) => {
  file = Buffer.from(file);
  const cipher = aes256.createCipher(key);
  const encryptedFile = cipher.encrypt(file);
  // console.log("ENCRYPTED", encryptedFile);
  return encryptedFile;
};

export const decryptFile = (encryptedFile, key) => {
  encryptedFile = Buffer.from(encryptedFile);
  const cipher = aes256.createCipher(key);
  const file = cipher.decrypt(encryptedFile);
  // console.log("DECRYPTED", file);
  return file;
};
