const Web3 = require("web3");

const infuraNodeUrl =
  "https://rinkeby.infura.io/v3/db7a223aec7447ecba631d93521398e2";
const account = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91";
const secret = "21fe77da9a3b47f6b67b292e6f88acdf";

const web3 = new Web3(infuraNodeUrl);

exports.getBalance = (req, res, next) => {
  web3.eth
    .getBalance(account)
    .then(wei => {
      balance = web3.utils.fromWei(wei, "ether");
      console.log(balance);
      res.json({ account, balance });
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
  // res.json({account});
};
