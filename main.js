const input = document.getElementById("input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const signButton = document.getElementById("sign");
const calculateButton = document.getElementById("calculate");
const percentButton = document.getElementById("percent");
const decimalButton = document.getElementById("decimal");

const currentState = {
    currentValue: "0",
    operator: "",
    previousValue: "",
    helper: "",
    getInput() {
        return input.innerText;
    },
    setInput(str) {
        input.innerText = str;
    },
};

const clear = () => {
    currentState.setInput("0");
    currentState.currentValue = "0";
    currentState.previousValue = "";
    currentState.operator = "";
    currentState.helper = "";
};

clearButton.addEventListener("click", clear);

calculateButton.addEventListener("click", () => {
    if (
        currentState.currentValue &&
        currentState.previousValue &&
        currentState.operator
    ) {
        calculate(
            currentState.currentValue,
            currentState.previousValue,
            currentState.operator
        );
    } else if (
        currentState.previousValue &&
        !currentState.currentValue &&
        currentState.operator
    ) {
        calculate(
            currentState.helper,
            currentState.previousValue,
            currentState.operator
        );
    } else if (
        currentState.currentValue &&
        !currentState.previousValue &&
        currentState.helper
    ) {
        calculate(
            currentState.helper,
            currentState.currentValue,
            currentState.operator
        );
    }
});

signButton.addEventListener("click", () => {
    let value = parseFloat(currentState.getInput());
    if (value === 0) return;
    value *= -1;
    if (currentState.currentValue && currentState.previousValue) {
        currentState.currentValue = value;
    } else {
        currentState.previousValue = value;
        currentState.currentValue = "";
    }
    currentState.setInput(value);
});

percentButton.addEventListener("click", () => {
    let value = parseFloat(currentState.getInput());
    value /= 100;
    if (currentState.currentValue && currentState.previousValue) {
        currentState.currentValue = value;
    } else {
        currentState.previousValue = value;
        currentState.currentValue = "";
    }
    currentState.setInput(value);
});

decimalButton.addEventListener("click", () => {
    let value = currentState.getInput();
    if (!value.includes(".")) {
        value += ".";
    }
    if (currentState.currentValue) {
        currentState.currentValue = value;
    }
    if (currentState.previousValue && !currentState.currentValue) {
        currentState.currentValue = "0.";
        currentState.previousValue = "";
        currentState.setInput(currentState.currentValue);
        return;
    }
    currentState.setInput(value);
});

const handleNumbers = (str) => {
    if (currentState.currentValue.length == 9) return;
    if (currentState.currentValue === "0" && str === "0") return;
    else if (currentState.currentValue === "0" && str !== "0") {
        currentState.currentValue = str;
        currentState.setInput(currentState.currentValue);
    } else {
        currentState.currentValue += str;
        currentState.setInput(currentState.currentValue);
    }
};

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (event) => {
        handleNumbers(event.target.value);
    });
}

const round = (a, b) => Math.round(a * b) / b;

const calculate = (firstValue, secondValue, operator) => {
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);
    if (operator === "+") {
        let result = firstValue + secondValue;
        if (parseFloat(result) >= 10 ** 11) {
            clear();
            alert("The number you trying to calculate is too large");
            return;
        }
        const n = parseInt(result).toString().length;
        result = String(round(result, 10 ** (10 - n)));
        if (currentState.currentValue && currentState.previousValue) {
            currentState.helper = currentState.currentValue;
        }
        currentState.currentValue = "";
        currentState.previousValue = result;
        currentState.setInput(result);
    } else if (operator === "-") {
        let result = secondValue - firstValue;
        if (parseFloat(result) >= 10 ** 11) {
            clear();
            alert("The number you trying to calculate is too large");
            return;
        }
        const n = parseInt(result).toString().length;
        result = String(round(result, 10 ** (10 - n)));
        if (currentState.currentValue && currentState.previousValue) {
            currentState.helper = currentState.currentValue;
        }
        currentState.currentValue = "";
        currentState.previousValue = result;
        currentState.setInput(result);
    } else if (operator === "×") {
        let result = firstValue * secondValue;
        if (parseFloat(result) >= 10 ** 11) {
            clear();
            alert("The number you trying to calculate is too large");
            return;
        }
        const n = parseInt(result).toString().length;
        result = String(round(result, 10 ** (10 - n)));
        if (currentState.currentValue && currentState.previousValue) {
            currentState.helper = currentState.currentValue;
        }
        currentState.currentValue = "";
        currentState.previousValue = result;
        currentState.setInput(result);
    } else if (operator === "÷") {
        if (firstValue === 0) {
            clear();
            alert("You cant divide by zero");
            return;
        }
        let result = secondValue / firstValue;
        const n = parseInt(result).toString().length;
        result = String(round(result, 10 ** (10 - n)));
        if (currentState.currentValue && currentState.previousValue) {
            currentState.helper = currentState.currentValue;
        }
        currentState.currentValue = "";
        currentState.previousValue = result;
        currentState.setInput(result);
    }
};

const handleOperators = (event) => {
    const value = event.target.value;
    if (!currentState.operator) {
        currentState.operator = value;
        if (currentState.currentValue) {
            currentState.previousValue = currentState.currentValue;
        }
        currentState.helper = currentState.previousValue;
        currentState.currentValue = "";
    } else if (currentState.operator !== value) {
        if (currentState.currentValue && currentState.previousValue) {
            calculate(
                currentState.currentValue,
                currentState.previousValue,
                currentState.operator
            );
            currentState.operator = value;
        } else {
            currentState.operator = value;
        }
    } else {
        if (currentState.currentValue && currentState.previousValue) {
            calculate(
                currentState.currentValue,
                currentState.previousValue,
                currentState.operator
            );
        }
    }
};

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", handleOperators);
}
