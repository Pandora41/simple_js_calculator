const inputValue = document.getElementById("user-input");

document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        // kalau inputnya masih 0 atau error
        if (inputValue.innerText === "0" || inputValue.innerText === "Error") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});
// deri
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML.trim();
        const lastChar = inputValue.innerText.slice(-1);

        if (operation === "=") {
            try {
                inputValue.innerText = new Function("return " + inputValue.innerText)();
            } catch {
                inputValue.innerText = "Error";
            }
        } else if (operation === "AC") {
            inputValue.innerText = "0";
        } else if (operation === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
        } else {
            // Cegah operator berturut-turut
            if ("+-*/".includes(lastChar) && "+-*/".includes(operation)) return;
            inputValue.innerText += operation;
        }
    });
});

// credit ini kalau ada yg pake code gua kocak
