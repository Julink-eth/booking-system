// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { artifacts, ethers } from "hardhat";
import { BookingSystem } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BookingSystem = await ethers.getContractFactory("BookingSystem");
  const bookingSystem = await BookingSystem.deploy();

  await bookingSystem.deployed();

  console.log("BookingSystem deployed to:", bookingSystem.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(bookingSystem);
}

function saveFrontendFiles(bookingSystem: BookingSystem) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../client/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ BookingSystem: bookingSystem.address }, undefined, 2)
  );

  const BookingSystemArtifact = artifacts.readArtifactSync("BookingSystem");

  fs.writeFileSync(
    contractsDir + "/BookingSystem.json",
    JSON.stringify(BookingSystemArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
