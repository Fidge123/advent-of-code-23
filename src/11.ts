import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function getDistanceSum(
  row: number,
  col: number,
  cosmos: any[][],
  emptyRows?: number[],
  emptyCols?: number[],
  multiplier: number = 1
) {
  let sum = 0;

  for (const [targetRow, targetCol] of cosmos) {
    sum += Math.abs(targetRow - row) + Math.abs(targetCol - col);
    sum +=
      (multiplier - 1) *
      (emptyRows?.filter(
        (empty) =>
          (empty < targetRow && empty > row) ||
          (empty < row && empty > targetRow)
      ).length ?? 0);
    sum +=
      (multiplier - 1) *
      (emptyCols?.filter(
        (empty) =>
          (empty < targetCol && empty > col) ||
          (empty < col && empty > targetCol)
      ).length ?? 0);
  }
  return sum;
}

function part1(input: string) {
  let cosmos = input.split("\n").map((row) => row.split(""));

  for (let row = 0; row < cosmos.length; row++) {
    if (cosmos[row].every((dot) => dot === ".")) {
      cosmos = [...cosmos.slice(0, row + 1), ...cosmos.slice(row)];
      row++;
    }
  }
  for (let col = 0; col < cosmos[0].length; col++) {
    if (cosmos.flatMap((row) => row[col]).every((dot) => dot === ".")) {
      cosmos = cosmos.map((row) => [
        ...row.slice(0, col + 1),
        ...row.slice(col),
      ]);
      col++;
    }
  }
  return (
    cosmos
      .flatMap((row, i) => {
        const galaxies = [];
        for (const match of row.join("").matchAll(/#/gm)) {
          galaxies.push([i, match.index]);
        }
        return galaxies;
      })
      .reduce(
        (sum, galaxy, _, cosmos) =>
          sum + getDistanceSum(galaxy[0]!, galaxy[1]!, cosmos),
        0
      ) / 2
  );
}

function part2(input: string) {
  let cosmos = input.split("\n").map((row) => row.split(""));
  let emptyRows = [] as number[];
  let emptyCols = [] as number[];

  for (let row = 0; row < cosmos.length; row++) {
    if (cosmos[row].every((dot) => dot === ".")) {
      emptyRows.push(row);
    }
  }
  for (let col = 0; col < cosmos[0].length; col++) {
    if (cosmos.flatMap((row) => row[col]).every((dot) => dot === ".")) {
      emptyCols.push(col);
    }
  }

  return (
    cosmos
      .flatMap((row, i) => {
        const galaxies = [];
        for (const match of row.join("").matchAll(/#/gm)) {
          galaxies.push([i, match.index]);
        }
        return galaxies;
      })
      .reduce(
        (sum, galaxy, _, cosmos) =>
          sum +
          getDistanceSum(
            galaxy[0]!,
            galaxy[1]!,
            cosmos,
            emptyRows,
            emptyCols,
            1_000_000
          ),
        0
      ) / 2
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
