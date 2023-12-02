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

await client.run([part1 as PartFn, part2 as PartFn], false);
