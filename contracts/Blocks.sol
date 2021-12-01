//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Blocks {
  string public name = "Blocks";
  // uint public fileCount = 0;
  mapping(uint256 => User) public users;
  // mapping(uint => File) public files;

  struct User {
    uint256 id;
    uint256 fileCount;
    // File[] userFiles;
  }

  struct File {
    uint256 id;
    string fileHash;
    uint256 fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint256 uploadTime;
    address uploader;
  }

  event FileUploaded(
    uint256 id,
    uint256 userId,
    string fileHash,
    uint256 fileSize,
    string fileType,
    string fileName,
    string fileDescription,
    uint256 uploadTime,
    address uploader
  );

  // constructor() public { // when the contract is first deployed initialize state variable

  // }

  User user1 = User(1, 2);

  function uploadFile(
    uint256 _userId,
    string memory _fileHash,
    uint256 _fileSize,
    string memory _fileType,
    string memory _fileName,
    string memory _fileDescription
  ) public {
    require(_userId > 0);
    require(bytes(_fileHash).length > 0);
    require(bytes(_fileType).length > 0);
    require(bytes(_fileDescription).length > 0);
    require(bytes(_fileName).length > 0);
    require(msg.sender != address(0));
    require(_fileSize > 0);

    user1 = users[_userId];
    // user.fileCount ++;

    // string calldata mess = msg.sender;

    // user1.File[user1.fileCount] = File(
    //   user1.fileCount,
    //   _fileHash,
    //   _fileSize,
    //   _fileType,
    //   _fileName,
    //   _fileDescription,
    //   block.timestamp,
    //   msg.sender
    // );

    emit FileUploaded(
      1,
      _userId,
      _fileHash,
      _fileSize,
      _fileType,
      _fileName,
      _fileDescription,
      block.timestamp,
      msg.sender
    );
  }
}
