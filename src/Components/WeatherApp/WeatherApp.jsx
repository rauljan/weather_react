import './WeatherApp.css'

import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
import humidity_icon from '../Assests/humidity.png';
import { useState } from 'react';



const WeatherApp = () =>{

    let api_key = "08d5cdd8853423c2ad2fc5eb6e00aec7";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async() =>{
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value===""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity");
        const wind = document.getElementsByClassName("wind-speed");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name+", "+data.sys.country;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon);
        }

        else{
            setWicon(clear_icon);
        }


    }
    useEffect(() => {
        const keyDownHandler = event => {
          console.log('User pressed: ', event.key);
    
          if (event.key === 'Enter') {
            event.preventDefault();
    
            search();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);
    return (
        <div className='container'>
            <div className='top-bar'>
                <input type ="text" className='cityInput' placeholder='City'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={search_icon} alt=""></img>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">
               
            </div>
            <div className="weather-location">
                Wellcome to Weather App!
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity"></div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed"></div>
                        <div className="text">Wind speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
