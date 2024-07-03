import { firebaseConfig } from "./firebaseConfig.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import {
	getDatabase,
	ref,
	push,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to extract iframe src
function extractIframeSrc(embed) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(embed, "text/html");
	const iframe = doc.querySelector("iframe");
	return iframe ? iframe.getAttribute("src") : null;
}

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is authenticated
		const form = document.getElementById("dataForm");
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const title = document.getElementById("titleInput").value;
			const description =
				document.getElementById("descriptionInput").value;
			const embed = document.getElementById("embedInput").value;
			const iframeSrc = extractIframeSrc(embed);

			// Push the data to Firebase
			push(ref(database, "videos"), {
				title: title,
				description: description,
				embed: iframeSrc,
			})
				.then(() => {
					alert("Video Uploaded!");
					window.location.href = "videos.html";
				})
				.catch((error) => {
					alert("Error saving data: " + error.message);
					console.log("Error saving data: " + error.message);
				});
		});
	} else {
		// User is not authenticated, redirect to login page
		window.location.href = "utf.html";
	}
});
