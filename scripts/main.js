// get countries-count class
const countriesCount = document.querySelector('.countries-count');
countriesCount.textContent = `Currently, we have ${countries_data.length} countries`;

const countriesCriteria = document.querySelector('.countries-criteria');
const countriesList = document.querySelector('.countries-list');

// Buttons
const searchBar = document.querySelector('#search-bar');
const nameButton = document.querySelector('.name-button');
const capitalButton = document.querySelector('.capital-button');
const populationButton = document.querySelector('.population-button');
const populationGraphButton = document.querySelector('.population');
const languagesButton = document.querySelector('.languages');

// get graph-wrapper class
const graphWrapper = document.querySelector('.graph-wrapper');

// get graph-title class
const graphTitle = document.querySelector('.graph-title');

const { name, capital, languages, population, flag, region, area } = countries_data;

// addEventListener for search bar button
searchBar.addEventListener('input', (e) => {
    let word = searchBar.value;
    searchThroughCountries(word);
    showPopulationContent();
})

// event listener for the name button
let nameToggle = false;
nameButton.addEventListener('click', (e) => {
    nameToggle = !nameToggle;

    const sortedCountries = nameToggle
    ? countriesToDisplay.sort((a, b) => b.name.localeCompare(a.name)) // Sort in descending order
    : countriesToDisplay.sort((a, b) => a.name.localeCompare(b.name)); // Sort in ascending order
    
    nameButton.innerHTML = '';
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', nameToggle ? 'fa-arrow-up' : 'fa-arrow-down', 'fa-xl');

    nameButton.appendChild(document.createTextNode('NAME '));
    nameButton.appendChild(icon);

    capitalButton.innerHTML = 'CAPITAL';
    populationButton.innerHTML = 'POPULATION';

    displayCountries(sortedCountries);
})

// event listener for the capital button
let capitalToggle = false;
capitalButton.addEventListener('click', (e) => {
    capitalToggle = !capitalToggle;

    const filteredCapital = countriesToDisplay.filter((country) => country.capital ? country.capital : ''); 

    const sortedCountries = capitalToggle
    ? filteredCapital.sort((a, b) => b.capital.localeCompare(a.capital)) // Sort in descending order
    : filteredCapital.sort((a, b) => a.capital.localeCompare(b.capital)); // Sort in ascending order

    capitalButton.innerHTML = '';
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', capitalToggle ? 'fa-arrow-up' : 'fa-arrow-down', 'fa-xl');

    capitalButton.appendChild(document.createTextNode('CAPITAL '));
    capitalButton.appendChild(icon);

    nameButton.innerHTML = 'NAME';
    populationButton.innerHTML = 'POPULATION';
 
    displayCountries(sortedCountries);
})

// event listener for the capital button
let populationToggle = false;
populationButton.addEventListener('click', (e) => {
    populationToggle = !populationToggle;

    const sortedCountries = populationToggle
    ? countriesToDisplay.sort((a, b) => b.population - a.population) // Sort in descending order
    : countriesToDisplay.sort((a, b) => a.population - b.population); // Sort in ascending order

    populationButton.innerHTML = '';
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', populationToggle ? 'fa-arrow-up' : 'fa-arrow-down', 'fa-xl');

    populationButton.appendChild(document.createTextNode('POPULATION '));
    populationButton.appendChild(icon);

    nameButton.innerHTML = 'NAME';
    capitalButton.innerHTML = 'CAPITAL';

    displayCountries(sortedCountries);
})

// add event listener for populationButton button
let isPopulationShown = true;
populationGraphButton.addEventListener('click', (e) => {
    showPopulationContent();
})

// add event listener for languagesButton button
languagesButton.addEventListener('click', (e) => {
    showLanguagesContent();
})

// create searchCountries function
function searchThroughCountries(word) {
    const regex = new RegExp(word, 'gi');

    const filteredCountries = countries_data.filter((country) => {
        const capital = country.capital ? country.capital : '';
        const languages = country.languages.join(', ');
        return (
            country.name.match(regex) || 
            capital.match(regex) || 
            languages.match(regex)
        );
    })

    if (word.length >= 1) {
        countriesCriteria.innerHTML = `${filteredCountries.length} countries satisfies the search criteria`;
    } else {
        countriesCriteria.innerHTML = '';
    }

    displayCountries(filteredCountries);
}

// displayCountries function
let countriesToDisplay;
function displayCountries(filteredCountries) {
    countriesList.innerHTML = '';
    countriesToDisplay = filteredCountries || countries_data;

    countriesToDisplay.forEach((country) => {
        const countryImageAndName = document.createElement('div');
        const countryDetails = document.createElement('div');
        countryDetails.classList.add('country-details');
    
        const span = document.createElement('span');
        span.classList.add('countries-span');
    
        const flagURL = country.flag;
        const flagImg = document.createElement('img');
        flagImg.classList.add('flag-img');
        flagImg.src = flagURL;
    
        const countryName = document.createElement('p');
        countryName.textContent = country.name;
        countryName.classList.add('country-name');
    
        const countryCapital = document.createElement('p');
        countryCapital.classList.add('details');
        countryCapital.textContent = `Capital: ${country.capital}`;
    
        const countryLanguages = document.createElement('p');
        countryLanguages.classList.add('details');
        const languagesText = country.languages.join(', ');
        countryLanguages.innerHTML = `Language: ${languagesText}`;
    
        const countryPopulation = document.createElement('p');
        countryPopulation.classList.add('details');
        const populationText = country.population.toLocaleString();
        countryPopulation.textContent = `Population: ${populationText}`;
        
        countryImageAndName.appendChild(flagImg);
        countryImageAndName.appendChild(countryName);
        countryDetails.appendChild(countryCapital);
        countryDetails.appendChild(countryLanguages);
        countryDetails.appendChild(countryPopulation)
        span.appendChild(countryImageAndName);
        span.appendChild(countryDetails);
        countriesList.appendChild(span)
    })
}

