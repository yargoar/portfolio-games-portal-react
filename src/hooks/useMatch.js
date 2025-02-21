// useMatch.js - Correção
import { useDispatch, useSelector } from "react-redux";
import { sendMove, resetMatchState } from "../features/match/matchSlice";
import {
  selectCurrentMatch,
  selectMatchLoading,
  selectMatchError,
} from "../features/match/matchSelectors";

// Exportação nomeada
export const useMatch = () => {
  const dispatch = useDispatch();

  return {
    currentMatch: useSelector(selectCurrentMatch),
    matchLoading: useSelector(selectMatchLoading),
    matchError: useSelector(selectMatchError),
    sendMove: (moveData) => dispatch(sendMove(moveData)),
    resetMatch: () => dispatch(resetMatchState()),
    isMatchLoading: () => useSelector(selectMatchLoading) === true,
  };
};
