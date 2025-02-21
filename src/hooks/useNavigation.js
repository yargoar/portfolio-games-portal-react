import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../features/navigation/navigationSlice";
import { selectCurrentPage } from "../features/navigation/navigationSelectors";

export const useNavigation = () => {
  const dispatch = useDispatch();

  return {
    // Estado
    currentPage: useSelector(selectCurrentPage),

    // Ações
    setCurrentPage: (path) => dispatch(setCurrentPage(path)),

    // Helper para comparação de página atual
    isCurrentPage: (path) => useSelector(selectCurrentPage) === path,
  };
};
