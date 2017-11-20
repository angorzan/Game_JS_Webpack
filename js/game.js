var Furry = require('./furry.js');
var Coin = require('./coin.js');

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.querySelectorAll("#board>div");
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.show_furry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

    };
    this.show_coin = function () {
        console.log(this.coin);
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };


    this.move_furry = function () {


        if (this.furry.direction === "up") {
            this.furry.y -= 1;
        } else if (this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "down") {
            this.furry.y += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1;
        }
        this.gameOver();
        this.checkCoinCollision();


    };
    this.hideVisibleFurry = function () {
        var old_furry = document.querySelector('.furry');
        if (old_furry !== null) {//bo inaczej pojawial się błąd 'cannot read classlist of null'
            old_furry.classList.remove('furry');
        }

    };

    this.furryControlled = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
            var coin = document.querySelector('.coin');
            coin.classList.remove('coin');

            this.score += 1;
            var score_info = document.querySelector('strong');
            score_info.innerText = this.score;

            this.coin = new Coin();
            this.show_coin();
        }

    };

    this.gameOver = function () {
        if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
            clearInterval(this.idSetInterval);

            var over = document.getElementById('over');
            over.classList.remove('invisible');
            var game_over_info = document.querySelector('h3');
            var newSpan = document.createElement('span');
            newSpan.innerText = " Your score: " + this.score;
            game_over_info.appendChild(newSpan);
            game_over_info.classList.remove('invisible');
            console.log('game over!');

        }
    };


    var self = this;
    this.start_game = function startGame() {
        this.idSetInterval = setInterval(function () {
            self.move_furry();
            self.show_furry();
        }, 250);
    };

}

module.exports = Game;