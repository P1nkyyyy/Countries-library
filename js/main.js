const data = "https://restcountries.com/v3.1/all";

const countryTemplate = document.querySelector(".data-country-template");
let countries = [];
let nav = document.querySelector("nav");

fetch(data)
  .then((response) => response.json())
  .then((item) => {
    countries = item.map((country) => {
      const {
        name: { common },
        flags: { svg },
        name: { nativeName },
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        borders,
        languages
      } = country;

      countries.push(country);

      // clone
      let countryContainer = document.querySelector(".countries");
      const countryClone = countryTemplate.content.cloneNode(true).children[0];
      countryContainer.appendChild(countryClone);

      let countryNav = document.querySelector(".country-nav");
      let previewNav = document.querySelector(".preview-nav");
      let previewMain = document.querySelector(".preview-main");

      // switching between preview and countries
      countryClone.addEventListener("click", () => {
        // nav
        countryNav.style.display = "none";
        previewNav.style.display = "block";
        nav.style.marginBottom = "3rem";
        // content
        countryContainer.style.display = "none";
        previewMain.style.display = "grid";

        previewContent();
      });

      let backBtn = document.querySelector(".back-container");
      backBtn.addEventListener("click", () => {
        // nav
        countryNav.style.display = "block";
        previewNav.style.display = "none";

        // content
        countryContainer.style.display = "grid";
        previewMain.style.display = "none";
      });

      // nav responsive
      let minWidth = window.matchMedia("(min-width: 800px)")
      function navMediaReset() {
        nav.style.marginBottom = "9rem";
        if (minWidth.matches) return nav.style.marginBottom = "3rem";
      }
      navMediaReset(minWidth)
      minWidth.addListener(navMediaReset)

      // name of the country
      let countryName = countryClone.querySelector(".country-name");
      countryName.innerHTML = common;

      // flag of the country
      let countryFlag = countryClone.querySelector(".country img");
      countryFlag.src = svg;

      // population of the country
      let countryPopul = countryClone.querySelector(".population");
      const comma = Intl.NumberFormat("en-US"); // formating the num to language en-US
      const newNum = comma.format(population); // returns a formated string based on the argument country.population
      countryPopul.innerHTML = newNum;

      // region of the country
      let countryRegion = countryClone.querySelector(".region");
      countryRegion.innerHTML = region;

      // capital city of the country
      let countryCapital = countryClone.querySelector(".capital");
      countryCapital.innerHTML = capital;

      function previewContent() {
        let countryPreName = document.querySelector(".preview-country-name");
        countryPreName.innerHTML = common;

        let countryPreFlag = document.querySelector(".preview-main img");
        countryPreFlag.src = svg;

        let countryPreNative = document.querySelector(".preview-native-name");
        let nativeNameArray = Object.entries(nativeName)
        countryPreNative.innerHTML = nativeNameArray[0][1].common

        let countryPrePoupulation = document.querySelector(
          ".preview-population"
        );
        countryPrePoupulation.innerHTML = newNum;

        let countryPreRegion = document.querySelector(".preview-region");
        countryPreRegion.innerHTML = region;

        let countryPreSubRegion = document.querySelector(".preview-sub-region");
        countryPreSubRegion.innerHTML = "None";
        if (typeof subregion !== "undefined") {
          countryPreSubRegion.innerHTML = subregion;
        }

        let countryPreCapital = document.querySelector(".preview-capital");
        countryPreCapital.innerHTML = "None";
        if (typeof capital !== "undefined") {
          countryPreCapital.innerHTML = capital;
        }

        let countryPreTld = document.querySelector(".tld");
        countryPreTld.innerHTML = tld[0];

        let countryPreCurrency = document.querySelector(".currency");
        countryPreCurrency.innerHTML = "None";
        if (typeof currencies !== "undefined") {
          const selectCurrency = Object.keys(currencies);
          countryPreCurrency.innerHTML = selectCurrency;
        }

        let countryPreLang = document.querySelector(".languages");
        countryPreLang.innerHTML = "None"
        if (typeof languages !== "undefined") {
          countryPreLang.innerHTML = ""
          let languageStr = "";
          Object.entries(languages).forEach(([_, value]) => {
            languageStr += value + ", "
          })
          countryPreLang.textContent += languageStr.slice(0, -2)
        }

        let bordersContainer = document.querySelector(".borders");
        bordersContainer.innerHTML = "";
        if (typeof borders !== "undefined") {
          borders.forEach((e) => {
            let borderNewList = document.createElement("li");
            borderNewList.innerHTML = e;
            bordersContainer.appendChild(borderNewList);
          });
        }
      }

      return {
        common,
        element: countryClone,
        shortCutName: country.altSpellings[0],
        region,
        borders,
        languages
      };
    });
  });

/*
  SEARCH INPUT
              */

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  countries.forEach((country) => {
    const isVisible =
      country.common.toLowerCase().includes(value) ||
      country.shortCutName.toLowerCase().includes(value);

    country.element.classList.toggle("hide", !isVisible);
  });
});

/* 
  FILTER MENU 
            */

let selectedContainer = document.querySelector(".select");
let menu = document.querySelector(".menu");
let drop = document.querySelector(".dropdown");

document.addEventListener("click", (e) => {

  const isDropdownButton =
    e.target.matches(".select") ||
    e.target.matches(".arrow") ||
    e.target.matches(".selected");
  let currentDropdown;

  if (isDropdownButton) {
    currentDropdown = e.target.closest(".dropdown");
    currentDropdown.classList.toggle("active");
    menu.style.zIndex = "101";
  }

  document.querySelectorAll(".dropdown.active").forEach((dropDown) => {
    if (dropDown === currentDropdown) return;
    dropDown.classList.remove("active");
    setTimeout(() => {
      menu.style.zIndex = "99";
    }, 150)
  });
});

// forEach list we will add event click and innerHtml
let list = document.querySelectorAll(".menu li");
list.forEach((e) => {
  e.addEventListener("click", () => {
    // style for the menu
    let regionSpan = document.querySelector(".selected");
    regionSpan.innerHTML = e.textContent;

    // functionailty for the menu
    countries.forEach((country) => {
      let isVisible;
      if (regionSpan.textContent === "Asia") {
        isVisible = country.region.includes("Asia");
        country.element.classList.toggle("hide", !isVisible);
      } else if (regionSpan.textContent === "America") {
        isVisible = country.region.includes("America");
        country.element.classList.toggle("hide", !isVisible);
      } else if (regionSpan.textContent === "Europe") {
        isVisible = country.region.includes("Europe");
        country.element.classList.toggle("hide", !isVisible);
      } else if (regionSpan.textContent === "Africa") {
        isVisible = country.region.includes("Africa");
        country.element.classList.toggle("hide", !isVisible);
      } else if (regionSpan.textContent === "Oceania") {
        isVisible = country.region.includes("Oceania");
        country.element.classList.toggle("hide", !isVisible);
      } else if (regionSpan.textContent === "All") {
        isVisible = country.region;
        country.element.classList.toggle("hide", !isVisible);
      }
    });
  });
});

