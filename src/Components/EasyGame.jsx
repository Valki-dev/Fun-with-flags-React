import { useState, useEffect } from 'react'
import './EasyGame.css'

const EasyGame = ({ randomCountries, randomNames, setRandomCountries, setRandomNames, gameMode, setGameMode }) => {
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [correctCounter, setCorrectCounter] = useState(0);

    useEffect(() => {

        const names = [...randomNames];
        let namesSelected = names.splice(0, 3);
        setRandomNames(names)
        let countries = [...randomCountries];

        namesSelected.push(countries[0]?.name?.common);
        setCorrectAnswer(countries[0]?.name?.common);

        shuffle(namesSelected);
        
        setAnswers(namesSelected);
    
        return () => { }
    }, [randomCountries]);

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const checkAnswer = (event, answer) => {
        let button = event.target;
        if(answer === correctAnswer) {
            button.classList.add("correct");
            setCorrectCounter(correctCounter + 1);
        } else {
            button.classList.add("incorrect");
            setIsCorrect(false);
        }

        let buttons = document.querySelectorAll(".answerButton");
        buttons.forEach(button => {
            button.disabled = true;
        });

        const nextButton = document.getElementById("nextButton");
        nextButton.disabled = false;
    }

    const skipQuestion = () => {
        const nextButton = document.getElementById("nextButton");
        nextButton.disabled = true;

        const countries = [...randomCountries];
        countries.shift();
        setRandomCountries(countries);
        setCorrectAnswer("");
        setIsCorrect(true);

        let buttons = document.querySelectorAll(".answerButton");
        buttons.forEach(button => {
            button.disabled = false;
            if(button.classList.contains("correct")) {
                button.classList.remove("correct");
            }

            if(button.classList.contains("incorrect")) {
                button.classList.remove("incorrect");
            }
        });
    }

    const goHome = () => {
        setGameMode({...gameMode, easy: false})
    }

    return (
        <>
            { randomCountries.length > 0 &&
                <div className="row">
                    <div className="col-12 col-lg-12 mt-5 d-flex justify-content-center">
                        <div className="card">
                            <h2 className='text-center mt-4 mb-4'>¿Cuál es este país?</h2>
                            <div className='d-flex justify-content-center'>
                                <img src={randomCountries[0]?.flags?.png} alt="" width={350} />
                            </div>
                            <div className="card-body ">
                                {isCorrect ? "": <h4 className='text-center m-4'>La respuesta correcta era: {correctAnswer}</h4>} 
                                <div className='d-flex justify-content-around'>
                                    <button className='btn btn-secondery mt-5 answerButton' onClick={() => checkAnswer(event, answers[0])}>{answers[0]}</button>
                                    <button className='btn btn-secondery mt-5 answerButton' onClick={() => checkAnswer(event, answers[1])}>{answers[1]}</button>
                                    <button className='btn btn-secondery mt-5 answerButton' onClick={() => checkAnswer(event, answers[2])}>{answers[2]}</button>
                                    <button className='btn btn-secondery mt-5 answerButton' onClick={() => checkAnswer(event, answers[3])}>{answers[3]}</button>
                                </div>
                                <div className='d-flex justify-content-center m-4'>
                                    <button className='btn btn-secondary mt-3' id='nextButton' onClick={skipQuestion}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                randomCountries.length <= 0 &&
                <div className='row'>
                    <div className="col-12 col-lg-12 mt-5 d-flex justify-content-center">
                        <div className="card finishCard">
                            <div className="card-body">
                                <h1 className='text-center'>Puntuación</h1>
                                <hr />
                                <h4 className='mt-4'>Preguntas correctas: {correctCounter}</h4>
                                <h4 className='mt-4'>Preguntas incorrectas: {10 - correctCounter}</h4>
                                {
                                    correctCounter < 5 &&
                                    <h4 className='mt-5 text-center'>¡Sigue jugando, seguro que mejoras la puntuación!</h4>
                                }

                                {
                                    correctCounter == 5 &&
                                    <h4 className='mt-5 text-center'>¡La mitad! Seguro que puedes seguir mejorando</h4>
                                }

                                

                                {
                                    correctCounter >= 7 ? <h4 className='mt-5 text-center'>¡Increíble!</h4> : correctCounter > 5 ? <h4 className='mt-5 text-center'>¡Bien!</h4> : ""
                                }

                                <div className=' m-4 d-flex justify-content-center'>
                                    <button className='btn btn-secondary mt-4' onClick={goHome}>Volver al inicio</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
}

export default EasyGame;