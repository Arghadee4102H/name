// --- Database & Assets ---
const databases = {
    usa: {
        maleNames: ["James", "Michael", "Robert", "John", "David", "William", "Richard", "Joseph", "Thomas", "Charles"],
        femaleNames: ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"],
        lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"],
        domains: ["gmail.com", "yahoo.com", "outlook.com"],
        flag: "🇺🇸"
    },
    uk: {
        maleNames: ["Oliver", "George", "Harry", "Noah", "Jack", "Leo", "Arthur", "Muhammad", "Oscar", "Charlie"],
        femaleNames: ["Amelia", "Isla", "Olivia", "Aurora", "Mia", "Ava", "Grace", "Lily", "Sophia", "Ivy"],
        lastNames: ["Smith", "Jones", "Williams", "Taylor", "Brown", "Davies", "Evans", "Wilson", "Thomas", "Roberts"],
        domains: ["gmail.com", "outlook.com", "yahoo.co.uk"],
        flag: "🇬🇧"
    },
    canada: {
        maleNames: ["Noah", "Liam", "Jackson", "Lucas", "Benjamin", "Theodore", "Jack", "William", "Owen", "Oliver"],
        femaleNames: ["Olivia", "Emma", "Charlotte", "Amelia", "Ava", "Sophia", "Chloe", "Mia", "Mila", "Alice"],
        lastNames: ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Gagnon", "Lee", "Wilson", "Johnson", "MacDonald"],
        domains: ["gmail.com", "yahoo.ca", "hotmail.com"],
        flag: "🇨🇦"
    },
    germany: {
        maleNames: ["Noah", "Leon", "Paul", "Matteo", "Ben", "Elias", "Finn", "Felix", "Henry", "Luis"],
        femaleNames: ["Emilia", "Mia", "Sophia", "Emma", "Hannah", "Lina", "Mila", "Ella", "Leni", "Clara"],
        lastNames: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann"],
        domains: ["gmx.de", "web.de", "gmail.com"],
        flag: "🇩🇪"
    },
    australia: {
        maleNames: ["Oliver", "Noah", "Jack", "William", "Leo", "Lucas", "Thomas", "Henry", "Charlie", "James"],
        femaleNames: ["Charlotte", "Amelia", "Olivia", "Isla", "Mia", "Ava", "Grace", "Willow", "Harper", "Chloe"],
        lastNames: ["Smith", "Jones", "Williams", "Brown", "Wilson", "Taylor", "Johnson", "White", "Martin", "Anderson"],
        domains: ["gmail.com", "outlook.com.au", "yahoo.com.au"],
        flag: "🇦🇺"
    },
    france: {
        maleNames: ["Gabriel", "Léo", "Raphaël", "Arthur", "Louis", "Jules", "Adam", "Maël", "Lucas", "Hugo"],
        femaleNames: ["Jade", "Louise", "Ambre", "Alba", "Emma", "Rose", "Alice", "Romy", "Anna", "Lina"],
        lastNames: ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent"],
        domains: ["gmail.com", "orange.fr", "free.fr"],
        flag: "🇫🇷"
    },
    spain: {
        maleNames: ["Hugo", "Mateo", "Martín", "Lucas", "Leo", "Daniel", "Alejandro", "Manuel", "Pablo", "Álvaro"],
        femaleNames: ["Lucía", "Martina", "Sofía", "María", "Valeria", "Julia", "Paula", "Emma", "Daniela", "Carla"],
        lastNames: ["García", "Fernández", "González", "Rodríguez", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín"],
        domains: ["gmail.com", "hotmail.es", "yahoo.es"],
        flag: "🇪🇸"
    },
    italy: {
        maleNames: ["Leonardo", "Francesco", "Alessandro", "Lorenzo", "Mattia", "Tommaso", "Gabriele", "Andrea", "Riccardo", "Edoardo"],
        femaleNames: ["Sofia", "Aurora", "Giulia", "Ginevra", "Beatrice", "Alice", "Vittoria", "Emma", "Ludovica", "Matilde"],
        lastNames: ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco"],
        domains: ["gmail.com", "libero.it", "virgilio.it"],
        flag: "🇮🇹"
    },
    india: {
        maleNames: ["Aarav", "Vihaan", "Aditya", "Sai", "Arjun", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya"],
        femaleNames: ["Aadhya", "Diya", "Kashvi", "Ananya", "Pari", "Isha", "Riya", "Aarohi", "Avni", "Kavya"],
        lastNames: ["Sharma", "Singh", "Patel", "Kumar", "Gupta", "Yadav", "Verma", "Mishra", "Chauhan", "Rao"],
        domains: ["gmail.com", "yahoo.in", "outlook.in"],
        flag: "🇮🇳"
    },
    japan: {
        maleNames: ["Haruto", "Yuto", "Sota", "Yuki", "Hayato", "Ryota", "Kaito", "Sho", "Takuya", "Kenta"],
        femaleNames: ["Hina", "Yui", "Sakura", "Mio", "Rin", "Aoi", "Yuna", "Miyu", "Nanami", "Maki"],
        lastNames: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato"],
        domains: ["gmail.com", "yahoo.co.jp", "icloud.com"],
        flag: "🇯🇵"
    }
};

const countriesList = Object.keys(databases);
let generatedIdentities = [];

// Safe local storage wrapper
const storage = {
    get: (key) => {
        try { return localStorage.getItem(key); } catch(e) { return null; }
    },
    set: (key, value) => {
        try { localStorage.setItem(key, value); } catch(e) {}
    },
    remove: (key) => {
        try { localStorage.removeItem(key); } catch(e) {}
    }
};

// --- DOM Elements ---
const quantityInput = document.getElementById('quantity');
const quantityValue = document.getElementById('quantityValue');
const generateBtns = [document.getElementById('generateBtn'), document.getElementById('generateBtnMobile')];
const resetBtn = document.getElementById('resetBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const copyAllBtn = document.getElementById('copyAllBtn');
const downloadBtn = document.getElementById('downloadBtn');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const randomModeToggle = document.getElementById('randomMode');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Load theme
    if(storage.get('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    // Load saved identities
    const saved = storage.get('lastIdentities');
    if(saved) {
        generatedIdentities = JSON.parse(saved);
        renderIdentities();
    }
});

// --- Event Listeners ---
quantityInput.addEventListener('input', (e) => {
    quantityValue.textContent = e.target.value;
});

generateBtns.forEach(btn => {
    if(btn) btn.addEventListener('click', handleGenerate);
});

resetBtn.addEventListener('click', () => {
    generatedIdentities = [];
    renderIdentities();
    storage.remove('lastIdentities');
});

copyAllBtn.addEventListener('click', copyAllIdentities);
downloadBtn.addEventListener('click', downloadTXT);

themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if(isLight) {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        storage.set('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        storage.set('theme', 'light');
    }
});

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// --- Core Logic ---

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDOB() {
    const currentYear = new Date().getFullYear();
    const year = currentYear - randomNumber(18, 60);
    const month = String(randomNumber(1, 12)).padStart(2, '0');
    const day = String(randomNumber(1, 28)).padStart(2, '0'); // Keep it safe for all months
    return `${year}-${month}-${day}`;
}

function generateEmail(firstName, lastName, domain) {
    const format = randomNumber(1, 3);
    const num = randomNumber(10, 999);
    let email = "";
    
    firstName = firstName.toLowerCase().replace(/[^a-z]/g, '');
    lastName = lastName.toLowerCase().replace(/[^a-z]/g, '');

    switch(format) {
        case 1: email = `${firstName}.${lastName}${num}`; break;
        case 2: email = `${firstName[0]}${lastName}${num}`; break;
        case 3: email = `${lastName}.${firstName}${num}`; break;
    }
    return `${email}@${domain}`;
}

function generateIdentity(settings) {
    let { gender, country, isFullyRandom } = settings;

    if (isFullyRandom || country === 'random') {
        country = randomItem(countriesList);
    }
    
    if (isFullyRandom || gender === 'any') {
        gender = randomItem(['male', 'female']);
    }

    const db = databases[country];
    const firstName = gender === 'male' ? randomItem(db.maleNames) : randomItem(db.femaleNames);
    const lastName = randomItem(db.lastNames);
    const domain = randomItem(db.domains);
    
    const dob = generateDOB();
    // Calculate exact age based on DOB
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    return {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        fullName: `${firstName} ${lastName}`,
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),
        dob: dob,
        age: age,
        email: generateEmail(firstName, lastName, domain),
        country: country.toUpperCase(),
        flag: db.flag
    };
}

async function handleGenerate() {
    const count = parseInt(quantityInput.value);
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const isFullyRandom = randomModeToggle.checked;

    // UI Loading state
    resultsContainer.innerHTML = '';
    loadingSpinner.classList.remove('hidden');
    
    // Simulate slight delay for realistic processing feel
    await new Promise(r => setTimeout(r, 600));

    const newBatch = [];
    const settings = { gender, country, isFullyRandom };

    for(let i=0; i<count; i++) {
        // Simple check to avoid duplicates in current batch (though chance is low)
        let newId;
        let isDuplicate = true;
        let attempts = 0;
        
        while(isDuplicate && attempts < 10) {
            newId = generateIdentity(settings);
            isDuplicate = newBatch.some(id => id.email === newId.email);
            attempts++;
        }
        newBatch.push(newId);
    }

    generatedIdentities = newBatch; // Replace previous results
    storage.set('lastIdentities', JSON.stringify(generatedIdentities));
    
    loadingSpinner.classList.add('hidden');
    renderIdentities();
}

// --- UI Rendering ---

function renderIdentities() {
    resultsContainer.innerHTML = '';
    
    generatedIdentities.forEach((identity, index) => {
        const card = document.createElement('div');
        card.className = 'identity-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="id-header">
                <div class="id-name">${identity.fullName}</div>
                <div class="id-country">${identity.flag} ${identity.country}</div>
            </div>
            <div class="id-details">
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-solid fa-venus-mars"></i> Gender</span>
                    <span class="detail-value">${identity.gender}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-solid fa-cake-candles"></i> DOB (Age)</span>
                    <span class="detail-value">${identity.dob} (${identity.age})</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-solid fa-envelope"></i> Email</span>
                    <span class="detail-value">${identity.email}</span>
                </div>
            </div>
            <button class="icon-btn copy-id-btn" onclick="copySingle('${identity.id}')" title="Copy Details">
                <i class="fa-regular fa-copy"></i>
            </button>
        `;
        resultsContainer.appendChild(card);
    });
}

// --- Utilities ---

function formatIdentityText(idObj) {
    return `Name: ${idObj.fullName}\nGender: ${idObj.gender}\nDOB: ${idObj.dob}\nEmail: ${idObj.email}\nCountry: ${idObj.country}\n---`;
}

window.copySingle = function(id) {
    const identity = generatedIdentities.find(i => i.id === id);
    if(identity) {
        const text = formatIdentityText(identity);
        copyToClipboard(text);
    }
}

function copyAllIdentities() {
    if(generatedIdentities.length === 0) return;
    const text = generatedIdentities.map(formatIdentityText).join('\n\n');
    copyToClipboard(text);
}

function downloadTXT() {
    if(generatedIdentities.length === 0) return;
    const text = generatedIdentities.map(formatIdentityText).join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identities_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File downloaded!');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy');
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
