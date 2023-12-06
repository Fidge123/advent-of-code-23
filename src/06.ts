import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

const races = [
  {
    time: 123,
    distance: 321,
  },
];

const race = {
  time: 123456789,
  distance: 1234567898765,
};

function part1() {
  let result = 1;
  for (const race of races) {
    let wins = 0;
    for (let time = 1; time < race.time; time++) {
      console.log("Hold", time, "Drive", (race.time - time) * time);
      if ((race.time - time) * time > race.distance) {
        console.log("Winner");
        wins += 1;
      }
    }
    result *= wins;
  }
  return result;
}

function part2() {
  let wins = 0;
  for (let time = 1; time < race.time; time++) {
    if ((race.time - time) * time > race.distance) {
      wins += 1;
    }
  }
  return wins;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
