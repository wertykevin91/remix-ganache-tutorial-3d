$(async()=>{
    //console.log(web3);

    var yourInfuraKey = "";

    var web3Instance = null;
    if (typeof web3 !== 'undefined') {
        web3Instance = new Web3(web3.currentProvider);
        console.log("Web3 instantialization success!");
    } else if(typeof ethereum !== 'undefined'){
        web3Instance = new Web3(ethereum);
        try{
            await ethereum.enable();
        }
        catch(error){
            console.log(error);
        }
        console.log("Web3(ethereum) initialization success");

        console.log(web3Instance);
    }
    else {
        // Set the provider you want from Web3.providers
        web3Instance = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${yourInfuraKey}`));
        console.log("Web3 instance not found.");
    }

    // Initialize default account

    await web3Instance.eth.getAccounts().then(async(x, y)=>{
        web3Instance.eth.defaultAccount = x[0];
        console.log("Default address set to: " + x[0]);
    });

    // Initialize contract

    const contractABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "register",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "getHash",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "hashedName",
                    "type": "bytes32"
                }
            ],
            "name": "getName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const myContractAddress = '';
    const contractInstance = new web3Instance.eth.Contract(contractABI, myContractAddress);

    // Call methods

    $("#getHash").click(async()=>{
        let name = $('#getHashName').val();
        let result = await contractInstance.methods.getHash(name).call();
        $('#getHashHash').val(result);
        console.log(result);
    });

    $("#getName").click(async()=>{
        let hash = $('#getNameHash').val();
        let result = await contractInstance.methods.getName(hash).call();

        $('#getNameName').val(result);
        console.log(result);
    });

    $("#register").click(async()=>{
        let name = $('#registerName').val();
        let result = await contractInstance.methods.register(name).send({from: web3Instance.eth.defaultAccount});
        $('#registerTxHash').val(result.transactionHash);
        console.log(result);
    });
});