import React, { useEffect, useState } from "react";
import annyang from "annyang";
import axios from "axios";

function SpeechExchange() {
    let ceba = false;
    // user request state
    const [userData, setUserData] = useState("");
    const handleUserDataChange = (userText) => {
        setUserData(userText);
    }
    // button visibility
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const handleButtonClick = () => { // when this button is pressed, speech begins
        toggleButtonVisibility(); // remove button's visibility
        handleSpeak(userData); // call function for ceba to speak
    }

    const toggleButtonVisibility = () => {
        setIsButtonVisible(!isButtonVisible);
    }

    const handleSpeak = (speech) => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const populateVoices = () => {
                console.log("triggered");
                const utterance = new SpeechSynthesisUtterance(speech);
                const voices = synth.getVoices();
                console.log(voices.length);
                const desiredVoice = voices.find((voice) => voice.name === "Fiona");
                utterance.voice = desiredVoice || voices[0];
                synth.speak(utterance);
            };

            if(synth.getVoices().length !== 0) {
                populateVoices();
            } else {
                synth.onvoiceschanged = populateVoices;
            }
        }
    }
    

    // basic post request at the moment
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
        const handleSpeech = (userRequest) => {
            ceba = true; // set ceba to true so user speech is ignored
            handleUserDataChange(userRequest); // set userData to received user speech
            // call axios function here
            toggleButtonVisibility(); // testing button's visibility 
        }

        const commands = {
            "God *userSpeech": handleSpeech,
        };

        if(annyang && !ceba) { // check if user is speaking if ceba isn't processing
            annyang.addCommands(commands); 
            annyang.start();
        }
    }, []);

    return ( // return for simulating button press
        <div>
            {isButtonVisible && (
                <button onClick={handleButtonClick} className="speech-button">Press to hear God.</button>
            )}
        </div> 
    );
}
export default SpeechExchange;