// //SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Blocks {
  string public name = "Blocks";

  //define the File struct
  struct File {
    string fileHash; //CID
    string fileType; //file type (pdf, jpg, etc.)
    string description; //file description
  }

  //define the User struct
  struct User {
    uint256 userKey; //userKey
    uint256[] fileList; //list of file keys for lookup
    mapping(uint256 => File) fileStructs;
  }

  mapping(uint256 => User) public userStructs;
  uint256[] userList; //list of user keys for enumeration

  //   //define user creation event
  //   event UserCreated(bytes32 userKey);

  function newUser(uint256 userKey) public returns (bool success) {
    userList.push(userKey);
    return true;
  }

  function getUser(uint256 userKey) public view returns (uint256 fileCount) {
    return (userStructs[userKey].fileList.length);
  }

  function addFile(
    uint256 userKey,
    uint256 fileKey,
    string memory fileHash,
    string memory fileType,
    string memory description
  ) public returns (bool success) {
    require(userKey > 0 && fileKey > 0);
    require(bytes(fileHash).length > 0);

    userStructs[userKey].fileList.push(fileKey);
    userStructs[userKey].fileStructs[fileKey].fileHash = fileHash;
    userStructs[userKey].fileStructs[fileKey].fileType = fileType;
    userStructs[userKey].fileStructs[fileKey].description = description;
    return true;
  }

  function getUserFile(uint256 userKey, uint256 fileKey)
    public
    view
    returns (
      string memory fileHash,
      string memory description,
      string memory fileType,
      uint256 fileNumber //aka fileKey
    )
  {
    require(userKey > 0 && fileKey > 0);

    return (
      userStructs[userKey].fileStructs[fileKey].fileHash,
      userStructs[userKey].fileStructs[fileKey].description,
      userStructs[userKey].fileStructs[fileKey].fileType,
      fileKey
    );
  }
}
