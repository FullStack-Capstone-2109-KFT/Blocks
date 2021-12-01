//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Blocks {

mapping(uint256 => User) public users; //mapped key-value of users present
//0:User1, 1:User2, 2:User3...
uint public userCount; //global counter to assign new users a new userId
uint public fileCount; //global counter to assign new files a new fileId

//define the User struct
struct User {
  uint id; //unique id for each user
  string userName; //userName
  uint fileCount; //user-specific file count
  File[] userFiles; //is this definition correct?
}

//define the File struct
struct File {
  uint id; //Unique id for each file
  string fileHash; //CID
}

//function to add a new User
function addUser(string memory _userName) public {
  require(bytes(_userName).length > 0) //require a name
  userCount++; //update global user count
  User memory newUser = User(userCount, _userName, 0, []) //new User instance
  users.push(newUser) //add new user to users []
}

//function to upload a file for a specific User
function uploadUserFile(
  uint _userId, //user the new file belongs to
  string memory _fileHash //CID
) public {
  require (_userId > 0); //check for userId
  require (bytes(_fileHash).length > 0); //check for CID
  fileCount++ //increase global file count

  newFile = File(fileCount, _fileHash) //instantiate new file

  users[_userId - 1].fileCount ++; //increase file count of user
  users[_userId - 1].userFiles.push(newFile) //add new file instance to user's files

  emit FileUploaded(
    fileCount,
    _userId,
    _fileHash,
    block.timestamp
    msg.sender
  )
}


constructor () public {
  addUser("testUser"); //test user instance (should be id:1, name:'testUser, fileCount: 0, Files[])
  uploadUserFile(1, 'randomCIDFiller') //test file instance (should be id:1, fileHash: 'randomCIDFiller), and should be assigned to user1
}



// //Key 1 => Value: CID1
// //Key 2 => Value: CID2

// // mapping(key => value) userFiles
// mapping(uint => File) public userFiles
