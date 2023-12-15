import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function rotateMatrix(matrix: string[][]) {
  const temp = matrix.map((pattern) => pattern.map((row) => row.split("")));
  return temp.map((pattern) =>
    pattern[0].map((_, i) =>
      pattern
        .map((row) => row[i])
        .reverse()
        .join("")
    )
  );
}

function findMirrorIndex(pattern: string[]): number {
  for (let i = 1; i < pattern.length; i++) {
    if (
      pattern.slice(i).every((row, j) => j >= i || row === pattern[i - (j + 1)])
    ) {
      return i;
    }
  }
  return 0;
}

function countDifference(a: string, b: string) {
  return a
    .split("")
    .reduce((diff, char, i) => (!b || char === b[i] ? diff : diff + 1), 0);
}

function findSmugdedMirrorIndex(pattern: string[], ignoreLine: number): number {
  for (let i = 1; i < pattern.length; i++) {
    if (
      i !== ignoreLine &&
      pattern
        .slice(i)
        .map((row, j) => countDifference(row, pattern[i - (j + 1)]))
        .reduce((a, b) => a + b, 0) === 1
    ) {
      return i;
    }
  }
  return 0;
}

function part1(input: string) {
  const patterns = input.split("\n\n");
  const patternsByRow = patterns.map((pattern) => pattern.split("\n"));
  const patternsByCols = rotateMatrix(patternsByRow);
  return (
    patternsByRow
      .map((pattern) => findMirrorIndex(pattern))
      .reduce((sum, index) => sum + index, 0) *
      100 +
    patternsByCols
      .map((pattern) => findMirrorIndex(pattern))
      .reduce((sum, index) => sum + index, 0)
  );
}

function part2(input: string) {
  const patterns = input.split("\n\n");
  const patternsByRow = patterns.map((pattern) => pattern.split("\n"));
  const patternsByCols = rotateMatrix(patternsByRow);

  return (
    patternsByRow
      .map((p) => findSmugdedMirrorIndex(p, findMirrorIndex(p)))
      .reduce((sum, index) => sum + index, 0) *
      100 +
    patternsByCols
      .map((p) => findSmugdedMirrorIndex(p, findMirrorIndex(p)))
      .reduce((sum, index) => sum + index, 0)
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
