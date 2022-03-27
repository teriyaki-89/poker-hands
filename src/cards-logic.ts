export function checkIsPair(cards: string[]): boolean {
  const [checkAmountof2] = checkAmountOfAkind(cards, 2);
  return checkAmountof2;
}

export function checkIsTwoPairs(cards: string[]): boolean {
  const [checkAmountof2, cardPositions] = checkAmountOfAkind(cards, 2);
  if (!checkAmountof2) return false;
  const restOfCards = cards.filter((card, id) => cardPositions.filter((item) => item == id).length == 0);
  const [checkOtherAmountof2] = checkAmountOfAkind(restOfCards, 2);
  return checkOtherAmountof2;
}

export function checkIsThreeOfAKind(cards: string[]): boolean {
  const [checkAmountof3] = checkAmountOfAkind(cards, 3);
  return checkAmountof3;
}

export function checkIsStraight(cards: string[]): boolean {
  const cardsValues = getCardsValuesSorted(cards);
  let isStraight = true;
  for (let i = 0; i < cardsValues.length - 2; i++) {
    if (cardsValues[i + 1] - cardsValues[i] !== 1) {
      isStraight = false;
      break;
    }
  }
  return isStraight;
}

export function checkIsFlush(cards: string[]): boolean {
  return checkCardsAreSameSuit(cards);
}

export function checkIsFullHouse(cards: string[]): boolean {
  const [checkAmountof3, cardPositions] = checkAmountOfAkind(cards, 3);
  if (!checkAmountof3) return false;
  const restOfCards = cards.filter((card, id) => cardPositions.filter((item) => item == id).length == 0);
  const [checkAmountof2] = checkAmountOfAkind(restOfCards, 2);
  return checkAmountof2;
}
export function checkIsFourOfAKind(cards: string[]): boolean {
  const [result] = checkAmountOfAkind(cards, 4);
  return result;
}

export function checkIsStraightFlush(cards: string[]): boolean {
  if (!checkCardsAreSameSuit(cards)) return false;

  const cardsValues = getCardsValuesSorted(cards);
  let isStraightFlush = true;
  for (let i = 0; i < cardsValues.length - 1; i++) {
    if (cardsValues[i + 1] - cardsValues[i] !== 1) {
      isStraightFlush = false;
      break;
    }
  }

  return isStraightFlush;
}

export function checkIsRoyalFlash(cards: string[]): boolean {
  if (!checkCardsAreSameSuit(cards)) return false;
  const cardsValues = getCardsValuesSorted(cards);
  let isRoyalFlash = true;

  if (cardsValues[0] !== 11) isRoyalFlash = false;

  return isRoyalFlash;
}

function checkCardsAreSameSuit(cards: string[]): boolean {
  let sameSuit = true;
  for (let i = 0; i < cards.length - 2; i++) {
    if (getCardSuit(cards[i]) !== getCardSuit(cards[i + 1])) {
      sameSuit = false;
      break;
    }
  }
  return sameSuit;
}

function getCardSuit(card: string): string {
  return card.slice(1) as string;
}

function getCardsValuesSorted(cards: string[]) {
  let cardsValues: number[] = [];
  cards.map((card) => {
    const val = getCardValue(card);
    cardsValues.push(val);
  });
  cardsValues = cardsValues.sort((a, b) => (a > b ? 1 : -1));
  return cardsValues;
}

function getCardValue(card: string): number {
  const cardRank = card.slice(0, 1) as string | number;
  switch (cardRank) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(cardRank as string);
  }
}

function checkAmountOfAkind(cards: string[], amount: number): [boolean, number[]] {
  let sameKindAmount = 0;
  let cardPositions: number[] = [];
  cards.forEach((card, id) => {
    const cardVal = getCardValue(card);
    let amount = 1;
    const temCardPostions: number[] = [id];
    for (let i = id + 1; i < cards.length; i++) {
      if (cardVal == getCardValue(cards[i])) {
        amount++;
        temCardPostions.push(i);
      }
    }
    if (amount > sameKindAmount) {
      sameKindAmount = amount;
      cardPositions = temCardPostions;
    }
  });
  return [sameKindAmount == amount, cardPositions];
}
