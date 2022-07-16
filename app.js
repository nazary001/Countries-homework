let region = document.querySelector('#region');
let subregion = document.querySelector('#subregion');
let countries = document.querySelector('#countries');

region.addEventListener('change', (evnt) => {

     while(subregion.firstChild){
        subregion.removeChild(subregion.firstChild);
    }

    let subregions = [];

    fetch(`https://restcountries.com/v3.1/region/${evnt.target.value}`)
    .then((response) => {return response.json()})
    .then((data) => {
        for(idx in data){
            subregions.push(data[idx].subregion);
        }

    subregions = subregions.filter((el, id) => subregions.indexOf(el) === id);

    for(let i = 0; i < subregions.length; i++){
        let option = document.createElement('option');
        subregion.appendChild(option);
        option.setAttribute('value', subregions[i])
        option.text = subregions[i];
    }

    subregion.addEventListener('change', (evnt) =>{
        let cntrys = [];
        fetch(`https://restcountries.com/v3.1/region/${evnt.target.value}`)
        .then((response) => {return response.json()})
        .then((data) => {
            for(idx in data)
            cntrys.push(data[idx].name.official)
        })

        for(let i = 0; i < cntrys.length; i++){
            let h2 = document.createElement('h2');
            h2.textContent = cntrys[i];
            countries.appendChild(h2);
        }
    });
});
});



