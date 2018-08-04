import Deck from './deck';

describe('#getCard', () => {
  it('creates a deck of 52 cards if necessary and returns one', () => {
    const { card, deck } = Deck.getCard();
    expect(card).toBeInstanceOf(Object)
    expect(deck.length).toBe(51);
  });

  it('it shuffles the deck before returning one', () => {
    const { deck: deck1 } = Deck.getCard()
    const { deck: deck2 } = Deck.getCard();
    expect(Object.entries(deck1)).not.toEqual(Object.entries(deck2));
  })
});

describe('#getCardPair', () => {
  it('generates a deck if necessary and returns a pair of cards', () => {
    const result = Deck.getCardPair();
    const cards = result.cards;
    expect(cards.length).toEqual(2)
  })
});
