let display = document.getElementById('display');
let history = [];

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function appendFunction(func) {
    if (display.value === '0') {
        display.value = func;
    } else {
        display.value += func;
    }
}

function clearDisplay() {
    display.value = '0';
    history = [];
    document.getElementById('history').innerHTML = '';
}

function formatResult(number) {
    if (Number.isInteger(number)) {
        return number.toString();
    } else {
        return parseFloat(number.toFixed(8)).toString();
    }
}

function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'pi')
            .replace(/e/g, 'e');
        let result = math.evaluate(expression);
        let formattedResult = formatResult(result);
        history.push(`${expression} = ${formattedResult}`);
        document.getElementById('history').innerHTML = history.map(h => `<div>${h}</div>`).join('');
        display.value = formattedResult;
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) appendToDisplay(key);
    else if (key === '.') appendToDisplay('.');
    else if (key === '+') appendToDisplay('+');
    else if (key === '-') appendToDisplay('-');
    else if (key === '*') appendToDisplay('*');
    else if (key === '/') appendToDisplay('/');
    else if (key === '^') appendToDisplay('^');
    else if (key === '(' || key === ')') appendToDisplay(key);
    else if (key === 'Enter') calculate();
    else if (key === 'Escape') clearDisplay();
});