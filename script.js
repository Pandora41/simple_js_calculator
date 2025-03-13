const inputValue = document.getElementById("user-input");

document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const value = e.target.innerHTML.trim();

        // kalau input masih 0 atau error, reset dulu
        if (["Error", "Deri", "NaN", "Infinity", "0", "undefined"].includes(inputValue.innerText)) {
            inputValue.innerText = "";
        }

        if (value === ".") {
            // Ambil angka terakhir setelah operator terakhir
            const lastNumberMatch = inputValue.innerText.match(/(\d+(\.\d*)?)$/);
            const lastNumber = lastNumberMatch ? lastNumberMatch[0] : "";

            // Kalau belum ada angka atau angka terakhir sudah punya titik, tolak input
            if (!lastNumber) {
                inputValue.innerText += "0.";
                return;
            }
            if (lastNumber.includes(".")) return;
        }
        inputValue.innerText += value;
    });
});

// deri
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML.trim();
        const lastChar = inputValue.innerText.slice(-1);
        // jika oprasi samadengan
        if (operation === "=") {
            if (inputValue.innerText == "Error") {
                inputValue.innerText = "Deri";
            } else {
                try {
                    inputValue.innerText = new Function("return " + inputValue.innerText)();
                } catch {
                    inputValue.innerText = "Error";
                }
            }
            // jika ac
        } else if (operation === "AC") {
            inputValue.innerText = "0";
            // jika del
        } else if (operation === "DEL") {
            if (["Error", "Deri", "NaN", "Infinity", "undefined"].includes(inputValue.innerText)) {
                inputValue.innerText = "0";
            } else {
                inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
            }
            // kurang dan special case angka negatif
        } else if (operation === "-") {
            if (["Error", "Deri", "NaN", "Infinity", "0", "undefined"].includes(inputValue.innerText)) {
                inputValue.innerText = operation;
            } else if (/\d$/.test(inputValue.innerText) || ("+-*/%".includes(lastChar))){
                if (("+-*/%".includes(lastChar))) {
                    inputValue.innerText = inputValue.innerText.slice(0, -1) + operation;
                } else {
                    inputValue.innerText += operation;
                }
            } else return;
        } else {
                // sisanya
            if (/\d$/.test(inputValue.innerText) || ("+-*/%".includes(lastChar))) {
                if (("+*/%".includes(lastChar))) {
                    inputValue.innerText = inputValue.innerText.slice(0, -1) + operation;
                } else if (lastChar === "-") {
                    if (inputValue.innerText.slice(0, -1) === "") return; 
                    inputValue.innerText = inputValue.innerText.slice(0, -1) + operation;
                } else {
                    inputValue.innerText += operation;
                }
            } else return;
            }
    });
});

// credit ini kalau ada yg pake code gua kocak
