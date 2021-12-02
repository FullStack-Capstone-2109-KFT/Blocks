//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Blocks {
  string public name = "BlocksTest";
  uint256 public userCount = 0; //global counter to assign new users a new userId
  uint256 public fileCount = 0; //global counter to assign new files a new fileId

  //   mapping(uint256 => User) public users; //mapped key-value of users present
  //0:User1, 1:User2, 2:User3...

  //define the File struct
  struct File {
    uint256 id; //Unique id for each file
    string fileHash; //CID
  }

  //define the User struct
  struct User {
    uint256 id; //unique id for each user
    string userName; //userName
    uint256 fileCount; //user-specific file count
    bytes32[] fileList;
    mapping(bytes32 => File) fileStructs;
  }

  mapping(bytes32 => User) userStructs;
  bytes32[] userList;

  function newUser

  //define user creation event
  event UserCreated(uint256 id, string userName);

  //define file upload event
  event FileUploaded(uint256 fileCount, uint256 id, string fileHash);

  //function to add a new User
  function addUser(string memory _userName) public {
    require(bytes(_userName).length > 0); //require a name
    userCount++; //update global user count
    User memory newUser = User(userCount, _userName, 0, new File[](0)); //new User instance
    users[userCount - 1] = newUser; //add new user to users []

    emit UserCreated(userCount, _userName);
  }

  //function to upload a file for a specific User
  function uploadUserFile(
    uint256 _userId, //user the new file belongs to
    string memory _fileHash //CID
  ) public {
    require(_userId > 0); //check for userId
    require(bytes(_fileHash).length > 0); //check for CID
    fileCount++; //increase global file count

    File memory newFile = File(fileCount, _fileHash); //instantiate new file

    users[_userId - 1].fileCount++; //increase file count of user
    users[_userId - 1].userFiles.push(newFile); //add new file instance to user's files

    emit FileUploaded(fileCount, _userId, _fileHash);
  }

  //   constructor() public {
  //     addUser("testUser"); //test user instance (should be id:1, name:'testUser, fileCount: 0, Files[])
  //     uploadUserFile(1, "randomCIDFiller"); //test file instance (should be id:1, fileHash: 'randomCIDFiller), and should be assigned to user1
  //   }
}
