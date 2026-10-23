let isSignup = false;

const title = document.getElementById("title");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const submitBtn = document.getElementById("submitBtn");
const switchBtn = document.getElementById("switchBtn");
const switchText = document.getElementById("switchText");
const message = document.getElementById("message");
const form = document.getElementById("myForm");

switchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    isSignup = !isSignup;

    title.textContent = isSignup ? "Sign Up" : "Login";
    nameInput.hidden = !isSignup;
    confirmInput.hidden = !isSignup;
    nameInput.required = isSignup;
    confirmInput.required = isSignup;
    submitBtn.textContent = isSignup ? "Create Account" : "Login";

    switchText.innerHTML = isSignup
        ? 'Already have an account? <a href="#" id="switchBtn">Login</a>'
        : 'Don\'t have an account? <a href="#" id="switchBtn">Sign Up</a>';

    message.textContent = "";

    document.getElementById("switchBtn")
        .addEventListener("click", argumentsHandler);
});

function argumentsHandler(e) {
    e.preventDefault();
    switchBtn.click();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const name = nameInput.value.trim();

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    if (isSignup) {
        if (name === "") {
            message.textContent = "Please enter your name.";
            message.style.color = "red";
            return;
        }

        if (password !== confirmInput.value) {
            message.textContent = "Passwords do not match!";
            message.style.color = "red";
            return;
        }

        message.textContent =
            "Signup form validated successfully!";
    } else {
        message.textContent =
            "Login form validated successfully!";
    }

    message.style.color = "green";
});