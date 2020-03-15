$(document).ready(function () {

    var players = [{ name: 'Kółko' }, { name: 'Krzyżyk' }];

    var currentPlayer = players[0];

    var board = [

        [null, null, null],
        [null, null, null],
        [null, null, null]


    ];


    function displayCurrentPlayer() {

        $('.status').text('Bieżący gracz : ' + currentPlayer.name);

    }

    displayCurrentPlayer();


   


    function move() {
        $('.board').on('click', '.cell', function () {


            if ($(this).hasClass('cell_O') === false && $(this).hasClass('cell_X') === false)
            {
                if (currentPlayer.name === 'Kółko') {
                    $(this).addClass('cell_O');
                    currentPlayer = players[1];

                }
                else {

                    $(this).addClass('cell_X');
                    currentPlayer = players[0];
                }
            }
            
               
           




           

        });
        //checkWin();
        displayCurrentPlayer();
    }

    move();





});