let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);
arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML == "=") {
            if (string !== "") {
                string = calculate(string);
                input.value = string;
            }
        } else if (e.target.innerHTML == "AC") {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML == "DEL") {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});

function calculate(expression) {
    // Validate and sanitize the expression to prevent HAXZ
    const validExpression = /^[\d+\-*/\s()]*$/.test(expression);
    if (!validExpression) {
        console.error("Invalid expression:", expression);
        return "";
    }

    try {
        return Function(`'use strict'; return (${expression})`)();
    } catch (error) {
        console.error("Invalid expression:", expression);
        return "";
    }
}

window.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        string += key;
        input.value = string;
    } else if (key === 'Enter' || key === '=') {
        if (string !== "") {
            string = calculate(string);
            input.value = string;
        }
    } else if (key === 'Escape') {
        string = "";
        input.value = string;
    } else if (key === 'Backspace') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
});