

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

function FetchWeather(location)
{
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            
            if (data.error) {
                // console.log(data.error);
                // console.log('error');
                // console.log('You must provide an address');
                messageOne.textContent = data.error;
                return;

            }
            else
            {
               // console.log(data.location);
                //console.log(data.forecast);
                //FetchWeather(data.location);
                messageOne.textContent = data.location;
                messageTwo.textContent = JSON.stringify(data.forecast);
            }
            
        });
    });
}


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

//messageOne.textContent = 'From JavaScript';


weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const location = search.value;
    //console.log(location);
    messageOne.textContent = 'Fetching Weather';
    messageTwo.textContent = '';

    FetchWeather(location);
    
});