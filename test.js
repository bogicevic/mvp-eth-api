const Web3 = require("web3");

const infuraNodeUrl =
  "https://rinkeby.infura.io/v3/db7a223aec7447ecba631d93521398e2";
const account = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91";

const web3 = new Web3(infuraNodeUrl);

web3.eth.getBalance(account, (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether");
  console.log(balance);
});
