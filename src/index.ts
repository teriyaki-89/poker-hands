import fs from "fs";
import {
  checkIsPair,
  checkIsTwoPairs,
  checkIsThreeOfAKind,
  checkIsFlush,
  checkIsFourOfAKind,
  checkIsStraightFlush,
  checkIsRoyalFlash,
  checkIsFullHouse,
  checkIsStraight
} from "./cards-logic";

const pokerHandsCombos = [
  checkIsPair,
  checkIsTwoPairs,
  checkIsThreeOfAKind,
  checkIsFlush,
  checkIsFourOfAKind,
  checkIsStraightFlush,
  checkIsRoyalFlash,
  checkIsFullHouse,
  checkIsStraight
];

try {
  const allFileContents = fs.readFileSync("poker-hands.txt", "utf-8");

  const handsSum: number[] = [0, 0];

  allFileContents.split(/\r?\n/).forEach((line: string) => {
    const cards = line.split(/\s/);
    const player1 = cards.slice(0, 5);
    const player2 = cards.slice(5);
    pokerHandsCombos.map((combo) => {
      if (combo(player1)) handsSum[0] + 1;
      if (combo(player2)) handsSum[1] + 1;
    });
    handsSum[0]++;
    handsSum[1]++;
  });

  console.log(`Player 1: ${handsSum[0]} hands`);
  console.log(`Player 2: ${handsSum[1]} hands`);
} catch (e) {
  console.log(e);
}
