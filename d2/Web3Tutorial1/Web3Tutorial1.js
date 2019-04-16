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


    $('#getTokenBalance').click(async()=>{
        let address = $('#checkBalanceAddress').val().trim();
        //console.log(add);
        //console.log(businessLogicContract.methods.balanceOf);
        let balance = await web3Instance.eth.getBalance(address);

        $('#checkBalanceBalance').val(balance);
    });
})