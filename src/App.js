import { useState } from 'react';
import './App.css';
import icon from "./photos/weather-icon.png";
import axios from 'axios';

function App() {

  const apiKey = "55b49659fee124d68d1a2cfb9106c3d8";
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState('°C'); // Default unit is Celsius
  const [temperature, setTemperature] = useState(0);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiUrl)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data) //to save the data using useState
        const newTemperature = ((res.data?.main?.temp) - 273.15).toFixed(2);
        setTemperature(newTemperature);
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  const handleEnter = (event) => {
    if (event.key === "Enter")
      handleSearch();
  }

  const handleSearch = () => {
    getWeatherDetails(city);
  }

  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
    if (newUnit === '°C') {
      setTemperature(((data?.main?.temp) - 273.15).toFixed(2));
    } else if (newUnit === '°F') {
      setTemperature((((data?.main?.temp) - 273.15) * 9 / 5 + 32).toFixed(2));
    } else if (newUnit === 'K') {
      setTemperature((data?.main?.temp).toFixed(2));
    }
    setSelectedUnit(newUnit);
  };

  const cssTemperature = ((data?.main?.temp) - 273.15).toFixed(2);

  const mercuryStyle = {
    backgroundColor: cssTemperature >= 25 ? '#FF4000' : '#006E96',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: `${cssTemperature * 1.5}%`,
    transition: 'height 0.8s'
  };


  return (
    <>
      <div className='top flex flex-col justify-center items-center'>
        <h1 className='text-4xl md:text-5xl font-bold flex'>🌞<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-violet-500 md:tracking-wider text-center"> Weather App </span>⛈️</h1>

        <input type='text' className='p-1.5 px-4 mt-5 rounded md:w-[40%] lg:w-[25%] focus:outline-none text-lg' placeholder='Enter city name..' value={city} onChange={(event) => setCity(event.target.value)} onKeyDown={handleEnter}></input>

        <button className='mt-3 p-1 px-3 rounded-md text-xl text-white font-medium bg-slate-500' onClick={handleSearch}>Search</button>
      </div>

      {Object.keys(data).length <= 0 &&
        <div className='rainbow-background flex justify-center items-center'>
          <p className='animate-bounce text-2xl md:text-5xl font-semibold md:font-bold text-center'>🥵 Please enter a ☔ valid city name ☃️</p>
        </div>
      }

      {Object.keys(data).length > 0 &&
        <div className='rainbow-background flex gap-1 md:gap-5 justify-center items-center'>
          <div className="thermometer">
            {["°C", "°F", "K"].includes(selectedUnit) && (
              <div className="mercury" style={mercuryStyle}></div>
            )}
          </div>

          <div className='shadow-2xl rounded-md p-5 flex flex-col justify-center items-center'>
            <img src={icon} alt='weather-app' className='rounded-3xl h-[115px] w-[150px] md:h-[150px] md:w-[200px]'></img>

            <h2 className='text-5xl font-medium text-slate-950'>{data?.name}</h2>

            <div className='mt-2 md:mt-4 flex gap-3 md:gap-5  items-center'>
              <p className='text-3xl lg:text-5xl font-semibold md:font-bold text-slate-950'>{temperature} {selectedUnit}</p>

              <select className="p-1 px-2 rounded-md bg-slate-300" onChange={handleUnitChange} value={selectedUnit}>
                <option value="°C">Celsius</option>
                <option value="°F">Fahrenheit</option>
                <option value="K">Kelvin</option>
              </select>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
