import { holderAddresses } from "./holders";

export function airdropCalculation(arr: string[]): string[] {
  const addressCounts: { [key: string]: number } = {};

  arr.forEach((address: string) => {
    if (addressCounts[address]) {
      addressCounts[address] += 1;
    } else {
      addressCounts[address] = 1;
    }
  });

  const result: string[] = [];

  Object.keys(addressCounts).forEach((address) => {
    if (addressCounts[address] >= 3) {
      const occurrences = Math.floor(addressCounts[address] / 3);
      for (let i = 0; i < occurrences; i++) {
        result.push(address);
      }
    }
  });

  return result;
}

const uniqueDividedAddresses = airdropCalculation(holderAddresses);
console.log(uniqueDividedAddresses);

