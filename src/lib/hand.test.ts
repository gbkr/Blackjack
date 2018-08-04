import * as constants from "../constants";
import { ICard } from "../types";
import Hand from "./hand";

describe("#sum", () => {
  it("sums the value of a hand with one king", () => {
    const hand: ICard[] = [{ suit: "Diamonds", rank: "K", name: "KD" }];
    expect(Hand.sum(hand)).toBe(10);
  });

  it("sums the value of a hand with a king and queen", () => {
    const hand: ICard[] = [
      {
        name: "KD",
        rank: "K",
      },
      {
        name: "QH",
        rank: "Q",
        suit: "Hearts",
      }
    ];
    expect(Hand.sum(hand)).toBe(20);
  });

  it("sums the value of a hand with numbered cards", () => {
    const hand: ICard[] = [
      {
        name: "3D",
        rank: "3",
        suit: "Diamonds",
      },
      {
        name: "5H",
        rank: "5",
        suit: "Hearts",
      },
      {
        name: "7S",
        rank: "7",
        suit: "Spades",
      }
    ];

    expect(Hand.sum(hand)).toBe(15);
  });

  it("sums the value of a hand with a face and numbered card", () => {
    const hand: ICard[] = [
      {
        name: "KD",
        rank: "K",
        suit: "Diamonds",
      },
      {
        name: "3H",
        rank: "3",
        suit: "Hearts",
      }
    ];

    expect(Hand.sum(hand)).toBe(13);
  });

  it("sums the hand containing an ace that should have value of 11", () => {
    const hand: ICard[] = [
      {
        name: "KD",
        rank: "K",
        suit: "Diamonds",
      },
      {
        name: "AH",
        rank: "A",
        suit: "Hearts",
      }
    ];
    expect(Hand.sum(hand)).toBe(21);
  });

  it("sums the hand containing an ace that should have value of 1", () => {
    const hand: ICard[] = [
      {
        name: "KD",
        rank: "K",
        suit: "Diamonds",
      },
      {
        name: "AH",
        rank: "A",
        suit: "Hearts",
      },
      {
        name: "8D",
        rank: "8",
        suit: "Diamonds",
      }
    ];
    expect(Hand.sum(hand)).toBe(19);
  });

  it("sums multiple aces", () => {
    const hand: ICard[] = [
      {
        name: "AD",
        rank: "A",
        suit: "Diamonds",
      },
      {
        name: "AH",
        rank: "A",
        suit: "Hearts",
      },
      {
        name: "AS",
        rank: "A",
        suit: "Spades",
      }
    ];
    expect(Hand.sum(hand)).toBe(13);
  });

  it("sums a 'natural'", () => {
    const hand: ICard[] = [
      {
        name: "AD",
        rank: "A",
        suit: "Diamonds",
      },
      {
        name: "KH",
        rank: "K",
        suit: "Hearts",
      }
    ];
    expect(Hand.sum(hand)).toBe(21);
  });
});

describe("#result", () => {
  it("returns tie if both players have blackjack", () => {
    const player = [{ rank: "A", name: "AD" }, { rank: "K", name: "KD" }];
    const dealer = [{ rank: "A", name: "AC" }, { rank: "K", name: "KC" }];

    expect(Hand.result(player, dealer)).toBe(constants.TIE);
  });

  it("detects a dealer win", () => {
    const player = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    const dealer = [{ rank: "A", name: "AC" }, { rank: "K", name: "KC" }];

    expect(Hand.result(player, dealer)).toBe(constants.DEALER_WINS);
  });

  it("detects a player win", () => {
    const dealer = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "A", name: "AC" }, { rank: "K", name: "KC" }];

    expect(Hand.result(player, dealer)).toBe(constants.PLAYER_BLACKJACK);
  });

  it("detects a player win", () => {
    const dealer = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "A", name: "AC" }, { rank: "K", name: "KC" }];

    expect(Hand.result(player, dealer)).toBe(constants.PLAYER_BLACKJACK);
  });

  it("detects no win", () => {
    const dealer = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "5", name: "5C" }, { rank: "K", name: "KC" }];

    expect(Hand.result(player, dealer)).toBe(constants.CONTINUE);
  });
});

describe("#shouldDealerHit", () => {
  it("is true for a value less than 17", () => {
    const dealer = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    expect(Hand.shouldDealerHit([], dealer)).toBe(true);
  });

  it("is false for a value of 17", () => {
    const dealer = [{ rank: "7", name: "7D" }, { rank: "K", name: "KD" }];
    expect(Hand.shouldDealerHit([], dealer)).toBe(false);
  });

  it("is false for a value over 17", () => {
    const dealer = [{ rank: "A", name: "AD" }, { rank: "K", name: "KD" }];
    expect(Hand.shouldDealerHit([], dealer)).toBe(false);
  });

  it("returns false if the player total is 21", () => {
    const dealer = [{ rank: "1", name: "1D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "A", name: "AD" }, { rank: "K", name: "KD" }];
    expect(Hand.shouldDealerHit(player, dealer)).toBe(false);
  });

  it("returns false if the player total is over 21", () => {
    const dealer = [{ rank: "1", name: "1D" }, { rank: "K", name: "KD" }];
    const player = [
      { rank: "5", name: "5D" },
      { rank: "8", name: "8S" },
      { rank: "K", name: "KD" }
    ];

    expect(Hand.shouldDealerHit(player, dealer)).toBe(false);
  });
});

describe("#finalHandResult", () => {
  it("returns tie if player and dealer totals are equal", () => {
    const dealer = [{ rank: "7", name: "7D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "7", name: "7D" }, { rank: "K", name: "KS" }];
    expect(Hand.finalHandResult(player, dealer)).toBe(constants.TIE);
  });

  it("returns a dealer win if player has lower total than dealer", () => {
    const dealer = [{ rank: "7", name: "7D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "3", name: "3D" }, { rank: "K", name: "KS" }];
    expect(Hand.finalHandResult(player, dealer)).toBe(constants.DEALER_WINS);
  });

  it("returns a player win if dealer has lower total than player", () => {
    const dealer = [{ rank: "3", name: "3D" }, { rank: "K", name: "KD" }];
    const player = [{ rank: "7", name: "7D" }, { rank: "K", name: "KS" }];
    expect(Hand.finalHandResult(player, dealer)).toBe(constants.PLAYER_WINS);
  });
});

describe("#updateCredit", () => {
  it("returns the wager x 1.5 if player wins blackjack", () => {
    expect(Hand.updateCredit(100, 20, constants.PLAYER_BLACKJACK)).toEqual(130);
  });

  it("returns the wager + credit if the player wins without blackjack", () => {
    expect(Hand.updateCredit(100, 20, constants.PLAYER_WINS)).toEqual(120);
  });

  it("returns the credit - wager if the dealer wins", () => {
    expect(Hand.updateCredit(100, 20, constants.DEALER_WINS)).toEqual(80);
  });
});