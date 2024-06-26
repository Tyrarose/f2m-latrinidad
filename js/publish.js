import { firebaseConfig } from "./firebaseConfig.mjs";

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Database
const database = firebase.database();

function extractIframeSrc(embed) {
	// Create a temporary DOM element to parse the HTML
	const parser = new DOMParser();
	const doc = parser.parseFromString(embed, "text/html");

	// Find the iframe element
	const iframe = doc.querySelector("iframe");

	// Extract the src attribute from the iframe
	if (iframe) {
		return iframe.getAttribute("src");
	} else {
		return null;
	}
}

// Handle form submission
const form = document.getElementById("dataForm");
form.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = document.getElementById("titleInput").value;
	const description = document.getElementById("descriptionInput").value;
	const embed = document.getElementById("embedInput").value;
	const iframeSrc = extractIframeSrc(embed);

	// Push the data to Firebase
	database
		.ref("videos")
		.push({
			title: title,
			description: description,
			embed: iframeSrc,
		})
		.then(() => {
			alert("Video Uploaded!");
			window.location.href = "videos.html";
			e.preventDefault();
		})
		.catch((error) => {
			alert("Error saving data: " + error);
			console.log("Error saving data: " + error);
			e.preventDefault();
		});
});
