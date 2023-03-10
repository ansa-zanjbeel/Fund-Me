// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./price-converter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    address public owner;
    AggregatorV3Interface public priceFeed;

    address[] public funders;
    mapping (address => uint256) public addressToAmountFunded; 

    uint256 public constant minimumUsd = 20 * 1e18;
  



    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }




function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= minimumUsd, "Didn't send enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }


function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
    
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance}
            ("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner {
        if(msg.sender != owner) { revert NotOwner(); }
        _;

    }

}