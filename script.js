const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const switchForm = document.getElementById("switchForm");
const switchLabel = document.getElementById("switchLabel");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");

let isSignup = false;

// Temporary demo account (stored only while the page is open)
let demoAccount = null;

// Switch between Login and Sign Up
switchForm.addEventListener("click", function(event) {
    event.preventDefault();

    isSignup = !isSignup;
    message.textContent = "";
    authForm.reset();

    if (isSignup) {
        formTitle.textContent = "Create Account";
        formSubtitle.textContent = "Please sign up to continue";
        nameGroup.classList.remove("hidden");
        nameInput.required = true;
        submitBtn.textContent = "Sign Up";
        switchLabel.textContent = "Already have an account?";
        switchForm.textContent = "Login";
    } else {
        formTitle.textContent = "Welcome Back!";
        formSubtitle.textContent = "Please login to continue";
        nameGroup.classList.add("hidden");
        nameInput.required = false;
        submitBtn.textContent = "Login";
        switchLabel.textContent = "Don't have an account?";
        switchForm.textContent = "Sign Up";
    }
});

// Show or hide password
showPassword.addEventListener("change", function() {
    passwordInput.type = this.checked ? "text" : "password";
});

// Handle form submission
authForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    message.style.color = "red";

    if (password.length < 8) {
        message.textContent = "Password must contain at least 8 characters.";
        return;
    }

    if (isSignup) {
        const name = nameInput.value.trim();

        if (name.length < 2) {
            message.textContent = "Please enter your full name.";
            return;
        }

        demoAccount = {
            name: name,
            email: email,
            password: password
        };

        message.style.color = "green";
        message.textContent = "Demo account created! You can now login.";
        
        authForm.reset();
    } else {
        if (
            demoAccount &&
            demoAccount.email === email &&
            demoAccount.password === password
        ) {
            message.style.color = "green";
            message.textContent =
                "Welcome, " + demoAccount.name + "! Demo login successful.";
        } else {
            message.textContent =
                "No matching demo account. Please sign up first.";
        }
    }
});