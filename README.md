# mvp-eth-api

## What?

The most basic **Server Side Vault for Ethereum**.

## Why?

To enable user to:
- See ETH address of the Vault
- See when new ETHs are deposited to the Vault's ETH address **[NOT COMPLETED]**
- See how much ETH is in the Vault
- Save [new/edit] withdraw address (local storage)
- Withdraw to saved address **[NOT COMPLETED]**

## How Server?

API is connected to **Ropsten test network via Infura ETH node**.

Each push to `master` triggers automatic deployment to Heroku.
> Base url of deployed live API: ```https://mvp-eth-api.herokuapp.com```

### To run the app locally:
Add your credentials and account data to .env file, or feel free to use provided `.env.sample` (it's all test stuff, just copy & rename it to `.env`). `.env` ***normally*** contains sensitive data and therefore is gitignored.

Then:
1. `npm install`
2. `npm start`

### To run the app in hot-reload mode:
1. `npm install`
2. `npm start:dev`

## How Client? (a.k.a. API doc)
`GET /me` - See the ETH address of the Vault

`GET /create-account` - Create account, respond with OK message and address of newly created account. Address and private key will be stored to `./storage.json` (not using browser's local storage as per task). Prior to account creation, object in `./storage.json` is empty.

`GET /set-address/:newAddress` - Save `newAddress` as new withdraw address to local storage. `newAddress` must be valid ETH address, otherwise it's not stored and error is thrown.

`GET /balance/:address?` - To retreive the balance for provided `:address` *[optional]*. If no `:address` provided, address defaults to the one stored in `./storage.json`. If object in `./storage.json` is not populated, `ACCOUNT_ADDRESS` environment variable will kick in.

## Get funny-money test ETH
`wget https://faucet.ropsten.be/donate/<ETH address>`
> CAUTION: Don't go wild with faucet, it's easy to get grey/blacklisted. Don't ask how I know.

In unfortunate event of emergency, `0xbBFb343FA5ee819676A87dB6DB9ed4897fC82abF` is funded with approx 1.5 ETH, feel free to use it.
