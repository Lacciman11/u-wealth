document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("signUpForm").addEventListener("submit", async function(e) {
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
        }

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
});
