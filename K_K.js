$(document).ready(function () {

    var players = [{ name: 'Kółko' }, { name: 'Krzyżyk' }];
    var win = false;
    var end = false;
    var currentPlayer = players[0];

    var count = 0;

    let BoardOfCells = [

        ["", "", ""],
        ["", "", ""],
        ["", "", ""]

    ];


    //var BoardOfCellsNextMove = [

    //    ["", "", ""],
    //    ["", "", ""],
    //    ["", "", ""]

    //];



    function displayCurrentPlayer() {

        $('.status').text('Bieżący gracz : ' + currentPlayer.name);

    }

    displayCurrentPlayer();

    $('.win').dialog({
        modal: true,
        autoOpen: false, close: function () {
            End();
        }
    });





    function End() {

        win = false;
        end = false;

        count = 0;
        currentPlayer = players[0];
        BoardOfCells = BoardOfCells = [

            ["", "", ""],
            ["", "", ""],
            ["", "", ""]

        ];
        $('.cell').each(function () {

            $(this).removeClass('cell_X');
            $(this).removeClass('cell_O');


        });


    }


    function Win(sign) {
        var text;
        if (sign === 'O') {
            text = "Kółko";
        }
        else {
            text = "Krzyżyk";
        }
        win = true;
        $(".win").text("Wygrał gracz " + text);
        $('.win').dialog('open');




    }

    $('.end').dialog({
        modal: true,
        autoOpen: false, close: function () {
            End();
        }
    });

    function CheckEnd() {

        if (count >= 9 && win === false) {
            $('.end').dialog('open');

        }

    }


    function SetBoard() {

        var cells = document.getElementsByClassName("cell");
        var k = 0;
        var check;



        for (var i = 0; i < 3; i++) {


            for (var j = 0; j < 3; j++) {
                check = cells[k];

                if (check.classList.contains('cell_O')) {
                    BoardOfCells[i][j] = 'O';
                }
                else if (check.classList.contains('cell_X')) {
                    BoardOfCells[i][j] = 'X';
                }


                k++;


            }


        }




    }/////


    function CheckWinHorizontally(sign, BoardOfCells) {

        for (var i = 0; i < 3; i++) {

            k = 0;
            for (var j = 0; j < 3; j++) {

                if (BoardOfCells[i][j] === sign) {
                    k++;
                }

            }

            if (k === 3) {
                Win(sign);
                end = true;
                break;
            }


        }






    }

    function CheckWinPerpendicularly(sign, BoardOfCells) {


        for (var i = 0; i < 3; i++) {
            var k = 0;
            for (var j = 0; j < 3; j++) {


                if (BoardOfCells[j][i] === sign) {
                    k++;
                }

                if (k === 3) {
                    Win(sign);
                    end = true;
                    break;
                }

            }



        }



    }

    function CheckWinSlant(sign, BoardOfCells) {

        var l = 0;
        var p = 0;
        var length = BoardOfCells.length;

        for (var i = 0; i < 3; i++) {

            if (BoardOfCells[i][i] === sign) {
                l++;
            }

            if (l === 3) {
                Win(sign);
                end = true;
                break;
            }


        }




        var x = BoardOfCells.length - 1;
        var y = 0;
        while (x >= 0) {

            if (BoardOfCells[y][x] === sign) {
                p++;
            }

            if (p === 3) {
                Win(sign);
                end = true;
                break;
            }
            x--;
            y++;


        }



    }////



    function checkAll(sign, BoardOfCells) {
        SetBoard();
        CheckWinSlant(sign, BoardOfCells);
        CheckWinHorizontally(sign, BoardOfCells);
        CheckWinPerpendicularly(sign, BoardOfCells);

        CheckEnd();
        displayCurrentPlayer();
    }/////





    function playWithComputer() {



        $('.board').on('click', '.cell', function () {

            var sign;
            if ($(this).hasClass('cell_O') === false && $(this).hasClass('cell_X') === false) {

                $(this).addClass('cell_O');
                currentPlayer = players[1];
                sign = 'O';
                count++;
                checkAll(sign, BoardOfCells);

                if (end) {
                    return false;
                }
                //////////////////////////////////////////
                var x = true;
                while (x) {
                    var number = Math.floor(Math.random() * 8 + 0);
                    var cells = $('.cell');
                    var cellX = cells[number];

                    if (cellX.classList.contains('cell_O') === false && cellX.classList.contains('cell_X') === false) {
                        cellX.classList.add('cell_X');
                        x = false;
                    }



                }




                ////////////////////////////////////////
                currentPlayer = players[0];
                sign = 'X';
                count++;
                checkAll(sign, BoardOfCells);





            }




        });



    }//////



    function move() {
        $('.board').on('click', '.cell', function () {

            var sign;
            if ($(this).hasClass('cell_O') === false && $(this).hasClass('cell_X') === false) {
                if (currentPlayer.name === 'Kółko') {
                    $(this).addClass('cell_O');
                    currentPlayer = players[1];
                    sign = 'O';

                }
                else {

                    $(this).addClass('cell_X');
                    currentPlayer = players[0];
                    sign = 'X';


                }
                count++;
            }

            SetBoard();
            CheckWinSlant(sign, BoardOfCells);
            CheckWinHorizontally(sign, BoardOfCells);
            CheckWinPerpendicularly(sign, BoardOfCells);

            CheckEnd();
            displayCurrentPlayer();

        });



    }//////


    $('.start').dialog({
        modal: true,
        buttons: [
            {
                text: "Dwóch graczy",
                icon: "ui-icon-person",
                click: function () {
                    $(this).dialog('close');
                    move();
                }

            },
            {
                text: "Gra z komputerem",
                icon: "ui-icon-wrench",
                click: function () {
                    $(this).dialog('close');
                    playWithComputer();
                }

            }


        ]



    });///




});









