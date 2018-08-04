import * as React from "react";
import Hand from 'src/lib/hand';
import { ICard } from "src/types";
import { Card, LeftArrow, PlayerCards, PlayerLabel, PlayerScore, RightArrow } from '../styles';

interface IProps {
  cards: ICard[][];
  activeHand: number;
}

const renderHand = (hand: ICard[]) => {
  return hand.map(card => {
    return (
      <Card
        key={card.name}
        src={process.env.PUBLIC_URL + `/cards/${card.name}.svg`}
      />
    );
  });
};

const renderHands = (hands: ICard[][], activeHand: number) => {
  return hands.map((hand, index) => {
    if (hand.length > 0) {
      return <div key={`hand-${index}`}>
        {hands.length > 1 && activeHand === index && <RightArrow />}
        {renderHand(hand)}
        {hands.length > 1 && activeHand === index && <LeftArrow />}
      </div>;
    } else {
      return <b>No cards</b>;
    }
  });
};

const Player = (props: IProps) => {
  return (
    <PlayerCards>
      <PlayerLabel>Player</PlayerLabel>
      {renderHands(props.cards, props.activeHand)}
      <PlayerScore>{Hand.sum(props.cards[props.activeHand])}</PlayerScore>
    </PlayerCards>
  );
};

export default Player;