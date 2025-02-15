// src/services/globalSocket.js
import echo from "./echo";

const channels = {};

const subscribeToChannel = (channelName, eventName, callback) => {
  if (!channels[channelName]) {
    // Cria o canal apenas se não existir
    channels[channelName] = {
      channel: echo.channel(channelName),
      listeners: new Map(), // Mapa para armazenar listeners por evento
    };
  }

  // Adiciona o listener para o evento específico
  const listener = (data) => callback(data);
  channels[channelName].listeners.set(callback, listener); // Usa a função original como chave
  channels[channelName].channel.listen(eventName, listener);
};

const unsubscribeFromChannel = (channelName, eventName, callback) => {
  if (channels[channelName]) {
    // Remove o listener específico
    const listener = channels[channelName].listeners.get(callback);
    if (listener) {
      channels[channelName].channel.stopListening(eventName, listener);
      channels[channelName].listeners.delete(callback);
    }

    // Se não houver mais listeners, deixa o canal
    if (channels[channelName].listeners.size === 0) {
      echo.leave(channelName);
      delete channels[channelName];
    }
  }
};

export { subscribeToChannel, unsubscribeFromChannel };
