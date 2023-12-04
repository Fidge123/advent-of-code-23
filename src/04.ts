import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  return input
    .split("\n")
    .map((row) =>
      row
        .split(": ")[1]
        .split(" | ")
        .map((a) => a.trim().split(/  ?/))
    )
    .map(([wins, bets]) => bets.filter((bet) => wins.includes(bet)).length)
    .reduce((sum, game) => (game > 0 ? sum + Math.pow(2, game - 1) : sum), 0);
}

function part2(input: string) {
  const games = input
    .split("\n")
    .map((row) =>
      row
        .split(": ")[1]
        .split(" | ")
        .map((a) => a.trim().split(/  ?/))
    )
    .map(([wins, bets]) => bets.filter((bet) => wins.includes(bet)).length);
  const copies = games.map(() => 1);

  for (let i = 0; i < games.length; i++) {
    for (let j = 1; j <= games[i] && i + j < copies.length; j++) {
      copies[i + j] += copies[i];
    }
  }

  return copies.reduce((sum, cards) => sum + cards);
}

await client.run([part1 as PartFn, part2 as PartFn], false);
