import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Olá, Mundo!</h1>
        <p>Este é meu primeiro projeto React com Vite.</p>
      </div>
    </>
  );
}

export default App;
