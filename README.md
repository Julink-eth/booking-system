# Consensys Take Home Challenge

This repository contains all the code for the take home work challenge BOOKING SYSTEM.

It has been done using the hardhat framework, make sure you have node installed first : https://hardhat.org/tutorial/setting-up-the-environment.html

## Challenge Description

### Business problem

Two companies, COKE and PEPSI, are sharing an office building but as they are
competitors, they don’t trust each other. Tomorrow is COLA day (for one day), that the
two companies are celebrating. They are gathering a number of business partners in
the building. In order to optimize space utilization, they have decided to set-up a joint
booking system where any user can book one of the 20 meeting rooms available, 10
from each company (C01, C02, ..., C10 and P01, P02, ...., P10).

The booking system has the following functionalities:  
● Users can see meeting rooms availability  
● Users can book meeting rooms by the hour (first come first served)  
● Users can cancel their own reservations

### Technical guidelines

There are no technical guidelines. You can choose whatever technical stack you want
taking into account the role you are applying to.

## Assumptions

Since the project's description was broad here are some assumptions which were taken into account while realizing this challenge:

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

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp.  
You will need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.  
The contract is also deployed on the Rinkeby testnet at this address : 0x214A1F4EC2E3D5f97C69D93C087842F76b568D1F
So you can also test the front end with metamask on Rinkeby testnet.  
Moreover a frontend has been deployed using github pages : https://julink-eth.github.io/booking-system/

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.
