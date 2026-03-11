// --- פונקציות הגדרות ---

// שינוי ערכת צבעים
function setTheme(theme) {
    document.body.className = theme + '-theme';
    currentUser.settings.theme = theme;
    saveUserData();
    
    // סימון כפתור פעיל
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.${theme}-theme-btn`).classList.add('active');
}

// שינוי גודל כתב
function setFontSize(size) {
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.body.style.fontSize = sizes[size];
    currentUser.settings.fontSize = size;
    saveUserData();
    
    // סימון כפתור פעיל
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// החלת הגדרות משתמש
function applySettings() {
    if (!currentUser.settings.theme) currentUser.settings.theme = 'light';
    if (!currentUser.settings.fontSize) currentUser.settings.fontSize = 'medium';
    if (!currentUser.settings.speechRate) currentUser.settings.speechRate = 0.9;
    if (!currentUser.settings.delay) currentUser.settings.delay = 2;
    if (!currentUser.settings.volume) currentUser.settings.volume = 1;
    
    document.body.className = currentUser.settings.theme + '-theme';
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.body.style.fontSize = sizes[currentUser.settings.fontSize];
    
    document.getElementById('delay-input').value = currentUser.settings.delay;
    document.getElementById('speech-rate').value = currentUser.settings.speechRate;
    document.getElementById('volume-input').value = currentUser.settings.volume;
    
    updateRateDisplay();
    updateDelayDisplay();
    updateVolumeDisplay();
}

// שמירת הגדרות
function saveSettings() {
    currentUser.settings.delay = parseFloat(document.getElementById('delay-input').value);
    currentUser.settings.speechRate = parseFloat(document.getElementById('speech-rate').value);
    currentUser.settings.volume = parseFloat(document.getElementById('volume-input').value);
    saveUserData();
    alert('ההגדרות נשמרו בהצלחה! ✅');
}

// עדכון תצוגת מהירות דיבור
function updateRateDisplay() {
    const rate = document.getElementById('speech-rate').value;
    const rateValue = document.getElementById('rate-value');
    if (rate < 0.8) rateValue.textContent = 'איטי';
    else if (rate > 1.2) rateValue.textContent = 'מהיר';
    else rateValue.textContent = 'רגיל';
}

// עדכון תצוגת הפסקה
function updateDelayDisplay() {
    const delay = document.getElementById('delay-input').value;
    document.getElementById('delay-value').textContent = delay;
}

// עדכון תצוגת עוצמת קול
function updateVolumeDisplay() {
    const volume = document.getElementById('volume-input').value;
    document.getElementById('volume-value').textContent = Math.round(volume * 100) + '%';
}

// שמירת נתוני משתמש
function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(u => u.username === currentUser.username);
    users[index] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
}

// מאזיני עדכון בזמן אמת
document.addEventListener('DOMContentLoaded', function() {
    const speechRate = document.getElementById('speech-rate');
    const delayInput = document.getElementById('delay-input');
    const volumeInput = document.getElementById('volume-input');
    
    if (speechRate) speechRate.addEventListener('input', updateRateDisplay);
    if (delayInput) delayInput.addEventListener('input', updateDelayDisplay);
    if (volumeInput) volumeInput.addEventListener('input', updateVolumeDisplay);
});
