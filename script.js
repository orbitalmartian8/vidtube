document.addEventListener("DOMContentLoaded", function() {
  // Fetch video data from JSON file
  fetch("videos.json")
    .then(response => response.json())
    .then(data => {
      const videoId = getVideoIdFromUrl();
      if (videoId) {
        const video = data.videos.find(v => v.id === videoId);
        if (video) {
          displayVideo(video);
        } else {
          displayVideos(data.videos);
        }
      } else {
        displayVideos(data.videos);
      }
    })
    .catch(error => console.error(error));
});

function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function displayVideo(video) {
  const videoContainer = document.createElement("div");
  videoContainer.className = "video-container";

  const videoPlayer = document.createElement("video");
  videoPlayer.className = "video-player";
  videoPlayer.src = video.video_file;
  videoPlayer.controls = true;
  videoContainer.appendChild(videoPlayer);

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

  const videoList = document.getElementById("videoList");
  videoList.innerHTML = "";
  videoList.appendChild(videoContainer);
}

function displayVideos(videos) {
  const videoList = document.getElementById("videoList");

  videos.forEach(video => {
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container";

    const videoLink = document.createElement("a");
    videoLink.href = "video.html?id=" + video.id;
    videoContainer.appendChild(videoLink);

    const videoThumbnail = document.createElement("img");
    videoThumbnail.className = "video-thumbnail";
    videoThumbnail.src = video.thumbnail_file;
    videoLink.appendChild(videoThumbnail);

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

    videoList.appendChild(videoContainer);
  });
}

function formatDateTime(dateTime) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  return new Date(dateTime).toLocaleString(undefined, options);
}
