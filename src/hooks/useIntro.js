// features/intro/useIntro.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchRooms,
  attemptJoinRoom,
  clearError,
} from "../features/intro/introSlice";
import {
  selectRooms,
  selectIntroLoading,
  selectIntroError,
  selectJoinLoadingByRoomIdAndPosition,
  isInAnActiveRoom,
} from "../features/intro/introSelectors";

export const useIntro = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const loading = useSelector(selectIntroLoading);
  const error = useSelector(selectIntroError);
  const inActiveRoom = useSelector(isInAnActiveRoom);

  // Novo hook para obter o loading de joinRoom por sala e posição
  const getJoinLoading = (roomId, position) =>
    useSelector((state) =>
      selectJoinLoadingByRoomIdAndPosition(state, roomId, position)
    );

  // Memoiza a função loadRooms
  const loadRooms = useCallback(() => {
    dispatch(clearError());
    dispatch(fetchRooms());
  }, [dispatch]);

  const joinGameRoom = async (
    roomId,
    user,
    userName,
    position,
    isSpectator
  ) => {
    dispatch(clearError());
    try {
      await dispatch(
        attemptJoinRoom({ roomId, user, userName, position, isSpectator })
      ).unwrap();
      return true; // Indica sucesso
    } catch (error) {
      console.error("Erro ao entrar na sala:", error);
      return false; // Indica falha
    }
  };

  // // Nova ação para atualizar uma sala específica
  const updateRoom = (updatedRoom) => {
    console.log("updateRoom chamou no dispatch");
    dispatch({
      type: "intro/updateRoom", // Nome da ação no slice
      payload: updatedRoom,
    });
  };

  return {
    rooms,
    loading,
    error,
    loadRooms,
    joinGameRoom,
    updateRoom,
    inActiveRoom,
    getJoinLoading, // Expõe a função para obter o loading de joinRoom por posição
    clearError: () => dispatch(clearError()),
  };
};
