import {
  ADD_PLAYER_CARD,
  CLEAR_WAGER,
  DOUBLE_DOWN,
  NEW_GAME,
  NEW_WAGER,
  PLACE_WAGER,
  SPLIT,
  STAND,
} from "../constants";
import Deck from "../lib/deck";
import Hand from "../lib/hand";
import { IAction, ICard, IStoreState, ITakeCards } from "../types";

export function rootReducer(state: IStoreState, action: IAction): IStoreState {

  function getDealerCards(
    dealer: ICard[],
    player: ICard[],
    tmpDeck: ICard[]
  ): ITakeCards {
    while (Hand.shouldDealerHit(player, dealer)) {
      const { card, deck } = Deck.getCard(tmpDeck);
      dealer.push(card);
      tmpDeck = deck;
    }
    return { cards: dealer, deck: tmpDeck };
  }

  switch (action.type) {
    case NEW_GAME: {
      if (state.player.length > 1 && state.player.length - 1 !== state.activeHand) {
        const newActiveHand = state.activeHand + 1;
        const result = Hand.result(state.player[newActiveHand], state.dealer);
        const credit = Hand.updateCredit(state.credit, state.wager, result);

        return { ...state, result, credit, activeHand: newActiveHand };
      } else {
        const { cards: playerCards, deck: tmpDeck } = Deck.getCardPair();
        const { cards: dealerCards, deck } = Deck.getCardPair(tmpDeck);
        const result = Hand.result(playerCards, dealerCards);
        const newCredit = Hand.updateCredit(state.credit, state.wager, result);

        return { ...state, dealer: dealerCards, player: [playerCards], activeHand: 0, credit: newCredit, deck, result, newWager: false };
      }
    }

    case ADD_PLAYER_CARD: {
      const { card: playerCard, deck } = Deck.getCard(state.deck);
      const playerHand = [...state.player];
      playerHand[state.activeHand].push(playerCard);
      const result = Hand.result(playerHand[state.activeHand], state.dealer);
      const newCredit = Hand.updateCredit(state.credit, state.wager, result);

      return { ...state, player: playerHand, credit: newCredit, deck, result };
    }

    case STAND: {
      const { player, dealer } = state;
      const { cards: dealerCards, deck } = getDealerCards(dealer, player[state.activeHand], state.deck);
      const result = Hand.finalHandResult(player[state.activeHand], dealer);
      const credit = Hand.updateCredit(state.credit, state.wager, result);

      return { ...state, dealer: dealerCards, credit, result, deck };
    }

    case PLACE_WAGER: {
      let wager = state.wager + action.payload!;
      if (wager >= 300) { wager = 300 };
      if (wager >= state.credit) { wager = state.credit }
      return { ...state, wager };
    }

    case CLEAR_WAGER: {
      const wager = 0;
      return { ...state, wager };
    }

    case NEW_WAGER: {
      return { ...state, newWager: true }
    }

    case DOUBLE_DOWN: {
      const { card: playerCard, deck: tmpDeck } = Deck.getCard(state.deck);
      const playerHand = [...state.player];
      playerHand[state.activeHand].push(playerCard);
      const { cards: dealerCards, deck } = getDealerCards(state.dealer, playerHand[state.activeHand], tmpDeck);
      const result = Hand.finalHandResult(playerHand[state.activeHand], dealerCards);
      const credit = Hand.updateCredit(state.credit, state.wager * 2, result);

      return { ...state, player: playerHand, credit, deck, result };
    }

    case SPLIT: {
      const newState = { ...state };
      newState.player.push([newState.player[0].pop()!]);
      const { cards, deck } = Deck.getCardPair(state.deck);
      const playerCards = [newState.player[0].concat(cards[0]), newState.player[1].concat(cards[1])];
      const result = Hand.result(playerCards[0], state.dealer);
      const newCredit = Hand.updateCredit(state.credit, state.wager, result);

      return { ...state, player: playerCards, credit: newCredit, deck, result };
    }
  }
  return state;
}
