document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("login-form");

	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const username = loginForm.elements["username"].value;
		const password = loginForm.elements["password"].value;

		if (username === "root" && password === "root") {
			window.location.href = "publish.html";
		} else {
			alert("Invalid username or password!");
			loginForm.reset();
		}
	});
});
