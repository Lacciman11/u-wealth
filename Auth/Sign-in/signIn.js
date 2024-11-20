function createLoader({ size = 64, color = '#943dc7', duration = 1.5 } = {}) {

    const overlay = document.createElement('div');
    overlay.classList.add('loader-overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'none';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const loader = document.createElement('span');
    loader.classList.add('loader');
    loader.style.width = `${size}px`;
    loader.style.height = `${size}px`;
    loader.style.position = 'relative';
    loader.style.animation = `rotate ${duration}s ease-in infinite alternate`;

    const loaderBefore = document.createElement('div');
    loaderBefore.style.position = 'absolute';
    loaderBefore.style.left = '0';
    loaderBefore.style.bottom = '0';
    loaderBefore.style.background = color;
    loaderBefore.style.width = `${size}px`;
    loaderBefore.style.height = `${size / 2}px`;
    loaderBefore.style.borderRadius = `0 0 ${size / 2}px ${size / 2}px`;

    const loaderAfter = document.createElement('div');
    loaderAfter.style.position = 'absolute';
    loaderAfter.style.left = '50%';
    loaderAfter.style.top = '10%';
    loaderAfter.style.background = '#FFF';
    loaderAfter.style.width = `${size / 8}px`;
    loaderAfter.style.height = `${size}px`;
    loaderAfter.style.animation = `rotate ${duration * 0.8}s linear infinite alternate-reverse`;

    loader.appendChild(loaderBefore);
    loader.appendChild(loaderAfter);

    overlay.appendChild(loader);

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes rotate {
          100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(overlay);
    return overlay;
}

function createLoginModal({ message = "Login Successful!", duration = 3000 } = {}) {
    const loginModal = document.createElement('div');
    loginModal.style.position = 'fixed';
    loginModal.style.top = '50%';
    loginModal.style.left = '50%';
    loginModal.style.transform = 'translate(-50%, -50%)';
    loginModal.style.backgroundColor = '#fff';
    loginModal.style.padding = '20px 40px';
    loginModal.style.borderRadius = '10px';
    loginModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    loginModal.style.zIndex = '1001';
    loginModal.style.textAlign = 'center';

    const modalText = document.createElement('p');
    modalText.innerText = message;
    modalText.style.fontSize = '18px';
    modalText.style.color = '#943dc7'; 
    modalText.style.margin = '0';

    loginModal.appendChild(modalText);

    document.body.appendChild(loginModal);

    setTimeout(() => {
        loginModal.style.opacity = '0';
        loginModal.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(loginModal);
        }, 500); // 
    }, duration);
}

document.addEventListener("DOMContentLoaded", function () {
    const Form = document.querySelector("#signInForm");
    const loaderOverlay = createLoader({ size: 50, color: '#943dc7' });

    if (Form) {
        Form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = document.querySelector("input[type='text']").value.trim();
            const password = document.querySelector("input[type='password']").value;

            if (!email || !password) {
                alert("Please enter both username and password.");
                return;
            }

            console.log("Attempting to login with email:", email);

            loaderOverlay.style.display = 'flex'; // Show loader with overlay

            try {
                const response = await fetch("https://opayusers-2.onrender.com/api/v1/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("Response data:", data);

                if (response.ok) {
                    console.log(data.userData);
                    const userData = data.userData;
                    const accessToken = data.token;
                    sessionStorage.setItem("userData", JSON.stringify(userData));
                    sessionStorage.setItem("accessToken", accessToken);

                    
                    createLoginModal({ message: data.message });

                    setTimeout(() => {
                        window.location.href = "./../Dashboard/dashboard.html";
                    }, 3000); 
                } else {
                    alert(data.message || "Invalid credentials. Please try again.");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("An error occurred. Please try again later.");
            } finally {
                loaderOverlay.style.display = 'none'; 
            }
        });
    } else {
        console.error("Form element not found.");
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
});
