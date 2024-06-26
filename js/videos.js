import { firebaseConfig } from "./firebaseConfig.mjs";

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Database
const database = firebase.database();

// Retrieve data from the database and display it in the table
database.ref("videos").on("value", function (snapshot) {
	const dataTable = document.getElementById("dataTable");
	dataTable.innerHTML = "";

	snapshot.forEach(function (childSnapshot) {
		const childData = childSnapshot.val();
		const row = document.createElement("tr");
		const titleCell = document.createElement("td");
		const embedCell = document.createElement("td");

		titleCell.textContent = childData.title;

		const iframe = document.createElement("iframe");
		iframe.src = childData.embed;
		iframe.width = "100%";
		iframe.height = "476";
		iframe.scrolling = "no";
		iframe.frameBorder = "0";
		iframe.allowFullscreen = true;
		iframe.allow =
			"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
		iframe.controls = true;
		embedCell.appendChild(iframe);

		row.appendChild(titleCell);
		row.appendChild(embedCell);
		dataTable.appendChild(row);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const videosRef = database.ref("videos");
	videosRef.once("value", (snapshot) => {
		const videos = snapshot.val();
		const videoKeys = Object.keys(videos);
		const lastIndex = videoKeys.length - 1;

		videoKeys.forEach((key, index) => {
			const video = videos[key];
			if (index === lastIndex) {
				createFeaturedVideo(video);
			} else if (index >= lastIndex - 4 && index <= lastIndex - 1) {
				createVideoGrid1(video);
			} else if (index >= lastIndex - 8 && index <= lastIndex - 4) {
				createVideoGrid2(video);
			}
		});
	});
});

function createFeaturedVideo(video) {
	const featuredContainer = document.getElementById("featuredContainer");
	const contentInfo = document.getElementById("contentInfo");

	const iframe = document.createElement("iframe");
	iframe.src = video.embed;
	iframe.style.width = "100%";
	iframe.style.height = "476";
	iframe.scrolling = "no";
	iframe.frameBorder = "0";
	iframe.allowFullscreen = true;
	iframe.allow =
		"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

	featuredContainer.appendChild(iframe);

	const title = document.createElement("h2");
	title.textContent = video.title;
	contentInfo.appendChild(title);

	// const description = document.createElement("p");
	// description.textContent = video.description;
	// contentInfo.appendChild(description);
}

function createVideoGrid1(video) {
	const videoDiv = createVideoDiv(video);
	videoGrid1.appendChild(videoDiv);
}

function createVideoGrid2(video) {
	const videoDiv = createVideoDiv(video);
	videoGrid2.appendChild(videoDiv);
}

function createVideoDiv(video) {
	const videoDiv = document.createElement("div");
	videoDiv.classList.add("col-md-3", "col-sm-12", "mb-3", "video-item");
	videoDiv.innerHTML = `
	  <div class="video-content">
		<h5 class="title-old-videos">${video.title}</h5>
		<iframe class="imthefbvideo" src="${video.embed}" width="100%" height="476" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay" style="overflow: hidden"></iframe>
	  </div>
	`;
	return videoDiv;
}
