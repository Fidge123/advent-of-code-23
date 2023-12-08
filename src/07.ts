import { AocClient } from "advent-of-code-client";
import { PartFn } from "advent-of-code-client/dist/AocClient.types";

const client = new AocClient({
  year: 2023,
  day: parseInt(import.meta.file.split(".")[0]),
  token: process.env.AOC_SESSION!,
});

const suit = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const suit2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

function countOccurrences(hand: string, suit: string[]) {
  const cards = hand.split("");
  return suit.map((a) => cards.filter((card) => card === a).length);
}

function part1(input: string) {
  return input
    .split("\n")
    .map((game) => game.split(" "))
    .sort(([handA], [handB]) => {
      const typeA = countOccurrences(handA, suit).sort((a, b) => b - a);
      const typeB = countOccurrences(handB, suit).sort((a, b) => b - a);
      return (
        typeA[0] - typeB[0] ||
        typeA[1] - typeB[1] ||
        suit.indexOf(handB[0]) - suit.indexOf(handA[0]) ||
        suit.indexOf(handB[1]) - suit.indexOf(handA[1]) ||
        suit.indexOf(handB[2]) - suit.indexOf(handA[2]) ||
        suit.indexOf(handB[3]) - suit.indexOf(handA[3]) ||
        suit.indexOf(handB[4]) - suit.indexOf(handA[4])
      );
    })
    .reduce((score, hand, i) => (score += parseInt(hand[1]) * (i + 1)), 0);
}

function part2(input: string) {
  return input
    .split("\n")
    .map((game) => game.split(" "))
    .sort(([handA], [handB]) => {
      const [jokerA, ...countsA] = countOccurrences(handA, suit2).reverse();
      const [jokerB, ...countsB] = countOccurrences(handB, suit2).reverse();
      const typeA = countsA.sort((a, b) => b - a);
      const typeB = countsB.sort((a, b) => b - a);
      return (
        typeA[0] + jokerA - typeB[0] - jokerB ||
        typeA[1] - typeB[1] ||
        suit2.indexOf(handB[0]) - suit2.indexOf(handA[0]) ||
        suit2.indexOf(handB[1]) - suit2.indexOf(handA[1]) ||
        suit2.indexOf(handB[2]) - suit2.indexOf(handA[2]) ||
        suit2.indexOf(handB[3]) - suit2.indexOf(handA[3]) ||
        suit2.indexOf(handB[4]) - suit2.indexOf(handA[4])
      );
    })
    .reduce((score, hand, i) => (score += parseInt(hand[1]) * (i + 1)), 0);
}

await client.run([part1 as PartFn, part2 as PartFn], false);
