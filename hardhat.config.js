require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require("hardhat/types").HardhatConfig



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //solidity: "0.8.17",
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6"}],
  },
    defaultNetwork: "hardhat",
    networks: {

  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
}

/*getNamedAccounts = {
  deployer : {
    default : 0,
  
  },

user : {
  default : 1
}  
} */



