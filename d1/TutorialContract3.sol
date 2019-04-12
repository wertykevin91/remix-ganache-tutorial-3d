pragma solidity ^0.5.0;

library NameHashLibrary {
    struct NameHash { 
        mapping (bytes32 => string) HashMap; 
    }

    //We declare how the event will look like
    
    event Add(bytes32 hashedName, string name, address sender);

    // add name adds a name into the mapping and emits an event

    function addName(NameHash storage self, string memory name) public returns(bool){
        // We use keccak256 to hash the name and use that in the table mapping as a key
        bytes32 hashedName = keccak256(abi.encode(name));
        self.HashMap[hashedName] = name;

        // Event can be seen on the event page in etherscan.
        emit Add(hashedName, name, msg.sender);

        return true;
    }
}

contract OwnedContract {
    address internal ownerAddress;

    // A only owner modifer. Reads the current sender and determines if sender is owner

    modifier onlyOwner{
        require(ownerAddress == msg.sender, "Only owner allowed");
        _;
    }
}

contract TutorialContract3 is OwnedContract {

    // Using X for Y allows us to attach Y to the library X. This also works with elementary types like uint256 and the likes.
    
    using NameHashLibrary for NameHashLibrary.NameHash;

    // Private variables

    NameHashLibrary.NameHash private knownNames;

    // Constructor. We set up the message during the creation of the contract

    constructor () public {
        ownerAddress = msg.sender;
    }

    // Adds a new name into the mapping of names. Note that it only allows the owner of the contract to call it.

    function register(string memory name) public onlyOwner returns(bool) {
        require(knownNames.addName(name), "Add unsuccessful");
        return true;        
    }

    // Pure/view functions

    // Get hash is pure because it does not need to read the memory

    function getHash(string memory name) public pure returns (bytes32){
        return keccak256(abi.encode(name));
    }

    // Get name is view because it reads the memory

    function getName(bytes32 hashedName) public view returns(string memory){
        return knownNames.HashMap[hashedName];
    }

    // A function that returns a number powered by another number

    function getPower(uint256 number, uint256 power) public pure returns(uint256){
        // ** is the power operator for solidity
        return number ** power;
    }
}