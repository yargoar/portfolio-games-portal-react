import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  cluster: "mtl",
  wsHost: window.location.hostname,
  wsPort: 8080,
  forceTLS: false,
  disableStats: true,
});

export default echo;
