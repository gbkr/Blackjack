import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../actions";
import Table from "../components/table";
import { IAction, IPlayerCards } from "../types";

export function mapStateToProps({
  player,
  dealer,
  result,
  credit,
  wager,
  activeHand,
  newWager,
}: IPlayerCards) {
  return {
    activeHand,
    credit,
    dealer,
    newWager,
    player,
    result,
    wager,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    onAddPlayerCard: () => dispatch(actions.addPlayerCard()),
    onClearWager: () => dispatch(actions.clearWager()),
    onDoubleDown: () => dispatch(actions.doubleDown()),
    onNewGame: () => dispatch(actions.newGame()),
    onNewWager: () => dispatch(actions.onNewWager()),
    onSplit: () => dispatch(actions.split()),
    onStand: () => dispatch(actions.stand()),
    onWagerChange: (wager: number) =>
      dispatch(actions.placeWager(wager)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);