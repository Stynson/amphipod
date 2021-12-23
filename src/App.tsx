import React, { useRef, useState } from "react";
import Game from "./Game";
import styled from "styled-components";

import "./App.css";
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f0f23;
  height: 100vh;
  width: 100vw;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  let [input, setInput] = useState<string>("");
  let ref = useRef<any>();
  return (
    <AppContainer>
      {input === "" && (
        <InputContainer>
          <textarea
            ref={ref}
            style={{ marginBottom: "10px" }}
            name="Text1"
            cols={11}
            rows={5}
          ></textarea>
          <button
            onClick={() => {
              setInput(ref?.current?.value);
            }}
          >
            [Submit input]
          </button>
        </InputContainer>
      )}
      {input && <Game input={input} />}
    </AppContainer>
  );
}

export default App;
