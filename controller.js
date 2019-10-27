const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx')
const fs = require('fs');

const data = require('./storage.json');

// Infura stuff
const projectId = process.env.INFURA_ID;
const infuraNodeUrl =
  `https://ropsten.infura.io/v3/${projectId}`;
const projectSecret = process.env.INFURA_SECRET;

// Account stuff
const address = data.address || process.env.ACCOUNT_ADDRESS;

// API stuff
const web3 = new Web3(infuraNodeUrl);

exports.getAddress = (req, res, next) => {
  res.json({
    address,
    isValidEthAddress: web3.utils.isAddress(address),
  });
}

/**
 * privateKey ne bi trebalo da se ovako sutira svuda okolo,
 * vec da se bezbedno perzistira.
 *
 * Umesto console.log trebalo bi koristiti namenski logger,
 * ili neki custom logger.
 *
 * I custom error tipovi bi unapredili UX/DevX/debugging.
 *
 * Intenzivno logujem da bi se videlo
 * tacno koji account je aktuelan.
 *
 */
exports.getBalance = (req, res, next) => {
  web3.eth
    .getBalance(req.params.address || address)
    .then(wei => {
      balance = web3.utils.fromWei(wei, "ether");
      console.log(`balance: ${balance}`);
      console.log(`address: ${req.params.address || address}`);
      console.log(`pk: ${data.privateKey}`);
      res.json({
        address: req.params.address || address,
        balance,
      });
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};

// U .getBalance() demonstrirao native promise,
// ali inace preferiram async/await izvedbe
exports.createAccount = async (req, res, next) => {
  let account;

  try {
    account = await web3.eth.accounts.create();
    console.log(JSON.stringify(account));
  } catch (err) {
    res.json(err);
    console.log(err);
  }

  // Umesto brauzer local storage-a (po zadatku), cuvam account u fajl
  fs.writeFile('./storage.json', JSON.stringify(account), err => {
    if(err) console.log('Writing to file failed: ', err);
  });

  res.json({
    message: "Account Created, data stored to file!",
    address: account.address,
    privateKey: account.privateKey,
  });
};

exports.editAddress = (req, res, next) => {
  if (!req.params.newAddress) {
    res.json({error: 'ETH address not provided'});
    throw new Error('ETH address not provided');
  }
  if (!web3.utils.isAddress(req.params.newAddress)) {
    res.json({error: 'Provided address is not valid ETH address'});
    throw new Error('Provided address is not valid ETH address');
  }
  const address = req.params.newAddress;
  console.log(`New address set to: ${address}`);

  fs.writeFile('./storage.json', JSON.stringify({address}), err => {
    if(err) console.log('Writing to file failed: ', err);
  });

  res.json({message: `New address set to: ${address}`});
}
