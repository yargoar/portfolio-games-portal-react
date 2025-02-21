import { useEffect } from "react";
import {
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../../services/socket";

const useMatchSocket = (tableId, onMatchUpdated) => {
  useEffect(() => {
    const channelName = "match";
    const eventName = `.match-${tableId}.updated`; // Ou o nome correto do seu evento
    console.log("SE INSCREVEU NO CANAL " + channelName);
    console.log("PRA OUVIR O EVENTO " + eventName);
    subscribeToChannel(channelName, eventName, onMatchUpdated);

    return () => {
      console.log("saiu do canal " + channelName);
      console.log("nao ouve mais o evento " + eventName);
      unsubscribeFromChannel(channelName, eventName, onMatchUpdated);
    };
  }, [onMatchUpdated]);
};

export default useMatchSocket;
