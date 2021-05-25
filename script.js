let pushedNum = null;
let pushedOpe = null;
let pushedNumsArr = [];
let resultToShow = null;

function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
	return b === 0 ? "error" : a / b;
}

function operate (operator, a, b) {
    if (operator === "+") return add(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}


let displayResult = function(a) {
    document.getElementById('answer').value = a;
}


let monitorNums = function() {
    let numButtons = document.getElementsByClassName('num');
    for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener('click', function() {
            pushedNum = numButtons[i].value;
            if (pushedNumsArr.length >= 1) {
                if (!'0123456789'.includes(pushedNumsArr[pushedNumsArr.length -1])) {
                    pushedNumsArr.push(pushedNum);
                    displayResult(pushedNum);
                } else {
                    pushedNumsArr[pushedNumsArr.length -1] = pushedNum;
                    displayResult(pushedNum);
                }
            } else {
                pushedNumsArr.push(pushedNum);
                displayResult(pushedNum);
            }
        });
    }
}


let clearResult = function(a) {
    document.getElementById('clear').addEventListener('click', function() {
        pushedNum = null;
        pushedOpe = null;
        pushedNumsArr = [];
        resultToShow = null;
        displayResult(null);
    })
}


let monitorOperators = function() {
    opeButtons = document.getElementsByClassName('ope');
    for (let i = 0; i < opeButtons.length; i++) {
        opeButtons[i].addEventListener('click', function() {
            if (pushedNumsArr.length > 0) {
                if (!'+-*/'.includes(pushedNumsArr[pushedNumsArr.length -1])) {
                    pushedNumsArr.push(opeButtons[i].value);
                } else {
                    pushedNumsArr[pushedNumsArr.length -1] = opeButtons[i].value;
                }
            }
        });
    }
}

let monitorEqual = function() {
    opeResButton = document.getElementById('opeEqual');
    opeResButton.addEventListener('click', function(){
        if (pushedNumsArr.length > 2) {
            if ('+-*/'.includes(pushedNumsArr[pushedNumsArr.length -1])) {
                pushedNumsArr.pop();
            }
            resultToShow = parseFloat(pushedNumsArr[0]);
            for (let i = 2; i < pushedNumsArr.length; i = i + 2){
                resultToShow = operate(pushedNumsArr[i - 1], resultToShow, parseFloat(pushedNumsArr[i]));
            }
            pushedNum = resultToShow;
            pushedOpe = null;
            pushedNumsArr = [resultToShow];
            displayResult(resultToShow);
        }
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    monitorNums();
    clearResult();
    monitorOperators();
    monitorEqual();
}, false);