import { ethers } from "ethers";
import TokenStaking from "../abis/TokenStaking.json";
import TestToken from "../abis/TestToken.json";

const stakingContractAddress = "0xed0969E0d51529079d58822daEEC5fdC20d390b9";
const tokenContractAddress = "0xdbfd42b8ebda77c0a027d9d35a753723c09eb70c";

export const getStakingContract = (signer) => {
    if (signer) {
      return new ethers.Contract(stakingContractAddress, TokenStaking.abi, signer);
    } else {
      throw new Error("Signer is not available");
    }
  };
  
  export const getTokenContract = (signer) => {
    if (signer) {
      return new ethers.Contract(tokenContractAddress, TestToken.abi, signer);
    } else {
      throw new Error("Signer is not available");
    }
  };