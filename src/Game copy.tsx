import styled from "styled-components";

const GameContainer = styled.div`
  font-family: "Source Code Pro", monospace;

  color: #cccccc;
  display: grid;
  border: 1px solid #333340;
  font-size: 14pt;
  background: #10101a;
  font-weight: 900;
  padding: 5px;
  grid-template: 1fr / 1 fr;
  align-items: center;
  justify-items: center;
`;

export default function Game() {
  let hallway = [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."];
  let sideRooms = [
    ["B", "A", "A", "A"],
    ["B", "A", "A", "A"],
    ["B", "A", "A", "A"],
    ["B", "A", "A", "A"],
  ];
  return (
    <GameContainer>
      <div>#############</div>
      <div>
        #
        {hallway.map((h) => (
          <div>{h}</div>
        ))}
        #
      </div>
      {sideRooms[0].map((_, index) => (
        <div>
          {index === 0 && "##"}#{sideRooms[0][index]}#{sideRooms[1][index]}#
          {sideRooms[2][index]}#{sideRooms[3][index]}#{index === 0 && "##"}
        </div>
      ))}
      <div>#########</div>
    </GameContainer>
  );
}

//let foo =  `#...........#
//</div> ###B#C#B#D###
//</div>   #A#D#C#A#
//</div>   #A#D#C#A#
//</div>   #A#D#C#A#
//</div>   #########`
