import * as React from "react";
import * as constants from '../../../constants';
import { BetTitle, Button } from '../styles';

interface IProps {
  onNewGame: any;
  onNewWager: any;
  result: string;
  btnText: string;
  showWagerChangeOption: boolean;
}


export const GameFinished = (props: IProps) => {

  const resultMsg = (result: string) => {
    switch(result) {
      case constants.TIE: {
        return 'Tie!'
      }
      case constants.DEALER_WINS: {
        return 'The dealer wins!'
      }
      case constants.PLAYER_WINS: {
        return 'You win!'
      }
      case constants.PLAYER_BLACKJACK: {
        return 'Blackjack!'
      }
      default: {
        return result;
      }
    }
  };

  return <>
    <BetTitle>{resultMsg(props.result)}</BetTitle>
    {props.showWagerChangeOption && <Button onClick={props.onNewWager}>Change wager</Button>}
    <Button onClick={props.onNewGame}>{props.btnText}</Button>
  </>
}