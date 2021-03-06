import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScoreCard = styled.div`
  background: #10101a;
  font-weight: 900;
  padding: 10px;
  font-size: 20pt;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "Source Code Pro", monospace;

  color: #cccccc;
  border: 1px solid #333340;
  margin-bottom: 10px;
`;

const MapContainer = styled.div`
  font-family: "Source Code Pro", monospace;

  color: #cccccc;
  border: 1px solid #333340;
  font-size: 14pt;
  background: #10101a;
  font-weight: 900;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;

const GameRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapElement = styled.div`
  width: 12px;
  height: 23px;
`;

const PlayableMapElement = styled.div<{ isSelected: boolean }>`
  width: 12px;
  height: 23px;
  &: hover {
    color: black;
    background: yellow;
  }
  ${(props) =>
    props.isSelected &&
    css`
      background: green;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 20px;
`;

const scoreBoard: Record<string, number> = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

let part1 = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
  ["#", "#", "#", "B", "#", "A", "#", "C", "#", "D", "#", "#", "#"],
  [" ", " ", "#", "B", "#", "A", "#", "C", "#", "D", "#", " ", " "],
  [" ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " "],
];

let part2 = [
  [" ", " ", "#", "D", "#", "C", "#", "B", "#", "A", "#", " ", " "],
  [" ", " ", "#", "D", "#", "B", "#", "A", "#", "C", "#", " ", " "],
];

export default function Game({ input }: { input: string }) {
  let [history, setHistory] = useState<Array<string>>([]);
  let [map, setMap] = useState<Array<Array<string>>>(part1);
  let [score, setScore] = useState<number>(0);

  const processInput = useCallback(() => {
    setMap(() => {
      let copy = JSON.parse(JSON.stringify(part1));
      let [first, second] = input.split("\n").slice(2, 4);
      copy[2] = first.split("");
      copy[3] = [...second.split(""), " ", " "];

      return copy;
    });
  }, [input]);

  const setupPart1 = () => {
    setMap((oldMap) => {
      let copy = JSON.parse(history[0])[0];
      copy.splice(3, 2);
      setHistory([JSON.stringify([copy, 0])]);

      return copy;
    });
    setScore(0);
  };
  const resetPart2 = () => {
    setMap((oldMap) => {
      let copy = JSON.parse(JSON.stringify(oldMap));
      copy.splice(3, 0, part2[0]);
      copy.splice(4, 0, part2[1]);

      setHistory([JSON.stringify([copy, 0])]);

      return copy;
    });
    setScore(0);
  };
  const setupPart2 = () => {
    setMap((oldMap) => {
      let copy = JSON.parse(history[0])[0];
      copy.splice(3, 0, part2[0]);
      copy.splice(4, 0, part2[1]);

      setHistory([JSON.stringify([copy, 0])]);

      return copy;
    });
    setScore(0);
  };
  useEffect(() => {
    //    processInput();
    //processInput with seethistory
    setMap(() => {
      let copy = JSON.parse(JSON.stringify(part1));
      let [first, second] = input.split("\n").slice(2, 4);
      copy[2] = first.split("");
      copy[3] = [...second.split(""), " ", " "];

      setHistory([JSON.stringify([copy, 0])]);

      return copy;
    });
    //eslint-disable-next-line
  }, [input]);

  let [isPart1, setIsPart1] = useState<any>(null);
  let [selected, setSelected] = useState<any>(null);
  let [error] = useState<any>(null);

  return (
    <GameContainer>
      <ButtonContainer>
        <button
          onClick={() => {
            setIsPart1(true);
            if (!isPart1) {
              setupPart1();
            }
          }}
        >
          [Part 1]
        </button>
        <button
          onClick={() => {
            setIsPart1(false);
            if (isPart1 === true || isPart1 === null) {
              setupPart2();
            }
          }}
        >
          [Part 2]
        </button>
      </ButtonContainer>
      <ScoreCard>{score}</ScoreCard>
      <MapContainer>
        <div>{error}</div>
        {map.map((row, i) => (
          <GameRow>
            {row.map((c, j) => {
              if (c !== "#" && c !== " ") {
                return (
                  <PlayableMapElement
                    isSelected={selected?.[0] === i && selected?.[1] === j}
                    onClick={() => {
                      if (selected === null) {
                        if (map[i][j] === ".") {
                          //setError("Can't select empty");
                        } else {
                          setSelected([i, j]);
                        }
                      } else {
                        if (selected[0] === i && selected[1] === j) {
                          setSelected(null);
                        } else {
                          if (map[i][j] !== ".") {
                            //  setError("Can't step on another");
                          } else {
                            const [si, sj] = selected;
                            setScore((score) => {
                              let moveCount =
                                i - 1 + Math.abs(sj - j) + (si - 1);
                              let newScore =
                                score + moveCount * scoreBoard[map[si][sj]];
                              setMap((oldMap) => {
                                let copy = JSON.parse(JSON.stringify(oldMap));
                                copy[i][j] = copy[si][sj];
                                copy[si][sj] = ".";
                                setHistory((history) => {
                                  let historyCopy = JSON.parse(
                                    JSON.stringify(history)
                                  );

                                  historyCopy.push(
                                    JSON.stringify([copy, newScore])
                                  );
                                  return historyCopy;
                                });
                                return copy;
                              });
                              return newScore;
                            });
                            setSelected(null);
                          }
                        }
                      }
                    }}
                  >
                    {c}
                  </PlayableMapElement>
                );
              } else {
                return <MapElement>{c}</MapElement>;
              }
            })}
          </GameRow>
        ))}
      </MapContainer>
      <ButtonContainer>
        <button
          onClick={() => {
            setScore(0);
            processInput();
            if (isPart1 === null || isPart1) {
              //              setupPart1();
            } else {
              resetPart2();
            }
            setSelected(null);
          }}
        >
          [Reset]
        </button>
        <button
          disabled={Boolean(history.length < 2)}
          onClick={() => {
            history.pop();
            let previous = history[history.length - 1];
            if (previous) {
              let parsed = JSON.parse(previous);
              let [historyMap, historyScore] = parsed;
              setScore(historyScore);
              setMap(historyMap);
              setSelected(null);
            }
          }}
        >
          [Undo]
        </button>
      </ButtonContainer>
    </GameContainer>
  );
}
