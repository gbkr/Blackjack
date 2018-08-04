import * as React from "react";
import { BetTitle, Button, Chip, ChipContainer } from '../styles';

interface Iwager {
  wager: number;
  onWagerChange: any;
  onNewGame: any;
  onClearWager: any;
}

const Wager = (props: Iwager) => {

  const CHIPS = [1, 5, 10, 25, 100];

  const renderChips = () => {
    return <ChipContainer>{CHIPS.map(chip => {
      // tslint:disable-next-line:jsx-no-lambda
      return <Chip key={chip} onClick={() => props.onWagerChange(chip)}>${chip}</Chip>;
    })} </ChipContainer>
  }

  return (
    <>
      <BetTitle>Place your bet</BetTitle>
      <BetTitle>${props.wager}</BetTitle>

      {renderChips()}

      <Button onClick={props.onClearWager}>Clear bet</Button>
      <Button onClick={props.onNewGame}>Deal</Button>

    </>
  );
};

export default Wager;