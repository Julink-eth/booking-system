# Consensys Take Home Challenge

This repository contains all the code for the take home work challenge BOOKING SYSTEM.

It has been done using the hardhat framework, make sure you have node installed first : https://hardhat.org/tutorial/setting-up-the-environment.html

## Assumptions

Since the project's description was board here are some assumptions which taken into account while realizing this challenge:

-The users will only use this dapp the day before COLA day
-The users select their right company when making a reservation, the smart contract does not have to check if a user really belongs to the company he choses.
-A user can book multiple meeting rooms at multiple hours of the day
-The meeting room numbers go from 1 to 20
-The hours of the day a meeting room can be booked go from 9:00(9am) to 17:00(5pm)

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/julin-eth/booking-system.git
cd booking-system
npm install
```

To launch the contract's test:

```sh
npx hardhat test
```

Once installed, run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd client
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.
The contract is also deployed on the Rinkeby testnet at this address : 0x0B88C4Bc995C96e4CBdAdEFa71F1f47718D51A5B
So you can also test the front end with metamask on Rinkeby testnet.

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.
