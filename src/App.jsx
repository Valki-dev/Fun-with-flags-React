import { useState, useEffect } from 'react'
import './App.css'
import EasyGame from './Components/EasyGame';
import MediumGame from './Components/MediumGame';

function App() {
  const [gameMode, setGameMode] = useState({ easy: false, medium: false });
  const [allCountries, setAllCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);
  const [randomNames, setRandomNames] = useState([]);
  const [randomCapitals, setRandomCapitals] = useState([]);

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
    if (gameMode.easy || gameMode.medium) {
      let easyRandoms = []
      let mediumRandoms = []

      let counter = 0;
      let randoms = [];

      while (counter < 10) {
        let random = getRandom();
        if (!randomCountries.includes(allCountries[random])) {
          counter++;
          randoms.push(allCountries[random]);
        }
      }

      if(gameMode.easy) {
        let easyCounter = 0;

        while (easyCounter < 30) {
          let easyRandom = getRandom();
          if ((!randomNames.includes(allCountries[easyRandom]?.name?.common)) && (allCountries[easyRandom]?.name?.common)) {
            easyCounter++;
            easyRandoms.push(allCountries[easyRandom]?.name?.common);
          }
        }
      }
      
      if(gameMode.medium) {
        let mediumCounter = 0;

        while (mediumCounter < 30) {
          let mediumRandom = getRandom();
          if(!randomCapitals.includes(allCountries[mediumRandom]?.capital)) {
            mediumCounter++;
            mediumRandoms.push(allCountries[mediumRandom]?.capital);
          }
        }
      }

      setRandomCountries(randoms);
      setRandomNames(easyRandoms);
      setRandomCapitals(mediumRandoms);
    }

  }, [allCountries, gameMode]);

  const getRandom = () => {
    return Math.floor(Math.random(1) * allCountries.length);
  }

  if (gameMode.easy || gameMode.medium) {
    return (
      <>
        {
          gameMode.easy && (
            <div className="container-fluid">
              <EasyGame randomCountries={randomCountries} randomNames={randomNames} setRandomCountries={setRandomCountries} setRandomNames={setRandomNames} gameMode={gameMode} setGameMode={setGameMode}></EasyGame>
            </div>
          )
        }

        {
          gameMode.medium && (
            <div className="container-fluid">
              <MediumGame randomCountries={randomCountries} randomCapitals={randomCapitals} setRandomCountries={setRandomCountries} setRandomCapitals={setRandomCapitals} gameMode={gameMode} setGameMode={setGameMode}></MediumGame>
            </div>
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
