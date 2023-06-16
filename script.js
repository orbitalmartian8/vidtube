document.addEventListener("DOMContentLoaded", function() {
  // Fetch video data from JSON file
  fetch("videos.json")
    .then(response => response.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.error(error));
});

function displayVideos(videos) {
  const videoList = document.getElementById("videoList");

  // Loop through each video and create HTML elements
  videos.forEach(video => {
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container";

    const videoThumbnail = document.createElement("img");
    videoThumbnail.className = "video-thumbnail";
    videoThumbnail.src = video.thumbnail_file;
    videoContainer.appendChild(videoThumbnail);

    const videoTitle = document.createElement("h2");
    videoTitle.className = "video-title";
    videoTitle.textContent = video.title;
    videoContainer.appendChild(videoTitle);

    const videoDate = document.createElement("p");
    videoDate.className = "video-date";
    videoDate.textContent = "Uploaded on " + formatDateTime(video.upload_date);
    videoContainer.appendChild(videoDate);

    const videoDescription = document.createElement("p");
    videoDescription.className = "video-description";
    videoDescription.textContent = video.description;
    videoContainer.appendChild(videoDescription);

    videoContainer.addEventListener("click", function() {
      // Handle video click event, e.g., open video in custom video player
      console.log("Video clicked:", video);
    });

    videoList.appendChild(videoContainer);
  });
}

function formatDateTime(dateTime) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  return new Date(dateTime).toLocaleString(undefined, options);
}
