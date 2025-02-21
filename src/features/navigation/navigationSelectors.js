export const selectCurrentPage = (state) => state.navigation.currentPage;
export const selectIsCurrentPage = (path) => (state) =>
  state.navigation.currentPage === path;
