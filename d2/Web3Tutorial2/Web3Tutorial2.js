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

    $('#generateNewAccount').click(async()=>{
        let newAccount = web3Instance.eth.accounts.create(web3Instance.utils.randomHex(32));
        //console.log(newAccount);

        $('#generateNewAccountAdd').val(newAccount.address);
        $('#generateNewAccountPK').val(newAccount.privateKey);
    });
})