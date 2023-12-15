import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function getColumn(matrix: string[][], column: number) {
  return matrix.map((row) => row[column]);
}

function getLoad(line: string[]) {
  console.log(line.slice().reverse().join(""));
  return line.reverse().reduce((load, char, i, line) => {
    if (char === "O") {
      let nextSquare = line.slice(i).indexOf("#");

      return (
        load +
        (nextSquare > 0 ? nextSquare + i : line.length) -
        line
          .slice(i + 1, nextSquare > 0 ? i + nextSquare : undefined)
          .filter((char) => char === "O").length
      );
    }
    return load;
  }, 0);
}

function part1(input: string) {
  const matrix = input.split("\n").map((row) => row.split(""));
  return matrix[0].reduce(
    (sum, _, i) => sum + getLoad(getColumn(matrix, i)),
    0
  );
}

function part2(input: string) {
  return input;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
