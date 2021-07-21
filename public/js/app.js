const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne  =  document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.querySelector('#weatherimage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetch('/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
           
            messageOne.textContent = 'Loading';
            messageTwo.textContent = ''
            if(data.success == false) {
                messageOne.textContent = 'Try with valid address';
               
            }
            const {location,feelslike, temperature, weather_descriptions, weather_icons} = data;
            
            messageOne.textContent = location;
            weatherImg.src = weather_icons[0];
            weatherImg.style.display = 'block'
            messageTwo.textContent = `Temperature is ${temperature}, feelslike ${feelslike}, expect ${weather_descriptions[0]} `;
        })
    })
})