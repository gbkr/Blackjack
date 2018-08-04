import { ICard, ITakeCard, ITakeCards } from '../types';

export default class {

  public static getCard(deck: ICard[] = this.generate()): ITakeCard { 
    if (deck.length === 0) { deck = this.generate() };
    // Remove a random card to prevent cheating
    const card = deck.splice(Math.floor(Math.random()*deck.length), 1)[0];
    return { card, deck };
  }

  public static getCardPair(deck: ICard[] = this.generate()): ITakeCards {
      const cards1 = this.getCard(deck);
      const cards2 = this.getCard(cards1.deck)

      const cards: ICard[] = [cards1.card, cards2.card];

      return { cards, deck: cards2.deck }
  }

  private static generate(): ICard[] {
    const SUITS: string[] = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const RANK: string[] = [
      'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
    ];

    const deck: ICard[] = [];

    RANK.forEach(rank => {
      SUITS.forEach(suit => {
        deck.push({
          name: `${rank}${suit[0]}`,
          rank,
          suit,
        });
      });
    });

    return this.shuffle(deck);
  }

  // Fisher Yates algorithm
  private static shuffle(deck: ICard[]): ICard[] {
    let currentIndex = deck.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    return deck;
  }
}
