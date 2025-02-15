// store/selectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectGlobalLoading = createSelector(
  [
    (state) => state.auth.isLoading,
    //(state) => state.gamesRoom.isLoading,
    //(state) => state.play.isLoading,
  ],
  (authLoading /*/, gamesLoading, playLoading/*/) => authLoading //|| gamesLoading || playLoading
);
