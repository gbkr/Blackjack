export interface ICard {
  suit?: string;
  rank: string;
  name: string;
}

export interface ITakeCard {
  card: ICard;
  deck: ICard[];
}

export interface ITakeCards {
  cards: ICard[];
  deck: ICard[];
}

export interface IPlayerCards {
  dealer: ICard[];
  player: ICard[][];
  result: string;
  credit: number;
  wager: number;
  activeHand: number;
  newWager: boolean;
}

export interface IStoreState extends IPlayerCards {
  deck: ICard[];
}

export interface IAction {
  type: string;
  payload?: number;
}