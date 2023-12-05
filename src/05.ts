import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function applyMap(input: number, maps: number[][], reverse = false) {
  for (const [dest, source, range] of maps) {
    if (
      input < (reverse ? source : dest) + range &&
      input >= (reverse ? source : dest)
    ) {
      return (reverse ? dest : source) + input - source;
    }
  }
  return input;
}

function part1(input: string) {
  const [rawSeeds, ...rest] = input.split("\n\n");
  const maps = rest.map((rawMaps) =>
    rawMaps
      .trim()
      .split("\n")
      .slice(1)
      .map((map) => map.split(" ").map((m) => parseInt(m)))
  );
  const seeds = rawSeeds
    .trim()
    .split(" ")
    .slice(1)
    .map((seed) => parseInt(seed))
    .map((seed) => maps.reduce((input, map) => applyMap(input, map), seed));

  return Math.min(...seeds);
}

function isInitial(input: number, seedRanges: number[]) {
  for (let i = 0; i < seedRanges.length; i += 2) {
    if (input >= seedRanges[i] && input < seedRanges[i] + seedRanges[i + 1]) {
      return true;
    }
  }
  return false;
}

function part2(input: string) {
  const [rawSeeds, ...rest] = input.split("\n\n");
  const maps = rest
    .map((rawMaps) =>
      rawMaps
        .trim()
        .split("\n")
        .slice(1)
        .map((map) => map.split(" ").map((m) => parseInt(m)))
    )
    .reverse();
  const seeds = rawSeeds
    .trim()
    .split(" ")
    .slice(1)
    .map((seed) => parseInt(seed));

  for (let loc = 0; loc < 1_000_000_000; loc++) {
    if (
      isInitial(
        maps.reduce((i, map) => applyMap(i, map, true), loc),
        seeds
      )
    ) {
      return loc;
    }
  }
}

await client.run([part1 as PartFn, part2 as PartFn], false);
