const logInBtn = document.querySelector('.login');
const profilePic = document.getElementById('profilePic');
const profilePicUpload = document.getElementById('profilePicUpload');
const welcomeText = document.getElementById('welcomeText');

const getUser = () => {
    const savedUser = sessionStorage.getItem('userData');
    const user = JSON.parse(savedUser);
    return user;
};

const loggedInUser = getUser();

console.log(loggedInUser)


welcomeText.innerText = `Hi, ${loggedInUser.firstName.toUpperCase()}` || 'Guest';
logInBtn.style.display = 'none';

profilePic.addEventListener('click', function() {
    
    profilePicUpload.click();
});

profilePicUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        
        reader.onload = function(e) {
            const imageUrl = e.target.result;  
            profilePic.src = imageUrl;  

            localStorage.setItem('userProfilePic', imageUrl);

            console.log('Profile picture updated!');
        };

        reader.readAsDataURL(file);
    }
});


