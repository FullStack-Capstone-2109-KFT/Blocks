// //SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Blocks {
  string public name = "Blocks";

  //define the File struct
  struct File {
    string fileHash; //CID
  }

  //define the User struct
  struct User {
    string userName; //userName
    uint256[] fileList; //list of file keys for lookup
    mapping(uint256 => File) fileStructs;
  }

  mapping(uint256 => User) public userStructs;
  uint256[] userList; //list of user keys to enumerate

  constructor() public {}

  //   //define user creation event
  //   event UserCreated(bytes32 userKey, string userName);

  function newUser(uint256 userKey, string memory userName)
    public
    returns (bool success)
  {
    userStructs[userKey].userName = userName;
    userList.push(userKey);
    return true;
  }

  function getUser(uint256 userKey)
    public
    view
    returns (string memory userName, uint256 fileCount)
  {
    return (
      userStructs[userKey].userName,
      userStructs[userKey].fileList.length
    );
  }

  function addFile(
    uint256 userKey,
    uint256 fileKey,
    string memory fileHash
  ) public returns (bool success) {
    userStructs[userKey].fileList.push(fileKey);
    userStructs[userKey].fileStructs[fileKey].fileHash = fileHash;
    return true;
  }

  function getUserFile(uint256 userKey, uint256 fileKey)
    public
    view
    returns (string memory fileHash)
  {
    return (userStructs[userKey].fileStructs[fileKey].fileHash);
  }
}
