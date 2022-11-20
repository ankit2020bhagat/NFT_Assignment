require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './my-app/src/artifacts',
  },
  
  networks: {
    goerli: {
      url:  process.env.GOERLI_API_KEY_URL,
      accounts: [process.env.PRIVATE_KEY],
     
    },
    mumbai :{
      url:process.env.MUMBAI_API_KEY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
