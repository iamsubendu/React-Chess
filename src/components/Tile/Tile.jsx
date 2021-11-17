import React from 'react';

import "./Tile.css";

const Tile = ({number, image}) => {
    if(number%2 === 0){
        return (
            <div className="tile blackTile">
                {image && <div style={{backgroundImage: `url(${image})`}} className="chessPiece" ></div>}
            </div>
        )
    }
    else{
        return (
            <div className="tile whiteTile">
                {image && <div style={{backgroundImage: `url(${image})`}} className="chessPiece" ></div>}
            </div>
        )
    }
}

export default Tile
