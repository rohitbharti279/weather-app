import { useEffect, useState } from 'react';
import './App.css';
import icon from "./photos/weather-icon.png";
import openImage from "./photos/react+weather.png"
import axios from 'axios';

function App() {

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [data, setData] = useState({});
  const [city, setCity] = useState("");


  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiUrl)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data) //to save the data using useState
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const handleSearch = () => {
    getWeatherDetails(city);
  }


  return (
    <>
      <div className='top flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold flex'>🌞<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-violet-500 md:tracking-wider text-center"> Weather App </span> ⛈️</h1>
        <input type='text' className='p-1.5 px-4 mt-5 rounded' value={city} onChange={(event) => setCity(event.target.value)}></input>
        <button className='mt-3 p-1 px-3 rounded-md text-xl text-white font-medium bg-slate-500' onClick={handleSearch}>Search</button>
      </div>

      {Object.keys(data).length <= 0 &&
        <div className='rainbow-background flex justify-center items-center'>
          <p className='text-6xl font-semibold md:font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-purple-600'>
          Please enter a valid city name
          </p>
        </div>
      }

      {Object.keys(data).length > 0 &&
        <div className='bottom rainbow-background flex flex-col  items-center'>
          <div className='mt-4 shadow-2xl rounded-md p-5 px-10 md:h-[45vh] md:w-[40%] flex flex-col justify-center items-center'>
            <img src={icon} alt='weather-app' className='rounded-3xl h-[115px] w-[150px] md:h-[150px] md:w-[200px]'></img>
            <h2 className='text-5xl font-medium text-slate-950'>{data?.name}</h2>
            <p className='mt-1 text-6xl font-semibold md:font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-500'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</p>
          </div>
        </div>
      }

    </>
  );
}

export default App;
