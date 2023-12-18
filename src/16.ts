import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

class Beam {
  constructor(
    readonly matrix: string[][],
    public row = 0,
    public col = 0,
    readonly travelDirection: "left" | "right" | "up" | "down" = "right"
  ) {}

  isInside() {
    if (this.row < 0 || this.col < 0) {
      return false;
    }
    if (this.row >= this.matrix.length || this.col >= this.matrix[0].length) {
      return false;
    }
    return true;
  }

  getTile() {
    return this.matrix[this.row][this.col];
  }

  getLocation() {
    return "R" + this.row + "C" + this.col + "D" + this.travelDirection;
  }

  energize(energized: Set<string>): Beam[] {
    if (this.travelDirection === "left") {
      while (this.isInside() && !energized.has(this.getLocation())) {
        energized.add(this.getLocation());

        if (this.getTile() === "/") {
          return [new Beam(this.matrix, this.row + 1, this.col, "down")];
        }
        if (this.getTile() === "\\") {
          return [new Beam(this.matrix, this.row - 1, this.col, "up")];
        }
        if (this.getTile() === "|") {
          return [
            new Beam(this.matrix, this.row, this.col, "up"),
            new Beam(this.matrix, this.row, this.col, "down"),
          ];
        }

        this.col -= 1;
      }
    }
    if (this.travelDirection === "right") {
      while (this.isInside() && !energized.has(this.getLocation())) {
        energized.add(this.getLocation());

        if (this.getTile() === "/") {
          return [new Beam(this.matrix, this.row - 1, this.col, "up")];
        }
        if (this.getTile() === "\\") {
          return [new Beam(this.matrix, this.row + 1, this.col, "down")];
        }
        if (this.getTile() === "|") {
          return [
            new Beam(this.matrix, this.row, this.col, "up"),
            new Beam(this.matrix, this.row, this.col, "down"),
          ];
        }

        this.col += 1;
      }
    }
    if (this.travelDirection === "up") {
      while (this.isInside() && !energized.has(this.getLocation())) {
        energized.add(this.getLocation());

        if (this.getTile() === "/") {
          return [new Beam(this.matrix, this.row, this.col + 1, "right")];
        }
        if (this.getTile() === "\\") {
          return [new Beam(this.matrix, this.row, this.col - 1, "left")];
        }
        if (this.getTile() === "-") {
          return [
            new Beam(this.matrix, this.row, this.col, "left"),
            new Beam(this.matrix, this.row, this.col, "right"),
          ];
        }

        this.row -= 1;
      }
    }
    if (this.travelDirection === "down") {
      while (this.isInside() && !energized.has(this.getLocation())) {
        energized.add(this.getLocation());

        if (this.getTile() === "/") {
          return [new Beam(this.matrix, this.row, this.col - 1, "left")];
        }
        if (this.getTile() === "\\") {
          return [new Beam(this.matrix, this.row, this.col + 1, "right")];
        }
        if (this.getTile() === "-") {
          return [
            new Beam(this.matrix, this.row, this.col, "left"),
            new Beam(this.matrix, this.row, this.col, "right"),
          ];
        }

        this.row += 1;
      }
    }
    return [];
  }
}

function part1(input: string) {
  const matrix = input.split("\n").map((row) => row.split(""));

  const energized = new Set<string>();
  const result = new Set<string>();
  let beams = [new Beam(matrix)];

  while (beams.length) {
    const beam = beams.pop();
    if (beam) {
      beams.push(...beam.energize(energized));
    }
  }

  for (const entry of energized) {
    result.add(entry.split("D")[0]);
  }

  return result.size;
}

function part2(input: string) {
  const matrix = input.split("\n").map((row) => row.split(""));

  const energized = [] as Set<string>[];
  const beams = [] as Beam[][];

  for (let row = 0; row < matrix.length; row++) {
    beams.push([new Beam(matrix, row, 0, "right")]);
    beams.push([new Beam(matrix, row, matrix[row].length - 1, "left")]);
  }

  for (let col = 0; col < matrix[0].length; col++) {
    beams.push([new Beam(matrix, 0, col, "down")]);
    beams.push([new Beam(matrix, matrix.length - 1, col, "up")]);
  }

  for (const b of beams) {
    const e = new Set<string>();
    while (b.length) {
      const beam = b.pop();
      if (beam) {
        b.push(...beam.energize(e));
      }
    }
    energized.push(e);
  }

  return Math.max(
    ...energized.map((e) => {
      const result = new Set<string>();
      for (const entry of e) {
        result.add(entry.split("D")[0]);
      }
      return result.size;
    })
  );
}

await client.run([part1 as PartFn, part2 as PartFn], false);
