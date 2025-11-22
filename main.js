(() => {
  const theme1 = {
    "--main-background": "hsl(222, 26%, 31%)",
    "--body-background": "hsl(223, 31%, 20%)",
    "--result-background": "hsl(224, 36%, 15%)",
    "--text-color": "hsl(0, 0%, 90%)",
    "--number-color": "hsl(221, 14%, 31%)",
    "--number-background": "hsl(30, 25%, 89%)",
    "--s-number-background": "hsl(28, 16%, 65%)",
    "--h-number-background": "hsl(0, 0%, 100%)",
    "--del-rest-but": "hsl(225, 21%, 49%)",
    "--s-del-rest-but": "hsl(224, 28%, 35%)",
    "--h-del-rest-but": "hsl(225, 21%, 60%)",
    "--equal-color": "hsl(6, 63%, 50%)",
    "--s-equal-color": "hsl(6, 70%, 34%)",
    "--h-equal-color": "hsl(6, 63%, 60%)",
  };

  const theme2 = {
    "--main-background": "hsl(0, 0%, 90%)",
    "--body-background": "hsl(0, 5%, 81%)",
    "--result-background": "hsl(0, 0%, 93%)",
    "--text-color": "hsl(60, 10%, 19%)",
    "--number-color": "hsl(60, 10%, 19%)",
    "--number-background": "hsl(45, 7%, 89%)",
    "--s-number-background": "hsl(35, 11%, 61%)",
    "--h-number-background": "white",
    "--del-rest-but": "hsl(185, 42%, 37%)",
    "--s-del-rest-but": "hsl(185, 58%, 25%)",
    "--h-del-rest-but": "hsl(185, 42%, 47%)",
    "--equal-color": "hsl(25, 98%, 40%)",
    "--s-equal-color": "hsl(25, 99%, 27%)",
    "--h-equal-color": "hsl(25, 98%, 50%)",
  };

  const theme3 = {
    "--main-background": "hsl(268, 75%, 9%)",
    "--body-background": "hsl(268, 71%, 12%)",
    "--result-background": "hsl(268, 71%, 12%)",
    "--text-color": "hsl(52, 100%, 62%)",
    "--number-color": "hsl(52, 100%, 62%)",
    "--number-background": "hsl(268, 47%, 21%)",
    "--s-number-background": "hsl(290, 70%, 36%)",
    "--h-number-background": "hsl(281, 89%, 26%)",
    "--del-rest-but": "hsl(281, 89%, 26%)",
    "--s-del-rest-but": "hsl(285, 91%, 52%)",
    "--h-del-rest-but": "hsl(281, 89%, 36%)",
    "--equal-color": "hsl(176, 100%, 44%)",
    "--s-equal-color": "hsl(177, 92%, 70%)",
    "--h-equal-color": "hsl(176, 100%, 54%)",
  };

  const themes = { one: theme1, two: theme2, three: theme3 };
  let btns = document.querySelectorAll(".themes .colors .theme");
  const storageKey = "theme";

  function applyTheme(name) {
    const theme = themes[name];
    if (!theme) return;
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  }

  function setTheme(theme) {
    if (!themes[theme]) return;
    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
    updateTogle(theme);
  }

  function updateTogle(active) {
    btns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === active);
    });
  }
  window.addEventListener("DOMContentLoaded", () => {
    let local = localStorage.getItem(storageKey) || "one";
    applyTheme(local);
    updateTogle(local);

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setTheme(btn.dataset.theme);
      });
    });
  });
})();
let result = document.querySelector(".result input");
let inputs = document.querySelectorAll("input");
let operators = ["+", "-", "*", "X", "/"];

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    let lastChar = result.value.slice(-1);
    if (input === result) return;

    if (
      !operators.includes(input.value) &&
      input.value !== "DEL" &&
      input.value !== "RESET" &&
      input.value !== "=" &&
      input.value !== "•"
    ) {
      if (result.value === "0") {
        result.value = input.value;
      } else {
        result.value += input.value;
      }
    } else if (operators.includes(input.value)) {
      if (result.value === "0") return;
      else if (!operators.includes(lastChar)) {
        result.value += input.value === "X" ? "*" : input.value;
      }
    } else if (input.value === "DEL") {
      result.value = result.value.slice(0, -1) || "0";
    } else if (input.value === "RESET") {
      result.value = "0";
    } else if (input.value === "=") {
      try {
        let expression = result.value.replace(/,/g, ".");
        let evalResult = eval(expression);
        result.value = evalResult.toString().replace(/\./g, ",");
      } catch {
        result.value = "Error";
      }
    } else if (input.value === "•") {
      let parts = result.value.split(/[\+\-\*\/]/);
      let lastNumber = parts[parts.length - 1];
      if (!lastNumber.includes(",")) {
        result.value += ",";
      }
    }
  });
});
