let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
const historyDiv = document.getElementById("history");

let string = "";

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        let value = e.target.innerHTML;

        if (value === "AC") {
            string = "";
            input.value = "";
        }

        else if (value === "DEL") {
            string = string.slice(0, -1);
            input.value = string;
        }

        else if (value === "=") {

    try {

        // Auto-close missing brackets
        let openBrackets = (string.match(/\(/g) || []).length;
        let closeBrackets = (string.match(/\)/g) || []).length;

        while (closeBrackets < openBrackets) {
            string += ")";
            closeBrackets++;
        }

        let expression = string;

        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/\^/g, "**");

        expression = expression.replace(
            /sin\(([^()]*)\)/g,
            (_, n) => Math.sin(eval(n) * Math.PI / 180)
        );

        expression = expression.replace(
            /cos\(([^()]*)\)/g,
            (_, n) => Math.cos(eval(n) * Math.PI / 180)
        );

        expression = expression.replace(
            /tan\(([^()]*)\)/g,
            (_, n) => Math.tan(eval(n) * Math.PI / 180)
        );

        expression = expression.replace(
            /log\(([^()]*)\)/g,
            (_, n) => Math.log10(eval(n))
        );

        expression = expression.replace(
            /ln\(([^()]*)\)/g,
            (_, n) => Math.log(eval(n))
        );

        expression = expression.replace(
            /√\(([^()]*)\)/g,
            (_, n) => Math.sqrt(eval(n))
        );

        let result = eval(expression);

        let historyItem = document.createElement("div");

        historyItem.classList.add("history-item");

        historyItem.innerHTML = `${string} = ${result}`;

        historyDiv.prepend(historyItem);

        if (!isFinite(result) || isNaN(result)) {
            throw new Error();
        }

        string = result.toString();
        input.value = string;

        }   catch {

                input.value = "Error";
                string = "";
            }

        }
        else if (value === "sin") {
            string += "sin(";
            input.value = string;
        }

        else if (value === "cos") {
            string += "cos(";
            input.value = string;
        }

        else if (value === "tan") {
            string += "tan(";
            input.value = string;
        }

        else if (value === "log") {
            string += "log(";
            input.value = string;
        }

        else if (value === "ln") {
            string += "ln(";
            input.value = string;
        }

        else if (value === "√") {
            string += "√(";
            input.value = string;
        }

        else {
            string += value;
            input.value = string;
        }

    });

});


// Keyboard Navigation

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {
        string += key;
        input.value = string;
    }

    // Operators
    else if (["+", "-","^", "*", "/", "%", ".", "(", ")"].includes(key)) {
        string += key;
        input.value = string;
    }

    // Enter = Calculate
    else if (key === "Enter") {

        e.preventDefault();

        try {

            let openBrackets = (string.match(/\(/g) || []).length;
            let closeBrackets = (string.match(/\)/g) || []).length;

            while (closeBrackets < openBrackets) {
                string += ")";
                closeBrackets++;
            }

            let expression = string;

            expression = expression.replace(/π/g, Math.PI);
            expression = expression.replace(/\^/g, "**");

            expression = expression.replace(
                /sin\(([^()]*)\)/g,
                (_, n) => Math.sin(eval(n) * Math.PI / 180)
            );

            expression = expression.replace(
                /cos\(([^()]*)\)/g,
                (_, n) => Math.cos(eval(n) * Math.PI / 180)
            );

            expression = expression.replace(
                /tan\(([^()]*)\)/g,
                (_, n) => Math.tan(eval(n) * Math.PI / 180)
            );

            expression = expression.replace(
                /log\(([^()]*)\)/g,
                (_, n) => Math.log10(eval(n))
            );

            expression = expression.replace(
                /ln\(([^()]*)\)/g,
                (_, n) => Math.log(eval(n))
            );

            expression = expression.replace(
                /√\(([^()]*)\)/g,
                (_, n) => Math.sqrt(eval(n))
            );

            let result = eval(expression);

            if (!isFinite(result) || isNaN(result)) {
                throw new Error();
            }

            string = result.toString();
            input.value = string;

        } catch {
            input.value = "Error";
            string = "";
        }
    }

    // Backspace = DEL
    else if (key === "Backspace") {
        string = string.slice(0, -1);
        input.value = string;
    }

    // Escape = AC
    else if (key === "Escape") {
        string = "";
        input.value = "";
    }

});

const clearHistoryBtn = document.getElementById("clearHistory");

clearHistoryBtn.addEventListener("click", () => {
    historyDiv.innerHTML = "";
});