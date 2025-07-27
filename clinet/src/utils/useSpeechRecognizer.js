const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SUPPORTED_LANGS = [
    { code: "en-US", label: "English" },
    { code: "hi-IN", label: "Hindi" },
    { code: "te-IN", label: "Telugu" }
];

export const useSpeechRecognizer = () => {
    let recognitionRef = null;
    let langIndexRef = 0;
    let finalText = "";
    let onTextUpdate = () => {};
    let onLangDetect = () => {};
    let onFinish = () => {};

    const startWithDetectedLang = (langCode) => {
        const recognition = new SpeechRecognition();
        recognitionRef = recognition;
        recognition.lang = langCode;
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

    const tryLanguages = () => {
        if (langIndexRef >= SUPPORTED_LANGS.length) {
            onFinish();
            return;
        }

        const lang = SUPPORTED_LANGS[langIndexRef];
        const recognition = new SpeechRecognition();
        recognitionRef = recognition;

        recognition.lang = lang.code;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const result = event.results[0][0];
            if (result.confidence > 0.5 && result.transcript.trim()) {
                onLangDetect(lang.label);
                finalText += result.transcript + " ";
                onTextUpdate(finalText);
                startWithDetectedLang(lang.code);
            } else {
                langIndexRef += 1;
                tryLanguages();
            }
        };

        recognition.onerror = () => {
            langIndexRef += 1;
            tryLanguages();
        };

        recognition.onend = () => {
            langIndexRef += 1;
            tryLanguages();
        };

        recognition.start();
    };

    const startListening = ({ onText, onLanguageDetected, onEnd }) => {
        finalText = "";
        langIndexRef = 0;
        recognitionRef = null;
        onTextUpdate = onText;
        onLangDetect = onLanguageDetected;
        onFinish = onEnd;
        tryLanguages();
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
