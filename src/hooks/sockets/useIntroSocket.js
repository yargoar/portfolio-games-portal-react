import { useEffect } from "react";
import {
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../../services/socket";

const useIntroSocket = (onRoomUpdated) => {
  useEffect(() => {
    const channelName = "rooms";
    const eventName = ".room.updated"; // Ou o nome correto do seu evento

    subscribeToChannel(channelName, eventName, onRoomUpdated);

    return () => {
      unsubscribeFromChannel(channelName, eventName, onRoomUpdated);
    };
  }, [onRoomUpdated]);
};

export default useIntroSocket;
