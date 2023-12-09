import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function getLast<T>(array: T[]) {
  return array[array.length - 1];
}

function getNextNumber(numbers: number[]): number {
  const diff = getDifferencesBetween(numbers);
  if (diff.every((val) => val === 0)) {
    return getLast(numbers);
  } else {
    return getLast(numbers) + getNextNumber(diff);
  }
}

function getDifferencesBetween(numbers: number[]) {
  let result = [] as number[];
  for (let i = 1; i < numbers.length; i++) {
    result.push(numbers[i] - numbers[i - 1]);
  }
  return result;
}

function part1(input: string) {
  return input
    .split("\n")
    .map((row) => row.split(" ").map((val) => parseInt(val)))
    .map((row) => getNextNumber(row))
    .reduce((sum, val) => sum + val);
}

function part2(input: string) {
  return input
    .split("\n")
    .map((row) => row.split(" ").map((val) => parseInt(val)))
    .map((row) => getNextNumber(row.reverse()))
    .reduce((sum, val) => sum + val);
}

await client.run([part1 as PartFn, part2 as PartFn], false);
