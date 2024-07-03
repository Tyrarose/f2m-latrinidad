import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.mjs";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
	const passwordInput = document.getElementById("password-input");
	const showPasswordButton = document.getElementById("show-password");

	showPasswordButton.addEventListener("click", function () {
		const type =
			passwordInput.getAttribute("type") === "password"
				? "text"
				: "password";
		passwordInput.setAttribute("type", type);
		this.querySelector("i").classList.toggle("fa-eye");
		this.querySelector("i").classList.toggle("fa-eye-slash");
	});

	const loginForm = document.getElementById("login-form");

	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const email = loginForm.elements["username"].value;
		const password = loginForm.elements["password"].value;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Successfully signed in
				sessionStorage.setItem("loggedIn", "true");
				window.location.href = "lakay.html";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);

				alert(`Incorrect login details. Try again.`);
				loginForm.reset();
			});
	});

	// Check if user is already logged in
	const isLoggedIn = sessionStorage.getItem("loggedIn");
	if (isLoggedIn === "true") {
		window.location.href = "lakay.html";
	} else {
		// Check if user's credentials are stored in localStorage
		const storedEmail = localStorage.getItem("username");
		const storedPassword = localStorage.getItem("password");
		if (storedEmail && storedPassword) {
			loginForm.elements["username"].value = storedEmail;
			loginForm.elements["password"].value = storedPassword;
		}
	}
});
