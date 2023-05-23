interface IWinnerDeterminer {
  determineWinner(
    moves: string[],
    userMove: string,
    computerMove: string
  ): string;
}

class WinnerDeterminer implements IWinnerDeterminer {
  determineWinner(moves: string[], userMove: string, computerMove: string) {
    const half = Math.floor(moves.length / 2);
    const userMoveIndex = moves.indexOf(userMove);
    const winningIndices = [];
    for (let i = userMoveIndex + 1; winningIndices.length < half; i++) {
      if (i >= moves.length) {
        i = 0;
      }
      winningIndices.push(moves[i]);
    }
    if (userMove == computerMove) {
      return "It's a draw!";
    } else if (!winningIndices.includes(computerMove)) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
}

export default WinnerDeterminer;
