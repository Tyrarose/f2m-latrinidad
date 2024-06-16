document.addEventListener("DOMContentLoaded", function () {
	fetch("/data/videos.json")
		.then((response) => response.json())
		.then((data) => {
			const videoGrid = document.getElementById("videoGrid");
			data.forEach((video) => {
				const videoDiv = document.createElement("div");
				videoDiv.classList.add("col-md-3", "mb-3");
				videoDiv.innerHTML = `
                    <div class="">
                        <div class="">
                            <h5 class="title-old-videos">${video.title}</h5>
                            <iframe 
							src="${video.url}" 
							width="100%" 
							height="476" 
							scrolling="no" 
							frameborder="0" 
							allowfullscreen="true"
							allow="autoplay"
							style="overflow:hidden;"></iframe>
                        </div>
                    </div>
                `;
				videoGrid.appendChild(videoDiv);
			});
		})
		.catch((error) => console.log("Error fetching videos:", error));
});
