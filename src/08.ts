import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function countSteps(
  start: string,
  end: (pos: string) => boolean,
  steps: string[],
  maps: string
) {
  let m = parseMaps(maps);
  let pos = start;
  for (let i = 0; i < 1_000_000_000; i++) {
    pos = m[pos][steps[i % steps.length] as "L" | "R"];
    if (end(pos)) {
      return i + 1;
    }
  }
  return -1;
}

function parseMaps(maps: string) {
  return Object.fromEntries(
    maps
      .split("\n")
      .map((map) => [
        map.slice(0, 3),
        { L: map.slice(7, 10), R: map.slice(12, 15) },
      ])
  );
}

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

function leastCommonMultiple(a: number, b: number) {
  return (a / greatestCommonDivisor(a, b)) * b;
}

function part1(input: string) {
  const [steps, maps] = input.split("\n\n");

  return countSteps("AAA", (pos) => pos === "ZZZ", steps.split(""), maps);
}

function part2(input: string) {
  const [steps, rest] = input.split("\n\n");
  const maps = parseMaps(rest);

  return Object.keys(maps)
    .filter((map) => map.endsWith("A"))
    .map((p) =>
      countSteps(p, (cur: string) => cur.endsWith("Z"), steps.split(""), rest)
    )
    .reduce((result, period) => leastCommonMultiple(result, period));
}

await client.run([part1 as PartFn, part2 as PartFn], false);
