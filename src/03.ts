import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function hasSymbol(x: number, length: number, lines: any[]) {
  return lines.some((line) =>
    line.special.some((char: any) => char.x >= x - 1 && char.x <= x + length)
  );
}

function part1(input: string) {
  return input
    .split("\n")
    .map((line, i) => {
      const numbers = [];
      for (const match of line.matchAll(/\d+/gm)) {
        numbers.push({
          value: parseInt(match[0]),
          x: match.index,
          length: match[0].length,
        });
      }
      const special = [];
      for (const match of line.matchAll(/[^\d\.]/gm)) {
        special.push({
          char: match[0],
          x: match.index,
        });
      }
      return { numbers, special };
    })
    .reduce(
      (sum, line, i, lines) =>
        line.numbers.reduce(
          (lineSum, { value, x, length }) =>
            hasSymbol(x!, length, lines.slice(Math.max(i - 1, 0), i + 2))
              ? value + lineSum
              : lineSum,
          sum
        ),
      0
    );
}

function getGear(x: number, lines: any[]) {
  const surrounding = lines
    .flatMap((lines) => lines.numbers)
    .filter((number) => number.x + number.length >= x && number.x <= x + 1);
  console.log(surrounding);
  return surrounding.length === 2
    ? surrounding[0].value * surrounding[1].value
    : 0;
}

function part2(input: string) {
  return input
    .split("\n")
    .map((line, i) => {
      const numbers = [];
      for (const match of line.matchAll(/\d+/gm)) {
        numbers.push({
          value: parseInt(match[0]),
          x: match.index,
          length: match[0].length,
        });
      }
      const special = [];
      for (const match of line.matchAll(/\*/gm)) {
        special.push({
          char: match[0],
          x: match.index,
        });
      }
      return { numbers, special };
    })
    .reduce(
      (sum, line, i, lines) =>
        line.special.reduce(
          (lineSum, { x }) =>
            getGear(x!, lines.slice(Math.max(i - 1, 0), i + 2)) + lineSum,
          sum
        ),
      0
    );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
