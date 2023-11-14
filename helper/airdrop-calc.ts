import fs from 'fs';
import csvParser from 'csv-parser';

interface AddressData {
  user_id: string;
}

export let holders: string[] = [];
const holderAddresses: string[] = [];

fs.createReadStream('helper/snapshot.csv')
  .pipe(csvParser())
  .on('data', (row: AddressData) => {
    holderAddresses.push(row.user_id);
  })
  .on('end', () => {
    holders = airdropCalculation(holderAddresses);
  });

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
