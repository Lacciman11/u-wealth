document.addEventListener("DOMContentLoaded", function() {
    const Form = document.querySelector("#signInForm");

    if (Form) {
        Form.addEventListener("submit", async function(e) {
            e.preventDefault();

            const email = document.querySelector("input[type='text']").value.trim();
            const password = document.querySelector("input[type='password']").value;

            if (!email || !password) {
                alert("Please enter both username and password.");
                return;
            }

            console.log("Attempting to login with email:", email);
            console.log("Password:", password);

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
                    console.log(data.userData)
                    const userData = data.userData;
                    const accessToken = data.token;
                    alert(data.message);
                    sessionStorage.setItem("userData", JSON.stringify(userData));
                    sessionStorage.setItem("accesToken", accessToken);
                    window.location.href = "./../Dashboard/dashboard.html";
                } else {
                    alert(data.message || "Invalid credentials. Please try again.");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    } else {
        console.error("Form element not found.");
    }
});


const viewPassword = document.getElementById('eyes');
const passwordInput = document.getElementById('password');

viewPassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});
