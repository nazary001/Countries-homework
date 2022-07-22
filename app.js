let regionSelect = document.querySelector('#region');
let subregionSelect = document.querySelector('#subregion');
let countriesDiv = document.querySelector('#countries');
let facts_div = document.querySelector('#country_facts')

const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
let subregions = [];
let countries = [];

for(idx in regions){
    let option = document.createElement('option');
    option.text = regions[idx];
    option.setAttribute('value', regions[idx]);
    regionSelect.appendChild(option);
}

regionSelect.addEventListener('change', (event) =>{
    
    subregionSelect.replaceChildren([]);
    countriesDiv.replaceChildren([]);
    facts_div.replaceChildren([]);
    countries = [];

    fetch(`https://restcountries.com/v3.1/region/${event.target.value}`)
    .then(response => {return response.json()})
    .then(data => {
        for(country of data){
            countries.push(country);
        };

        let pickSubregionOption = document.createElement('option');
        pickSubregionOption.text = 'Pick a subregion';
        pickSubregionOption.value = '';
        pickSubregionOption.setAttribute('disabled', 'disabled');
        pickSubregionOption.setAttribute('hidden', 'hidden');
        pickSubregionOption.setAttribute('selected', 'selected');
        subregionSelect.appendChild(pickSubregionOption);

        subregions = [...new Set(countries.map(country => country.subregion))];

        for(subregion of subregions){
            let option = document.createElement('option');
            option.text = subregion;
            option.setAttribute('value', subregion);
            subregionSelect.appendChild(option);
        };
    }); 
});

subregionSelect.addEventListener('change', (event) => {

    countriesDiv.replaceChildren([]);
    facts_div.replaceChildren([]);

    let subregion = event.target.value;
    let subregionCountries = countries.filter(country => country.subregion === subregion);
    subregionCountries.forEach(country => {
        let div = document.createElement('div')
        div.style.display = 'flex';

        let h2 = document.createElement('h2');
        h2.textContent = country.name.official;

        let flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.style.width = '3rem';
        flag.style.height = '2rem';
        flag.style.alignSelf = 'center';
        flag.style.marginLeft = '2rem';

        countriesDiv.appendChild(div);
        div.appendChild(h2);
        div.appendChild(flag);

        countriesDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.151)';
        countriesDiv.style.padding = '3rem';
        countriesDiv.style.margin = '5rem';
        countriesDiv.style.borderRadius = '1rem';

        h2.addEventListener('click', () => {

            facts_div.replaceChildren([]);

            let facts = document.createElement('h3');
            facts.innerText = 'FACTS:';

            let countryCapital = document.createElement('h3');
            countryCapital.innerText = `capital: ${country.capital}`;

            let area = document.createElement('h3');
            area.innerText = `area: ${country.area}`;

            let currencies = document.createElement('ul');
            currencies.innerText = 'Currencies:'
            for(crnc in country.currencies){
                let currencie = document.createElement('li');
                currencie.innerText = `${country.currencies[crnc].name} : ${country.currencies[crnc].symbol}`;
                currencies.appendChild(currencie);
            }

            let languages = document.createElement('ul');
            languages.innerText = 'Languages:'
            for(lng in country.languages){
                let language = document.createElement('li');
                language.innerText = `${lng} : ${country.languages[lng]}`;
                languages.appendChild(language);
            }

            let view = document.createElement('a');
            view.innerText = 'View on map';
            view.href = country.maps.openStreetMaps;
            view.target = '_blank';
            
            facts_div.appendChild(facts);
            facts_div.appendChild(countryCapital);
            facts_div.appendChild(area);
            facts_div.appendChild(currencies);
            facts_div.appendChild(languages);
            facts_div.appendChild(view);
            facts_div.style.backgroundColor = 'rgba(0, 0, 0, 0.151)';
            facts_div.style.padding = '3rem';
            facts_div.style.margin = '5rem';
            facts_div.style.borderRadius = '1rem';
            facts_div.style.height = 'fit-content';
        });
    });
    

    
});
