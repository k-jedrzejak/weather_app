window.addEventListener('load', () => {

    const location = document.querySelector('.location');
    const temp = document.querySelector('.details__temp');
    const feeltemp = document.querySelector('.details__tempfeel');
    const desc = document.querySelector('.details__desc');
    const weatherIcon = document.querySelector('.icon');
    const humidity = document.querySelector('.details__humidity');
    const container = document.querySelector('.container');

    let longitude;
    let latitude;



    const changeBg = () => {
        const sun = document.querySelector('.sun');
        const rain = document.querySelector('.rain');
        const icon = document.querySelector("img");

        if(icon.src.indexOf("01d") != -1){
            sun.classList.remove('none');
            rain.classList.add('none');
        }else if(icon.src.indexOf("09d") != -1 || icon.src.indexOf("09n") != -1 ||icon.src.indexOf("10d")  != -1|| icon.src.indexOf("10n")  != -1){
            rain.classList.remove('none');
            sun.classList.add('none');
        }else if (icon.src.indexOf("11d") != -1 || icon.src.indexOf("11n") != -1){
            rain.classList.remove('none');
            rain.classList.add('storm');
            sun.classList.add('none');
        }else {
            sun.classList.add('none');
            rain.classList.add('none');

        }
    }



    navigator.geolocation.getCurrentPosition(p => {
       let latitude = p.coords.latitude.toFixed(2);
       let longitude = p.coords.longitude.toFixed(2);


       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=daaf2b14f9354d96e353b3886dba08d4`;

       fetch(api)
        .then(r => {
            return r.json();
        })
        .then(d => {
            console.log(d);
            const temperature = d.main.temp;
            const feelTemp =d.main.feels_like;
            const city = d.name;
            const descript = d.weather[0].description;
            const icon = d.weather[0].icon;
            const hum = d.main.humidity;


            temp.innerHTML = `${Math.floor(temperature - 273.15)} &#176;C`;
            feeltemp.innerHTML =`Feel temperature: ${Math.floor(feelTemp - 273.15)} &#176;C`;
            location.textContent = city;
            desc.textContent = descript;
            humidity.textContent =`Humidity: ${hum}%`
            weatherIcon.innerHTML =`<img src="https://cors-everywhere.herokuapp.com/http://openweathermap.org/img/wn/${icon}@2x.png">`

            changeBg();

        });


        const btn = document.querySelector('.btn');
        const input = document.querySelector('.input');

        const search = btn.addEventListener('click', (e) => {
            e.preventDefault();

           const searchCity = input.value;
           console.log(searchCity);

           const api2 = `https://cors-everywhere.herokuapp.com/http://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=daaf2b14f9354d96e353b3886dba08d4`;
           
           console.log(api2);

           fetch(api2)
                .then(r => {
                    return r.json();
                })
                .then(d => {
                    console.log(d);
                    const temperature = d.main.temp;
                    const feelTemp =d.main.feels_like;
                    const city = d.name;
                    const descript = d.weather[0].description;
                    const icon = d.weather[0].icon;
                    const hum = d.main.humidity;
        
        
                    temp.innerHTML = `${Math.floor(temperature - 273.15)} &#176;C`;
                    feeltemp.innerHTML =`Feel temperature: ${Math.floor(feelTemp - 273.15)} &#176;C`;
                    location.textContent = city;
                    desc.textContent = descript;
                    humidity.textContent =`Humidity: ${hum}%`;
                    weatherIcon.innerHTML =`<img src="https://cors-everywhere.herokuapp.com/http://openweathermap.org/img/wn/${icon}@2x.png">`;

                    changeBg();
                });     

        }); 
    }); 
});




