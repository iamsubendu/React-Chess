export default class Referee {
    isvalidMove(prevX, prevY, currX, currY, type, team, boardState) {
        if (type === "PAWN") {
            const specialRow = team === "A" ? 1 : 6;
            const pawnDirection = team === "A" ? 1 : -1;
            if (prevX === currX && prevY === specialRow && currY - prevY === 2 * pawnDirection) {
                if (!this.tileIsOccupied(currX, currY, boardState) && !this.tileIsOccupied(currX, currY - pawnDirection, boardState)) {
                    return true;
                }
            } else if (prevX === currX && currY - prevY === pawnDirection) {
                if (!this.tileIsOccupied(currX, currY, boardState)) {
                    return true;
                }
            }
        }
        return false;
    }
    tileIsOccupied(x, y, boardState) {
        let b = [boardState]
        const piece = b.find((p) => p.x === x && p.y === y);
        if (piece) {
            return true;
        } else {
            return false;
        }
    }
}