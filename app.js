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
      this.isEventListenerAdded = false;
      //DOM elements used in multiple methods
      this.chooseHumanBot();
      this.app = document.getElementById('app');
      this.resetButton = document.getElementById('reset');
      this.playerEntry = document.getElementById('player-entry');
      this.header = document.getElementById('h1');
      this.chooseHumanBotSelection = document.getElementById('player-bot-choice');
      this.botGame = false;
    }

    chooseHumanBot() {
      const chooseHumanButton = document.getElementById('choose-human');
      const chooseBotButton = document.getElementById('choose-bot');
      const player2Label = document.getElementById('player-2-label');
      const player2Icon = document.getElementById('player-2-icon');
  
      chooseHumanButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.chooseHumanBotSelection.classList.add('hide');
        this.playerEntry.classList.remove('hide');
        this.chooseHumanBotSelection.classList.add('hide');
        this.showPlayerEntry();
      });
  
      chooseBotButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.chooseHumanBotSelection.classList.add('hide');
        this.playerEntry.classList.remove('hide');
        this.chooseHumanBotSelection.classList.add('hide');
        this.botGame = true;
        player2Label.textContent = 'Computer Name';
        player2Icon.src = "./img/icons8-cyborg-48.png";
        this.showPlayerEntry();
      });
    }
    
    startGame() {
      const player1NameInput = document.getElementById('player1Name');
      const player2NameInput = document.getElementById('player2Name');
      let player1Name = player1NameInput.value || 'Player 1';
      let player2Name = player2NameInput.value || 'Player 2';
      let player1Symbol = document.querySelector('input[name="symbol-select-p1"]:checked').value;
      let player2Symbol = document.querySelector('input[name="symbol-select-p2"]:checked').value;
     
      if(this.botGame) {
        player2Name = "Computer";
      }

      if(player1Symbol === player2Symbol) {
        // alert("Player symbols are the same. Please select 2 different symbols.");
        // this.playerEntry.classList.remove('hide');
      } 

      this.player1 = new Player(player1Name, player1Symbol, `./img/${player1Symbol}.png`);
      this.player2 = new Player(player2Name, player2Symbol, `./img/${player2Symbol}.png`);
      this.currentPlayer = this.player1;
      this.render();
      
      // Clear input values
      player1NameInput.value = '';
      player2NameInput.value = '';

    }

    makeMove(index) {
      if (!this.board[index] && !this.winner) {
        this.board[index] = this.currentPlayer.symbol;
        this.render();
        if (this.checkWinner()) {
          this.winner = this.currentPlayer;
          this.header.textContent = `${this.currentPlayer.name} wins!`;
          this.reset(); 
        } else if (!this.board.includes('')){
           // Check for a draw
           this.header.textContent = "It's a draw!";
           this.reset();
        } else {
            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
            this.render();
          }
      }
    }

    makeBotMove() {
      console.log(this.botGame)
      console.log("Bot's turn")
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
      const boardElement = document.createElement('div');
      this.header.textContent = `Current Player: ${this.currentPlayer.name}`;
      this.app.innerHTML = '';
      
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

    showPlayerEntry() {
      this.resetButton.classList.add('hide');
      if(!this.isEventListenerAdded) {
        this.playerEntry.addEventListener('click', (event) => {
          event.preventDefault();
          this.playerEntry.classList.add('hide');
          this.app.classList.remove('hide');
          this.startGame();
        });
      }
      this.isEventListenerAdded = true;
    }

    reset() {
      this.resetButton.classList.remove('hide');
      this.resetButton.addEventListener('click', (event) => {
        this.header.textContent = "Tic Tac Toe";
        this.chooseHumanBotSelection.classList.remove('hide');
        this.app.classList.add('hide');
        this.resetButton.classList.add('hide');
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = this.player1;
        this.winner = null;
      });
    }
  }

  //initialize app
  (function () {
    const ticTacToe = new TicTacToe();
  })();