let startTime;
let mouse = false;
let type = "Undefined";
let solution;
let board;
let running = false;
let highscores

function generate() {
    let x = document.getElementById("width").value;
    let y = document.getElementById("height").value;

    if  (x<3 || x>100) {
        x = 5;
        document.getElementById("width").value = 5;
    }
    if  (y<3 || y>100) {
        y = 5;
        document.getElementById("height").value = 5;
    }


    generateSolution(y, x);
    let side = getSideStrings(solution, " ");
    let top = getSideStrings(invertArray(solution), "<br>");

    running = true;
    document.getElementById("timer").style.color = "BLACK";

    document.getElementById("timer").innerHTML = x + " " + y;
    startTime = Date.now();

    let text = "<tr><td id=" + -1 + "A" + -1 + "></td>";

    for (let j = 0; j < x; j++) {
        text += "<td id=" + -1 + "A" + j + " style='vertical-align: bottom'>" + top[j] + "</td>";
    }

    text += "</tr>";

    for (let i = 0; i < y; i++) {
        text += "<tr>";
        text += "<td id=" + i + "A" + -1 + " style='text-align: right'>" + side[i] + "</td>";
        for (let j = 0; j < x; j++) {
            const changeAtr = 'change("' + i + 'A' + j + '")';
            const enterAtr = 'enter("' + i + 'A' + j + '")';
            text += "<td onmouseenter='" + enterAtr + "' onmousedown='" + changeAtr + "' id='" + i + "A" + j + "'>" + "</td>";
        }
        text += "</tr>";
    }
    document.getElementById("table").innerHTML = text;
}

function start() {
    startTime = Date.now();
    update();
}

function enter(field) {
    if (mouse) change(field);
}

function mousedown() {
    mouse = true;
}

function mouseup() {
    mouse = false;
    type = "Undefined";
}

function change(field) {
    if (running) {
        let numbers = field.split("A");

        if (type === "Undefined") {
            if (board[numbers[0]][numbers[1]] === 0) board[numbers[0]][numbers[1]] = 1;
            else if (board[numbers[0]][numbers[1]] === 1) board[numbers[0]][numbers[1]] = 2;
            else board[numbers[0]][numbers[1]] = 0;
            type = board[numbers[0]][numbers[1]];
        } else {
            board[numbers[0]][numbers[1]] = type;
        }
        setBoard(field, board[numbers[0]][numbers[1]])

        testtestIfWon();
    }
}

function testtestIfWon() {
    if (matches(board, solution)) {
        document.getElementById("timer").style.color = "GREEN";
        document.getElementById("timer").innerText += "\n Won!"
        running = false;
    }
}


function setBoard (field, state) {
    switch (state) {
        case 1:
            document.getElementById(field).style.backgroundColor = "BLACK";
            document.getElementById(field).innerText = "";
            document.getElementById(field).style.border = "white 1px solid";
            break;
        case 2:
            document.getElementById(field).style.backgroundColor = "WHITE";
            document.getElementById(field).innerText = "X";
            document.getElementById(field).style.border = "black 1px solid";
            break;
        case 0:
            document.getElementById(field).style.backgroundColor = "WHITE";
            document.getElementById(field).innerText = "";
            document.getElementById(field).style.border = "black 1px solid";
            break;
    }
}

function update() {
    let time = Date.now() - startTime;
    let outTime = "";
    let hours = Math.round(time / 3600000 - 0.5);
    time -= hours * 3600000;
    let minutes = Math.round(time / 60000 - 0.5);
    time -= minutes * 60000;
    let seconds = Math.round(time / 1000 - 0.5);
    time -= seconds * 1000;

    if (time<100) {
        outTime += "0";
    } if (time<10) {
        outTime += "0";
    }
    outTime+= time

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (running) document.getElementById("timer").innerText = hours + ":" + minutes + ":" + seconds+"."+outTime;

    window.requestAnimationFrame(update);
}

function matches(b1, b2) {
    for (let i = 0; i < b1.length; i++) {
        for (let j = 0; j < b1[0].length; j++) {
            if (b1[i][j] % 2 !== b2[i][j] % 2) return false
        }
    }
    return true;
}

function generateSolution(width, height) {
    solution = new Array(width);
    board = new Array(width);

    for (let i = 0; i < width; i++) {
        board[i] = new Array((Number(height)));
        solution[i] = new Array((Number(height)));
        for (let j = 0; j < height; j++) {
            board[i][j] = 0;
            solution[i][j] = Math.round(Math.random() * 1.5);
        }
    }
    console.log(solution);
}

function getSideStrings(array, addon) {

    let strings = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        let section = array[i].toString().replaceAll(",", "").replaceAll('"', "").split("0");
        strings[i] = " ";
        for (let c = 0; c < section.length; c++) {
            if (section[c].length !== 0) strings[i] += section[c].length + "" + addon;
        }
    }
    return strings;
}

function invertArray(array) {
    let result;
    if (array.length !== 0) {
        console.log(array)
        result = new Array(Number(array[0].length));
        for (let i = 0; i < array[0].length; i++) {
            result[i] = new Array(Number(array.length));

        }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                result[j][i] = array[i][j];
            }
        }
    }
    return result;
}


function showSolutions() {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            board[i][j] = solution[i][j];
            setBoard(i+"A"+j, solution[i][j]);
        }
    }
    testtestIfWon();
    console.log(board);
}

function getCookie(index) {
    text = ""

    for (hs : highscores) {
        text.append(hs.getWidth()+";"+hs.getHeight()+";"+hs.getTime()+";"+hs.getDate())
    }


    document.cookie = "expires="+new Date().toUTCString(Date.now()+24*60*60*1000)+"path=/ content="+;
}

class HighScore {
    constructor(width, height, time, date) {
        if (date==null)
            date = Date.now();
        else
            this.date = date;
        this._width = width;
        this._height = height;
        this._time = time;
        this._date = date;
    }


    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}