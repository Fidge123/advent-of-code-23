import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

const re = /^[^0-9]*?([0-9]).*?([0-9])?[^0-9]*?$/;

function part1(input: string) {
  return input
    .split("\n")
    .map((line) => re.exec(line)!)
    .reduce(
      (prev, match) =>
        prev + parseInt(match[1]) * 10 + parseInt(match[2] ?? match[1]),
      0
    );
}

function strToNum(line: string) {
  return line
    .replace("one", "1")
    .replace("two", "2")
    .replace("three", "3")
    .replace("four", "4")
    .replace("five", "5")
    .replace("six", "6")
    .replace("seven", "7")
    .replace("eight", "8")
    .replace("nine", "9");
}

const re2 =
  /([0-9]|one|two|three|four|five|six|seven|eight|nine).*([0-9]|one|two|three|four|five|six|seven|eight|nine)/;

function part2(input: string) {
  return input
    .split("\n")
    .map((line) => re2.exec(line) ?? re.exec(line))
    .reduce(
      (prev, match) =>
        prev + parseInt(strToNum(match![1]) + strToNum(match![2] ?? match![1])),
      0
    );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
