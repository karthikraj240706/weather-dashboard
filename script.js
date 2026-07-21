const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temp = document.getElementById("temp");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");

const weatherIcon = document.getElementById("weatherIcon");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

async function getWeather(city){

    if(city===""){
        return;
    }

    const url = `${weatherURL}?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        showWeather(data);

    }

    catch(error){

        temp.innerHTML="--°";

        cityName.innerHTML="Not Found";

        description.innerHTML=error.message;

        humidity.innerHTML="--%";

        wind.innerHTML="-- km/h";

        pressure.innerHTML="-- hPa";

        feelsLike.innerHTML="--°";

        weatherIcon.src="https://openweathermap.org/img/wn/50d@2x.png";

    }

}

function showWeather(data){

    temp.innerHTML=Math.round(data.main.temp)+"°";

    cityName.innerHTML=data.name+", "+data.sys.country;

    description.innerHTML=data.weather[0].description;

    humidity.innerHTML=data.main.humidity+"%";

    wind.innerHTML=(data.wind.speed*3.6).toFixed(1)+" km/h";

    pressure.innerHTML=data.main.pressure+" hPa";

    feelsLike.innerHTML=Math.round(data.main.feels_like)+"°";

    const icon=data.weather[0].icon;

    weatherIcon.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;

}

searchBtn.addEventListener("click",()=>{

    getWeather(cityInput.value.trim());

});

cityInput.addEventListener("keypress",(event)=>{

    if(event.key==="Enter"){

        getWeather(cityInput.value.trim());

    }

});

function updateDate(){

    const today=new Date();

    document.getElementById("currentDay").innerHTML=today.toLocaleDateString("en-US",{
        weekday:"long"
    });

    document.getElementById("currentDate").innerHTML=today.toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}

updateDate();

getWeather("Hyderabad");
