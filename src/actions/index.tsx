import * as constants from '../constants';
import { IAction } from '../types';

export function split(): IAction {
  return {
    type: constants.SPLIT
  }
}

export function newGame(): IAction {
  return {
    type: constants.NEW_GAME
  }
}

export function addPlayerCard(): IAction {
  return {
    type: constants.ADD_PLAYER_CARD
  }
}

export function stand(): IAction {
  return {
    type: constants.STAND
  }
}

export function placeWager(wager: number): IAction {
  if (isNaN(wager)) { wager = 0 };
  return {
    payload: wager,
    type: constants.PLACE_WAGER,
  }
}

export function doubleDown(): IAction {
  return {
    type: constants.DOUBLE_DOWN
  }
}

export function clearWager(): IAction {
  return {
    type: constants.CLEAR_WAGER
  }
}

export function onNewWager(): IAction {
  return {
    type: constants.NEW_WAGER
  }
}

