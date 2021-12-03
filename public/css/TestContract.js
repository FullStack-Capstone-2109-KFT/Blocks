//SPDX-License-Identifier: MIT
// pragma solidity ^0.8.10;

// contract Blocks {
//   string public name = "BlocksTest";

//   //define the File struct
//   struct File {
//     string fileHash; //CID
//   }

//   //define the User struct
//   struct User {
//     string userName; //userName
//     bytes32[] fileList; //list of file keys for lookup
//     mapping(bytes32 => File) fileStructs;
//   }

//   mapping(bytes32 => User) userStructs;
//   bytes32[] userList; //list of user keys to enumerate

//   function newUser(bytes32 userKey, string memory userName)
//     public
//     returns (bool success)
//   {
//     userStructs[userKey].userName = userName;
//     userList.push(userKey);
//     return true;
//   }

//   function getUser(bytes32 userKey)
//     public
//     returns (string memory userName, uint256 fileCount)
//   {
//     return (
//       userStructs[userKey].userName,
//       userStructs[userKey].fileList.length
//     );
//   }

//   function addFile(
//     bytes32 userKey,
//     bytes32 fileKey,
//     string memory fileHash
//   ) public returns (bool success) {
//     userStructs[userKey].fileList.push(fileKey);
//     userStructs[userKey].fileStructs[fileKey].fileHash = fileHash;
//     return true;
//   }

//   function getUserFile(bytes32 userKey, bytes32 fileKey)
//     public
//     returns (bytes32 fileHash)
//   {
//     userStructs[userKey].fileStructs[fileKey].fileHash;
//   }
// }
