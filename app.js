'use strict'

class Player {
    constructor(name, symbol, image) {
      this.name = name;
      this.symbol = symbol;
      this.image = image;
    }
  }

  class TicTacToe {
    constructor() {
      this.board = ['', '', '', '', '', '', '', '', ''];
      this.currentPlayer = null;
      this.winner = null;
      this.app = document.getElementById('app');
      this.resetButton = document.getElementById('reset');
      this.playerEntry = document.getElementById('player-entry');
    }
    
    initDOM() {

    }
    startGame() {
      const player1Name = document.getElementById('player1Name').value || 'Player 1';
      const player2Name = document.getElementById('player2Name').value || 'Player 2';

      this.player1 = new Player(player1Name, 'X', './img/X.png');
      this.player2 = new Player(player2Name, 'O', './img/O.png');

      this.currentPlayer = this.player1;
      this.render();
    }

    makeMove(index) {
      if (!this.board[index] && !this.winner) {
        this.board[index] = this.currentPlayer.symbol;
        if (this.checkWinner()) {
          this.winner = this.currentPlayer;
          this.reset();
        } else {
          this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        }
        this.render();
      }
    }

    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return true;
        }
      }

      return false;
    }

    render() {
      const header = document.createElement('h2');
      const boardElement = document.createElement('div');

      header.textContent = this.winner ? `${this.winner.name} wins!` : `Current Player: ${this.currentPlayer.name}`;

      this.app.innerHTML = '';
      this.app.appendChild(header);

      boardElement.className = 'board';
      for (let i = 0; i < 9; i++) {
          const cellElement = document.createElement('div');
          cellElement.className = 'cell';
          
          //Make sure cell isn't blank before placing marker
          if(this.board[i]) {
            const symbolImage = document.createElement('img');
            symbolImage.src = this.board[i] === 'X' ? this.player1.image : this.player2.image;
            cellElement.appendChild(symbolImage);
          }
          
          cellElement.addEventListener('click', () => this.makeMove(i));
          boardElement.appendChild(cellElement);
      }
      this.app.appendChild(boardElement);
    }

    showBoard() {
      this.resetButton.classList.add('hide');
      this.playerEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        this.playerEntry.classList.add('hide');
        this.app.classList.remove('hide');
        this.startGame();
      });
    }

    reset() {
      this.resetButton.classList.remove('hide');
      this.resetButton.addEventListener('click', (event) => {
        this.playerEntry.classList.remove('hide');
        this.app.classList.add('hide');
        this.resetButton.classList.add('hide');
      });
    }
  }

  //initialize app
  (function () {
    const ticTacToe = new TicTacToe();
    ticTacToe.showBoard();
  })();