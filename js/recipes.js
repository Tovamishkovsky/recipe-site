// --- פונקציות ניהול מתכונים ---

// הצגת רשימת מתכונים
function renderRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = '<p class="empty-state">אין מתכונים עדיין... לחצי על + להוספה!</p>';
        return;
    }

    recipes.forEach(r => {
        const div = document.createElement('div');
        div.className = 'recipe-card';
        div.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteRecipe(${r.id})">🗑️</button>
            <div class="recipe-emoji">🍽️</div>
            <h3>${r.title}</h3>
            <p class="recipe-preview">${r.ingredients.substring(0, 50)}...</p>
        `;
        div.onclick = () => openRecipe(r);
        container.appendChild(div);
    });
}

// פתיחת מתכון לצפייה
function openRecipe(recipe) {
    document.getElementById('view-title').innerText = recipe.title;
    document.getElementById('view-ingredients').innerText = recipe.ingredients;
    const stepsDiv = document.getElementById('view-steps');
    stepsDiv.innerHTML = recipe.instructions.map((s, i) => 
        `<div class="step-item">
            <span class="step-number">${i+1}</span>
            <p>${s}</p>
        </div>`
    ).join('');
    
    document.getElementById('play-btn').onclick = () => speakRecipe(recipe.instructions);
    document.getElementById('stop-btn').onclick = () => window.speechSynthesis.cancel();
    
    showScreen('recipe-view-screen');
}

// הצגת טופס הוספת מתכון
function showAddRecipeForm() {
    document.getElementById('new-title').value = '';
    document.getElementById('new-ingredients').value = '';
    document.getElementById('new-instructions').value = '';
    showScreen('add-recipe-screen');
}

// שמירת מתכון חדש
function saveNewRecipe() {
    const title = document.getElementById('new-title').value.trim();
    const ingredients = document.getElementById('new-ingredients').value.trim();
    const instructions = document.getElementById('new-instructions').value.trim();
    
    if (!title || !ingredients || !instructions) {
        alert('נא למלא את כל השדות');
        return;
    }
    
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const newRecipe = {
        id: Date.now(),
        title: title,
        ingredients: ingredients,
        instructions: instructions.split('\n').filter(line => line.trim() !== '')
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    alert('המתכון נשמר בהצלחה! 🎉');
    renderRecipes();
    showScreen('list-screen');
}

// מחיקת מתכון
function deleteRecipe(id) {
    if (!confirm('האם את בטוחה שברצונך למחוק את המתכון?')) return;
    
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes = recipes.filter(r => r.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
}

// חיפוש מתכונים
function searchRecipes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    
    const filtered = recipes.filter(r => 
        r.title.toLowerCase().includes(searchTerm) || 
        r.ingredients.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-state">לא נמצאו מתכונים 😔</p>';
        return;
    }
    
    filtered.forEach(r => {
        const div = document.createElement('div');
        div.className = 'recipe-card';
        div.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteRecipe(${r.id})">🗑️</button>
            <div class="recipe-emoji">🍽️</div>
            <h3>${r.title}</h3>
            <p class="recipe-preview">${r.ingredients.substring(0, 50)}...</p>
        `;
        div.onclick = () => openRecipe(r);
        container.appendChild(div);
    });
}
