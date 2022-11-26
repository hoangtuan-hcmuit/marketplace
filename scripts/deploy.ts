import { Contract, ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";

async function main() {
  const Marketplace: ContractFactory = await ethers.getContractFactory("Marketplace");
  const market: Contract = await upgrades.deployProxy(Marketplace, ["SPORTOFI", "SPORTO"], {
    kind: "uups",
    initializer: "initialize",
  });
  await market.deployed();

  console.log("Marketplace Proxy Contract deployed to: ", market.address);
  console.log(
    "Marketplace Implementation deployed to: ",
    await upgrades.erc1967.getImplementationAddress(market.address),
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
