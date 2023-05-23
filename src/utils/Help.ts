import { table, TableUserConfig } from "table";

interface IHelpTable {
  moves: string[];
}

class HelpTable implements IHelpTable {
  moves: string[];
  constructor(moves: string[]) {
    this.moves = moves;
  }
  showTable(
    func: (moves: string[], userMove: string, computerMove: string) => string
  ) {
    const config: TableUserConfig = {
      columns: {
        0: {
          alignment: "center",
        },
      },
    };

    const data: string[][] = [["Moves", ...this.moves]];
    let result = "";

    this.moves.forEach((move1) => {
      const row = [move1];
      this.moves.forEach((move2) => {
        if (func(this.moves, move1, move2) === "It's a draw!") {
          result = "Draw";
        } else if (func(this.moves, move1, move2) === "You win!") {
          result = "Win";
        } else {
          result = "Lose";
        }
        row.push(result);
      });

      data.push(row);
    });
    console.log(table(data, config));
  }
}

export default HelpTable;
