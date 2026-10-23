const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const authForm = document.getElementById("authForm");
const nameField = document.getElementById("nameField");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const switchBtn = document.getElementById("switchBtn");
const togglePassword = document.getElementById("toglePassword");

let isSignup = false;



function updatePage() {
    title.textContent = isSignup ? "Sign Up" : "Login";

    subtitle.textContent = isSignup
        ? "Create your account to get started."
        : "Welcome back! Please login to continue.";

    nameField.style.display = isSignup ? "block" : "none";
    confirmPasswordInput.style.display =
        isSignup ? "block" : "none";

    confirmPasswordInput.required = isSignup;

    nameInput.required = isSignup;

    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.required = isSignup;
    });

    submitBtn.textContent = isSignup ? "Sign Up" : "Login";
    switchBtn.textContent = isSignup ? "Login" : "Sign Up";

}

switchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    isSignup = !isSignup;
    authForm.reset();
    updatePage();
});

togglePassword.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Hide" : "Show";
});


authForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    if (isSignup) {
        if (name.length === 0) {
            document.getElementById("error").innerText = "Please enter your full name.";
            nameInput.focus();
            return;
        }

        if (password !== confirmPassword) {
           document.getElementById("error").innerText = "Passwords do not match!";
            confirmPasswordInput.focus();
            return;
        }

        const ageAnswer = document.querySelector(
            'input[name="gender"]:checked'
        );

        if (!ageAnswer) {
            document.getElementById("error").innerText = "Please select whether you are 18 or older.";
            return;
        }

        if (ageAnswer.value !== "yes") {
            document.getElementById("error").innerText = "You must be 18 or older to sign up.";
            return;
        }

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            document.getElementById("error").innerText = "This email is already registered. Please log  in.";
            return;
        }


        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("error").innerText = "Signup successful! Please log in.";


        isSignup = false;
        authForm.reset();
        updatePage();

    } else {
        
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );  

         if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password
        }));

        window.location.href = "TODO.html";

        } else {
            document.getElementById("error").innerText = "Invalid email or password.";
        }
    }
});

updatePage();