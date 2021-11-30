pragma solidity ^0.8.10;

contract Blocks {
    string public name = 'Blocks';
    // uint public fileCount = 0;
    mapping(uint => User) public users;
    // mapping(uint => File) public files;
    
    struct User {
        uint id;
        uint fileCount;
        File[] files;
    }
    
    struct File {
        uint id;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address uploader;
    }

    event FileUploaded (
        uint id,
        uint userId
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint uploadTime,
        address uploader
    );

    // constructor() public { // when the contract is first deployed initialize state variable

    // }

    function uploadFile(uint _userId, string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {
    
    require(bytes(_userId) > 0);
    require(bytes(_fileHash).length > 0);
    require(bytes(_fileType).length > 0);
    require(bytes(_fileDescription).length > 0);
    require(bytes(_fileName).length > 0);
    require(msg.sender != address(0));
    require(_fileSize > 0);
    
    uint user = users[_userId]
    user.fileCount ++
     
    // string calldata mess = msg.sender;
    
    user.File[user.fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp, msg.sender);

    emit FileUploaded(fileCount, _userId, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp, msg.sender);
    }
}

