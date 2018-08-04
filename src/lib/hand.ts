import * as constants from "../constants";
import { ICard } from "../types";

export default class Hand {

  public static shouldDealerHit(
    playerCards: ICard[],
    dealerCards: ICard[]
  ): boolean {
    if (this.sum(playerCards) >= this.blackJack) { return false; }
    return this.sum(dealerCards) < this.dealerLimit;
  }

  public static updateCredit(credit: number, wager: number, result: string) {
    switch (result) {
      case constants.PLAYER_BLACKJACK: {
        return credit + wager * 1.5;
      }

      case constants.PLAYER_WINS: {
        return credit + wager;
      }

      case constants.DEALER_WINS: {
        return credit - wager;
      }

      default: {
        return credit;
      }
    }
  }

  public static finalHandResult(playerCards: ICard[], dealerCards: ICard[]) {
    const playerTotal = this.sum(playerCards);
    const dealerTotal = this.sum(dealerCards);

    if (playerTotal > this.blackJack) {
        return constants.DEALER_WINS;
    }

    if (dealerTotal > this.blackJack) {
      return constants.PLAYER_WINS;
    }

    if (dealerTotal > playerTotal) {
      return constants.DEALER_WINS;
    }

    if (playerTotal > dealerTotal) {
      return constants.PLAYER_WINS;
    }

    return constants.TIE;
  }

  public static result(playerCards: ICard[], dealerCards: ICard[]): string {
    const playerTotal = this.sum(playerCards);
    const dealerTotal = this.sum(dealerCards);

    if (playerTotal > this.blackJack) {
        return constants.DEALER_WINS;
    }

    if (playerTotal === this.blackJack && playerCards.length === 2 &&
        dealerTotal === this.blackJack && dealerCards.length === 2) {
      return constants.TIE;
    }

    if (dealerTotal === this.blackJack && dealerCards.length === 2) {
      return constants.DEALER_WINS;
    }

    if (playerTotal === this.blackJack && playerCards.length === 2) {
      return constants.PLAYER_BLACKJACK;
    }

    if (playerTotal === this.blackJack && dealerTotal === this.blackJack) {
      return constants.TIE;
    }

    if (dealerTotal === this.blackJack) {
      return constants.DEALER_WINS;
    }

    if (playerTotal === this.blackJack) {
      return constants.PLAYER_BLACKJACK;
    }

    return constants.CONTINUE;
  }

  public static sum(hand: ICard[]): number {
    const totalWithoutAces: number = this.sumWithoutAces(hand);
    return this.sumWithAces(hand, totalWithoutAces);
  }

  private static readonly hardAce = 11;
  private static readonly softAce = 1;
  private static readonly blackJack = 21;
  private static readonly dealerLimit = 17;


  private static sumWithAces(hand: ICard[], totalWithoutAces: number): number {
    return hand.reduce((previousValue: number, currentValue: ICard): number => {
      if (currentValue.rank === "A") {
        if (previousValue + this.hardAce <= this.blackJack) {
          return previousValue + this.hardAce;
        } else {
          return previousValue + this.softAce;
        }
      }
      return previousValue;
    }, totalWithoutAces);
  }

  private static sumWithoutAces(hand: ICard[]): number {
    return hand.reduce((previousValue: number, currentValue: ICard): number => {
      if (["J", "Q", "K"].includes(currentValue.rank)) {
        return previousValue + 10;
      }

      if (
        Array.from(new Array(9), (x, i) => i + 2)
          .toString()
          .includes(currentValue.rank)
      ) {
        return previousValue + parseInt(currentValue.rank, 10);
      }
      return previousValue;
    }, 0);
  }
}