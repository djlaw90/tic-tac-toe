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
    this.showHumanBotChoiceScreen();
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = null;
    this.winner = null;
    this.app = document.getElementById('app');
    this.resetButton = document.getElementById('reset');
    this.playerEntry = document.getElementById('player-entry');
    this.header = document.getElementById('h1');
    this.chooseHumanBotSelection = document.getElementById('player-bot-choice');
    this.botGame = false;
  }

  showHumanBotChoiceScreen() {
    const chooseHumanButton = document.getElementById('choose-human');
    const chooseBotButton = document.getElementById('choose-bot');
    const player2Label = document.getElementById('player-2-label');
    const player2Icon = document.getElementById('player-2-icon');

    chooseHumanButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.chooseHumanBotSelection.classList.add('hide');
      this.playerEntry.classList.remove('hide');
      this.chooseHumanBotSelection.classList.add('hide');
      this.initGameState();
    });

    chooseBotButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.chooseHumanBotSelection.classList.add('hide');
      this.playerEntry.classList.remove('hide');
      this.chooseHumanBotSelection.classList.add('hide');
      this.botGame = true;
      player2Label.textContent = 'Computer Name';
      player2Icon.src = "./img/icons8-cyborg-48.png";
      this.initGameState();
    });
  }
  
  initGameState() {
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const newGameButton = document.getElementById('newGame');
    let player1Name = player1NameInput.value || 'Player 1';
    let player2Name = player2NameInput.value || 'Player 2';

    
    if(this.botGame) {
      player2Name = "Computer";
    }

    newGameButton.addEventListener('click', (e) => {
      let player1Symbol = document.querySelector('input[name="symbol-select-p1"]:checked').value;
      let player2Symbol = document.querySelector('input[name="symbol-select-p2"]:checked').value;
      console.log(player1Symbol === player2Symbol);
      e.preventDefault();
      console.log(player1Symbol, player2Symbol)
      if(player1Symbol === player2Symbol) {
        console.log('here');
        alert("Player symbols are the same. Please select 2 different symbols.");
        return;
      } else {
        console.log(player1Symbol)
        console.log(player2Symbol)
        this.player1 = new Player(player1Name, player1Symbol, `./img/${player1Symbol}.png`);
        console.log(this.player1)
        this.player2 = new Player(player2Name, player2Symbol, `./img/${player2Symbol}.png`);
        console.log(this.player2)
        this.currentPlayer = this.player1;
        this.render();
      }
    });
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
      } else if (!this.board.includes('')) {
        this.header.textContent = "It's a draw!";
        this.reset();
      } else {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        this.render();
        if (this.botGame && this.currentPlayer === this.player2) {
          setTimeout(() => this.makeBotMove(), 500);
        }
      }
    }
  }

  makeBotMove() {
    if (!this.winner) {
      const availableCells = this.board.reduce((acc, cell, index) => {
        if (!cell) acc.push(index);
        return acc;
      }, []);
  
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const botMove = availableCells[randomIndex];
  
      this.board[botMove] = this.player2.symbol;
  
      this.render();
      if (this.checkWinner()) {
        this.winner = this.player2;
        this.header.textContent = `${this.player2.name} wins!`;
        this.reset();
      } else if (!this.board.includes('')) {
        this.header.textContent = "It's a draw!";
        this.reset();
      } else {
        this.currentPlayer = this.player1;
        this.render();
      }
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
    this.playerEntry.classList.add('hide');
    const boardElement = document.createElement('div');
    this.header.textContent = `Current Player: ${this.currentPlayer.name}`;
    this.app.innerHTML = '';
    this.app.classList.remove('hide');

    boardElement.className = 'board';
    for (let i = 0; i < 9; i++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        
        if(this.board[i]) {
          const symbolImage = document.createElement('img');
          symbolImage.src = this.board[i] === this.player1.symbol ? this.player1.image : this.player2.image;
          cellElement.appendChild(symbolImage);
        }
        
        cellElement.addEventListener('click', () => this.makeMove(i));
        boardElement.appendChild(cellElement);
    }
    this.app.appendChild(boardElement);
  }

  reset() {
    this.resetButton.classList.remove('hide');
    this.resetButton.addEventListener('click', (event) => {
      this.app.innerHTML = ''; // Clear the app element
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