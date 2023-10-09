import './App.css';
import icon from "./photos/weather-icon.png";


function App() {
  return (
    <>
      <div className='top flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold flex'>🌞<span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-violet-500 md:tracking-wider text-center"> Weather App</span>⛈️</h1>
        <input type='text' className='p-1.5 px-4 mt-5 rounded'></input>
        <button className='mt-3 p-1 rounded-md text-xl text-white font-medium bg-slate-500'>Search</button>
      </div>
      <div className='bottom flex flex-col  items-center'>
        <div className='shadow-2xl rounded-md p-5 px-10 md:h-[45vh] md:w-[40%] flex flex-col justify-center items-center'>
          <img src={icon} alt='weather-app' className='rounded-3xl h-[115px] w-[150px] md:h-[150px] md:w-[200px]'></img>
          <h2 className='text-4xl font-medium'>Delhi</h2>
          <p className='text-6xl font-semibold md:font-bold'>32°C</p>
        </div>
      </div>
    </>
  );
}

export default App;
