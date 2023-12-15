import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function getHash(input: string) {
  return input
    .split("")
    .reduce((hash, char) => ((hash + char.charCodeAt(0)) * 17) % 256, 0);
}

function part1(input: string) {
  return input
    .replace("\n", "")
    .split(",")
    .reduce((sum, sequence) => sum + getHash(sequence), 0);
}

function part2(input: string) {
  let boxes = [...new Array(256)].map(() => []) as string[][];
  let labelToFocal = {} as Record<string, number>;

  for (const sequence of input.replace("\n", "").split(",")) {
    const label = sequence.match(/[a-z]+/)?.[0]!;
    const operation = sequence.match(/[-=]/)?.[0]!;
    const focal = sequence.match(/[0-9]+/)?.[0];
    const hash = getHash(label);

    if (operation === "=") {
      if (!boxes[hash].includes(label)) {
        boxes[hash].push(label);
      }
      labelToFocal[label] = parseInt(focal!);
    }
    if (operation === "-" && boxes[hash].includes(label)) {
      boxes[hash].splice(boxes[hash].indexOf(label), 1);
      labelToFocal[label] = 0;
    }
  }
  return boxes.reduce(
    (power, box, i) =>
      power +
      box.reduce(
        (result, lens, j) => result + labelToFocal[lens] * (j + 1) * (i + 1),
        0
      ),
    0
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
