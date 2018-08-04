import * as React from "react";
import Hand from "src/lib/hand";
import { ICard } from "src/types";

import { Card, PlayerLabel, PlayerScore } from '../styles';

interface IProps {
  cards: ICard[];
  gameOver: boolean;
}

const renderCard = (
  card: ICard,
  index: number,
  length: number,
  gameOver: boolean
): JSX.Element => {

  let cardName: string;

  if (!gameOver && length === 2 && index === 1) {
    const cardColor = "red";
    cardName = `${cardColor}-back`;
  } else {
    cardName = card.name;
  }

  return (
    <Card
      key={card.name}
      src={`${process.env.PUBLIC_URL}/cards/${cardName}.svg`}
    />
  );
};

const renderCards = (cards: ICard[], gameOver: boolean) => {
  return cards.map((card, index) => {
    return renderCard(card, index, cards.length, gameOver);
  });
};

const Dealer = (props: IProps) => {
  return (
    <div className="dealer">
      <PlayerLabel>Dealer</PlayerLabel>
      {renderCards(props.cards, props.gameOver)}
      <PlayerScore>{props.gameOver ? Hand.sum(props.cards) : null}</PlayerScore>
    </div>
  );
};

export default Dealer;