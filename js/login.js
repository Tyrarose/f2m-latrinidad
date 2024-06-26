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

	loginForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const username = loginForm.elements["username"].value;
		const password = loginForm.elements["password"].value;

		const enteredHashedUsername = await sha256(username);
		const enteredHashedPassword = await sha256(password);

		if (
			enteredHashedUsername ===
				"4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2" &&
			enteredHashedPassword ===
				"3e6fd5113ecec40c8a8cc8e250ef76dc1080dc5325ded148d6a13740f90143a8"
		) {
			window.location.href = "lakay.html";
		} else {
			alert("Invalid username or password!");
			loginForm.reset();
		}
	});

	// Check if user is already logged in
	const isLoggedIn = sessionStorage.getItem("loggedIn");
	if (isLoggedIn === "true") {
		window.location.href = "lakay.html";
	} else {
		// Check if user's credentials are stored in localStorage
		const storedUsername = localStorage.getItem("username");
		const storedPassword = localStorage.getItem("password");
		if (storedUsername && storedPassword) {
			loginForm.elements["username"].value = storedUsername;
			loginForm.elements["password"].value = storedPassword;
		}
	}

	async function sha256(message) {
		const encoder = new TextEncoder();
		const data = encoder.encode(message);
		const hashBuffer = await crypto.subtle.digest("SHA-256", data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");
	}
});
