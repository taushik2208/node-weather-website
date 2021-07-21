const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne  =  document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetch('/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
            console.log(data)
            messageOne.textContent = 'Loading';
            messageTwo.textContent = ''
            if(data.success == false) {
                messageOne.textContent = 'Try with valid address';
               
            }
            const {location,feelslike, temperature, weather_descriptions} = data;
            messageOne.textContent = location
            messageTwo.textContent = `Temperature is ${temperature}, feelslike ${feelslike}, expect ${weather_descriptions[0]}`;
        })
    })
})