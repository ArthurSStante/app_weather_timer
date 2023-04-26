// const horas = document.getElementById('horas')
// const minutos = document.getElementById('minutos')
// const segundos = document.getElementById('segundos')

// const relogio = setInterval(function time() {
//     let dateToday = new Date()
//     let hr = dateToday.getHours()
//     let min = dateToday.getMinutes()
//     let seg = dateToday.getSeconds()

//     if(hr < 10 ){
//         hr = '0'+ hr
//     }
//     if(min < 10 ){
//         min = '0'+ min
//     }
//     if(seg < 10 ){
//         seg = '0'+ seg
//     }

//     horas.textContent = hr
//     minutos.textContent = min
//     segundos.textContent = seg
// })

// const dia = document.getElementById('dia')
// const mes = document.getElementById('mes')
// const ano = document.getElementById('ano')

// const data = setInterval(function local() {
//     let dateToday = new Date()
//     let dia1 = dateToday.getDate()
//     let mes1 = dateToday.getMonth() + 1
//     let ano1 = dateToday.getFullYear()

//     if(dia1 < 10){
//         dia1 = '0' + dia1
//     }
//     if(mes1 < 10){
//         mes1 = '0' + mes1
//     }
//     if(ano1 < 10){
//         ano1 = '0' + ano1
//     }

//     dia.textContent = dia1
//     mes.textContent = mes1
//     ano.textContent = ano1
// })


// fetch('https://restcountries.com/v3.1/all')
//   .then(response => response.json())
//   .then(data => {
//     const countryNames = data.map(country => country.name.common);
//     const countrySelect = document.getElementById('countrySelect');
//     countryNames.forEach(name => {
//         const option = document.createElement('option');
//         option.textContent = name;
//         countrySelect.appendChild(option);
//     });
//   });


const result = document.querySelector('.result')
const form = document.querySelector('.get-weather')
const nameCity = document.querySelector('#city')
const nameCountry = document.querySelector('#countrySelect')

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    if(nameCity.value === '' || nameCountry.value === ''){
        showError('todos os campos sao obrigatorios...')
        return;
    }

    callAPI(nameCity.value, nameCountry.value)

    callHours(nameCity.value)

})

function callAPI(city, countrySelect){
    const apiId ='d108789e363449e2f685c007633da5a6'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countrySelect}&appid=${apiId}`

    fetch(url)
        .then(data =>{
            return data.json()
        })
        .then(dataJSON =>{
            if (dataJSON.cod === '404'){
                showError('Cidade não encontrada')
            } else{
                cleartHTML()
                showWeather(dataJSON);
            }
            console.log(dataJSON)
        })
        .catch(error =>{
            console.log(error)
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;


    const degrees = kelvinTocentigrade(temp)
    const min = kelvinTocentigrade(temp_min)
    const max = kelvinTocentigrade(temp_max)


    const content = document.createElement('div');
    content.innerHTML= `
        <h5>Clima em ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}</h2>
        <p>Max:${max}</p>
        <p>Min:${min}</p>
    `

    result.appendChild(content);


    console.log(name);
    console.log(temp);
    console.log(temp_min);
    console.log(temp_max);
    console.log(arr.icon);
}

function showError(message){
    console.log(message)
    const alert =document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove()
    }, 3000);
}

function kelvinTocentigrade(temp){
    return parseInt(temp - 273.15);
}

function cleartHTML(){
    result.innerHTML = '';
}

function showHours(){

}
function callHours(city){

    const timer= moment().timerzone(city).format('MMMM Do YYYY, h:mm:ss')
    
    const contentHours = document.createElement('div')
    contentHours.innerHTML = `
                    <div>
                        <span id="horas">${timer}</span>
                        <span class="tempo">Horas</span>
                    </div>
                    <div>
                        <span id="minutos">00</span>
                        <span class="tempo"">minutos</span>
                    </div>
                    <div>
                        <span id="segundos">00</span>
                        <span class="tempo"">segundos</span>
                    </div>
                    
                    `
}