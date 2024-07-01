const loadCountries = async () => {
    try {
        const response = await fetch("assets/js/data.json")
        const json = await response.json()
        displayResults(json)

        document.querySelector('#iname').addEventListener('keyup', event => {
            filterAndDisplayCountries(json, 'name', event.target.value.toLowerCase())
        })

        document.querySelector('#iselect').addEventListener('change', event => {
            filterAndDisplayCountries(json, 'region', event.target.value)
        })
    } catch {
        console.log('Deu erro')
    }
}

const filterAndDisplayCountries = (data, key, value) => {
    const filteredData = data.filter(country => country[key].toLowerCase().includes(value.toLowerCase()))
    displayResults(filteredData)
}

const displayResults = (data) => {
    const countriesArea = document.querySelector('.countries')
    countriesArea.innerHTML = data.map(country => `
        <div class="country">
            <div class="country--image"><img src="${country.flag}"></div>
            <div class="country--info">
                <div class="country-name">${country.name}</div>
                <div class="country-population"><b>Population:</b> ${country.population}</div>
                <div class="country-region"><b>Region:</b> ${country.region}</div>
                <div class="country-capital"><b>Capital:</b> ${country.capital}</div>
            </div>
        </div>
    `).join('')
    document.querySelectorAll('.country').forEach(item => {
        item.addEventListener('click', event => showInfos(event, data))
    })
}

const showInfos = (event, data) => {
    const clicado = event.currentTarget
    const nomeDoPais = clicado.querySelector('.country-name').textContent.toLowerCase()
    const pais = data.find(country => country.name.toLowerCase() === nomeDoPais)

    if (!pais) return

    const {
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies,
        languages,
        borders,
        flag
    } = pais

    const topLevelDomainStr = topLevelDomain ? topLevelDomain.join(', ') : ''
    const currenciesStr = currencies ? currencies.map(currency => currency.name).join(', ') : ''
    const languagesStr = languages ? languages.map(language => language.name).join(', ') : ''
    const bordersStr = borders ? borders.map(border => `<a href="#">${border}</a>`).join(' ') : ''

    document.querySelector('.country-information').innerHTML = `
        <div class="flag-country"><img src="${flag}"></div>
        <div class="more-infos">
            <div class="country-name-2">${pais.name}</div>
            <div class="native-name"><b>Native Name: </b>${nativeName}</div>
            <div class="population"><b>Population:</b> ${population}</div>
            <div class="region"><b>Region:</b> ${region}</div>
            <div class="sub-region"><b>Sub Region: </b>${subregion}</div>
            <div class="capital"><b>Capital:</b> ${capital}</div>
            <div class="top-level-domain"><b>Top Level Domain: </b>${topLevelDomainStr}</div>
            <div class="currencies"><b>Currencies: </b>${currenciesStr}</div>
            <div class="languages"><b>Languages: </b>${languagesStr}</div>
            <div class="border-countries"><b>Border Countries: </b>${bordersStr}</div>
        </div>
    `

    document.querySelector('main .container').style.display = 'none'
    document.querySelector('article .container').style.display = 'flex'
}

const toggleClassList = (selectors, className) => {
    selectors.forEach(selector => document.querySelector(selector).classList.toggle(className))
}

const darkMode = () => {
    toggleClassList(['header', '.bttn', '.input-text', '#iname', '#iselect'], 'background-2B3743')
    toggleClassList(['.bttn h4', 'body', '.input-text', '#iselect', '.back'], 'text-white')
    document.body.classList.toggle('body-dark')
    document.querySelector('.lua img').src = document.body.classList.contains('body-dark')
        ? 'assets/images/lua-fundo-preto.svg'
        : 'assets/images/lua-fundo-branco.svg';
    document.querySelector('.back img').src = document.body.classList.contains('body-dark')
        ? 'assets/images/back-arrow-fundo-preto.svg'
        : 'assets/images/back-arrow-fundo-branco.svg'
    document.querySelectorAll('.border-countries a').forEach(item => {
        item.style.color = document.body.classList.contains('body-dark') ? '#FFF' : 'black'
    })
}

const backButton = () => {
    document.querySelector('main .container').style.display = 'flex'
    document.querySelector('article .container').style.display = 'none'
}

document.querySelector('.back').addEventListener('click', backButton)
document.querySelector('.bttn').addEventListener('click', darkMode)
loadCountries()
