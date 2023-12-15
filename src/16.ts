import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  return input;
}

function part2(input: string) {
  return input;
}

console.log(part1(``));

await client.run([part1 as PartFn, part2 as PartFn], false);
