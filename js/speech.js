// --- פונקציית הקראה קולית (Text to Speech) ---

async function speakRecipe(steps) {
    window.speechSynthesis.cancel();
    const delay = currentUser.settings.delay * 1000;
    const rate = currentUser.settings.speechRate;
    const volume = currentUser.settings.volume;

    for (const step of steps) {
        await new Promise(resolve => {
            const utter = new SpeechSynthesisUtterance(step);
            utter.lang = 'he-IL';
            utter.rate = rate;
            utter.volume = volume;
            utter.onend = () => setTimeout(resolve, delay);
            window.speechSynthesis.speak(utter);
        });
    }
}
