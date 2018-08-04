import * as constants from "../../constants";

import * as React from "react";
import Hand from '../../lib/hand';
import { ICard } from "../../types";
import Dealer from "./dealer";
import { GameFinished } from "./gameFinished";
import Player from "./player";
import { PlayerControls } from './playerControls';
import { Financials } from './styles';
import Wager from './wager';

export interface IProps {
  onNewGame?: () => void;
  onAddPlayerCard?: () => void;
  onStand?: () => void;
  onDoubleDown?: () => void;
  onSplit?: () => void;
  dealer: ICard[];
  newWager: boolean;
  player: ICard[][];
  result: string;
  credit: number;
  wager: number;
  onWagerChange: any;
  onNewWager: any;
  onClearWager: any;
  activeHand: number;
}

const Table = (props: IProps) => {
  const gameOver = [
    constants.DEALER_WINS,
    constants.PLAYER_WINS,
    constants.PLAYER_BLACKJACK,
    constants.TIE
  ].includes(props.result);

  const allowDoubleDown = props.player[props.activeHand].length === 2 &&
    [9, 10, 11].includes(Hand.sum(props.player[props.activeHand]));

  const allowSplit = props.player[0].length === 2 &&
    props.player[0][0].rank === props.player[0][1].rank

  if (gameOver && !props.newWager) {
    const btnText = props.activeHand === 0 && props.player.length > 1 ? 'Next Hand' : 'New hand';
    return (
      <>
        <Dealer cards={props.dealer} gameOver={gameOver} />
        <Player cards={props.player} activeHand={props.activeHand} />

        <Financials>Credit <b>${props.credit}</b> | Wager <b>${props.wager}</b></Financials>

        <GameFinished
          result={props.result}
          onNewGame={props.onNewGame}
          onNewWager={props.onNewWager}
          btnText={btnText}
          showWagerChangeOption={props.player.length === 1 || props.player.length === 2 && props.activeHand === 1}
        />
      </>
    );
  }

  if (props.result === constants.NEW_GAME || props.newWager) {
    return (
      <div>
        <Wager
          wager={props.wager}
          onWagerChange={props.onWagerChange}
          onNewGame={props.onNewGame}
          onClearWager={props.onClearWager}
        />
      </div>
    );
  } else {
    return (
      <>
        <Dealer cards={props.dealer} gameOver={gameOver} />
        <Player cards={props.player} activeHand={props.activeHand} />

        <PlayerControls
          onNewGame={props.onNewGame}
          onAddPlayerCard={props.onAddPlayerCard}
          onDoubleDown={props.onDoubleDown}
          onDoubleDownDisabled={!allowDoubleDown}
          onStand={props.onStand}
          onSplit={props.onSplit}
          onSplitDisabled={!allowSplit}
        />

        <Financials>Credit <b>${props.credit}</b> | Wager <b>${props.wager}</b></Financials>
      </>
    );
  }
};

export default Table;