displayCountries(countriesToDisplay);

// Function to show population content
function showPopulationContent() {
    graphWrapper.innerHTML = '';

    // world population
    const worldPopulation = countriesToDisplay.reduce((acc, data) => {
        return acc + data.population
    }, 0)

    // sort population from highest to lowest
    const sortedPopulation = countriesToDisplay.sort((a, b) => b.population - a.population);

    let topCountries;
    if (searchBar.value === '') {
        graphTitle.textContent = '10 most populated countries in the world';
        topCountries = sortedPopulation.slice(0, 10);
    } else {
        graphTitle.textContent = 'Countries Population';
        topCountries = sortedPopulation.slice(0, sortedPopulation.length);
    }

    // worldObject
    const worldObject = { name: 'World', population: worldPopulation };
    // adding world to topCountries population
    topCountries.unshift(worldObject);

    const totalPopulation = topCountries.reduce((acc, data) => {
        return acc + data.population;
    }, 0)

    topCountries.forEach((country, index) => {
        const progressBar = document.createElement("div");
        progressBar.id = "progress-bar";
    
        // create progressBarContainer
        const progressBarContainer = document.createElement('div');
        progressBarContainer.id = 'progress-bar-container';

        // create progress bar fill
        const progressBarFill = document.createElement("div");
        progressBarFill.className = "progress-bar-fill";
        progressBarFill.style.width = ((country.population / totalPopulation) * 200) + "%";

        // create progressBar label
        const progressBarLabel = document.createElement("span");
        progressBarLabel.className = "progress-bar-label";

        if (country.name === 'United States of America') {
            progressBarLabel.textContent = 'USA';
        } else if (country.name === 'United Kingdom of Great Britain and Northern Ireland') {
            progressBarLabel.textContent = 'United Kingdom';
        } else {
            progressBarLabel.textContent = country.name;
        }

        if (country.name === 'World') {
            progressBarFill.style.width = '98%';
        } 

        // create population amount
        const populationAmount = document.createElement('span');
        populationAmount.className = 'population-amount';
        populationAmount.textContent = country.population.toLocaleString();

        progressBar.appendChild(progressBarLabel);
        progressBarContainer.appendChild(progressBarFill)
        progressBar.appendChild(progressBarContainer);
        progressBar.appendChild(populationAmount)
        
        graphWrapper.appendChild(progressBar);
}) 
  }

showPopulationContent();

// showLanguagesContent function
function showLanguagesContent() {
    graphWrapper.innerHTML = '';

    const languageCount = {};

    // Count the number of countries speaking each language
    for (const country of countriesToDisplay) {
      const languages = country.languages;
  
      for (const language of languages) {
        if (languageCount.hasOwnProperty(language)) {
          languageCount[language]++;
        } else {
          languageCount[language] = 1;
        }
      }
    }
  
    const sortedLanguages = Object.entries(languageCount).sort((a, b) => b[1] - a[1]);

    let topLanguages
    if (searchBar.value === '') {
        graphTitle.innerHTML = '10 most spoken languages in the world';
        topLanguages = sortedLanguages.slice(0, 10);
    } else {
        graphTitle.innerHTML = 'World Languages';
        topLanguages = sortedLanguages.slice(0, sortedLanguages.length);
    }
  
    // calculate total languages
    const totalLanguages = topLanguages.reduce((acc, data) => {
        return acc + data[1];
    }, 0)

    // iterate through sortedLanguages
    topLanguages.forEach((language) => {
        const progressBar = document.createElement("div");
        progressBar.id = "progress-bar";
    
        // create progressBarContainer
        const progressBarContainer = document.createElement('div');
        progressBarContainer.id = 'progress-bar-container';

        // create progress bar fill
        const progressBarFill = document.createElement("div");
        progressBarFill.className = "progress-bar-fill";
        progressBarFill.style.width = (((language[1] / totalLanguages) * 100)) + "%";
    
        // create progressBar label
        const progressBarLabel = document.createElement("span");
        progressBarLabel.className = "progress-bar-label";
        progressBarLabel.textContent = language[0];

        // create population amount
        const populationAmount = document.createElement('span');
        populationAmount.className = 'population-amount';
        populationAmount.textContent = language[1];

        progressBar.appendChild(progressBarLabel);
        progressBarContainer.appendChild(progressBarFill)
        progressBar.appendChild(progressBarContainer);
        progressBar.appendChild(populationAmount)
        
        graphWrapper.appendChild(progressBar);
    })
}