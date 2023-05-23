import cryptoUtils from "./utils/CryptoUtils.js";
import HelpTable from "./utils/Help.js";
import WinnerDeterminer from "./utils/WinnerDeterminer.js";

const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv;

interface IGame {
  moves: string[];
  userMove: string;
  computerMove: string;
}

export class GameEngine implements IGame {
  moves: string[];
  userMove: string;
  computerMove: string;
  constructor(moves: string[]) {
    this.moves = [...moves];
    this.userMove = "";
    this.computerMove = "";
  }
  start() {
    const keyHMAC = cryptoUtils.generateKey();
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    const winnerDeterminer = new WinnerDeterminer();
    this.computerMove = this.moves[randomIndex];
    console.log(
      `HMAC: ${cryptoUtils.generateHMAC(this.computerMove)}\nAvailable moves:`
    );
    this.moves.forEach((move, idx) => {
      console.log(`${idx + 1} - ${move}`);
    });
    console.log(`0 - exit\n? - help`);
    rl.question("Enter your move: ", (answer: string) => {
      const foundMove = this.moves.find((value, idx) => {
        if (answer === String(idx + 1)) {
          return value;
        } else {
          return 0;
        }
      });
      if (foundMove) {
        this.userMove = foundMove;
        console.log(
          `Your move: ${foundMove}\nComputer move: ${this.computerMove}`
        );
        console.log(
          winnerDeterminer.determineWinner(
            this.moves,
            this.userMove,
            this.computerMove
          )
        );
        rl.close();
        console.log(`HMAC key: ${keyHMAC}`);
      } else if (answer === "0") {
        console.log("You are out of the game");
        process.exit();
      } else if (answer === "?") {
        const helpTable = new HelpTable(this.moves);
        helpTable.showTable(winnerDeterminer.determineWinner);
        this.start();
      } else {
        console.log("There is no such choice. Choose again!");
        this.start();
      }
    });
  }
  check(move: string, key: string) {
    const result = crypto.createHmac("sha-256", key).update(move).digest("hex");
    console.log(result);
  }
}

if (args.length < 5) {
  throw Error(
    "Arguments less than 3\nFor example, you can enter the following arguments: rock paper scissors lizard spock"
  );
} else if (args.length % 2 === 0) {
  throw Error(
    "Requires an even number of arguments\nFor example, you can enter the following arguments: rock paper scissors lizard spock"
  );
} else if (args.length !== new Set(args).size) {
  throw Error("Your arguments must be unique");
} else {
  const game = new GameEngine(args.slice(2));
  game.start();
}
