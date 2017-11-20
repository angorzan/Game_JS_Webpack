/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    //    require("./printer.js");
    //    var add = require("./calc.js");
    //    console.log(add(2, 2));


    var Game = __webpack_require__(1);

    var game1 = new Game();
    game1.show_furry();
    game1.show_coin();
    game1.start_game();
    document.addEventListener('keydown', function (event) {
        game1.furryControlled(event);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.querySelectorAll("#board>div");
    this.score = 0;
    this.index = function (x, y) {
        return x + y * 10;
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
        if (old_furry !== null) {
            //bo inaczej pojawial się błąd 'cannot read classlist of null'
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
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
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
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;

/***/ })
/******/ ]);