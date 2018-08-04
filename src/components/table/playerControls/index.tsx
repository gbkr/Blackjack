import * as React from "react";
import { Button } from '../styles';

interface IProps {
  onNewGame?: () => void;
  onAddPlayerCard?: () => void;
  onStand?: () => void;
  onDoubleDown?: () => void;
  onSplit?: () => void;
  onDoubleDownDisabled: boolean;
  onSplitDisabled: boolean;
}

export const PlayerControls = (props: IProps) => {
  return (
    <>
      <Button onClick={props.onStand}>Stand</Button>
      <Button onClick={props.onAddPlayerCard}>Hit</Button>
      <Button onClick={props.onDoubleDown} disabled={props.onDoubleDownDisabled}>Double down</Button>
      <Button onClick={props.onSplit} disabled={props.onSplitDisabled}>Split</Button>
    </>
  )
}