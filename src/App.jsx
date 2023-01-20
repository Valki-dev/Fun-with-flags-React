import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import EasyGame from './Components/EaseyGame';

function App() {
  const [gameMode, setGameMode] = useState({ easy: false, medium: false, hard: false });
  const [allCountries, setAllCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);
  const [randomNames, setRandomNames] = useState([]);

  useEffect(() => {

    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(result => {
        if (result?.status != 404) {
          setAllCountries([...result]);
        }
      })
      .catch(error => console.log('error', error));

  }, []);

  useEffect(() => {
    if (gameMode.easy || gameMode.medium || gameMode.hard) {
      let easyRandoms = []
      let mediumRandoms = []
      let hardRandoms = []

      let counter = 0;
      let randoms = [];

      while (counter < 10) {
        let random = Math.floor(Math.random(1) * allCountries.length);
        if (!randomCountries.includes(allCountries[random])) {
          counter++;
          randoms.push(allCountries[random]);
          setRandomCountries(randoms);
        }
      }

      if(gameMode.easy) {
        let easyCounter = 0;

        while (easyCounter < 30) {
          let easyRandom = Math.floor(Math.random(1) * allCountries.length);
          if (!randomNames.includes(allCountries[easyRandom]?.name?.common)) {
            easyCounter++;
            easyRandoms.push(allCountries[easyRandom]?.name?.common);
          }
        }
      }

      setRandomNames(easyRandoms);
    }

  }, [allCountries, gameMode]);

  if (gameMode.easy || gameMode.medium || gameMode.hard) {

    console.log(randomNames);
    return (
      <>
        {
          gameMode.easy && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <EasyGame countries={randomCountries}></EasyGame>
                </div>
              </div>
            </div>
          )
        }

        {
          gameMode.medium && (
            <p>MEDIO</p>
          )
        }

        {
          gameMode.hard && (
            <p>DIFÍCIL</p>
          )
        }
      </>
    )
  } else {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6" id="left">

            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center" id="right">
              <div className='d-flex flex-column'>
                <h3>Selecciona un nivel para comenzar el juego:</h3>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <button className='btn btn-info mt-4 p-3' onClick={() => setGameMode({ ...gameMode, easy: true })} >Fácil</button>
                  <button className='btn btn-warning mt-3 p-3' onClick={() => setGameMode({ ...gameMode, medium: true })}>Intermedio</button>
                  <button className='btn btn-danger mt-3 p-3' onClick={() => setGameMode({ ...gameMode, hard: true })}>Difícil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default App
