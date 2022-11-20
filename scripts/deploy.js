
const { ethers } = require("hardhat");

async function main() {
  const [...addresses] = await ethers.getSigners();
  const Mynft = await ethers.getContractFactory('MyNFT');
  const deployContract = await Mynft.deploy();
  await deployContract.deployed();
  console.log("Contract Address :", deployContract.address);

  // let txnsetNameSymbol = await deployContract.setNFTAttribute("MyNFT", "MFT", "QmRVWXPdc94bdZd1bggqRBSuJ3xk4zD6eB8c8SXJ71pauC", 3, 1);
  // await txnsetNameSymbol.wait();
  // console.log("Name:", await deployContract.name());
  // console.log("MaxSupply and price :", await deployContract.maxSupply())
  // console.log("Curator fee ", await deployContract.curator_fee())

  // console.log("Base64:", await deployContract.tokenUri());
  // let txn_mintCharacterNFT = await deployContract.connect(addresses[0]).mintCharacterNFT({ value: ethers.utils.parseEther('1') });
  // await txn_mintCharacterNFT.wait();
  // txn_mintCharacterNFT = await deployContract.connect(addresses[1]).mintCharacterNFT({ value: ethers.utils.parseEther('1') });
  // await txn_mintCharacterNFT.wait();
  // txn_mintCharacterNFT = await deployContract.connect(addresses[2]).mintCharacterNFT({ value: ethers.utils.parseEther('1') });
  // await txn_mintCharacterNFT.wait();
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
