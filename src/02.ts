import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

function part1(input: string) {
  const limits = {
    red: 12,
    green: 13,
    blue: 14,
  } as Record<string, number>;

  return input.split("\n").reduce((sum, line) => {
    const [id, games] = line.slice(5).split(":");
    return games.split(";").every((game) =>
      game.split(",").every((balls) => {
        const [amount, color] = balls.trim().split(" ");
        console.log(balls, amount, color, limits[color], sum);
        return limits[color] >= parseInt(amount);
      })
    )
      ? sum + parseInt(id)
      : sum;
  }, 0);
}

function part2(input: string) {
  return input
    .split("\n")
    .map((line) => line.split(": ")[1])
    .map((games) => {
      const cubes = {
        blue: 0,
        red: 0,
        green: 0,
      } as Record<string, number>;
      for (const game of games.split(";")) {
        for (const balls of game.split(",")) {
          const [amount, color] = balls.trim().split(" ");
          cubes[color] = Math.max(parseInt(amount), cubes[color]);
        }
      }
      return cubes;
    })
    .reduce((power, game) => power + game.blue * game.green * game.red, 0);
}

console.log(
  part2(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)
);
await client.run([part1 as PartFn, part2 as PartFn], false);
