import React, { useEffect, useRef } from "react";
import annyang from "annyang";
import axios from "axios";

function SpeechExchange() {
    let ceba = true;
    let userData = "Hello there, you look wonderful to me as always";
    const synth = window.speechSynthesis;
    let voices = [];
    synth.onvoiceschanged = () => { 
        voices = synth.getVoices();
        handleSpeak(userData)
    }
    
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(userData);
            const desiredVoice = voices.find((voice) => voice.name === "Fiona");
            utterance.voice = desiredVoice || voices[0];
            // add an event listener to await the end of speech
            synth.speak(utterance);
        }
    }
    const postData = async (userRequest) => { // sends a post to the db through axios
        // the response is content to be parsed and passed to a text to speech program
        let data = {
            request: userRequest
        };

        axios.post("https://localhost:8000", data)
        .then(response => {
            // pass the response from server into the speech variable
        })
        .catch(error => {
            //if error occurs, pass a constructed humorous message
        });
    }
    
    function removeAnnyangTrigger() { // this function removes the first word from an array

    }
    useEffect(() => {
        if(annyang && !ceba) {
            console.log(annyang);
            // check if user is speaking
            annyang.addCommands({
                "god": () => { // user has requested an interaction
                    
                }
            });
            annyang.addCallback('result', (phrases) => {
                let data = phrases[0].substr(4);
                console.log(data);
                ceba = true; // set ceba to true so user speech is ignored
                userData = data; // set userData to received user speech
                simulateButtonClick(); // simulate button click         
            });
            annyang.start();
        }
    }, []);

    return ( // return for simulating button press
        <div>
            {/* <button ref={buttonRef} onClick={handleSpeak} className="simulated-button"/> */}
            <button onClick={handleSpeak} className="simulated-button">

            </button>

        </div> 
    );
}
export default SpeechExchange;