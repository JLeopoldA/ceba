import React, { useEffect } from "react";
import annyang from "annyang";
import axios from "axios";

const SpeechExchange = () => {
    const postData = async (userRequest) => { // sends a post to the db through axios
        // the response is content to be parsed and passed to a text to speech program

    }
    
    function removeAnnyangTrigger() { // this function removes the first word from an array

    }
    useEffect(() => {
        if(annyang) {
            console.log(annyang);
            // check if user is speaking
            annyang.addCommands({
                "god": () => { // user has requested an interaction
                    // console.log(response); // user's statement in an array
                    // let data = removeAnnyangTrigger(response);
                    // postData(data);
                }
            });
            annyang.addCallback('result', (phrases) => {
                console.log('speech input: ', phrases[0]);
                let data = phrases[0].substr(4);
                console.log(data);
            });
            annyang.start();
        }
    }, []);
}
export default SpeechExchange;