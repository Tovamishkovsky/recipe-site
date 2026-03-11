// --- פונקציות התחברות והרשמה ---

// מעבר בין התחברות להרשמה
function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const confirmPass = document.getElementById('confirm-password');
    const toggleMsg = document.getElementById('toggle-message');
    const toggleLink = document.getElementById('toggle-link');
    
    if (isRegisterMode) {
        title.textContent = 'הרשמה למערכת';
        submitBtn.textContent = 'הירשמי';
        submitBtn.onclick = handleRegister;
        confirmPass.classList.remove('hidden');
        toggleMsg.textContent = 'כבר יש לך חשבון?';
        toggleLink.textContent = 'התחברי כאן';
    } else {
        title.textContent = 'כניסה למערכת';
        submitBtn.textContent = 'התחברי';
        submitBtn.onclick = handleLogin;
        confirmPass.classList.add('hidden');
        toggleMsg.textContent = 'עדיין אין לך חשבון?';
        toggleLink.textContent = 'הירשמי כאן';
    }
}

// לוגיקת הרשמה
function handleRegister() {
    const userIn = document.getElementById('username').value.trim();
    const passIn = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    
    if (!userIn || !passIn) {
        alert('נא למלא שם משתמש וסיסמה');
        return;
    }
    
    if (passIn !== confirmPass) {
        alert('הסיסמאות אינן תואמות');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.find(u => u.username === userIn)) {
        alert('שם המשתמש כבר קיים במערכת');
        return;
    }
    
    const newUser = {
        username: userIn,
        password: passIn,
        settings: { theme: 'light', fontSize: 'medium', speechRate: 0.9, delay: 2, volume: 1 }
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('ההרשמה בוצעה בהצלחה! כעת את יכולה להתחבר');
    toggleAuthMode();
    document.getElementById('username').value = userIn;
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
}

// לוגיקת כניסה (Login)
function handleLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));

    const user = users.find(u => u.username === userIn && u.password === passIn);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        applySettings();
        renderRecipes();
        showScreen('list-screen');
    } else {
        alert("שם משתמש או סיסמה שגויים");
    }
}
