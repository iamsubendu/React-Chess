import React, { useRef, useState } from "react";

import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";

const Chessboard = () => {
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const initialBoardState = [
    { image: String, x: Number, y: Number, type: String, team: String },
  ];
  let board = [];
  let [piece, setPiece] = useState(initialBoardState);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  let [activePiece, setActivePiece] = useState(null);
  const chessboardRef = useRef(null);
  const referee = new Referee();

  for (let p = 0; p < 2; p++) {
    const teamType = p === 0 ? "B" : "A";
    const type = teamType === "B" ? "b" : "w";
    const y = teamType === "B" ? 7 : 0;

    initialBoardState.push({
      image: `assets/r_${type}.png`,
      x: 0,
      y,
      type: "ROOK",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/r_${type}.png`,
      x: 7,
      y,
      type: "ROOK",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/n_${type}.png`,
      x: 1,
      y,
      type: "KNIGHT",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/n_${type}.png`,
      x: 6,
      y,
      type: "KNIGHT",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/b_${type}.png`,
      x: 2,
      y,
      type: "BISHOP",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/b_${type}.png`,
      x: 5,
      y,
      type: "BISHOP",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/q_${type}.png`,
      x: 3,
      y,
      type: "QUEEN",
      team: teamType,
    });
    initialBoardState.push({
      image: `assets/k_${type}.png`,
      x: 4,
      y,
      type: "KING",
      team: teamType,
    });
    //y:y => y
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "assets/p_b.png",
      x: i,
      y: 6,
      type: "PAWN",
      team: "B",
    });
  }
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "assets/p_w.png",
      x: i,
      y: 1,
      type: "PAWN",
      team: "A",
    });
  }

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      // index starts at 0 of both...so to start with one adding 1 to both
      const num = i + j + 2;
      let image = undefined;
      //if image than load otherwise not
      piece.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} number={num} image={image} />);
    }
  }

  const grabPiece = (e) => {
    const d = e.target;
    const chessboard = chessboardRef.current;
    if (d.classList.contains("chessPiece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 75));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75))
      );
      const x = e.clientX - 37.5;
      const y = e.clientY - 37.5;
      d.style.position = "absolute";
      d.style.left = `${x}px`;
      d.style.top = `${y}px`;
      setActivePiece(d);
    }
  };

  const movePiece = (e) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 18.75;
      const minY = chessboard.offsetTop;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 70;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 70;
      //if x smaller than left side of board, we have to stop
      const x = e.clientX - 37.5;
      const y = e.clientY - 37.5;
      activePiece.style.position = "absolute";
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  };

  const dropPiece = (e) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75)
      );
      setPiece((d) => {
        const pieces = d.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isvalidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team,
              p
            );
            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("left");
              activePiece.style.removeProperty("top");
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  };

  return (
    <div
      className="chessboard"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
