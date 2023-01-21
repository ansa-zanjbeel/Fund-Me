const { deployments, getNamedAccounts } = require("hardhat")
const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function deployFunc(hre) {
//console.log("hi!")
hre.getNamedAccounts()
hre.deployments

const {deploy, log} = deployments
const { deployer } = await getNamedAccounts()
const chainId = network.config.chainId 

//const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
let ethUsdPriceFeedAddress
if(developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
} else {
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

}

const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
})

//log("----------------------------------")

}

module.exports.default = deployFunc