/*
  DARK/LIGHT MODE
                */

let switchMode = document.querySelector(".mode-switch");
let sunSvg = document.querySelector(".sun-svg");
let moonSvg = document.querySelector(".moon-svg");
let darkLightText = document.querySelector(".text-mode")

function lightMode() {
  sunSvg.style.display = "none";
  moonSvg.style.display = "block";
  darkLightText.innerHTML = "Dark Mode"
}

function darkMode() {
  sunSvg.style.display = "block";
  moonSvg.style.display = "none";
  darkLightText.innerHTML = "Light Mode"
}

switchMode.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    lightMode()
  } else if (document.documentElement.classList.contains("light")) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    darkMode()
  } else {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("light");
      lightMode()
      
    } else {
      document.documentElement.classList.add("dark");
      darkMode()
    }
  }
});

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  darkLightText.innerHTML = "Dark Mode"
 }