import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

type Coordinates = [row: number, col: number];

function getNext(
  prevRow: number,
  prevCol: number,
  currRow: number,
  currCol: number,
  tile: string
): Coordinates | undefined {
  if (tile === "|") {
    return [prevRow < currRow ? currRow + 1 : currRow - 1, currCol];
  } else if (tile === "-") {
    return [currRow, prevCol < currCol ? currCol + 1 : currCol - 1];
  } else if (tile === "L") {
    return prevRow === currRow
      ? [currRow - 1, currCol]
      : [currRow, currCol + 1];
  } else if (tile === "J") {
    return prevRow === currRow
      ? [currRow - 1, currCol]
      : [currRow, currCol - 1];
  } else if (tile === "7") {
    return prevRow === currRow
      ? [currRow + 1, currCol]
      : [currRow, currCol - 1];
  } else if (tile === "F") {
    return prevRow === currRow
      ? [currRow + 1, currCol]
      : [currRow, currCol + 1];
  } else {
    if (tile !== "S") {
      console.error("This should not be reached!");
    }
    return;
  }
}

function part1(input: string) {
  const tiles = input.split("\n").map((line) => line.split(""));

  const startRow = tiles.findIndex((line) => line.includes("S"));
  const startCol = tiles[startRow].indexOf("S");

  const dist = tiles.map((row) => row.map(() => Infinity));
  dist[startRow][startCol] = 0;

  let prev: Coordinates = [startRow, startCol];
  let next: Coordinates | undefined = [startRow - 1, startCol];
  let step = 1;

  if (startRow > 0 && "|7F".includes(tiles[next[0]][next[1]])) {
    while (next) {
      dist[next[0]][next[1]] = Math.min(step, dist[next[0]][next[1]]);
      const temp = getNext(...prev, ...next, tiles[next[0]][next[1]]);
      prev = next;
      next = temp;
      step++;
    }
  }

  next = [startRow + 1, startCol];
  step = 1;
  if (startRow < tiles.length - 1 && "|LJ".includes(tiles[next[0]][next[1]])) {
    while (next) {
      dist[next[0]][next[1]] = Math.min(step, dist[next[0]][next[1]]);
      const temp = getNext(...prev, ...next, tiles[next[0]][next[1]]);
      prev = next;
      next = temp;
      step++;
    }
  }

  next = [startRow, startCol - 1];
  step = 1;
  if (startCol > 0 && "-LF".includes(tiles[next[0]][next[1]])) {
    while (next) {
      dist[next[0]][next[1]] = Math.min(step, dist[next[0]][next[1]]);
      const temp = getNext(...prev, ...next, tiles[next[0]][next[1]]);
      prev = next;
      next = temp;
      step++;
    }
  }

  next = [startRow, startCol + 1];
  step = 1;
  if (
    startCol < tiles[startRow].length - 1 &&
    "-J7".includes(tiles[next[0]][next[1]])
  ) {
    while (next) {
      dist[next[0]][next[1]] = Math.min(step, dist[next[0]][next[1]]);
      const temp = getNext(...prev, ...next, tiles[next[0]][next[1]]);
      prev = next;
      next = temp;
      step++;
    }
  }
  return Math.max(
    ...dist.flatMap((row) => row.filter((tile) => tile < Infinity))
  );
}

function part2(input: string) {
  const tiles = input.split("\n").map((line) => line.split(""));

  const startRow = tiles.findIndex((line) => line.includes("S"));
  const startCol = tiles[startRow].indexOf("S");

  const pipe = tiles.map((row) => row.map(() => false));
  const left = tiles.map((row) => row.map(() => false));
  const right = tiles.map((row) => row.map(() => false));
  pipe[startRow][startCol] = true;

  let prev: Coordinates = [startRow, startCol];
  let next: Coordinates | undefined = [startRow - 1, startCol];

  next = [startRow + 1, startCol];
  if (startRow < tiles.length - 1 && "|LJ".includes(tiles[next[0]][next[1]])) {
    while (next) {
      pipe[next[0]][next[1]] = true;
      left[next[0]][next[1]] = false;
      right[next[0]][next[1]] = false;

      try {
        left[prev[0] + prev[1] - next[1]][prev[1] + next[0] - prev[0]] = true;
        left[next[0] + prev[1] - next[1]][next[1] + next[0] - prev[0]] = true;
      } catch {}
      try {
        right[prev[0] + next[1] - prev[1]][prev[1] + prev[0] - next[0]] = true;
        right[next[0] + next[1] - prev[1]][next[1] + prev[0] - next[0]] = true;
      } catch {}

      const temp = getNext(...prev, ...next, tiles[next[0]][next[1]]);
      prev = next;
      next = temp;
    }
  }

  // console.log(
  //   pipe
  //     .map((row, y) =>
  //       row
  //         .map((t, x) => {
  //           if (t) {
  //             return "8";
  //           }
  //           if (left[y][x]) {
  //             return "L";
  //           }
  //           if (right[y][x]) {
  //             return "R";
  //           }
  //           return "_";
  //         })
  //         .join("")
  //     )
  //     .join("\n")
  // );

  return pipe.flatMap((row, y) =>
    row.filter(
      (t, x) =>
        (!t && !right[y][x] && x > 20 && x < 120 && y > 20 && y < 120) ||
        (left[y][x] && !t)
    )
  ).length;
}

await client.run([part1 as PartFn, part2 as PartFn], false);
