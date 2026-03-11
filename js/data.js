// --- נתונים התחלתיים ומשתנים גלובליים ---

const initialUsers = [];

const initialRecipes = [
    { 
        id: 1, 
        title: "פסטה ברוטב עגבניות", 
        ingredients: "250 גרם פסטה, 3 עגבניות, 2 שיני שום, בזיליקום", 
        instructions: ["מרתיחים מים עם מלח", "מבשלים את הפסטה עד למידת עשייה רצויה", "מטגנים שום במחבת ומוסיפים עגבניות מגורדות", "מערבבים את הפסטה עם הרוטב ומגישים חם"]
    },
    { 
        id: 2, 
        title: "חביתה משודרגת", 
        ingredients: "2 ביצים, פטריות, בצל ירוק, מלח ופלפל", 
        instructions: ["טורפים את הביצים בקערה", "מטגנים את הפטריות במחבת", "מוזגים את הביצים וממתינים להשחמה", "מקפלים ומגישים"]
    }
];

// בדיקה אם הנתונים קיימים, אם לא - טעינה ראשונית
if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(initialUsers));
if (!localStorage.getItem('recipes')) localStorage.setItem('recipes', JSON.stringify(initialRecipes));

// משתנים גלובליים
let currentUser = null;
let currentUtterance = null;
let isRegisterMode = false;

// --- ניהול מסכים ---
function showScreen(screenId) {
    window.scrollTo(0, 0); 
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.add('hidden');
        s.style.opacity = 0; 
    });
    const next = document.getElementById(screenId);
    next.classList.remove('hidden');
    setTimeout(() => { 
        next.style.opacity = 1; 
        next.style.transition = 'opacity 0.5s ease-in-out'; 
    }, 10);
}
