pragma solidity ^0.5.0;

contract TutorialContract1 {
    string public ownerName;
    uint256 public version;
    address public ownerAddress;
    string private message;

    constructor (string memory _ownerName, uint256 _version) public {
        ownerName = _ownerName;
        version = _version;

        message = "";
        ownerAddress = msg.sender;

    }

    function newMessage(string memory _newMessage) public {
        require(msg.sender == ownerAddress);
        message = _newMessage;
    }

    function readMessage() public view returns (string memory){
        return message;
    }
}