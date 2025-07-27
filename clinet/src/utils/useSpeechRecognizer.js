const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognizer = () => {
    let recognitionRef = null;
    let finalText = "";
    let onTextUpdate = () => {};
    let onFinish = () => {};

    const startRecognition = () => {
        const recognition = new SpeechRecognition();
        recognitionRef = recognition;
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let interim = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const res = event.results[i];
                if (res.isFinal) {
                    finalText += res[0].transcript + " ";
                } else {
                    interim += res[0].transcript;
                }
            }
            onTextUpdate(finalText + interim);
        };

        recognition.onend = () => {
            if (recognitionRef) recognition.start(); // auto-restart
        };

        recognition.start();
    };

    const startListening = ({ onText, onEnd }) => {
        finalText = "";
        recognitionRef = null;
        onTextUpdate = onText;
        onFinish = onEnd;
        startRecognition();
    };

    const stopListening = () => {
        if (recognitionRef) {
            recognitionRef.stop();
            recognitionRef = null;
        }
    };

    return {
        startListening,
        stopListening
    };
};
