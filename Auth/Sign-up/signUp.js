function createReusableLoader({ size = 64, color = '#943dc7', duration = 1.5 } = {}) {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.style.width = `${size}px`;
    loader.style.height = `${size}px`;
    loader.style.position = 'relative';
    loader.style.animation = `rotate ${duration}s ease-in infinite alternate`;

    const beforeElement = document.createElement('div');
    beforeElement.style.position = 'absolute';
    beforeElement.style.left = '0';
    beforeElement.style.bottom = '0';
    beforeElement.style.backgroundColor = color;
    beforeElement.style.width = `${size}px`;
    beforeElement.style.height = `${size / 2}px`;
    beforeElement.style.borderRadius = `0 0 ${size / 2}px ${size / 2}px`;

    const afterElement = document.createElement('div');
    afterElement.style.position = 'absolute';
    afterElement.style.left = '50%';
    afterElement.style.top = '10%';
    afterElement.style.backgroundColor = '#FFF';
    afterElement.style.width = `${size / 8}px`;
    afterElement.style.height = `${size}px`;
    afterElement.style.animation = `rotate ${duration * 0.8}s linear infinite alternate-reverse`;

    loader.appendChild(beforeElement);
    loader.appendChild(afterElement);

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    return loader;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("signUpForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const firstName = document.getElementById("fName").value.trim();
        const lastName = document.getElementById("lName").value.trim();
        const nickName = document.getElementById("nickName").value.trim();
        const email = document.getElementById("email").value.trim();
        const gender = document.getElementById("gender").value.trim();
        const dateOfBirth = document.getElementById("dob").value.trim();
        const mobileNumber = document.getElementById("mNumber").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("cPassword").value;

        if (!firstName || !lastName || !mobileNumber || !nickName || !gender || !dateOfBirth || !email || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        const termsAccepted = document.querySelector(".terms input[type='checkbox']").checked;
        if (!termsAccepted) {
            showTermsModal();
            return;
        }

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        document.body.appendChild(overlay);

        const loader = createReusableLoader({ size: 80, color: '#943dc7', duration: 1.5 });
        loader.style.position = 'fixed';
        loader.style.top = '40%';
        loader.style.left = '40%';
        loader.style.zIndex = '1000';
        overlay.appendChild(loader);

        try {
            const response = await fetch("https://opayusers-2.onrender.com/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    mobileNumber,
                    nickName,
                    gender,
                    dateOfBirth,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("firstName", firstName);
                sessionStorage.setItem("lastName", lastName);
                sessionStorage.setItem("nickName", nickName);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("gender", gender);
                sessionStorage.setItem("dateOfBirth", dateOfBirth);
                sessionStorage.setItem("mobileNumber", mobileNumber);

                console.log(sessionStorage);
                showSignUpModal();
            } else {
                alert(data.message || "Sign-up failed. Please try again.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            document.body.removeChild(overlay);
        }
    });

    function showSignUpModal() {
        const signUpModal = document.getElementById("signUpModal");
        const yesBtn = document.getElementById("yesBtn");
        const noBtn = document.getElementById("noBtn");

        signUpModal.style.display = "block";

        yesBtn.addEventListener("click", () => {
            window.location.href = "./../Sign-in/signIn.html";
        });

        noBtn.addEventListener("click", () => {
            signUpModal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === signUpModal) {
                signUpModal.style.display = "none";
            }
        });
    }

    let modalEventListenerAdded = false;

    function showTermsModal() {
        const termsModal = document.getElementById("termsModal");

        termsModal.style.display = "block";

        if (!modalEventListenerAdded) {
            window.addEventListener("click", (event) => {
                if (event.target === termsModal) {
                    termsModal.style.display = "none";
                }
            });
            modalEventListenerAdded = true;
        }

        const closeButton = termsModal.querySelector(".close-btn");
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                termsModal.style.display = "none";
            });
        }
    }

        // Password toggle
        const viewPassword = document.getElementById('eyes');
        const passwordInput = document.getElementById('password');
    
        if (viewPassword && passwordInput) {
            viewPassword.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            });  
        }

        const viewConfirmedPassword = document.getElementById('cEyes');
        const cPasswordInput = document.getElementById('cPassword');
    
        if (viewConfirmedPassword && cPasswordInput) {
            viewConfirmedPassword.addEventListener('click', () => {
                if (cPasswordInput.type === 'password') {
                    cPasswordInput.type = 'text';
                } else {
                    cPasswordInput.type = 'password';
                }
            });  
        }
});
