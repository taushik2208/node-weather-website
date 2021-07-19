console.log('javascript in index');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
});


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne  =  document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetch('http://api.weatherstack.com/current?access_key=5c543cd7b4320651434ce3f1a011137a&query='+location)
    .then((response) => {
        response.json().then((data) => {

            messageOne.textContent = 'Loading';
            messageTwo.textContent = ''
            if(data.success == false) {
                messageOne.textContent = 'Try with valid address';
               
            }
            const {feelslike, temperature, weather_descriptions} = data.current;
            
            messageOne.textContent = `Temperature is ${temperature}, feelslike ${feelslike}, expect ${weather_descriptions[0]}`;
        })
    })
})