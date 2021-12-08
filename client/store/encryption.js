const aes256 = require("aes256");

export const encryptFile = async (file, key) => {
  file = Buffer.from(file);
  const cipher = aes256.createCipher(key);
  const encryptedFile = await cipher.encrypt(file);
  // const encryptedFile = aes256.encrypt(key, file);
  console.log("ENCRYPTED", encryptedFile);
  return encryptedFile;
};

export const decryptFile = async (encryptedFile, key) => {
  encryptedFile = Buffer.from(encryptedFile);
  // const file = aes256.decrypt(key, encryptedFile);
  const cipher = aes256.createCipher(key);
  const file = await cipher.decrypt(encryptedFile);
  console.log("DECRYPTED Buffer", file);
  return file;
};
