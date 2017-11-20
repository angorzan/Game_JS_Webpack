document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

//    require("./printer.js");
//    var add = require("./calc.js");
//    console.log(add(2, 2));


    var Game = require('./game.js');





    var game1 = new Game();
    game1.show_furry();
    game1.show_coin();
    game1.start_game();
    document.addEventListener('keydown', function (event) {
        game1.furryControlled(event);
    });


});

