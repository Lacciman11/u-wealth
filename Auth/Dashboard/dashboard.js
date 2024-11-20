const logInBtn = document.querySelector('.login');
const profile = document.querySelector('.profile')
const welcomeText = document.getElementById('welcomeText');

const getUser = () => {
    try {
        const savedUser = sessionStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        console.error("Error parsing user data from sessionStorage", error);
        return null;
    }
};



const loggedInUser = getUser();

if (loggedInUser) {
    if (welcomeText) {
        welcomeText.innerText = `Hi, ${loggedInUser.firstName?.toUpperCase() || 'User'}`;
    }
    if (logInBtn) {
        logInBtn.style.display = 'none';
    }
    if (profile) {
        profile.style.display = 'inline-block';
    }
} else {
    if (welcomeText) {
        welcomeText.innerText = 'Hi, Guest';
    }
    if (logInBtn) {
        logInBtn.style.display = 'block';
    }
    if (profile) {
        profile.style.display = 'none';
    }
}

// Password account balance
const viewBalance = document.getElementById('eyes');
const balanceInput = document.getElementById('balance');
if (viewBalance && balanceInput) {
    viewBalance.addEventListener('click', () => {
        if (balanceInput.type === 'password') {
            balanceInput.type = 'text';
        } else {
            balanceInput.type = 'password';
        }
    });  
}

